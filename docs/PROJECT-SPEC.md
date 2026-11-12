# SnapStudio — Project Specification

## Project summary
SnapStudio is a photography studio booking and client-gallery platform. It addresses two problems identified in the Module 06 brief: booking chaos and clients waiting weeks for photographs.

## Users
- **Client:** views packages, requests a session, pays a deposit in test mode, opens their private gallery, selects favourite photographs and downloads selected images.
- **Photographer:** manages packages, reviews and schedules sessions, records deposits, uploads client photographs and marks galleries ready for delivery.

## Core requirements
1. Display photography packages and their prices.
2. Let a client request a session and pay a deposit through a test-mode payment provider.
3. Provide a private online gallery for each client.
4. Let clients select favourite photographs and download selected images.
5. Provide the photographer with a bookings calendar.
6. Send an email when a gallery is ready.

## Data to store
- `profiles`: user identity and role.
- `packages`: package details, full price and deposit.
- `sessions`: client, selected package, requested date/time, notes and booking status.
- `galleries`: session/client relationship and delivery status.
- `photos`: private storage path and gallery relationship.
- `photo_favorites`: the client's selected favourite photos.
- `payments`: deposit amount, provider reference and verified payment status.

## Main user journeys
- Client: browse packages → register/sign in → request a session → complete test deposit → see booking status → open private gallery when ready → favourite and download photos.
- Photographer: sign in → review booking requests → confirm a session → manage calendar → upload photographs → publish gallery → trigger gallery-ready email.

## Security and payment rules
- Client records and galleries must be scoped to the signed-in client.
- Photographer tools must require an authenticated photographer role.
- Gallery files must be stored privately; downloads should use short-lived signed URLs.
- Payment success must be verified server-side with the payment provider before a session is marked paid/confirmed.
- Only test credentials and test cards may be used for this project.
- Never expose a Supabase service-role key or payment secret key in browser code.

## Success criteria
- A client can complete the booking journey without staff manually entering the request.
- A client cannot view another client's booking, gallery or photographs.
- A photographer can manage sessions and deliver galleries.
- The client can save favourites and download selected photos.
- A verified test deposit is recorded and a gallery-ready email can be delivered.
- The deployed preview builds successfully and access restrictions are demonstrated with test accounts.

## Decisions still requiring the studio owner
The project guide does not supply an actual studio name/address, contact details, confirmed package prices or deposit percentages. Current package amounts are illustrative preview content only. Confirm these details before presenting the site as a real operating studio.
