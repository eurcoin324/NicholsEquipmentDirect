# NicholsEquipmentDirect

Starter single-vendor equipment e-commerce application.

## Stack
Next.js + TypeScript + PostgreSQL/Prisma + Stripe Checkout.

## Local setup
1. Install Node.js 20+.
2. `npm install`
3. Copy `.env.example` to `.env` and fill in PostgreSQL and Stripe values.
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `npm run dev`

## Production
Deploy the Next.js app to Vercel (or another Node-compatible host), attach managed PostgreSQL, configure environment variables, and run migrations during deployment.

## Important before taking real orders
The `/admin` routes are intentionally a starter scaffold. Add real authentication/authorization (for example, an enterprise identity provider or a vetted auth library), server-side authorization on every admin mutation, rate limiting, audit logging, image storage, email notifications, Stripe webhook verification, and legal/fulfillment policies before production launch.

Never place Stripe secret keys or database credentials in client-side code.
