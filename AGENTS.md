# AGENTS.md

## Primary Instruction

Read `ATIGRAVITY_PROJECT_BRIEF.md` first. It is the source of truth for this project.

This project is now a code-first local UI prototype, not a Figma-first task.

## Goal

Build a modern localhost frontend prototype for an EV charging CSMS platform:

- BlueCharger
- BlueNetworks CSMS
- CSMS Operations Platform

The app is for operators/admins who manage charging stations, chargers, real-time status, remote charger control, customers, sessions, billing, settlement, reports, and admin settings.

## Required First Flow

Implement the first demo flow before building the rest of the platform:

`Login -> Overview -> Live Monitoring -> Charger Detail -> Control Command -> Result`

This flow must be interactive with mock data.

## Expected Stack

Use:

- React
- TypeScript
- Vite
- SCSS / Sass approach (no plain CSS)
- reusable components
- realistic local mock data

Recommended libraries:

- lucide-react for icons
- Recharts/ECharts for charts
- TanStack Table or custom high-quality grid pattern if useful

Do not use:

- JSP
- jQuery
- jqGrid
- legacy Bootstrap screens
- copied old CSS

## Old Project Reference

Old working system:

`/Users/abdulboriy/Desktop/BNCPOs`

Use it only as business reference:

- modules
- menus
- permissions
- workflows
- controller/API names
- table columns

Do not copy old UI.

## Design Direction

The product should feel like a premium EV operations platform:

- clean enterprise
- global
- clear
- data-focused
- operational
- trustworthy

Avoid marketing-page composition inside the app. The login can be cinematic, but the app itself should be dense, calm, and useful for repeated daily work.

## P0 Screens

1. Login
   - full-screen premium global/network feel
   - BlueNetworks / BlueCharger branding
   - language selector
   - user/email and password
   - sign-in transition

2. Overview
   - KPI cards
   - charger status distribution
   - charging trend
   - recent alerts
   - map/station preview

3. Live Monitoring
   - status counters
   - filters
   - auto-refresh control
   - data grid
   - status chips

4. Charger Detail Drawer
   - charger identity
   - live status
   - technical info
   - recent events
   - safe actions

5. Control Command Modal
   - selected charger
   - command type
   - connector/reason if needed
   - risk warning
   - confirm/cancel

6. Command Result
   - pending/success/failed state
   - command ID
   - timestamp
   - sent by user

## Development Rules

1. Keep changes scoped to this new project folder.
2. Do not modify the old BNCPOs project unless explicitly asked.
3. Do not connect real API until the mock prototype is approved.
4. Keep components reusable.
5. Prioritize visual polish and workflow clarity.
6. Start a dev server and provide the localhost URL after implementation.
7. Verify the UI in browser before final response when possible.
8. **Page vs Component Architecture Rule**: All UI elements, sectional components, cards, modals, and presentation blocks MUST live inside `src/components/<moduleName>/<featureName>/`. Files in `src/pages/<ModuleName>/` act purely as page entry doors/containers that manage page-level state and render components imported from `src/components/`.
9. **Git Commit Workflow**: Always stage (`git add`), commit with descriptive messages (`git commit`), and push (`git push`) after completing a logical feature or refactoring step.

