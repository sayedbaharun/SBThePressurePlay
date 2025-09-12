# Hidden Pages

This file tracks pages that are currently hidden from public access on The Pressure Play website.

## Currently Hidden Pages

### Episodes & Media
- `/episodes` - Episodes listing page (redirects to /newsletter)
- `/episodes/:slug` - Individual episode detail pages (redirects to /newsletter)
- `/watch` - Watch episodes page (redirects to /newsletter)
- `/listen` - Listen to episodes page (redirects to /newsletter)

### Guests
- `/guests` - Guest listing page (redirects to /newsletter)
- `/guests/:slug` - Individual guest detail pages (redirects to /newsletter)

### Events
- `/events` - Live events page (redirects to /newsletter)

### Content Pages (Launch-Day Light)
- `/playbook` - Pressure Principles/Playbook page (redirects to /newsletter)
- `/partners` - Partnership page (redirects to /newsletter)  
- `/press` - Press/Media page (redirects to /newsletter)

## Reason for Hiding
These pages are temporarily hidden while the platform focuses on newsletter acquisition and building the audience before launching episode content.

## Navigation Changes
- Removed episode links from hero section
- Removed guest links from navigation dropdowns
- Removed events links from navigation dropdowns
- Simplified navigation to remove ALL dropdowns - now just: About | Newsletter | Contact
- Removed episode and guest links from footer
- All hidden routes redirect to `/newsletter` to maintain user acquisition flow

## Components Still Available (but not linked)
The following components exist in the codebase but are not accessible via navigation:
- `EpisodeCard`
- `LatestEpisode` 
- `RecentEpisodes`
- `GuestCard`
- `WaveformPlayer`
- `AudioPlayer` (removed from global render)

These can be re-enabled by restoring navigation links and routes when content is ready.