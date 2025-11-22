# The Pressure Play - Design Guidelines

## Design Approach
**Reference-Based**: Drawing from Nike Pro's athletic precision, Bloomberg Terminal's data-driven luxury, and premium sports platforms like The Players' Tribune. This is a cinematic, performance-driven single-page experience with aggressive visual hierarchy and bold typography.

## Typography System
**Primary Font**: Inter (via Google Fonts CDN) - sharp, modern, technical
**Display Font**: Bebas Neue or Oswald - for hero headlines and section titles

**Hierarchy**:
- Hero Display: 96px/72px (desktop/mobile), uppercase, tracking: 0.02em
- Section Headers: 64px/48px, uppercase, tight leading (0.9)
- Episode Titles: 32px/24px, medium weight
- Body Copy: 18px/16px, regular weight, line-height: 1.6
- Labels/Meta: 14px, uppercase, tracking: 0.1em

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 24 (e.g., p-4, h-8, mt-16, py-24)

**Container Strategy**:
- Full-bleed sections: w-full
- Content max-width: max-w-7xl
- Narrow content: max-w-4xl

**Grid System**: 
- Desktop: 12-column grid with gap-8
- Tablet: 6-column with gap-6
- Mobile: Single column with px-4

## Page Structure & Sections

### 1. Hero Section (100vh)
Full-viewport cinematic entry with high-resolution sports/business imagery (boardroom meets training facility aesthetic). Image should show intensity - close-up of athletic determination or high-stakes business moment.

**Layout**: Centered vertical stack with:
- Logo/Brand mark (top center, pt-8)
- Massive hero headline (centered, z-10 above image)
- Two-line tagline below headline
- Dual CTA buttons (primary + secondary, inline flex with gap-4)
- Scroll indicator at bottom (animated chevron or text "EXPLORE")

**CTAs**: Blurred glass background (backdrop-blur-md with semi-transparent overlay), rounded corners (rounded-full), generous padding (px-8 py-4)

### 2. Anchor Navigation
Sticky navigation bar that appears on scroll (60px height):
- Horizontal menu with 5-6 anchor links
- Active section indicator (underline or highlight)
- Subscribe CTA on right edge
- Position: sticky top-0 with backdrop-blur effect

### 3. About/Philosophy Section (70vh minimum)
Two-column asymmetric layout (60/40 split on desktop):
- **Left Column**: Large-format philosophy statement, champion mindset quote
- **Right Column**: High-contrast image of hosts or iconic sports moment
- Stack vertically on mobile

### 4. Host Profiles Section
Side-by-side cards (2-column grid):
- Large circular/squared portrait images (500x500px minimum)
- Name in display font
- Bio snippet (4-5 lines)
- Social links row beneath
- Stagger positioning slightly for dynamic feel

### 5. Featured Episodes Showcase
Masonry-style grid (3 columns desktop, 2 tablet, 1 mobile):
- Episode card with:
  - Cover artwork image (16:9 aspect ratio)
  - Episode number + season (small label)
  - Episode title (bold, 24px)
  - Guest name (if applicable)
  - Duration badge
  - Play button overlay on hover
- Featured episode gets 2x width for hero treatment

### 6. Latest Episodes Feed
Horizontal scrolling carousel:
- 4-5 cards visible on desktop
- Snap scroll behavior
- Mini episode cards with artwork, title, date
- "View All Episodes" CTA at end

### 7. Newsletter/Community Section (50vh)
Split layout:
- **Left**: Bold call-to-action copy ("DECODE CHAMPION MINDSETS WEEKLY")
- **Right**: Email capture form (single input + button, inline)
- Full-width background treatment (can be subtle texture/gradient)

### 8. Footer
Four-column layout (stack on mobile):
- Column 1: Brand + tagline
- Column 2: Quick Links (About, Episodes, Contact)
- Column 3: Social Media icons (6-8 platforms)
- Column 4: Legal links + copyright
- Full-width with generous padding (py-16)

## Component Library

**Buttons**:
- Primary: Full bleed background, uppercase text, letter-spacing
- Secondary: Outline style with 2px border
- Icon buttons: 48x48px touch target minimum

**Cards**:
- Sharp corners or minimal rounding (rounded-sm max)
- Strong shadow hierarchy (shadow-xl for elevation)
- Hover: Subtle lift (transform translateY(-4px))

**Typography Elements**:
- Section labels: Uppercase, small size, high letter-spacing
- Pull quotes: 48px size, italic, positioned absolutely over images

**Form Inputs**:
- Minimal borders (1px solid, high contrast)
- Generous padding (py-4 px-6)
- Focus states with strong outline

## Images Inventory

1. **Hero Background**: Cinematic sports-business hybrid - athlete in sharp suit, or intense boardroom moment. High contrast, moody lighting. (1920x1080 minimum)

2. **Host Portraits**: Professional, high-drama headshots. Think GQ editorial style. (800x800px each)

3. **Episode Artwork**: Bold, graphic podcast covers. Consistent template with guest photos. (600x600px)

4. **Section Breaks**: 2-3 atmospheric sports/business scenes for visual rhythm between sections (1200x400px)

## Animations (Strategic Use Only)
- Hero text: Fade-up entrance (0.8s delay)
- Scroll-triggered reveals: Section headers slide-in from left
- Parallax: Subtle on hero background only
- Episode cards: Scale on hover (1.03x)

**Performance**: Limit animations to above-the-fold hero and critical interaction feedback.

## Icons
Use **Heroicons** (via CDN) for UI elements: Play button, social icons, navigation chevrons, external links.