# The Provider System Analytics App

Private analytics dashboard for `analytics.theprovidersystem.com`.

## What It Shows

- Google Search Console search performance
- Bing Webmaster Tools query/page/crawl summaries
- Search terms people use to find the site
- Top pages, devices, countries, CTR, average position, and trend data
- Provider setup status when credentials are missing

## Deploy Shape

Deploy this folder as its own Vercel project:

- Root directory: `analytics-app`
- Build command: `npm run build`
- Output directory: `dist`
- Domain: `analytics.theprovidersystem.com`

## Required Environment Variables

Set these in the analytics Vercel project, not in the public website project:

- `ANALYTICS_ACCESS_TOKEN`
- `SITE_NAME`
- `PUBLIC_SITE_URL`
- `GSC_SITE_URL`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `BING_SITE_URL`
- `BING_API_KEY`

## Google Search Console Setup

1. Create a Google Cloud service account.
2. Enable the Search Console API.
3. Create a JSON key.
4. Store the `client_email` as `GOOGLE_CLIENT_EMAIL`.
5. Store the private key as `GOOGLE_PRIVATE_KEY`.
6. Add the service account email as a user on the Search Console property.
7. Set `GSC_SITE_URL` to the exact property, for example `sc-domain:theprovidersystem.com` or `https://theprovidersystem.com/`.

## Bing Webmaster Setup

1. Open Bing Webmaster Tools.
2. Verify the site if it is not already verified.
3. Go to Settings > API access.
4. Generate/copy the API key.
5. Store it as `BING_API_KEY`.
6. Set `BING_SITE_URL` to the verified site URL.

## Local Development

```bash
cd analytics-app
cp .env.example .env.local
npm install
npm run dev
```

The frontend will load without credentials, but real data requires the serverless API environment variables.
