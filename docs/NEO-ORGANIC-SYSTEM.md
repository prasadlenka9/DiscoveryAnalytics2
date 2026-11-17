# Discovery Analytics — Neo-Organic Intelligence

## Audit and content map

The existing React application provides six independently routed views, a shared header/footer, an inquiry form, mobile navigation, a welcome-video dialog, E2 product disclosures, and solution jump links. The full content audit is reflected in the rebuilt views:

| Route | Content and page-specific layout | Interaction |
|---|---|---|
| `/` | Business introduction, perspective, eight capability cards, four-step delivery approach, E2 Time Tracker/E-Recruit/E-Invoice, four principles, collaboration and values, team role labels, client feedback, contact form | Video dialog with Escape/backdrop close, capability links, accordions, contact form |
| `/about` | Company overview, product development/support, printing outsourcing and staffing, business context, values, expertise and partnership | Shared navigation, email/contact calls to action |
| `/services` | Six business/service areas from source content, service-specific summaries/bullets, IT consulting and staffing, delivery process | Inquiry email links, career and contact routes |
| `/solutions` | Six solution areas and their steps/items, E2 Time Tracker, E-Recruit and E-Invoice workflow topics, delivery approach | Section index anchors, E2 disclosures, inquiry links |
| `/careers` | Source site's four published role notices with dates, locations, wages/requirements where supplied, caveats for expired/unclear notices, employer-access contact | Expandable job details, email application/inquiry links |
| `/contact` | Business inquiry topics, email, both published phone numbers, Alpharetta address, inquiry form, contact guidance | Required form validation and mail-app draft, `mailto:`/`tel:` links |

The crawl exposed discrepancies and stale data in the source (including conflicting location statements and dated job posts). The redesigned copy keeps contact information from the source contact page and labels dated roles as archived/unconfirmed rather than implying vacancies are active. No new business metrics or product capabilities are presented as facts.

## Visual system

- **Theme:** Neo-Organic Intelligence: editorial layouts with sculptural technology imagery, overlapping shapes and generous warm negative space.
- **Palette:** warm ivory `#F5F0E6`, cobalt `#3155E7`, orange `#FF6B35`, charcoal `#252326`, electric violet `#8958E8`, paper `#FFFDF8`.
- **Typography:** Manrope for UI and editorial sans, italic Georgia for contrast, compact mono labels for data/context.
- **Brand:** preserve the source Discovery Analytics logo asset and its original proportions.
- **Artwork:** six original page-specific generative sculptures live in `public/images/neo-organic/`; layouts place a distinct image in each page hero/context.

## Responsive and motion behavior

The CSS defines separate desktop, tablet (at 1000px and below), and mobile (700px and below) arrangements. Mobile switches split hero/editorial/service layouts to stacked compositions, exposes the menu control, expands card grids and keeps form controls full-width. The requested target widths are 1440px, 834px and 390px.

Framer Motion handles route transitions. GSAP/ScrollTrigger handles heading entrance, section reveals, count-up statistics, hero parallax and subtle pointer response. The Three.js hero sculpture is a compact decorative scene with capped rendering, viewport suspension, resize handling, disposal and reduced-motion support. CSS animations and route effects honor `prefers-reduced-motion`; native buttons, links, details/summary, labels and visible keyboard focus preserve accessibility.

## Verification

Run `npm install` and `npm run build`. Direct routes are configured for React Router; Vite preview/dev server provide history fallback for local route checks. Visual QA should use exact target viewport sizes and check image loading, horizontal overflow, the menu, dialog close behavior, anchor jumps, E2 details and form validation.
