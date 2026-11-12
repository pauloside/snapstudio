# SnapStudio

A photography studio booking and private client-gallery platform.

## Project planning
The project plan and implementation flow are in [docs/](docs/):
- [Project specification](docs/PROJECT-SPEC.md)
- [Sitemap](docs/SITEMAP.md)
- [User flows](docs/USER-FLOW.md)
- [Wireframe outline](docs/WIREFRAMES.md)
- [Style guide](docs/STYLE-GUIDE.md)

## Stack
- Next.js App Router
- React + TypeScript
- Supabase Auth, Postgres and Storage (integration groundwork)
- Custom responsive CSS

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Current implementation status
The public-facing website and interactive front-end preview are implemented. Planning documents, Supabase SQL schema, row-level security policies, and browser/server client helpers are now in the repository.

The live Supabase project is **not connected yet**. Booking submission, authentication flows, private photo storage, payment processing, persistent favourites, and email delivery still require their implementation and project credentials. Sample gallery and photographer workspace records remain illustrative.

See [SETUP.md](SETUP.md) before configuring the backend. Never commit secret keys.
