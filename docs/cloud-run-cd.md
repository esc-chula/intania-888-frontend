# Frontend deployment to Cloud Run

Production website: https://888.intania.org

- Project: `intania-888`
- Region: `asia-southeast1`
- Service: `intania888-web`
- Production branch: `main`
- Image repository: `asia-southeast1-docker.pkg.dev/intania-888/intania888/intania-888-frontend`

## One-time Google Cloud setup

Run from this checkout with the host account that manages the project:

```sh
bash scripts/setup-github-cd.sh
```

Allow at least five minutes for IAM propagation. The script creates the
`frontend-production` OIDC provider in the existing `intania888-github` pool,
plus a dedicated `intania888-web-deployer` account. It grants access to update
only the existing frontend service, write images to the shared Artifact Registry
repository, consume project APIs, and use `intania888-web-runtime`.

The provider accepts only this repository's numeric ID, owner ID, `main` branch,
and `.github/workflows/deploy.yml` workflow. No service-account key or application
secret is required by the new workflows.

## Automatic deployments

After these changes reach `main`:

1. A push to `main` starts **CI**, which builds the production image. The build
   includes Next.js lint, TypeScript validation, and route generation.
2. A successful CI push run starts **Deploy to Cloud Run** for the same commit.
3. The workflow skips releases superseded by a newer `main` commit.
4. It builds the image before authentication, then uses a one-hour OIDC-based
   service-account access token to publish a commit-tagged image.
5. It resolves the uploaded digest and deploys a candidate revision without
   changing production traffic.
6. It requires HTTP 200 from the candidate homepage before moving 100% of
   production traffic to the revision. A failed candidate keeps the old revision
   serving traffic.

Pull requests run CI but do not deploy. The deployment workflow can also be run
manually from GitHub Actions using **Run workflow** on `main`.

## Browser settings

These values are embedded during `next build`:

- `NEXT_PUBLIC_API_BASE_URL=https://888-api.intania.org/api/v1`
- `NEXT_PUBLIC_AUTH_CLIENT_ID=intania-888-web`

Optionally set the GitHub repository variable `NEXT_PUBLIC_INTANIA_GAMES_URL`
to the public Games website URL when available. An empty value keeps that link
unavailable. The value is public and is included in both CI and release builds.
Changing a build setting requires a new build and deployment.

Do not place passwords, OAuth client secrets, database credentials, or Redis
credentials in any `NEXT_PUBLIC_*` variable.

## Rollback

Choose a previously working revision in Cloud Run, or run:

```sh
gcloud run services update-traffic intania888-web \
  --project=intania-888 \
  --region=asia-southeast1 \
  --to-revisions=PREVIOUS_REVISION_NAME=100
```

Homepage readiness confirms that the server responds. It does not prove browser
login, every feature, or expected peak capacity. Check those separately before
relying on a release for the event.

## References

- [Google GitHub authentication action](https://github.com/google-github-actions/auth)
- [Cloud Run deployment permissions](https://docs.cloud.google.com/run/docs/deploying)
- [Cloud Run traffic migration](https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration)
- [Next.js browser environment variables](https://nextjs.org/docs/pages/guides/environment-variables)
