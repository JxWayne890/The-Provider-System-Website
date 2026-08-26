# The Provider System — West Texas Relaunch Blueprint

## Client

- Name: The Provider System
- Primary contact: John W Johnson
- Industry: Website, lead-system, CRM, automation, and custom software services
- Primary market: West Texas service businesses
- Priority regions: San Angelo and the Concho Valley; Abilene and the Big Country; Midland–Odessa and the Permian Basin; Lubbock and the South Plains
- Public website: https://theprovidersystem.com/
- Public phone: (325) 249-5191
- Public email: theprovidersystem@gmail.com
- Delivery model: San Angelo–anchored, founder-led, remote delivery; no invented offices

## Purchased Scope

- Reposition the public site around “Websites and lead systems for West Texas service businesses.”
- Make websites and local visibility the primary entry offer.
- Present CRM, lead routing, follow-up, automation, practical AI, and custom systems as connected expansion capabilities.
- Rewrite the homepage, service hierarchy, West Texas hub, and four regional pages.
- Improve navigation, calls to action, click-to-call access, project proof, and inquiry flow.
- Harden the website contact form and internal email notification path.
- Add public-site analytics and conversion events while preserving the existing private Search Console/Bing analytics app.
- Align website entity data with the Google Business Profile.
- Preserve working URLs or add permanent redirects.
- Deploy, smoke-test, and complete launch QA.

## Out of Scope

- New CRM or Supabase database
- Booking system
- Voice AI or telephony setup
- SMS campaigns
- Paid advertising
- Bulk lead scraping or outbound campaigns
- Dozens of city-by-service pages
- Invented testimonials, rankings, revenue claims, offices, certifications, or service coverage

## Public Website

- Framework: React 19, Vite, React Router, Tailwind CSS
- Hosting target: existing Vercel production site
- Core routes:
  - Home
  - Services and primary service pages
  - West Texas hub
  - San Angelo / Concho Valley
  - Abilene / Big Country
  - Midland–Odessa / Permian Basin
  - Lubbock / South Plains
  - Work and case studies
  - About
  - Process
  - FAQ
  - Start / contact
- Primary CTA: Request a website and lead-flow review
- Secondary CTA: Call (325) 249-5191

## Lead Form

- Form id: website-lead-flow-review
- Source page: `/start` and embedded contact sections
- Destination: internal email notification through the existing Vercel API route
- Recipient: theprovidersystem@gmail.com
- Required fields: name, email, phone, priority, message
- Attribution: page, referrer, UTM source, medium, campaign, term, and content when present
- Safety: server validation, size limits, honeypot, basic rate limiting, safe error responses
- States: idle, sending, success, error

## Integrations

- Google Business Profile: existing and managed by theprovidersystem@gmail.com
- Google Search Console: existing verification file and private analytics app integration
- Bing Webmaster Tools: existing verification and private analytics app integration
- Public conversion analytics: configurable GA measurement id; no hard-coded account id
- Resend: existing website API integration; verified sender/domain status to confirm

## Deployment and Accounts

- GitHub: JxWayne890/The-Provider-System-Website
- Default branch: main
- Production domain: theprovidersystem.com
- Public deployment project/account: needs verification before push/deploy
- Analytics deployment: existing `provider-system-analytics` Vercel project
- Secrets to verify by name only:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `CONTACT_NOTIFICATION_EMAIL`
  - `VITE_GA_MEASUREMENT_ID`

## QA Gates

- Production build and prerender pass
- Lint passes or all remaining warnings are documented
- Unique titles, descriptions, H1s, canonicals, and structured data
- Sitemap, robots, redirects, and 404 behavior verified
- Desktop and mobile navigation and layouts verified
- Phone and CTA links verified
- Local and production form validation, success, error, attribution, and notification verified
- Analytics events visible when a measurement id is configured
- Google Business Profile and website business facts match
- Temporary production test submissions removed where a durable store exists

## Open Questions / External Checks

- Confirm which Vercel account/project owns the public production deployment.
- Confirm whether `theprovidersystem.com` is already verified as a Resend sending domain.
- Confirm the intended domain sender address and whether the public phone should receive calls from every page.
- Confirm the available Google Business Profile primary categories before changing the current category.
