# SnapStudio — Sitemap

## Public
- `/` — Studio homepage, packages, portfolio direction and booking call-to-action
- `/packages` — Package list and package details (can be a section on the homepage for v1)
- `/login` — Sign in
- `/signup` — Client registration
- `/book` — Request a session (authenticated client)
- `/auth/callback` — Authentication callback

## Client area (sign-in required)
- `/client` — Client overview and upcoming sessions
- `/client/bookings` — Client's own bookings and statuses
- `/client/gallery/[galleryId]` — Private gallery, favourite selection and selected-photo downloads
- `/client/account` — Profile details

## Photographer area (photographer role required)
- `/studio` — Photographer dashboard
- `/studio/calendar` — Booking calendar and availability
- `/studio/bookings` — Booking requests and session management
- `/studio/packages` — Package management
- `/studio/galleries` — Gallery creation and delivery status
- `/studio/galleries/[galleryId]` — Upload/manage photos and publish gallery

## System routes
- `/api/payments/initialize` — Server-side test payment initialization
- `/api/payments/verify` — Server-side payment verification
- `/api/webhooks/paystack` — Payment provider webhook verification
- `/api/gallery-ready` — Internal gallery-ready notification workflow

## Access rules
- Public pages are accessible without an account.
- Client routes require a signed-in client and must only return that client's records.
- Studio routes require a signed-in photographer role.
- API routes must independently verify the session, role, ownership and payment-provider signature; hiding a page link is not access control.
