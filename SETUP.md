# SnapStudio — setup checklist

## 1. Run the website
1. Install Node.js 20 or newer.
2. Clone this repository.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Run `npm run dev` and open http://localhost:3000.

The public website, package section, booking request preview, sample gallery and photographer workspace are included.

## 2. Create and connect Supabase
1. Create a Supabase project at https://supabase.com/dashboard.
2. In Project Settings → API, copy the Project URL and the publishable key (or legacy anon key).
3. Put them in your local `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. In the Supabase SQL Editor, run `supabase/schema.sql` once on the new, empty project.
5. Restart the Next.js development server after changing environment variables.

The app includes browser and server Supabase client helpers in `lib/supabase/`. The helpers read the public project URL/key and fail with a clear message if they are not configured.

### Photographer role
New registrations are assigned the `client` role by the database trigger. After you register the photographer account, use the Supabase SQL Editor to promote only that account:

```sql
update public.profiles
set role = 'photographer'
where id = '<AUTH_USER_UUID>';
```

Do not add a photographer-role selector to public signup. The schema revokes client permission to update the role column.

### Private photo storage
Storage is not configured yet. Before uploading customer photographs:
- Create a bucket named `client-galleries` and keep it **private**.
- Add Storage policies that check the authenticated user against the gallery/client ownership record.
- Serve previews and downloads through short-lived signed URLs.
- Do not make client photographs publicly readable.

## 3. Payments and email
- Use Paystack test keys only while testing. Verify payment status on the server using Paystack's transaction verification API before marking a deposit successful.
- Do not trust a browser redirect as proof of payment.
- Configure Resend with a verified sending domain before sending booking and gallery-ready emails.
- Keep secret keys in Vercel environment variables; never commit them to GitHub.

## 4. Before accepting real bookings
- Confirm studio name, physical location, contact details, package prices and deposit percentages.
- Connect the booking form to a server action/API route and persist requests in Supabase.
- Add date/time availability checks to prevent overlapping sessions.
- Implement authenticated client and photographer routes.
- Create signed, expiring download links for each client's private gallery.
- Test row-level security with two different client accounts and a photographer account.

## Preview honesty
The sample gallery and studio workspace use illustrative records. The booking form currently demonstrates the client-side flow only. The Supabase project is not connected until you provide its URL/key in your deployment environment and run the SQL schema. Do not use this preview to collect real customer information or payments until the integrations and security checks above are complete.
