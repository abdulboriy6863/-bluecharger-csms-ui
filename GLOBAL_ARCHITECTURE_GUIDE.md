# Global Enterprise Architecture Guide (Nestar-Next Pattern)

> **IMPORTANT FOR AI AGENTS & DEVELOPERS:**
> Read this file **BEFORE** starting any implementation, creating files, or writing code. All React, Next.js, and Vite projects in this repository MUST strictly follow this architecture standard.

---

## 1. Core Architecture Philosophy

This project adopts the **Domain-Driven Clean Architecture (Nestar-Next Standard)**.

* **High Cohesion & Low Coupling:** All UI components, domain types, enums, hooks, and helpers are grouped by business domains.
* **Separation of Concerns:** `src/pages/` files are purely light router/container entry doors. All heavy UI elements, presentation cards, and sectional components live inside `src/libs/components/`.

---

## 2. Global Directory Structure

```
src/
├── pages/                       # Page Router / Container Entry Points ONLY
│   ├── SystemHome/              # Module: System Home
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.tsx
│   │   └── ChargerStatus/
│   │       └── ChargerStatusPage.tsx
│   ├── Infrastructure/          # Module: Infrastructure Management
│   │   └── ChargerManagement/
│   │       └── ChargerManagementPage.tsx
│   └── SystemManagement/        # Module: System Administration
│       └── UserManagement/
│           └── UserManagementPage.tsx
│
├── libs/                        # Central Logical & Component Core
│   ├── components/              # Reusable UI & Presentation Layer
│   │   ├── common/              # Global UI Primitives (Button, Modal, Input, Badge, Card, Drawer)
│   │   │   ├── Button/Button.tsx
│   │   │   ├── Modal/Modal.tsx
│   │   │   └── Card/Card.tsx
│   │   ├── layout/              # AppShell, TopNavigation, Sidebar
│   │   │   ├── AppShell/AppShell.tsx
│   │   │   └── TopNavigation/TopNavigation.tsx
│   │   ├── overview/            # KpiCards, EnergyTrendChart, RecentAlerts, StatusDistribution
│   │   ├── monitoring/          # LiveMonitoring, ChargerTable, FilterBar, StatusCounters
│   │   ├── chargerDetail/       # ChargerDetailDrawer
│   │   ├── control/             # ControlCommandModal, CommandResultView
│   │   └── <moduleName>/        # Domain-specific UI features (systemHome, infrastructure, etc.)
│   │       └── <featureName>/
│   │           ├── <Feature>Section.tsx     # Container section handling state & tabs
│   │           └── <Feature>SectionCard.tsx # Visual primitive & chart renderer
│   │
│   ├── types/                   # Central TypeScript Type Definitions (by domain)
│   │   ├── auth/auth.ts
│   │   ├── charger/
│   │   │   ├── charger.ts
│   │   │   └── chargerDetail.ts
│   │   ├── dashboard/
│   │   │   ├── generalStatistics.ts
│   │   │   ├── chargerStatus.ts
│   │   │   └── infrastructureUsage.ts
│   │   ├── monitoring/monitoring.ts
│   │   └── layout/layout.ts
│   │
│   ├── enums/                   # Central Enums (.enum.ts files)
│   │   ├── charger.enum.ts      # ChargerStatusEnum, CommandTypeEnum
│   │   └── common.enum.ts       # DirectionEnum, StatusEnum
│   │
│   ├── hooks/                   # Shared Custom React Hooks
│   │   └── useDeviceDetect.ts
│   │
│   ├── auth/                    # Authentication helpers & JWT handlers
│   ├── config.ts                # App configuration constants
│   ├── utils.ts                 # Utility helper functions
│   └── sweetAlert.ts            # Alert & Notification wrappers
│
├── scss/                        # Central SCSS Styling Layer
│   ├── core/
│   │   ├── _variables.scss      # Theme colors, fonts, break-points
│   │   ├── _mixins.scss         # Flex, grid, glassmorphism, responsive mixins
│   │   └── global.scss          # Reset & base global styles
│   ├── common/                  # SCSS Modules for common components
│   ├── layout/                  # SCSS Modules for AppShell & Navigation
│   └── <moduleName>/            # SCSS Modules for domain features
│       └── <Feature>.module.scss
│
├── data/                        # Local Mock Data Layer (Prototyping & Tests)
│   ├── mockChargers.ts
│   ├── mockDashboard.ts
│   └── mockEvents.ts
│
└── i18n/                        # Multilingual Translations (I18nContext)
    └── I18nContext.tsx
```

---

## 3. Mandatory Architectural Rules

### Rule 1: Page vs Component Rule
* Files inside `src/pages/<ModuleName>/` MUST be ultra-lightweight entry points.
* Pages DO NOT write direct complex HTML/JSX layouts; they render components imported from `src/libs/components/<moduleName>/<featureName>/`.

### Rule 2: Section & Card Pattern (`Section.tsx` & `Card.tsx`)
* For dashboard panels, statistics, and charts:
  * `<Feature>Section.tsx`: Manages active tabs, view switching, filter states, and data mapping.
  * `<Feature>SectionCard.tsx`: Handles DOM presentation, SVG charts, tooltips, hover effects, and legend buttons.

### Rule 3: Strict Type & Enum Location
* **NO inline `interface` or `type` declarations inside `.tsx` files.**
* All types MUST be exported from `src/libs/types/<domain>/<feature>.ts`.
* All state/status enums MUST be defined inside `src/libs/enums/<domain>.enum.ts`.

### Rule 4: SCSS Module Isolation
* Plain CSS (`.css`) is prohibited.
* Component styles MUST use SCSS Modules (`<Feature>.module.scss`) located in `src/scss/<moduleName>/`.
* Design tokens (`$color-brand-primary`, `$font-size-base`, etc.) MUST be imported from `src/scss/core/_variables.scss`.

### Rule 5: i18n & Responsiveness
* ALL visible text strings MUST use translation keys (`t('key')`) across supported languages.
* ALL components MUST be fully responsive on Mobile, Tablet, and Desktop views.

---

## 4. Copy-Paste Checklist for New Projects / Features

When creating a new feature or starting a new project, verify:
- [ ] Is the page container in `src/pages/<ModuleName>/`?
- [ ] Are UI components placed under `src/libs/components/<moduleName>/`?
- [ ] Are interfaces defined in `src/libs/types/<domain>/`?
- [ ] Are enums created under `src/libs/enums/`?
- [ ] Are styles written in `src/scss/<moduleName>/<Feature>.module.scss`?
- [ ] Are all text strings added to `src/i18n/I18nContext.tsx`?
- [ ] Does `npm run lint && npm run build` pass with 0 errors?
