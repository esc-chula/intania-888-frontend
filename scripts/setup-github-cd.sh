#!/usr/bin/env bash
set -euo pipefail

# One-time setup. Run with the host gcloud account used to manage this project.
# This creates deployment permissions; it does not deploy an image or read secrets.
readonly project_id=intania-888
readonly project_number=461083215931
readonly region=asia-southeast1
readonly pool_id=intania888-github
readonly provider_id=frontend-production
readonly deployer_email=intania888-web-deployer@intania-888.iam.gserviceaccount.com
readonly github_repository_id=860960855
readonly github_owner_id=66741385
readonly github_workflow_ref=esc-chula/intania-888-frontend/.github/workflows/deploy.yml@refs/heads/main

actual_project_number=$(gcloud projects describe "$project_id" --format='value(projectNumber)')
if [[ "$actual_project_number" != "$project_number" ]]; then
  echo 'Project identity did not match the production deployment configuration.' >&2
  exit 1
fi

echo 'Enabling the APIs required for GitHub authentication.'
gcloud services enable \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  cloudresourcemanager.googleapis.com \
  --project="$project_id" \
  --quiet

existing_account=$(gcloud iam service-accounts list \
  --project="$project_id" \
  --filter="email=${deployer_email}" \
  --format='value(email)')
if [[ -z "$existing_account" ]]; then
  gcloud iam service-accounts create intania888-web-deployer \
    --project="$project_id" \
    --display-name='Intania 888 frontend GitHub deployment' \
    --quiet
fi

existing_pool=$(gcloud iam workload-identity-pools list \
  --project="$project_id" \
  --location=global \
  --filter="name:workloadIdentityPools/${pool_id}" \
  --format='value(name)')
if [[ -z "$existing_pool" ]]; then
  gcloud iam workload-identity-pools create "$pool_id" \
    --project="$project_id" \
    --location=global \
    --display-name='Intania 888 GitHub Actions' \
    --quiet
fi

# Numeric GitHub IDs remain unique even if a repository or owner name is reused.
attribute_mapping='google.subject=assertion.sub,attribute.repository_id=assertion.repository_id,attribute.repository_owner_id=assertion.repository_owner_id,attribute.ref=assertion.ref,attribute.workflow_ref=assertion.workflow_ref,attribute.event_name=assertion.event_name'
attribute_condition="assertion.repository_id == '${github_repository_id}' && assertion.repository_owner_id == '${github_owner_id}' && assertion.ref == 'refs/heads/main' && assertion.workflow_ref == '${github_workflow_ref}' && assertion.event_name in ['workflow_run', 'workflow_dispatch']"

existing_provider=$(gcloud iam workload-identity-pools providers list \
  --project="$project_id" \
  --location=global \
  --workload-identity-pool="$pool_id" \
  --filter="name:providers/${provider_id}" \
  --format='value(name)')
if [[ -z "$existing_provider" ]]; then
  gcloud iam workload-identity-pools providers create-oidc "$provider_id" \
    --project="$project_id" \
    --location=global \
    --workload-identity-pool="$pool_id" \
    --display-name='888 frontend production' \
    --issuer-uri=https://token.actions.githubusercontent.com \
    --attribute-mapping="$attribute_mapping" \
    --attribute-condition="$attribute_condition" \
    --quiet
else
  gcloud iam workload-identity-pools providers update-oidc "$provider_id" \
    --project="$project_id" \
    --location=global \
    --workload-identity-pool="$pool_id" \
    --issuer-uri=https://token.actions.githubusercontent.com \
    --attribute-mapping="$attribute_mapping" \
    --attribute-condition="$attribute_condition" \
    --quiet
fi

echo 'Granting deployment access to the dedicated GitHub service account.'
# The frontend deployment account can update only the existing frontend service.
gcloud run services add-iam-policy-binding intania888-web \
  --project="$project_id" \
  --region="$region" \
  --member="serviceAccount:${deployer_email}" \
  --role=roles/run.developer \
  --condition=None \
  --quiet

gcloud projects add-iam-policy-binding "$project_id" \
  --member="serviceAccount:${deployer_email}" \
  --role=roles/serviceusage.serviceUsageConsumer \
  --condition=None \
  --quiet

gcloud artifacts repositories add-iam-policy-binding intania888 \
  --project="$project_id" \
  --location="$region" \
  --member="serviceAccount:${deployer_email}" \
  --role=roles/artifactregistry.writer \
  --condition=None \
  --quiet

gcloud iam service-accounts add-iam-policy-binding "intania888-web-runtime@${project_id}.iam.gserviceaccount.com" \
  --project="$project_id" \
  --member="serviceAccount:${deployer_email}" \
  --role=roles/iam.serviceAccountUser \
  --condition=None \
  --quiet

gcloud iam service-accounts add-iam-policy-binding "$deployer_email" \
  --project="$project_id" \
  --member="principalSet://iam.googleapis.com/projects/${project_number}/locations/global/workloadIdentityPools/${pool_id}/attribute.repository_id/${github_repository_id}" \
  --role=roles/iam.workloadIdentityUser \
  --condition=None \
  --quiet

echo 'GitHub authentication and deployment permissions are configured.'
echo 'Allow at least five minutes for IAM propagation before the first deployment.'
echo 'The deployment workflow becomes available after these repo changes reach main.'
