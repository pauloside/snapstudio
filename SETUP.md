# SnapStudio v1 — setup checklist

## 1. Run the website
1. Install Node.js 20 or newer.
2. Clone this repository.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Run `npm run dev` and open http://localhost:3000.

The public website, package section, booking request preview, sample gallery and photographer workspace are included.

## 2. Connect Supabase
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Add the project URL and anon key to `.env.local`.
4. Add the service-role key only to server-side deployment secrets; never expose it to the browser.
5. Register a photographer account, then promote its profile role to `photographer` using the SQL comment at the bottom of the schema.
6. Create a private Storage bucket for client galleries and add owner/photographer-only storage policies before uploading client photographs.

## 3. Payments and email
- Use Paystack test keys only while testing. Verify payment status on the server using Paystack's transaction verification API before marking a deposit successful.
- Do not trust a browser redirect as proof of payment.
- Configure Resend with a verified sending domain before sending booking and gallery-ready emails.
- Keep all secret keys in Vercel environment variables.

## 4. Before accepting real bookings
- Confirm studio name, physical location, contact details, package prices and deposit percentages.
- Connect the booking form to a server action/API route and persist requests in Supabase.
- Add date/time availability checks to prevent overlapping sessions.
- Add authenticated client and photographer routes.
- Create signed, expiring download links for each client's private gallery.
- Test row-level security with two different client accounts and a photographer account.

## Preview honesty
The sample gallery and studio workspace use illustrative records. The booking form currently demonstrates the client-side flow only. Do not use this preview to collect real customer information or payments until the integrations and security checks above are complete.
