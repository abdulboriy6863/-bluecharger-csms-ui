# BlueCharger CSMS UI

<div align="center">

![BlueCharger](https://img.shields.io/badge/BlueCharger-EV%20Operations%20Platform-1687d9?style=for-the-badge)
![Status](https://img.shields.io/badge/status-local%20prototype-16a34a?style=for-the-badge)

<p>
  A modern, multilingual frontend prototype for BlueNetworks EV charging station operations.
</p>

![React](https://img.shields.io/badge/React-18.3.1-20232a?style=flat-square&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-1.83.4-cc6699?style=flat-square&logo=sass&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.15.0-22c55e?style=flat-square&logo=chartdotjs&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide%20React-0.474.0-f97316?style=flat-square&logo=lucide&logoColor=white)

</div>

## Overview

BlueCharger CSMS UI is a code-first local prototype for a global EV charging management platform. It is designed for operators and administrators who manage charging stations, chargers, connectors, customers, charging sessions, payments, reports, and remote control workflows.

The project uses realistic mock data first. API and backend integration will be added after the product UI and operational flow are approved.

## P0 Demo Flow

~~~text
Login
  -> Overview Dashboard
  -> Live Monitoring
  -> Charger Detail Drawer
  -> Control Command Modal
  -> Command Result
~~~

The flow is interactive and demonstrates the core operator workflow with local data:

- Sign in with a premium BlueNetworks / BlueCharger login screen.
- Review network KPIs, charger status, energy delivery, alerts, and infrastructure usage.
- Open live monitoring and filter charger records.
- Select a charger to inspect technical details and recent events.
- Send a safe remote command such as start, stop, or reset.
- View pending, success, or failure command result states.

## Product Modules

| Module | Current scope |
| --- | --- |
| System Home | Overview dashboard, solar dashboard, installation locations, charger status, charger control |
| Live Monitoring | Status counters, filters, charger data grid, detail drawer, control actions |
| System Management | Companies, users, permission groups, common codes, notices and FAQ |
| Member Management | Groups, information, notifications, support, grades |
| Infrastructure | Manufacturers, models, charging stations, chargers, SoC limits, power limits |
| History | Charging, payment, control, communication, error, prepaid history and graphs |
| Payments | Tariffs, settlement, receivables and prepaid management |
| Purchase & Sales | Purchase, sales, summary, performance and net profit views |

## Dashboard Highlights

### General Statistics

Reusable pastel KPI cards for:

- Station count
- Fast and slow charger count
- Fast and slow energy delivery
- Member registrations

### Charger Status

- Interactive operation-status donut chart
- Interactive connector-status donut chart
- Hover and keyboard tooltip states
- Click-to-expand detail view
- Category totals and fast/slow breakdowns
- Responsive chart and detail layouts

### Infrastructure Usage

- Stacked regional bar chart
- Charger type and model name modes
- Electric blue, violet, coral, mint, and amber signal palette
- Square stacked segments with no unwanted gaps between categories
- Responsive bar sizing and hover highlighting
- Energy usage trend chart with tooltips and CSV export
- Mock data shaped for future API replacement

## Technology Stack

| Technology | Usage |
| --- | --- |
| [React](https://react.dev/) | Component-based UI and application state |
| [TypeScript](https://www.typescriptlang.org/) | Strict application and data typing |
| [Vite](https://vite.dev/) | Fast local development server and production bundling |
| [Sass](https://sass-lang.com/) | Modular SCSS styling and responsive layouts |
| [Recharts](https://recharts.org/) | Bar, line, composed and custom interactive charts |
| [Lucide React](https://lucide.dev/) | Consistent accessible interface icons |
| [clsx](https://github.com/lukeed/clsx) | Conditional class name composition |

## Architecture

The project follows a component-first architecture. Pages act as entry containers, while UI sections, cards, views, and interaction blocks live under src/components.

~~~text
src/
├── App.tsx                         # Application shell and page-level state
├── main.tsx                        # React entry point and i18n provider
├── components/
│   ├── layout/                     # App shell and top navigation
│   ├── login/                      # Login experience
│   ├── overview/                   # Overview dashboard blocks
│   ├── monitoring/                 # Live monitoring workflow
│   ├── chargerDetail/              # Charger detail drawer
│   ├── control/                    # Command modal and result state
│   ├── systemHome/dashboard/       # Dashboard sections and reusable cards
│   ├── infrastructure/             # Infrastructure module views
│   ├── systemManagement/           # Administration views
│   ├── memberManagement/           # Member views
│   ├── history/                    # History views
│   ├── paymentInformation/          # Payment views
│   └── purchaseSales/               # Purchase and sales views
├── pages/                          # Thin page entry containers
├── data/                            # Typed local mock data
├── i18n/                            # Translation maps and provider
├── libs/
│   └── types/                      # Domain-specific interfaces and prop types
└── scss/                            # Global and module-level Sass styles
~~~

### Component Pattern

Dashboard sections follow a consistent separation of responsibility:

~~~text
Section.tsx
  -> layout, section composition, page-facing props

SectionCard.tsx
  -> chart presentation, interaction behavior, display mapping

src/libs/types/<domain>/<feature>.ts
  -> interfaces, prop types and display data contracts

src/data/mock<Feature>.ts
  -> realistic local data shaped like future API responses
~~~

Business data should not be hard-coded inside presentation JSX. New shared interfaces belong in a domain folder under src/libs/types.

## Internationalization

The application supports the seven languages exposed by the global language selector:

| Code | Selector | Language |
| --- | --- | --- |
| en | ENG | English |
| ko | KOR | 한국어 |
| ru | RUS | Русский |
| hi | HIN | हिन्दी |
| id | IDN | Bahasa Indonesia |
| ky | KYR | Кыргызча |
| uz | UZB | O‘zbekcha |

All visible UI text must use an i18n key. When adding a new label, tooltip, legend, chart category, table/export header, or accessibility label, add the key to all seven language maps in src/i18n/I18nContext.tsx.

## Responsive Design

The UI is designed for:

- Desktop operator workstations
- Tablet layouts
- Mobile inspection and control workflows

Responsive behavior includes:

- Dashboard cards collapsing from two columns to one column
- Chart legends wrapping without layout overflow
- Stable chart dimensions during mode and detail changes
- Horizontal handling for dense data where necessary
- Touch-friendly controls and accessible focus states

## Getting Started

### Requirements

- Node.js 18 or newer
- npm or Yarn

### Install dependencies

~~~bash
npm install
~~~

### Start the development server

~~~bash
npm run dev
~~~

Open the local URL shown by Vite, normally:

~~~text
http://localhost:5173
~~~

### Build for production

~~~bash
npm run build
~~~

### Type check

~~~bash
npm run lint
~~~

### Preview the production build

~~~bash
npm run preview
~~~

## Validation

Before completing a feature, run:

~~~bash
npm run build
git diff --check
~~~

The build runs TypeScript validation followed by the Vite production build.

## Mock Data Strategy

The prototype intentionally uses local mock data so product decisions can be reviewed before backend contracts are finalized.

Examples:

- src/data/mockChargers.ts
- src/data/mockDashboard.ts
- src/data/mockGeneralStatistics.ts
- src/data/mockChargerStatusSummary.ts
- src/data/mockInfrastructureUsage.ts
- src/data/mockEvents.ts

Each mock collection is typed and shaped so it can later be replaced by API responses without rewriting the chart or card presentation layer.

## Design Principles

- Clean enterprise operations UI
- Light, calm and data-focused surfaces
- Strong hierarchy for repeated operator workflows
- Meaningful status colors for available, charging, warning, fault and offline states
- Reusable cards and chart patterns
- No copied legacy JSP, jQuery, jqGrid or Bootstrap UI
- No static chart screenshots in place of interactive data visualizations
- Accessible labels, keyboard interaction and responsive behavior

Detailed conventions are documented in [UI_STYLE_GUIDE.md](./UI_STYLE_GUIDE.md).

## Git Workflow

Use small logical commits for completed features and refactors:

~~~bash
git status -sb
git add <files>
git commit -m "feat(scope): describe the change"
git push
~~~

The active development branch is develop.

## Roadmap

- Replace mock data with approved backend/API contracts.
- Connect authentication and permission-aware navigation.
- Add real-time telemetry refresh and OCPP event streaming.
- Add map-based station monitoring.
- Add production-grade data tables, pagination and server-side filtering.
- Add automated component and interaction tests.
- Improve code splitting for larger production bundles.

## Project References

- [Project brief](./ATIGRAVITY_PROJECT_BRIEF.md)
- [UI style guide](./UI_STYLE_GUIDE.md)
- [Agent development rules](./AGENTS.md)
- [Local login background](./public/assets/global-network-bg.jpg)

## License

This repository is an internal BlueNetworks / BlueCharger prototype. Licensing and distribution terms will be added when the project moves beyond the local prototype stage.
