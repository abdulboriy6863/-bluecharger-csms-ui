# UI Style Guide

## General Direction

The CSMS frontend is a code-first enterprise operations UI. New screens and sections should be dense, calm, data-focused, and reusable. Avoid marketing-style layouts inside the authenticated app.

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
- The summary view uses two stable chart cards for operation status and connector status.
- The first operation-status chart uses a custom SVG infographic donut where each segment's outer radius increases with its percentage share.
- Keep the connector-status chart as the simpler standard pie until its separate design pass.
- Clicking a chart opens a full-width detail state with the same chart on the left and a count table on the right.
- The expanded state must keep fixed chart/table dimensions so the section does not collapse or jump while switching views.
- Pie labels, legends, table headers, category names, connector names, and action aria labels must use i18n keys across all supported languages.

## i18n Rules

All new visible text must use the i18n system across supported languages. Numeric units that are language-specific should use existing translation keys or new keys added for all supported languages.
