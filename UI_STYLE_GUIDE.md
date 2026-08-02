# UI Style Guide

## General Direction

The CSMS frontend is a code-first enterprise operations UI. New screens and sections should be dense, calm, data-focused, and reusable. Avoid marketing-style layouts inside the authenticated app.

## Shared Libs Pattern

- Shared interfaces, component prop types, and feature display types must live in domain folders under `src/libs/types/<domain>/<feature>.ts`; do not define new interfaces directly inside `.tsx` components.
- Create a folder first for the domain or module (`charger`, `dashboard`, `auth`, `monitoring`, etc.), then add the related `.ts` type files inside that folder.
- Feature enums should live in `src/libs/enums/<feature>.ts` when needed.
- Reusable hooks should live in `src/libs/hooks/<feature>.ts` when they are shared outside one component.

## General Statistics Pattern

`GeneralStatisticsSection.tsx` is the reference pattern for KPI/statistic sections:

- Section files map mock or API data into display-ready card data.
- Card files render reusable presentation primitives.
- Do not hard-code layout-specific metric JSX in the section when a card prop can describe it.
- Keep visual components in `src/components/<module>/<feature>/`.
- Keep page files as route/container entry points only.

## Card Design Rules

Use this style for dashboard KPI cards and future statistic cards:

- Near-white pastel gradient surface, subtle white border, soft operational shadow.
- Prefer maximum-light peach, sky, mint, and violet palettes for top-level KPI cards.
- Use large translucent circular overlays inside gradient KPI cards, matching the General Statistics pattern.
- 8px radius for enterprise surfaces.
- Strong title top-left, simple lucide icon top-right.
- Large tabular numeric value, compact unit, clear trend indicator.
- Data rows align by label, value, unit, trend, and trailing status.
- Wide cards may span more horizontal space when they contain multi-value energy or financial data.
- Responsive behavior must preserve readability on tablet and mobile.

## Data Rules

Mock data should match realistic operating values and be shaped so real API data can replace it later. Components should receive typed props and avoid owning business data.

For General Statistics, the current visual reference values are:

- Station count: 1,290 locations, monthly change +1.
- Charger count: fast 867 units, slow 1,840 units.
- Energy delivered: fast 29,665 kWh, down 2,453 kWh (8%); slow 12,299 kWh, down 6,794 kWh (36%).
- Member registrations: 983 members.

## Placeholder Section Pattern

Until lower dashboard sections receive final product UI, render them as simple maximum-light pastel section bands directly under completed dashboard sections. Each band should show the component file name only, using the reusable `DashboardSectionPlaceholder.tsx` renderer. Remove long explanatory temporary UI from section components.

## Charger Status Pattern

`ChargerStatusSection.tsx` is the reference pattern for pie-chart status sections:

- Mock/API data must live outside the component and feed both the pie chart and detail table.
- `ChargerStatusSection.tsx` must stay a thin section container: selected-panel state, tabs, grid/expanded layout, and card rendering only.
- Card-level display mapping, chart math, hover/pin state, tooltip state, and detail table rendering belong in `ChargerStatusSectionCard.tsx`.
- The summary view uses two stable chart cards for operation status and connector status.
- Both operation-status and connector-status charts use the same custom SVG infographic donut with equal-height segments; percentages control slice angle, not segment outer radius.
- Charger-status chart segments and legend items must be interactive: hover/focus previews the selected category in the center KPI, click pins/unpins it, and keyboard Enter/Space must work.
- Charger-status hover/focus must also show a compact chart tooltip with the selected category name and percentage share.
- Clicking a chart opens a full-width detail state with the same chart on the left and a count table on the right.
- The expanded state must keep fixed chart/table dimensions so the section does not collapse or jump while switching views.
- Pie labels, legends, table headers, category names, connector names, and action aria labels must use i18n keys across all supported languages.

## Infrastructure Chart Pattern

The infrastructure distribution chart uses clean stacked columns with restrained rounded corners, light horizontal gridlines, clear series colors, and a compact legend. Preserve real stacked values, hover/tooltips, responsive sizing, and CSV export. Do not replace chart data with a static image or decorative chart illustration.

## i18n Rules

All new visible text must use the i18n system across supported languages. Numeric units that are language-specific should use existing translation keys or new keys added for all supported languages.

### Supported Languages

The language selector and `Language` type must stay aligned with this list:

| Code | Selector label | Language |
| --- | --- | --- |
| `en` | ENG | English |
| `ko` | KOR | 한국어 |
| `ru` | RUS | Русский |
| `hi` | HIN | हिन्दी |
| `id` | IDN | Bahasa Indonesia |
| `ky` | KYR | Кыргызча |
| `uz` | UZB | O‘zbekcha |

When adding a new visible string, add the same i18n key to all seven language maps in `src/i18n/I18nContext.tsx`. The `english` fallback is only a safety net for missing keys and is not considered a completed translation. New chart labels, legends, tooltips, table/export headers, button labels, and accessibility labels must all follow this rule.
