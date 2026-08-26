# The Provider System Website

Public website for The Provider System: websites and lead systems for West Texas service businesses.

## Local development

```bash
npm install
npm run dev
```

## Release checks

```bash
npm run lint
npm run build
```

The production build regenerates the sitemap, builds the Vite app, and prerenders every canonical route.

## Runtime configuration

The public contact form is served by `api/contact.js`. Configure server secrets in the deployment project; never commit them.

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (optional override; defaults to `The Provider System <notifications@theprovidersystem.com>`)
- `CONTACT_NOTIFICATION_EMAIL` (optional override; defaults to `theprovidersystem@gmail.com`)

Public analytics is optional and only loads when this build-time variable is configured:

- `VITE_GA_MEASUREMENT_ID`

The private Search Console/Bing reporting app lives in `analytics-app/` and deploys as a separate Vercel project.
