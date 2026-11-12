# SnapStudio — Wireframe Outline

These are structural wireframes, not final pixel-perfect designs. They describe the key screens that must be implemented and tested.

## Public homepage
```text
[SnapStudio logo] [Packages] [Experience] [Portfolio] [Sign in] [Book]
----------------------------------------------------------------------
[Editorial headline + short introduction]       [Hero photograph]
[Primary: Book a session] [Secondary: View portfolio]
----------------------------------------------------------------------
[Trust/service points]
[Package card] [Package card] [Package card]
----------------------------------------------------------------------
[Studio experience / how it works]
[Portfolio image grid]
----------------------------------------------------------------------
[Booking call-to-action + enquiry form]
[Footer: contact, navigation, policies]
```

## Client booking
```text
[Header + client navigation]
[Choose package]
[Preferred date] [Available time]
[Session location / notes]
[Price summary] [Deposit due]
[Submit booking] → [Test payment checkout]
[Confirmation and booking reference]
```

## Client dashboard
```text
[Header] [My bookings] [My galleries] [Account] [Sign out]
[Next session summary] [Booking status]
[Gallery cards: Preparing / Ready]
```

## Private gallery
```text
[Client name + session title] [Gallery status]
[Photo grid]
[Each photo: preview + Favourite toggle]
[Selected count] [Download selected photos]
```

## Photographer workspace
```text
[Studio navigation: Overview | Calendar | Bookings | Packages | Galleries]
[Today's sessions] [Pending requests] [Galleries to deliver]
[Calendar / upcoming booking list]
[Booking row: client | package | date | status | action]
```

## Gallery management
```text
[Select completed session]
[Create/open private gallery]
[Upload photos] [Reorder] [Captions]
[Preview client view]
[Mark gallery ready] → [Send gallery-ready email]
```

## Login and registration
```text
[SnapStudio brand]
[Email] [Password]
[Sign in]
[Create client account] [Forgot password]
[Clear error / success feedback]
```

## Responsive behaviour
- Desktop: multi-column package and photo grids; persistent studio navigation.
- Mobile: stacked forms/cards, collapsible navigation, touch-sized photo actions.
- Tables and calendars must remain usable on narrow screens; provide a list view where a full calendar grid is too wide.
