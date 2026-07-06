# CitiRide Waitlist

Next.js frontend plus a Node/Express backend for collecting CitiRide driver and rider waitlist signups in Supabase.

## Stack

- Next.js App Router
- React and TypeScript
- Node.js with Express
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

4. Create the database tables by running `supabase/schema.sql` in the Supabase SQL editor.

5. Start the frontend and backend together:

```bash
npm run dev
```

The web app runs on `http://localhost:3000` and the API runs on `http://localhost:4000`.

## Assets

Drop your images in `public/assets`. The expected filenames are listed in `public/assets/README.md`, so you can replace visuals without changing component code.

## Waitlist Flow

Every `Join The Waitlist` button opens a Driver/Rider dropdown. Choosing Driver scrolls to the driver waitlist form, and choosing Rider scrolls to the rider waitlist form.

The backend stores:

- Full name
- State / City
- Email address
- Category: `Driver` or `Rider`

## Newsletter Flow

The `Stay in the Loop` form stores newsletter subscription emails in the `newsletter_subscribers` Supabase table by default. Override the table with `SUPABASE_NEWSLETTER_TABLE` when needed.

## Useful Scripts

```bash
npm run dev          # start Next.js and Express together
npm run dev:web      # start only the frontend
npm run dev:api      # start only the backend
npm run typecheck    # TypeScript check
npm run build        # production frontend build
npm run check        # typecheck and build
```

## API

### `POST /api/waitlist`

```json
{
  "fullName": "Ada Lovelace",
  "stateCity": "Lagos",
  "email": "ada@example.com",
  "category": "Rider"
}
```

### `POST /api/newsletter`

```json
{
  "email": "ada@example.com"
}
```

The backend uses the Supabase service role key. Keep it in `.env.local` only and do not expose it in browser code.