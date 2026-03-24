# Hidden Pages — Pre-Launch Mode

These pages and components are fully built but hidden from navigation and routing
until the podcast has live content. Re-enable them when Episode 1 launches.

## Hidden Routes

| Route | Page File | Why Hidden |
|-------|-----------|------------|
| `/episodes` | `client/src/pages/episodes.tsx` | Empty episode grid — no content to show yet |
| `/inner-circle` | `client/src/pages/inner-circle.tsx` | Premium membership waitlist — re-enable when payment is wired up |
| `/newsletter` | `client/src/pages/newsletter.tsx` | Newsletter management — hero email capture handles this for now |
| `/apply` | `client/src/pages/guest-application.tsx` | Guest application form — re-enable when actively booking guests |

## Hidden Home Page Sections

| Component | File | Why Hidden |
|-----------|------|------------|
| `LatestEpisodeSection` | `client/src/components/latest-episode-section.tsx` | Teases Episode 1 with no playable content — re-enable when episode is live |

## Hidden Nav Links

| Link | Removed From |
|------|-------------|
| "Episodes" | Header nav (`site-header.tsx`) and footer nav (`site-footer.tsx`) |

## How to Re-Enable

### When Episode 1 drops:
1. **App.tsx** — Add back the route imports and `<Route>` entries for `/episodes` and `/apply`
2. **site-header.tsx** — Add `{ name: "Episodes", href: "/episodes" }` back to `simpleNavigation`
3. **site-footer.tsx** — Add Episodes link back to the navigation list
4. **home.tsx** — Import and add `<LatestEpisodeSection />` between `<ContentPillarsSection />` and `<GuestSpotlightSection />`

### When membership launches:
1. **App.tsx** — Add back `/inner-circle` route
2. Wire up Stripe or payment processor to the subscribe buttons
3. Optionally add "Inner Circle" to the nav

### When actively booking guests:
1. **App.tsx** — Add back `/apply` route
2. **contact.tsx** — The "Apply to Be a Guest" sidebar card already links to `/apply`

## Components Still Available (not deleted)
All page files and components remain in the codebase — nothing was deleted.
The VibeShifter component (`client/src/components/vibe-shifter.tsx`) was removed from
home.tsx in a previous cleanup and is not recommended for re-use.
