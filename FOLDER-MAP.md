# Folder Map — Where to Change What

A guide to this project written for someone who is 10 years old.

Think of the website as a **stack of rooms**. Each room has its own file. You
change a room by opening its file and editing it. Nothing else gets touched.

---

## 1. The map

```
psychologist/
│
├── src/
│   ├── app/                        ← the address book (URLs live here)
│   │   ├── layout.tsx              ← the frame: fonts, colors, SEO, skip link
│   │   ├── page.tsx                ← the seating plan: which rooms, in what order
│   │   ├── globals.css             ← the paint cabinet: ALL colors & styles
│   │   └── api/
│   │       └── lead/route.ts       ← the mailbox: forwards enquiries to Make.com
│   │
│   ├── components/
│   │   ├── site/                   ← YOUR rooms (one file per section)
│   │   │   ├── header.tsx                  top bar + navigation + mobile menu
│   │   │   ├── hero.tsx                    the big first screen
│   │   │   ├── hero-visual.tsx             the picture (drawn in code)
│   │   │   ├── pathways-section.tsx        the 4 clickable tabs
│   │   │   ├── philosophy-section.tsx      Understand / Connect / Grow
│   │   │   ├── services-section.tsx        all the service cards
│   │   │   ├── corporate-section.tsx       B2B + pricing tiers + schools
│   │   │   ├── testimonials-section.tsx    the sliding quotes
│   │   │   ├── consultation-form.tsx       the multi-step form
│   │   │   ├── faq-section.tsx             questions that open and close
│   │   │   ├── footer.tsx                  bottom of page + emergency notice
│   │   │   ├── logo.tsx                    the Manmitra symbol
│   │   │   ├── button.tsx                  button styles
│   │   │   ├── section-heading.tsx         the big heading + small label
│   │   │   └── layout-primitives.tsx       boxes that hold sections together
│   │
│   │   └── ui/                     ← BORROWED toolbox (don't hand-edit)
│   │       └── accordion, tabs, select, carousel, sheet, input…
│   │
│   ├── content/                    ← all the WORDS, kept away from the code
│   │   ├── site-content.ts                  services, pricing, FAQs, testimonials
│   │   ├── pathways.ts                      the 4 tab names + their content
│   │   └── form-options.ts                  the form's dropdown choices
│   │
│   └── lib/
│       ├── site-config.ts                   name, phone, address, hours
│       └── utils.ts                         tiny helper
│
├── scripts/                        ← my testing tools (Edge screenshots)
├── .env.local.example             ← copy this to .env.local and fill it in
└── package.json                    ← the list of commands you can type
```

---

## 2. "I want to change ___" → open this file

This is the part you'll use most. Scroll to the thing you want.

### Contact details & the clinic

| I want to change… | Open | Look for |
|---|---|---|
| Phone number | `src/lib/site-config.ts` | `contact:` → `phone` and `phoneHref` |
| Email address | `src/lib/site-config.ts` | `contact:` → `email` and `emailHref` |
| Clinic address | `src/lib/site-config.ts` | `clinic:` |
| Opening hours | `src/lib/site-config.ts` | `hours:` |
| Website name | `src/lib/site-config.ts` | `name:` |
| "RCI Registered Psychologist · Clinic & Online" | `src/lib/site-config.ts` | `credentials:` |
| The website address used for SEO | `src/lib/site-config.ts` | `url:` |

> Both `phone` and `phoneHref` need changing. One is what people read, the other
> is what the phone dials.

### The top bar and navigation

| I want to change… | Open | Look for |
|---|---|---|
| The menu links (Pathways, Services…) | `src/lib/site-config.ts` | `navLinks:` |
| The small text in the black strip at the very top | `src/lib/site-config.ts` | `credentials:` |
| The order of the top bar and nav | `src/components/site/header.tsx` | search `top bar` |
| When the thin border appears under the nav | `src/components/site/header.tsx` | `scrolled ?` |

### The hero (the first screen)

| I want to change… | Open | Look for |
|---|---|---|
| **"A safe space to understand, connect and grow."** | `src/components/site/hero.tsx` | `<h1` |
| **"Every conversation matters. Every connection heals."** | `src/components/site/hero.tsx` | `Every conversation matters` |
| The paragraph under that | `src/components/site/hero.tsx` | `Clinical psychology for individuals` |
| The three tick points (Confidential, Online…) | `src/components/site/hero.tsx` | `heroReassurances` |
| **"Not sure where to begin? Let's talk first."** card | `src/components/site/hero.tsx` | `Not sure where to begin` |
| The **"Book Free Call"** button | `src/components/site/hero.tsx` | `Book Free Call` |
| The numbers (10+, 1,000+, 100%, RCI) | `src/lib/site-config.ts` | `heroStats:` |
| The picture | `src/components/site/hero-visual.tsx` | whole file |
| To use a real photo instead of the drawing | `src/components/site/hero.tsx` | `<HeroVisual />` |

### The four tabs (Myself / Child & Family / School / Workplace)

| I want to change… | Open | Look for |
|---|---|---|
| The tab names | `src/content/pathways.ts` | `tab:` |
| The heading inside a tab | `src/content/pathways.ts` | `heading:` |
| The paragraph inside a tab | `src/content/pathways.ts` | `blurb:` |
| The 4 little service cards in a tab | `src/content/pathways.ts` | `services:` |
| The orange button inside a tab | `src/content/pathways.ts` | `cta:` |
| How the tabs *look* | `src/components/site/pathways-section.tsx` | `TabsList` |

### Understand / Connect / Grow

| I want to change… | Open | Look for |
|---|---|---|
| The three pillar names and text | `src/content/site-content.ts` | `pillars:` |
| The small icon on each pillar | `src/content/site-content.ts` | the `icon:` line |

### The services grid

| I want to change… | Open | Look for |
|---|---|---|
| Add or remove a whole category | `src/content/site-content.ts` | `serviceCategories:` |
| The category names (Clinical, Developmental…) | `src/content/site-content.ts` | `label:` |
| Add or remove a service card | `src/content/site-content.ts` | inside `services:` |
| A card's title | `src/content/site-content.ts` | `title:` |
| A card's description | `src/content/site-content.ts` | `description:` |
| The 3 tick points in a card | `src/content/site-content.ts` | `deliverables:` |

### Corporate, pricing & schools

| I want to change… | Open | Look for |
|---|---|---|
| The 3 dark-green cards at the top | `src/content/site-content.ts` | `corporatePillars:` |
| **The three pricing tiers** | `src/content/site-content.ts` | `engagementTiers:` |
| A tier's name | `src/content/site-content.ts` | `name:` |
| **A price** | `src/content/site-content.ts` | `price:` and `priceNote:` |
| The tick list inside a tier | `src/content/site-content.ts` | `features:` |
| Which tier is the "Most chosen" one | `src/content/site-content.ts` | `highlighted: true` |
| The schools section | `src/components/site/corporate-section.tsx` | `schoolsIncludes` |

> **Prices:** right now they say "One session", "3–6 sessions", "Annual". Replace
> the text in `price:` with real numbers or money when you decide them.

### Testimonials

| I want to change… | Open | Look for |
|---|---|---|
| Add, remove or edit a quote | `src/content/site-content.ts` | `testimonials:` |
| The quote itself | `src/content/site-content.ts` | `quote:` |
| The person's name | `src/content/site-content.ts` | `name:` |
| Their job and company | `src/content/site-content.ts` | `role:` and `org:` |

### The multi-step form

| I want to change… | Open | Look for |
|---|---|---|
| "Who is seeking support?" choices | `src/content/form-options.ts` | `servicesWhoOptions` |
| "Primary area of concern" choices | `src/content/form-options.ts` | `concernOptions` |
| Online / In-clinic / Either choices | `src/content/form-options.ts` | `modeOptions` |
| The step titles (About you, Who & what…) | `src/components/site/consultation-form.tsx` | `STEPS` |
| The questions asked at each step | `src/components/site/consultation-form.tsx` | `step === 1` / `2` / `3` |
| The rules about what counts as valid | `src/components/site/consultation-form.tsx` | `validateStep` |
| The thank-you message | `src/components/site/consultation-form.tsx` | `Thank you` |
| **Where the enquiries get sent** | `.env.local` | `LEAD_WEBHOOK_URL` |

> `.env.local` is your private settings file. Copy `.env.local.example` to
> `.env.local` first, then paste your Make.com / Pabbly webhook address in.
> **Never put that address in a website file** — it must stay secret.

### The FAQ questions

| I want to change… | Open | Look for |
|---|---|---|
| Add, remove or edit a question | `src/content/site-content.ts` | `faqs:` |
| The question | `src/content/site-content.ts` | `question:` |
| The answer | `src/content/site-content.ts` | `answer:` |
| Which question starts open | `src/components/site/faq-section.tsx` | `defaultValue` |

### The footer & emergency help

| I want to change… | Open | Look for |
|---|---|---|
| "Book a Consultation" box at the bottom | `src/components/site/footer.tsx` | `Not sure if this is the right place` |
| The extra footer links | `src/components/site/footer.tsx` | `quickLinks:` |
| Privacy / Terms links | `src/components/site/footer.tsx` | `legalLinks:` |
| Facebook / Instagram links | `src/lib/site-config.ts` | `social:` |
| **The emergency helpline numbers** | `src/lib/site-config.ts` | `crisis:` |
| The "not an emergency service" wording | `src/lib/site-config.ts` | `crisis:` → `text` |
| The copyright year | `src/components/site/footer.tsx` | it fills itself in — no work needed |

### Colors, fonts and spacing

| I want to change… | Open | Look for |
|---|---|---|
| **Any color on the whole site** | `src/app/globals.css` | `:root {` |
| The cream background | `src/app/globals.css` | `--background` |
| The dark green (buttons, headings) | `src/app/globals.css` | `--forest-900` |
| The orange/tan accent | `src/app/globals.css` | `--terracotta-600` |
| The warm beige | `src/app/globals.css` | `--sand-200` |
| How round the cards are | `src/app/globals.css` | `--radius` |
| The soft shadows | `src/app/globals.css` | `--shadow-float` |
| The two typefaces | `src/app/layout.tsx` | `DM_Sans` / `Fraunces` |
| Extra-wide space on a section | `src/app/globals.css` | `spacing=` in each room file |

> Change a color in **one** place in `:root` and it updates everywhere. That is
> the point of that block — don't hunt for individual colors.

### The order of the page

| I want to change… | Open | Look for |
|---|---|---|
| Which sections appear, and in what order | `src/app/page.tsx` | the list of `<...Section />` |
| Remove a section completely | `src/app/page.tsx` | delete its one line, keep the rest |
| The little browser tab name & Google description | `src/app/layout.tsx` | `metadata:` |

---

## 3. Please be careful with these

| Folder/file | Why |
|---|---|
| `src/components/ui/` | Borrowed from a tool called shadcn. Editing these gets overwritten when the tool updates. |
| `AGENTS.md` (the top block) | Written automatically by `next dev`. Don't delete it. |
| `.env.local` | Your secrets. Never share or publish it. |
| `package-lock.json` | Do not hand-edit. |

---

## 4. How to see your change

1. In the project folder, type `npm run dev`
2. Open `http://localhost:3000` in Microsoft Edge
3. Edit a file and save — the page updates by itself

**Before you share the site with anyone, check it is not broken:**

```
npm run lint      # looks for mistakes
npm run build     # builds the real version
npm run verify    # opens Edge, photographs every part, lists any errors
```

---

## 5. The one-sentence version

> Everything you read lives in `content/` or `lib/`.
> Everything you look at lives in `components/site/`.
> Every color lives in `globals.css`.
> And anything secret lives in `.env.local`.
