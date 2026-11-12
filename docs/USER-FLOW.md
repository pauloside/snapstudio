# SnapStudio — User Flows

## Client booking and deposit
1. Client opens the public homepage.
2. Client compares packages and chooses one.
3. Client registers or signs in.
4. Client selects a preferred date/time and submits session details.
5. Server validates the input and checks availability.
6. Booking is saved with a pending/requested status.
7. Client starts a Paystack test-mode deposit.
8. Server verifies the transaction with Paystack.
9. Only after verified success is the payment marked successful and the booking updated.
10. Client sees the booking status in their account.

## Photographer booking management
1. Photographer signs in.
2. Server checks that the user's profile role is `photographer`.
3. Photographer opens the booking list/calendar.
4. Photographer reviews the requested date, package and client notes.
5. Photographer confirms, reschedules or declines the request.
6. The session status and calendar view update from database records.

## Gallery delivery and client favourites
1. Photographer opens a completed session.
2. Photographer creates its gallery and uploads photographs to private storage.
3. Photographer marks the gallery ready.
4. System sends the gallery-ready email to the client.
5. Client follows the private gallery link and signs in.
6. Client views only the photos in their own gallery.
7. Client toggles favourite status on selected photos.
8. Client downloads selected photos using short-lived signed links.
9. Photographer can review the client's favourites.

## Failure and security paths
- If the requested time is unavailable, show a clear message and ask the client to choose another time.
- If payment verification fails or is pending, do not mark the booking as paid.
- If a client requests another client's gallery URL, deny access.
- If a client opens a photographer route, deny access.
- If a session expires, ask the user to sign in again.
- If gallery email delivery fails, retain the gallery as ready and log/retry the notification; do not expose private photos in a public URL.
