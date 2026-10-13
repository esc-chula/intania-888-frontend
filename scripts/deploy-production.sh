#!/usr/bin/env bash
set -euo pipefail

readonly project_id=intania-888
readonly region=asia-southeast1
readonly service_name=intania888-web
readonly image_pattern='^asia-southeast1-docker[.]pkg[.]dev/intania-888/intania888/intania-888-frontend@sha256:[0-9a-f]{64}$'
readonly image="${1:?Usage: deploy-production.sh IMAGE@sha256:DIGEST}"

if [[ ! "$image" =~ $image_pattern ]]; then
  echo 'Expected an immutable frontend image from the production repository.' >&2
  exit 1
fi
if [[ ! "${GITHUB_RUN_ID:-}" =~ ^[0-9]+$ || ! "${GITHUB_RUN_ATTEMPT:-}" =~ ^[0-9]+$ ]]; then
  echo 'GitHub run ID and attempt are required for a unique revision name.' >&2
  exit 1
fi

readonly revision_suffix="gh-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}"
readonly revision_name="${service_name}-${revision_suffix}"

# Keep the current public IAM policy and serving revision during preparation.
gcloud run deploy "$service_name" \
  --project="$project_id" \
  --region="$region" \
  --image="$image" \
  --service-account="intania888-web-runtime@${project_id}.iam.gserviceaccount.com" \
  --execution-environment=gen2 \
  --port=8080 \
  --cpu=1 \
  --memory=512Mi \
  --concurrency=80 \
  --timeout=60s \
  --min-instances=0 \
  --max-instances=5 \
  --ingress=all \
  --revision-suffix="$revision_suffix" \
  --tag=candidate \
  --no-traffic \
  --quiet

service_json=$(gcloud run services describe "$service_name" \
  --project="$project_id" \
  --region="$region" \
  --format=json)
candidate_url=$(python3 -c '
import json
import sys
service = json.load(sys.stdin)
revision = sys.argv[1]
for entry in service.get("status", {}).get("traffic", []):
    if entry.get("tag") == "candidate" and entry.get("revisionName") == revision:
        url = entry.get("url", "")
        if url.startswith("https://"):
            print(url)
            sys.exit(0)
sys.exit("Candidate URL was not found for the expected revision.")
' "$revision_name" <<< "$service_json")

http_status=$(curl --fail --silent --show-error \
  --retry 6 --retry-all-errors --retry-delay 5 --retry-max-time 180 \
  --max-time 30 --output /dev/null --write-out '%{http_code}' \
  "${candidate_url}/")
if [[ "$http_status" != 200 ]]; then
  echo "Frontend candidate returned HTTP ${http_status}; production traffic was not changed." >&2
  exit 1
fi

gcloud run services update-traffic "$service_name" \
  --project="$project_id" \
  --region="$region" \
  --to-revisions="${revision_name}=100" \
  --remove-tags=candidate \
  --quiet

if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  {
    echo '## Frontend deployment'
    echo "- Commit: ${DEPLOY_COMMIT:-unknown}"
    echo "- Image: ${image}"
    echo "- Revision: ${revision_name}"
    echo '- Website: https://888.intania.org'
  } >> "$GITHUB_STEP_SUMMARY"
fi
