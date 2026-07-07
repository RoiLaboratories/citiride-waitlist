# CitiRide Waitlist

Next.js App Router app for collecting CitiRide driver/rider waitlist signups and newsletter subscriptions in Supabase.

## Stack

- Next.js App Router
- React and TypeScript
- Next.js API route handlers
- Supabase JavaScript client
- Zod request validation

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Add your Supabase values to `.env.local`.

4. Create the database tables and policies by running `supabase/schema.sql` in the Supabase SQL editor.

5. Start the app:

```bash
npm run dev
```

The web app and API routes run together on `http://localhost:3000`.

## Assets

Drop your images in `public/assets`. The expected filenames are listed in `public/assets/README.md`, so you can replace visuals without changing component code.

## Waitlist Flow

Every `Join The Waitlist` button opens a Driver/Rider dropdown. Choosing Driver scrolls to the driver waitlist form, and choosing Rider scrolls to the rider waitlist form.

The API stores:

- Full name
- State / City
- Email address
- Category: `Driver` or `Rider`

Each email address can join only one waitlist category. If an email is already registered as a driver, it cannot be reused for the rider waitlist, and vice versa.

For a fresh Supabase project, run `supabase/schema.sql`. For an existing Supabase project that already has the waitlist tables, run only `supabase/migrations/20260707000000_waitlist_email_unique.sql` to update the email uniqueness rule without deleting tables.

## Newsletter Flow

The `Stay in the Loop` form stores newsletter subscription emails in the `newsletter_subscribers` Supabase table by default. Override the table with `SUPABASE_NEWSLETTER_TABLE` when needed.

## Useful Scripts

```bash
npm run dev          # start the Next.js app and API routes
npm run typecheck    # TypeScript check
npm run lint         # ESLint check
npm run build        # production build
npm run check        # typecheck and build
```

## API Routes

### `POST /api/waitlist`

```json
{
  "fullName": "Ada Lovelace",
  "stateCity": "Lagos",
  "email": "ada@example.com",
  "category": "Rider"
}
```

Returns `409` if the email address already exists in either waitlist category.

### `POST /api/newsletter`

```json
{
  "email": "ada@example.com"
}
```

### `GET /api/health`

Returns a small health payload for checking the deployed API.

## Vercel Deployment

Deploy this repository as a single Vercel project. The frontend and backend API routes deploy together.

Add these environment variables in Vercel Project Settings:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_WAITLIST_TABLE` if you use a non-default table name
- `SUPABASE_NEWSLETTER_TABLE` if you use a non-default table name

The API uses the Supabase service role key server-side only. Keep it in `.env.local` and Vercel environment variables; never expose it in browser code.