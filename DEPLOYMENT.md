# NicholsEquipmentDirect deployment

## 1. Create services
- Create a PostgreSQL database (Neon, Supabase, Railway, or another managed PostgreSQL provider).
- Create a Stripe account and enable the payment methods you intend to accept.
- Create a Vercel project from this repository/ZIP after pushing it to GitHub.

## 2. Configure environment variables
Set all variables in `.env.example` in Vercel:
DATABASE_URL
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ADMIN_EMAIL
ADMIN_PASSWORD_HASH
ADMIN_COOKIE_SECRET
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_SITE_URL

Generate a long random `ADMIN_COOKIE_SECRET`. The password hash in this starter is an HMAC-SHA256 digest using ADMIN_COOKIE_SECRET; generate it with a trusted local script rather than storing the password in source control.

## 3. Database
Run:
npx prisma generate
npx prisma migrate deploy

## 4. Stripe webhook
After deployment, create a Stripe webhook endpoint:
https://YOUR-DOMAIN/api/stripe/webhook
Subscribe to `checkout.session.completed`.
Put the resulting signing secret into `STRIPE_WEBHOOK_SECRET`.

## 5. Domain
Connect your production domain in Vercel and set NEXT_PUBLIC_SITE_URL to that HTTPS domain.

## 6. Before real sales
Have a qualified developer/security reviewer verify authentication, authorization, webhook idempotency, rate limiting, CSRF protections where applicable, audit logging, privacy/terms/refund policies, tax requirements, image storage, email delivery, and wire-transfer verification. Never mark a wire order paid based only on a buyer-supplied receipt.
