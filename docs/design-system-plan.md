# Design System — Implementation Plan

Aesthetic: **surgical-paper, vol. 1** — bone-paper canvas, ink-black, apothecary green accent. Source of truth: `Medcord Design System/projects/medcord/preview/_foundation.css` + the 30 preview HTML files. README + `colors_and_type.css` are legacy; ignore.

> **DS_ROOT** = `/Users/feranmi/codebases/2026/medcord-revamp/Medcord Design System/projects/medcord` — every reference path below is relative to this.

## Executor rules (read first, every time)

1. **Always open the reference before coding.** The HTML/CSS in the design system *is the spec* — match the markup, classes, and exact pixel values. Do not invent variants the reference doesn't show.
2. **No tests for now.** Skip `__tests__/` folders and the `pnpm test` step. Tests come back later as a dedicated pass.
3. **After every component, wire it into the preview immediately.** Each component lands in `src/shared/ui/<component>/`, then in the same commit gets used inside the matching preview screen route under `features/design-system-preview/`. This keeps a live visual under the user's nose so drift gets caught the same day.
4. After wiring, run `pnpm lint:fix && pnpm format && pnpm typecheck && pnpm build` before marking the TodoWrite item complete. Lint/typecheck failures block the next component.
5. If a reference looks ambiguous, copy the HTML literally first and refactor to props after — don't over-abstract on the first pass.

## Token swap (replaces what we scaffolded)

- **Fonts (in `main.tsx`)**: drop Mona Sans, add `@fontsource/newsreader` + `@fontsource/inter` + `@fontsource/jetbrains-mono`. Tailwind families: `serif` (Newsreader), `sans` (Inter), `mono` (JetBrains Mono).
  - Reference: `DS_ROOT/preview/_foundation.css:14` (font import), `:69-72` (`--serif`/`--sans`/`--mono`).
- **Tokens** in `globals.css` + `themes.ts` + `tailwind.config.ts`: paper/sheet/ink ramps, apothecary green 50–900, clinical state (`crit`/`warn`/`low`/`ok`) with bg + edge + fg triplets, ribbon colors, hairline tokens, radii (`sharp 0`, `paper 2`, `card 4`, `control 6`, `soft 8`, `modal 12`, `full`), motion (paper-out / paper-in / paper-turn @ 100/200/350ms), 4px spacing scale, 12-col grid, 3 density modes.
  - Reference: `DS_ROOT/preview/_foundation.css:16-93` (root tokens), `DS_ROOT/preview/01-palette.html` (paper/ink/green ramps drawn out), `DS_ROOT/preview/03-geometry.html` (spacing ruler, radii, density), `DS_ROOT/preview/04-motion.html` (curves + durations).
- After this swap, replace the placeholder `color-tokens.tsx` and `typography-scale.tsx` parts with the new palette/type rendered from the new tokens, so the Foundation preview is the first visual proof the swap landed.

## Lives at

- Components → `src/shared/ui/<component>/<component>.tsx` + barrel `index.ts`. (No `__tests__/` for now.)
- Preview shell → existing `features/design-system-preview` becomes a nested-route layout (left rail TOC mirroring the 5 parts + ⌘K-style filter, hash-deeplinkable). One route per preview page, no iframes.

## Component build order

Each entry: **what to build · reference · preview screen it must land in.** Build, then wire into preview, then move on.

### I — Foundation primitives (chrome)
- `Sheet` · `_foundation.css:179-186` · used in nearly every preview, lands in `foundation/palette` and `primitives/buttons` previews.
- `Stamp` (page header) · `_foundation.css:129-154` · Foundation preview header.
- `SectionBreak` · `_foundation.css:157-167` · used between sections in every preview.
- `Hair` / `HairSoft` (rule lines) · `_foundation.css:189-190`.
- `Mark` (uppercase mono micro-label) · `_foundation.css:193-199`.
- `Overline` · `_foundation.css:116-123`.
- `Numeric` (mono + tabular text) · `_foundation.css:114-115`.
- `RecordNumber` · `_foundation.css:289-295`.
- `DictatedText` (italic serif quote) · `_foundation.css:376-383`.
- `Row` / `Stack` / `Col` / `Grid` · `_foundation.css:349-355`.
- → All wired into a refreshed **Foundation · Palette/Type/Geometry/Motion** preview screens (mirrors `01-palette.html` … `04-motion.html`).

### II — Form primitives
- `Button` (primary/secondary/quiet/danger × sm/md/lg + `loading` + `confirmed`) · `_foundation.css:207-238` and full reference scenes in `DS_ROOT/preview/10-buttons.html` (six scenes: footer, in-row, toolbar, split, irreversible, states).
- `SplitButton` · `10-buttons.html:90-97, 270-289`.
- `Toolbar` · `10-buttons.html:99-106, 240-268`.
- `TextField` (underline default + boxed `block` + mono + states default/focus/disabled/readonly/error/ok) · `DS_ROOT/preview/11-inputs.html:27-69` and the states grid at `:572-609`.
- `Select` (underline-styled native) · `11-inputs.html:32` (lives inside `.field`).
- `Textarea` · `11-inputs.html:32` (same `.field` family, multi-line variant).
- `Checkbox` (drawn ink tick + indeterminate + disabled) · `DS_ROOT/preview/12-selection.html:28-72`.
- `Radio` · `12-selection.html:74-87`.
- `Switch` · `12-selection.html:114-133`.
- `Chip` (toggle + removable + tone) · `12-selection.html:135-148` (and base `.chip` in `_foundation.css:282-286`).
- `ChipsInput` (allergy-style multi-chip) · `12-selection.html:150-170`.
- `Combobox` / `SearchPicker` (ICD-10 / Rx / provider style) · `11-inputs.html:235-289` (chart-book idiom) and `12-selection.html:172-205` (people picker).
- `PainScale` (Wong–Baker, serif italic faces) · `12-selection.html:89-112`.
- `RoomBedPicker` · `12-selection.html:207-242`.
- `Calendar` (single + range + has-events) · `DS_ROOT/preview/13-datetime.html:24-77`.
- `TimeInput` (analog face + drum) · `13-datetime.html:79-119`.
- `RecurrenceBuilder` · search inside `13-datetime.html` for the recurrence section.
- `DropZone` + `FilesList` · `DS_ROOT/preview/14-specialized.html:21-50`.
- `DicomThumb` · `14-specialized.html:52-80`.
- `Signature`, `BodyDiagram`, `PinInput` · further down in `14-specialized.html` (scan section headers).
- *Note:* the **vitals block** (`11-inputs.html:98-145, 337-393`) and the **dosage line** (`11-inputs.html:165-229, 397-432`) are composed scenes built from `TextField`/`Select`/`Pill`, not standalone primitives. Build them as preview-only compositions in the Primitives preview, not as exported components.
- → Wired into **Primitives · Buttons / Inputs / Selection / Date-time / Specialized** preview screens (mirrors `10-*` … `14-*`).

### III — Marks & numerics
- `Pill` (`tone: ok|warn|crit|low|ink|neutral`) · `_foundation.css:261-279` and full taxonomy in `DS_ROOT/preview/26-avatars-pills.html`.
- `LabFlag` (H/L/HH/LL/!!!) · `_foundation.css:298-310`.
- `Avatar` (round patient / square staff, sizes sm/md/lg/xl, role tints) · `_foundation.css:313-331` and `26-avatars-pills.html`.
- `PulseDot` · `_foundation.css:334-343`.
- `VitalsReadout` (lg/md/sm with `unit` slot) · `_foundation.css:360-371`.
- → Wired into **Data & state · Avatars / pills / status** preview (`26-avatars-pills.html`).

### IV — Data surfaces
- `Table` (typeset roster — sort caret, hairline rows, 2px ink-rule for selection, leading-edge red bleed for critical) · `DS_ROOT/preview/20-tables.html` end-to-end.
- `LabResultsTable` · `DS_ROOT/preview/21-lab.html`.
- `MarTable` (drug × hour grid) · `DS_ROOT/preview/22-vitals.html` (MAR section).
- `Card` (single signature paper-sheet card, `density` prop) · `DS_ROOT/preview/27-cards.html`.
- `Tooltip` · `DS_ROOT/preview/28-tooltips.html` (tooltip section).
- `Popover` · `28-tooltips.html` (popover section).
- `HoverCard` (4 specimens: patient, staff, medication, room) · `28-tooltips.html` (the four typeset specimens).
- `Skeleton` (paper-grain) · `DS_ROOT/preview/25-skeletons-empty.html` (skeleton scenes).
- `EmptyState` (italic-serif sentence) · `25-skeletons-empty.html` (empty scenes).
- `ErrorState` (leading red rule) · `25-skeletons-empty.html` (error scenes).
- `Progress` family — `Bar`, `Ring`, `Stepper`, `Drip` · `DS_ROOT/preview/24-progress.html`.
- → Wired into **Data & state** previews (mirrors `20-*` … `28-*`).

### V — Charts (ink-only, no lib)
- `LineChart`, `Sparkline`, `VitalsStrip` (24h, 4 traces), `ReferenceBand`, hairline axes/grids · `DS_ROOT/preview/23-charts.html` end-to-end and the vitals strip portion of `DS_ROOT/preview/22-vitals.html`.
- → Wired into **Data & state · Charts** and **Vitals · MAR** previews.

### VI — Navigation & shell
- `AppShell` (binder spine + letterhead top bar), `SideNav`, `TopBar`, `Breadcrumbs`, `Tabs`, `CommandPalette` (⌘K), `SavedViewTabs` · `DS_ROOT/preview/29-navigation.html` end-to-end.
- → Wired into **Data & state · Navigation** preview.

### VII — Overlays
- `Modal` (default / critical / two-person verify / break-the-glass) · `DS_ROOT/preview/40-modals.html`.
- `Drawer` / `Panel` · `40-modals.html` (drawer section).
- `Toast` · `DS_ROOT/preview/41-feedback.html` (toast section).
- `Banner` · `41-feedback.html` (banner section).
- `Alert` (callout, indented) · `41-feedback.html` (alert section).
- → Wired into **Overlays · Modals / Feedback** previews.

### VIII — Cross-record patterns (composed)
- `MentionChip`, `ApprovalCard`, `SharingDialog`, `PermissionsMatrix`, `AuditLog`, `ActivityLog`, `AttachmentChip`, `BulkActionBar`, `AiSuggest`, `PhiRibbon`, `SessionContext` — each is one section in `DS_ROOT/preview/42-cross.html`. Open the file once and pick them off section by section; they are composed from earlier primitives.
- → Wired into **Overlays · Cross-record patterns** preview.

### IX — Signature surfaces (full scenes)
- `PatientBanner` (incl. allergy ribbons + code-status rule) · `DS_ROOT/preview/30-banner.html`.
- `BedBoard` · `DS_ROOT/preview/31-bed-board.html`.
- `EmrChartShell` · `DS_ROOT/preview/32-emr.html`.
- `TelehealthShell` · `DS_ROOT/preview/33-telehealth.html`.
- `EquipmentLog` · `DS_ROOT/preview/34-equipment.html`.
- `StaffSchedule` · `DS_ROOT/preview/35-staff.html`.
- `RegistrationWizard` · `DS_ROOT/preview/36-registration.html`.
- → Each lands directly in its matching **Surfaces** preview screen (`30-*` … `36-*`).

### X — Iconography
- `@icons` already proxies Lucide. Add an `<Icon>` wrapper that defaults to `1.5px` stroke + `currentColor` + `rounded` line caps to match the system. Author 8–12 hand-drawn clinical glyphs (stethoscope, syringe, IV bag, pill, drip, etc.) into the same proxy.
- Reference: `DS_ROOT/preview/43-icons.html` for stroke style, sizing rules, filled-vs-line conventions, and the healthcare glyph set already drawn.
- → Wired into **Overlays · Iconography** preview.

## Preview routes (5 parts × 30 pages)

Mirrors the source `DS_ROOT/index.html` (the JS `PARTS` array, lines 192-234):

```
/design-system
  /foundation          (palette · type · geometry · motion)
  /primitives          (buttons · inputs · selection · datetime · specialized)
  /data-state          (tables · lab · vitals/mar · charts · progress · skeletons-empty · avatars-pills · cards · tooltips · navigation)
  /surfaces            (banner · bed-board · emr · telehealth · equipment · staff · registration)
  /overlays            (modals · feedback · cross · icons)
```

Each leaf is a `*-preview-screen.tsx` that **uses the real shared/ui components** (no copy-pasted markup — if you have to copy markup to make it look right, the component isn't done). Left rail = `parts/preview-toc.tsx` with search + arrow-key nav + deeplink hash. No iframes.

## Rules carried through every component

- No `any`. Discriminated unions for variant props.
- Lucide icons only (no emoji). `<Icon>` wrapper enforces the system stroke style.
- Inline errors, never toasts, on form fields.
- Honor `prefers-reduced-motion` → durations collapse to 0 (per `04-motion.html:156-161`).
- Tabular nums on every numeric.
- `cn()` for class composition. No styled-components.
- Hold-to-confirm `IrreversibleButton` is **out of scope** for v1 (deferred per request).
- Each component ships as: `index.ts` barrel + `<component>.tsx`. No tests yet.

## Ship order

Tokens & font swap → I → II → III → IV → V → VI → VII → VIII → IX → X. TodoWrite tracks each component live; one in-progress at a time; mark complete only after the component is also visible in its preview screen.
