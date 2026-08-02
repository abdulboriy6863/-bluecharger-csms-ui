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

- Soft pastel gradient surface, subtle white border, soft operational shadow.
- Prefer very light peach, sky, mint, and violet palettes for top-level KPI cards.
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

## i18n Rules

All new visible text must use the i18n system across supported languages. Numeric units that are language-specific should use existing translation keys or new keys added for all supported languages.
