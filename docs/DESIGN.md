# Todo4Me 3.0 — design direction ("Graphite")

This is the art direction and the shared contract for the 3.0 redesign. Every coder works from it. If something here does not fit a real screen, solve it in the spirit of the document and report the deviation; do not fall back to the old look.

## 1. Why the old look reads as "AI-made"

Measured on the 2.x screens (`docs/screenshots/dashboard-dark.png`, `tasks-light.png`):

- an indigo/violet accent (`#5b5bd6`) on everything that is interactive, including a full-width violet "Quick capture" button;
- every piece of meta data is a rounded pill with its own border (`Today · 3:00 PM`, `High`, `Work`, `1/3`, `30m`), so each task row is three lines tall and visually noisy;
- cards inside cards: stat tiles, panels, "Top 3" rows, each with radius 10–14, border and shadow;
- 4 equal stat tiles with an icon in a tinted square, a big progress ring, uppercase tracked eyebrow labels in accent colour;
- headings in bold 28–32 px, body at 15 px: low density, no hierarchy between "page", "section" and "row".

None of it is wrong on its own; together it is the default template every generator produces.

## 2. Identity

Todo4Me is a private, offline instrument for people who plan their own day. It should feel like a precise tool someone uses for years: quiet, fast, dense where it helps, and confident in its typography. Reference point: the restraint of professional tools (Linear, Things, a good code editor), not their branding. We copy no logos, product names, copy text or screenshots.

What the user should notice first, by screen:
- **Today / Dashboard**: what is left today, and what is late. Nothing else competes.
- **Lists**: the task titles. Meta data is readable but secondary.
- **Editor**: the page. Chrome recedes.

Principles:
1. **Colour means something.** The UI is monochrome graphite. Colour appears only for meaning: priority, overdue, done, category dots, the focus ring, destructive actions. No decorative colour, no gradients, no glows.
2. **Typography carries the hierarchy**, not boxes. Weight, size, colour and spacing separate page title, section, row and meta.
3. **Lines, not cards.** Structure comes from hairline dividers, alignment and whitespace. A container gets a border only when it is a real object (a dialog, a popover, the content sheet, an input).
4. **Density with air.** 13–14 px UI text, 34–36 px rows, generous outer margins. Compact where you scan, open where you read.
5. **Precise motion.** Short (100–160 ms), never bouncy, honours `prefers-reduced-motion`.

## 3. Typography

- Typeface: **Inter** (variable, bundled: `vendor/fonts/inter-*-opsz-*.woff2`, weight 100–900 and optical size axis; OFL licence in `vendor/fonts/INTER-LICENSE.txt`). The `@font-face` rules go into `css/styles.css` (family name `"Inter"`, `font-display: swap`, `unicode-range` for latin and latin-ext as in `node_modules/@fontsource-variable/inter/opsz.css`). `font-optical-sizing: auto`.
- Features: `font-feature-settings: "cv11", "ss03"` on body (cv11 = single-storey a, ss03 = rounded quotes); `font-variant-numeric: tabular-nums` for counts, dates, times, durations, statistics.
- Scale (at `--font-scale: 1`; all sizes keep the existing `calc(… * var(--font-scale))` pattern):

| Role | Size / weight / tracking | Use |
|---|---|---|
| Display | 28 px / 600 / -0.022em, line-height 1.15 | dashboard greeting only |
| Title | 18 px / 600 / -0.014em | page title in the page header |
| Heading | 14 px / 600 / -0.006em | section headings |
| Body | 13.5 px / 450 / -0.003em, line-height 1.45 | rows, forms, text |
| Small | 12.5 px / 450 | meta data, help text |
| Label | 11.5 px / 550 / +0.01em | sidebar group labels, column headers; sentence case, **not** uppercase-tracked |
| Kbd | 11 px / 500, tabular | shortcut hints |

- Never more than two weights on one row. Bold (700+) is not used in the UI chrome.
- The design option "font" in Settings keeps working (`T4.themes.FONTS`); `inter` now really is Inter.

## 4. Colour tokens (default design `classic`, redefined)

The default token set in `css/styles.css` (`:root` and `[data-theme="dark"]`) becomes Graphite. Token names do not change (see the header of `css/themes.css`); other designs (tokio, paper, …) keep overriding them.

| Token | Light | Dark |
|---|---|---|
| `--bg` (app canvas, sidebar) | `#f4f4f5` | `#0b0c0e` |
| `--surface` (content sheet) | `#ffffff` | `#111214` |
| `--surface-2` (hover, inputs, raised) | `#f4f4f5` | `#18191c` |
| `--surface-3` (pressed, selected) | `#ebebed` | `#212226` |
| `--border` | `#e5e5e8` | `#222327` |
| `--border-strong` | `#d4d4d8` | `#2f3035` |
| `--text` | `#17181a` | `#eceef0` |
| `--text-2` | `#4a4c52` | `#b3b6bc` |
| `--muted` | `#7b7e86` | `#7d8088` |
| `--accent` (default, design accent) | `#17181a` | `#eceef0` |
| `--accent-fg` | `#ffffff` | `#0b0c0e` |
| `--accent-soft` | `color-mix(in srgb, var(--text) 7%, transparent)` | same formula |
| `--accent-text` | `var(--text)` | `var(--text)` |
| `--focus-ring` | `#4a7dff` | `#6b8cff` |
| `--p-critical` | `#e5484d` | `#ef5f62` |
| `--p-high` | `#e8730c` | `#f2903a` |
| `--p-medium` | `#3e7bd6` | `#5b93e6` |
| `--p-low` | `#8b8e96` | `#7d8088` |
| `--good` | `#2f9e55` | `#46b06b` |
| `--danger` | `#d93a40` | `#ef5f62` |
| `--warn` | `#b7791f` | `#d9a03a` |
| `--shadow-sm` | `0 1px 0 rgba(17,18,20,.04)` | `0 1px 0 rgba(0,0,0,.4)` |
| `--shadow` | `0 0 0 1px var(--border), 0 4px 12px rgba(17,18,20,.06)` | `0 0 0 1px var(--border), 0 6px 16px rgba(0,0,0,.45)` |
| `--shadow-lg` | `0 0 0 1px var(--border-strong), 0 16px 48px rgba(17,18,20,.16)` | `0 0 0 1px var(--border-strong), 0 20px 60px rgba(0,0,0,.6)` |
| `--sidebar-bg` | `var(--bg)` | `var(--bg)` |
| `--sidebar-active` | `var(--surface-3)` | `var(--surface-2)` |
| `--sidebar-active-text` | `var(--text)` | `var(--text)` |
| `--toast-bg` / `--toast-fg` | `#17181a` / `#f4f4f5` | `#232428` / `#eceef0` |

- The accent is "ink": primary buttons are near-black on light and near-white on dark. The user can still pick a colour accent in Settings; everything must also look right with a coloured accent (test one: `#0e7c86`).
- **Migration**: settings stored by 2.x have `accentSource: 'custom', accent: '#5b5bd6'` (the old default). Treat exactly that combination as "use the design accent" at runtime (no data rewrite); new defaults in `js/settings.js` become `accentSource: 'design'`. The first swatch in `S.ACCENTS` (`js/storage.js`) stays selectable as a colour.
- The brand tile (purple tangram logo) stays as it is: it is the only purple in the product, and it sits at 20 px in the sidebar.
- Contrast: body text ≥ 7:1, muted text ≥ 4.5:1 on its surface, in both modes.

## 5. Shape, space, motion

- Radii: `--radius-sm: 4px`, `--radius: 6px`, `--radius-lg: 10px` (design option "radius" keeps working: sharp/soft/round in `js/themes.js` → soft becomes 4/6/10). Pills (`999px`) only for the toggle switch and counters inside buttons.
- Spacing scale (px): 2, 4, 6, 8, 12, 16, 20, 24, 32, 48. Page side padding 32 (desktop), 16 (mobile).
- Heights: controls 30 px (compact 26), rows 36 px (compact 30), page header 52 px, sidebar items 30 px.
- Icons: the existing stroke sprite, 16 px in rows and sidebar, 15 px in buttons, stroke 1.6–1.75, colour `--muted`, `--text` on hover/active. No emoji as icons.
- Motion: `--ease: cubic-bezier(.2, .8, .2, 1)`; hover 100 ms (background, colour), popovers/menus 140 ms (opacity + 2 px translate), dialogs 160 ms (opacity + scale .985 → 1). `@media (prefers-reduced-motion: reduce)` → no transforms.

## 6. Layout

- **Shell**: the sidebar sits on the canvas (`--bg`) without a border. The main area is a **content sheet**: `--surface`, `1px solid var(--border)`, `border-radius: var(--radius-lg)`, inset 8 px from the window edges on the top/right/bottom (desktop ≥ 900 px). On mobile the sheet is full-bleed without radius.
- **Page header** (top of the sheet, 52 px, hairline below): page title (Title), optional count in muted, then on the right the page actions (ghost buttons, the primary action last). The old large H1 + subtitle above the content goes away; a subtitle may stay as Small muted text next to/below the title only where it explains something.
- **Sidebar**: workspace row on top (logo 20 px + "Todo4Me" 13.5/600 + a search button and a compose button "New task" as an icon button with tooltip and `N`), then nav items (30 px, icon + label + right-aligned count as muted tabular text, no badges; an overdue count is `--danger` text). Group labels as Label style. The violet "Quick capture" button is replaced by the compose icon button and by the capture field on Today/Dashboard; its shortcut keeps working. Footer: save state as Small muted text.

## 7. Components

- **Buttons**: primary = `--accent` background, `--accent-fg` text, no border, 30 px, 13 px/550, radius `--radius`; hover = 8 % lighter/darker (`color-mix`). Secondary = `--surface` + 1 px `--border-strong`, hover `--surface-2`. Ghost = transparent, `--text-2`, hover `--surface-2`. Danger = ghost with `--danger` text; solid danger only in a confirm dialog. Icon buttons 28 px square. Kbd hint inside a button: muted, 11 px, no box.
- **Inputs/selects**: 30 px, `--surface`, 1 px `--border-strong`, radius `--radius`; hover border `--muted` at 50 %; focus: border `--focus-ring` + `0 0 0 3px color-mix(in srgb, var(--focus-ring) 22%, transparent)`. Placeholder `--muted`. Filter selects in a toolbar are ghost-style (no border until hover) with a small chevron.
- **Focus-visible** everywhere: 2 px `--focus-ring` outline, offset 1 px. Never remove it without a replacement.
- **Task row** (lists, Today, Upcoming, Dashboard, search results): one line, 36 px: priority-coloured status ring (14 px, 1.5 px stroke; done = filled `--good` with check) · title (Body, `--text`) · flexible gap · meta group right-aligned in Small `--muted` with 14 px icons and 12 px gaps: due (date/time; `--danger` when overdue, `--text-2` when today), subtasks `1/3`, duration `30m`, repeat icon, tags `#q4`, category as 6 px dot + name. Priority as a flag icon in its colour only for critical and high; medium/low show only through the ring colour. **No pill backgrounds, no borders around meta.** Rows separated by spacing, a hairline only between groups. Hover `--surface-2`, selected `--surface-3`. On narrow widths the meta wraps to a second line under the title (indented to the title), still plain text.
- **Chips** that remain (filters that are set, tags in the task form): 22 px, `--surface-2`, no border, radius `--radius-sm`, Small text.
- **Counts/badges** in the sidebar and section headers: muted tabular text, no background.
- **Sections** (dashboard blocks, settings groups, planner side panel): heading row (Heading + muted count + right-aligned ghost link "View all →"), content directly below, 32 px between sections. **No card container.** Settings groups use a label column (left, 200 px, Small muted description) and controls (right) on wide screens — an editorial two-column form, not boxes.
- **Stats** (Dashboard numbers, Statistics): an inline strip of figures: number in 22 px/600 tabular, label Small muted below, separated by 1 px vertical dividers; no tinted icon squares, no ring. Progress = 2 px line in `--text` on `--surface-3`.
- **Menus, popovers, tooltips**: `--surface` (dark: `#16171a`), 1 px `--border-strong`, radius `--radius`, `--shadow` ; items 28 px, 13 px, icon 15 px muted, kbd right; separators hairline with 4 px margin. Tooltip: `--toast-bg`, 12 px, radius `--radius-sm`, 120 ms delay.
- **Dialogs**: `--surface`, radius `--radius-lg`, `--shadow-lg`, max-width by content; header 15 px/600 with close icon button, body 13.5 px, footer right-aligned (secondary, primary). Backdrop `rgba(0,0,0,.45)` light / `.6` dark, no blur. Mobile: bottom sheet.
- **Toasts**: bottom-centre, `--toast-bg`, 13 px, radius `--radius`, icon in status colour, action as underlined text button; 4 s.
- **Empty states**: one 20 px muted icon, one sentence in `--text-2` that says what will appear here, one secondary button. Centered in the available area, no illustration.
- **Loading**: skeleton lines in `--surface-2` (no spinners for lists); a 2 px indeterminate line at the top of the sheet for longer work.
- **Scrollbars**: thin (8 px), thumb `--border-strong`, track transparent.

## 8. Editor

The document page stays a sheet of paper (the metaphor is justified: it prints). The desk is `--bg`. Toolbars are flat: 28 px icon buttons, ghost, groups separated by 1 px × 16 px dividers, no group backgrounds; active state `--surface-3` + `--text`. Format selects are ghost selects. Side panels use the section and row rules above. Menus, context bar, slash menu, palette, pen bar follow section 7. Keep all existing class names and behaviour.

## 9. Website (`site/`)

Dark-first marketing page in the same language (graphite, Inter, ink buttons), structured editorially:
- Nav 64 px: logo + name left, 4–5 links centre (muted, `--text` on hover), language toggle and a light "Download" button right; hairline below on scroll.
- Hero, left-aligned, max ~ 15 words headline in two lines (Display 56–64 px / 600 / -0.032em), a two-line subline in `--text-2` (18–20 px), primary light button "Download for free" + a text link with chevron. Below it a large real app screenshot (dark, from the redesigned app) shown in perspective (CSS `perspective` + `rotateX`/`rotateY`/`rotateZ` a few degrees, a mask fading it into the background at the bottom and right edge) — the composition of the reference image, with our own product and words.
- Then sections that are **not** card grids: alternating text/screenshot rows (asymmetric 5/7 columns), a dense feature list in two columns with hairline dividers, a "What's new in 3.0" changelog-style list, FAQ as a definition list, a quiet footer. Every claim must be true for the app.
- All texts EN + DE (existing toggle), no external requests, Inter self-hosted (copy the woff2 from `vendor/fonts/`), reduced motion respected.

## 10. Process and checks

- Branch `feature/redesign`. Owners and files: see the task you were given. Keep class names, ids, `data-*` hooks and DOM structure that tests or JS rely on; restyle first, change markup only where the design needs a different structure (task row meta, dashboard stats, sidebar top, page header) and keep the old hooks on the new markup.
- Every screen is checked in light and dark, with a coloured accent, in one other design (`tokio` or `paper`), at 1440×900, 1100×800 and 390×844, in Simple and Advanced mode, German and English (long words).
- Final review question for each screen: could this screen belong to 100 other SaaS products? If yes, it is not finished.
