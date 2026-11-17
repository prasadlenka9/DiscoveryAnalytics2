# Discovery Analytics redesign audit and design plan

## Scope and sources

- Target workspace: `D:\ABHI\DA2`.
- Implementation source: the existing `D:\ABHI\Discovery analytics` React app, including its six route components and local artwork.
- Reference: `https://danalyticsinc.com/Home/Index`, plus the reference Careers page. The reference site's About, Services, Solutions and Contact links resolve back to the homepage in the web crawl, so those subjects were audited in the homepage sections and footer links rather than treated as separate source pages.
- The reference homepage crawl exposes the complete source content: intro and value statements, company overview/vision/culture, diversity statement, six service categories, testimonial, six solution areas including E2, team cards, contact details/form and footer navigation. The reference Careers crawl exposes four job notices and employer login copy.

## Existing React app audit

### Routes and shared shell

`src/main.tsx` uses React 19, TypeScript, Vite, Tailwind CSS v4 and React Router. It defines `/`, `/about`, `/services`, `/solutions`, `/careers` and `/contact`, with an unknown-route redirect to `/`. `Site.tsx` supplies one shared header, footer, metadata frame, CTA, editorial labels, and motion behavior. The original DA wordmark and favicon are in `public/images/discovery/brand/`.

The shell already supports a responsive navigation menu, scroll-to-top on route changes, page metadata/canonical/social tags, reduced-motion styling, keyboard-dismissable video dialog, and shared email/contact links.

### Page and section inventory

| Route | Existing page content and sections | Existing interaction |
|---|---|---|
| Home `/` | Signal-map hero; company perspective; eight connected capabilities; four-step Discover/Design/Deliver/Evolve process; E2 Time Tracker, E-Recruit and E-Invoice; four operating principles; people/collaboration and equity values; source team roles and anonymous client-feedback summary; contact feature and inquiry form. | React Router CTAs, video modal with Escape/backdrop close, in-page jump, E2 disclosures, inquiry form, email and phone links. |
| About `/about` | Image-led hero; product development/support, printing outsourcing and staffing overview; four vision values; culture/inclusion and collaboration image; six specialist training subjects; partnership CTA. | Service, career and contact navigation; email CTA. |
| Services `/services` | Three-part hero; six cards for Business, E-Business, Health Care, Maintenance services, ERP Solutions and Animation; IT consulting and staffing; four-step delivery process; partnership CTA. | Each service opens a prefilled email; careers and contact navigation. |
| Solutions `/solutions` | Solutions hero and area index; Application Development, Business Continuity, Networking, Large Scale Enterprise Class Storage Solutions and Systems Management; E2 Time Tracker, E-Recruit and E-Invoice; delivery process and inquiry CTA. | Anchor links to each solution, mailto links, native E2 disclosure elements. |
| Careers `/careers` | Careers hero and culture copy; four source job notices, retained with publication/end dates and an availability caveat; recruiting contact and employer access content. | Apply links open an email draft to HR; direct HR email and employer access links. |
| Contact `/contact` | Contact hero and inquiry topics; direct email, two phone numbers and Alpharetta mailing address; inquiry form; stay-connected/location panel and career link. | Native required/email validation; valid submit opens a prefilled mail draft and changes the panel to an email-draft confirmation. |

### Asset inventory

- Brand: `brand/dalogo.png`, `brand/Fav.png`.
- Home: eight capability illustrations, principle/workflow symbols, connection diagrams, grid/orbit assets, and original generated alignment artwork.
- About/careers: collaboration and culture images, monogram variants.
- Services: six service icons; route-specific monogram variants.
- Solutions: generated infrastructure artwork; route-specific monogram variants.
- Contact: route-specific monogram variants.

All image files under `public/images/discovery/` were carried into DA2. The redesigned pages use distinct local artwork for the hero, about/culture, capabilities, services and solutions rather than repeating a stock image.

### Source-content cautions

- The reference homepage describes the company location as Minneapolis in one section, while its contact section and Careers listings identify Alpharetta, Georgia. The redesign uses the explicit contact/mailing address for contact and career actions and does not repeat the conflicting location claim.
- The reference Careers page has three notices with 2025 dates and one undated Mainframe Developer listing. The 10/27/2025 notice gives an end date of 11/26/2205. That value is retained as published and flagged as a likely source typo. Current listing availability is unknown, so the interface asks visitors to verify with HR.
- The reference team cards use the generic name “Name”; no person names or biographies were invented.
- The reference contact form lists fields but does not document a delivery backend. The React implementation uses the existing mailto draft behavior rather than claiming server delivery.

## Redesign plan and design system

### Visual direction

Build a premium technology editorial system around the existing DA identity: deep navy `#101828`, brighter navy `#172437`, signal teal `#00D6C9`, warm paper `#F7F8FA`, clear ink `#101828`, restrained lavender/mint capability surfaces, and amber as a minor signal accent. Keep the supplied logo image unchanged and on a light backing in the dark fixed header. Use Manrope for readable display/body type and IBM Plex Mono for compact system labels.

Use wide, asymmetric grids, large tightly tracked headlines, dark immersive hero fields, technical linework, original geometric/data illustrations, small metadata labels, and deliberate light/dark section changes. Each route gets its own story and artwork while shared components maintain visual continuity.

### Responsive layout targets

- Desktop target: 1440px viewport, 64px page gutters, two-column editorial/hero compositions and multi-column capability grids.
- Tablet target: 834px viewport, compact navigation, reduced gutters and adjusted multi-column layouts.
- Mobile target: 390px viewport, single-column story flow, full-width touch targets, stacked forms/cards and compact signal artwork.

These are three intended review sizes for the responsive implementation, not separate route copies. CSS media rules preserve fluid behavior between them. The current layout rules transition at 1100/1000/700px and use fluid font sizing for intermediate widths.

### Shared components and behavior

- Shared brand header/footer, React Router navigation, page metadata, editorial eyebrow, buttons, split heroes, process timeline, partnership CTA, job cards and contact form.
- GSAP and ScrollTrigger: short route-entry motion and one-time, viewport-triggered section/card reveals.
- CSS data artwork: layered animated connection/orbit illustration, capability drift and signal pulses.
- Reduced-motion preference: GSAP motion is skipped and CSS animations/transitions are disabled by the existing accessibility overrides.
- Interaction requirements: keyboard-accessible links/buttons; native `<details>` disclosure behavior; Escape/backdrop video close; standard form validation; mailto/tel actions retained.

## Verification plan

1. Build the TypeScript/Vite app.
2. Run the local Vite server and visit all six routes directly and through navigation.
3. Verify assets resolve, mobile/tablet menu behavior, solution anchors, E2 disclosures, video dialog, form validation and generated mailto payload.
4. Review desktop 1440px, tablet 834px and mobile 390px screenshots for each route (18 page/viewport combinations) and refine overflow, spacing and image crops.

## Verification results

- `npm run build` passes TypeScript and production bundling. Vite reports only React Router's non-blocking module-level `use client` directive warnings.
- Visited all six routes in headless Chrome at CSS viewport sizes 1440 x 1000, 834 x 1000 and 390 x 844; captured all 18 viewports and reviewed the page compositions. All routes report no document-width overflow, and all local `<img>` assets loaded.
- Interaction checks passed for video open/Escape close, mobile-menu open, solution-area anchor navigation, E2 disclosure expansion and required contact-form validation.
- Reduced-motion emulation leaves the site fully visible, removes the orbit animation and skips the GSAP entrance/reveal effects.
- Careers shows only the four notices present on the reference page. Expired and unconfirmed notices are labeled accordingly; no new openings, wages, names or availability were introduced.
- Screenshot captures were kept in the system temporary directory rather than added to the application bundle.

