# ATIGRAVITY_PROJECT_BRIEF

## Read This First

This document is the full context for the new CSMS / BlueCharger UI project.

The old product exists and works, but its UI is legacy, Korean-focused, difficult to use internationally, and slow/heavy in daily operations. We are not redesigning the old screens one by one. We are building a new modern frontend experience from zero and using the old system only as business logic reference.

The next agent/session should read this file first and continue from here without asking the project background again.

## Project Summary

We are building a modern web UI for an EV charging management platform.

Working names:

- BlueCharger
- BlueNetworks CSMS
- CSMS Operations Platform

Product type:

- Internal/operator web application
- EV charging station management system
- Used by operators, admins, field managers, support, billing/settlement teams

Main business:

- Manage EV charging stations and chargers
- Monitor real-time charger statuses
- Remotely control chargers
- Manage customers and authentication cards/tokens
- Track charging sessions and payment history
- Handle settlement, non-payment, reports
- Manage users, roles, permissions, service companies, common codes

## Important Direction Change

We are not continuing with a Figma-first workflow.

New plan:

- Build the UI directly with code.
- Run locally on localhost.
- Use mock data first.
- Make the UI visually strong enough for approval/demo.
- Connect real backend/API later.

Do not spend effort on Figma-specific instructions, file structure, or design handoff.

## Old System Reference

Old source project location:

`/Users/abdulboriy/Desktop/BNCPOs`

Old system stack:

- Java 8
- Spring Boot 2.7.4
- JSP
- jQuery 1.12
- jqGrid
- Bootstrap legacy CSS
- Highcharts
- MariaDB

Old frontend problems:

- JSP and JavaScript are mixed together.
- UI is old and dense in the wrong way.
- Mostly Korean labels.
- Hard to understand for international users.
- Popup/table patterns are dated.
- Performance and usability are weak.
- Not suitable as a global EV operations product.

Use old project only for:

- Business modules
- Menus
- Role/permission model
- Table columns and workflow hints
- Existing API/controller names
- Database/business meaning

Do not copy:

- Old visual style
- Old colors
- Old layout
- Old popups
- jQuery/jqGrid UI behavior
- Korean-only menu names

## Existing Business Modules From Old System

Old modules identified from menu seed and source:

1. System Home
   - Dashboard
   - Installation/location map
   - Charger status
   - Charger control

2. System Management
   - Service company management
   - User management
   - Menu/role permission groups
   - Common code management
   - Notices/FAQ
   - Login monitoring

3. Customer Management
   - Customer groups
   - Customer information
   - Customer notification/support
   - Authentication cards/tokens

4. Charger Infrastructure
   - Manufacturers
   - Models
   - Charging stations
   - Chargers
   - Connectors
   - Bulk upload

5. History / State
   - Charging history
   - Payment/approval history
   - Control history
   - Communication logs
   - Error history

6. Fare / Promotion
   - Tariff plans
   - Plan schedules
   - Promotions
   - Coupons / approval codes

7. Payment / Settlement
   - Settlement
   - Non-payment
   - Payment requests
   - Invoice/payment workflows

8. Reports
   - Purchase reports
   - Sales reports
   - Purchase/sales summary
   - Performance reports

## New Product Navigation

Use global, understandable English navigation names.

Primary nav proposal:

1. Overview
2. Live Monitoring
3. Control Center
4. Stations & Chargers
5. Customers
6. Charging Sessions
7. Billing & Settlement
8. Tariffs & Promotions
9. Reports
10. Admin Settings

## Core UI Philosophy

This is not a marketing landing page.

It is a professional operations platform. It should feel:

- modern
- premium
- global
- trustworthy
- fast
- clear
- operational
- data-focused

It should not feel:

- old admin panel
- generic CRM
- decorative SaaS landing page
- too playful
- dark-only hacker dashboard
- cluttered legacy table system

## Visual Direction

Recommended visual style:

- Clean enterprise + EV operations center
- Light/dense main app after login
- Premium cinematic login allowed
- Compact typography, around 13-14px base for app UI
- White or near-white surfaces for data screens
- Light neutral background
- Subtle borders
- 6-8px radius for most admin components
- Meaningful status colors
- Simple line icons
- No random decorative blobs/gradients

Color semantics:

- Primary blue: main actions, active nav, brand
- Green: available/success/online
- Cyan/blue: charging/in progress
- Amber: warning/reserved/pending
- Red: fault/error/destructive
- Gray: offline/disabled/unknown

## Login Page Direction

The login page should create a strong first impression.

Preferred login concept:

- Full-screen global network / world map / electric network visual background
- BlueNetworks / BlueCharger brand identity
- Centered login form
- Form should be minimal and elegant, not a heavy old card
- Background image should remain visible and premium
- Language selector top-right
- Inputs should feel comfortable and premium
- Sign-in button uses primary blue
- Include small security/status text:
  - TLS 1.3 encrypted
  - Authorized access only
  - Global network online

Login hierarchy:

1. BlueNetworks
2. BlueCharger
3. EV Operations Platform
4. Sign-in form

Login fields:

- User ID or Email
- Password
- Remember ID
- Forgot password
- Sign In
- Language selector: English, Korean, Uzbek, Russian

Optional login animation:

- Background fades in
- Brand fades up
- Inputs appear with slight delay
- Sign-in transitions to Overview

## Main App Layout

Use app shell:

- Left sidebar navigation
- Top bar
- Main content area

Top bar should include:

- Company selector if needed
- Language selector
- Alerts/notifications
- User menu
- Last updated time on real-time screens

Sidebar should include:

- Overview
- Live Monitoring
- Control Center
- Stations & Chargers
- Customers
- Charging Sessions
- Billing & Settlement
- Tariffs & Promotions
- Reports
- Admin Settings

Main page pattern:

1. Page header
2. Key actions
3. KPI/status summary if useful
4. Filter bar
5. Main data grid/map/chart
6. Detail drawer or modal

## Key UX Patterns

### Data Grid

Most pages are data-heavy. The grid pattern is critical.

Support in UI:

- server pagination style
- sorting
- filtering
- column visibility
- sticky important columns
- status chips
- row actions
- export/import actions
- loading state
- empty state
- error state
- selected row state

### Detail Drawer

Use right-side drawer instead of legacy popup for:

- charger detail
- station detail
- customer detail
- session detail
- payment detail

Drawer sections:

- header/identity
- status summary
- properties
- recent events
- actions

### Remote Control Safety

Dangerous actions need confirmation:

- Remote start
- Remote stop
- Reset
- Firmware update
- Unlock connector if exists

Control modal should show:

- target charger
- selected command
- connector if needed
- reason/comment
- warning text
- cancel
- confirm command
- pending/success/failed result state

## P0 Prototype Scope

Build this first locally:

`Login -> Overview -> Live Monitoring -> Charger Detail -> Control Command -> Result`

This is the first approval/demo flow.

Do not build all pages first.

### P0 Screens

1. Login
2. Overview dashboard
3. Live Monitoring list
4. Charger detail drawer
5. Control command modal
6. Command result state

### P0 Should Prove

- The new product looks global and premium.
- The app is not copied from the old Korean UI.
- Operators can understand network health quickly.
- Real-time charger statuses are easy to scan.
- Remote control workflow feels safe.
- Multi-language/global readiness is visible.

## Overview Dashboard Requirements

Show:

- Total chargers
- Available
- Charging now
- Offline
- Faulted
- Today energy
- Today revenue
- Charging trend chart
- Status distribution
- Recent alerts/events
- Map or station status preview

Main message:

An operator should understand overall network health in under 10 seconds.

## Live Monitoring Requirements

Show:

- Status counters
- Auto-refresh toggle
- Last updated timestamp
- Filters:
  - company
  - region
  - station
  - status
  - connector type
  - search
- Data grid columns:
  - station
  - charger ID
  - charger name
  - connector
  - status
  - last status change
  - manufacturer/model
  - communication
  - actions

Rows should include statuses:

- Available
- Charging
- Offline
- Faulted
- Reserved

## Charger Detail Drawer Requirements

Show:

- Charger ID
- Station name
- Current status
- Connector summary
- Model
- Manufacturer
- Firmware version
- Protocol
- Serial number
- Recent sessions
- Recent communication events
- Actions:
  - Start
  - Stop
  - Reset
  - View logs

Dangerous actions must be visually separated.

## Control Command Modal Requirements

Show:

- Modal title: Remote command
- Selected charger summary
- Command type selector
- Connector selector if needed
- Reason/comment field
- Risk warning
- Cancel
- Confirm command

Example copy:

`This command will be sent to charger CP-1024. Confirm only if you are authorized to operate this charger.`

## Command Result Requirements

Show:

- Pending state
- Success state
- Failed state example
- Command ID
- Timestamp
- Sent by user
- Link to control history

## Mock Data Direction

Use realistic fake data.

Regions:

- Seoul
- Busan
- Tashkent
- Samarkand

Stations:

- City Hall Station
- Airport Parking
- Tech Park
- Central Mall

Charger IDs:

- CP-1001
- CP-1002
- CP-2030
- CP-2044

Statuses:

- Available
- Charging
- Offline
- Faulted
- Reserved

Users:

- Operator Admin
- Field Manager
- Support Agent

## Recommended Tech Stack For Local UI Prototype

Use a modern frontend stack. Suggested:

- React
- TypeScript
- Vite
- SCSS / Sass (SCSS modules, no plain CSS)
- Lucide icons
- Recharts or ECharts for charts
- TanStack Query later when APIs exist
- TanStack Table or a high-quality grid approach

For the first approval prototype:

- mock data can live in local files
- no real backend required
- no auth required beyond visual login transition
- run with localhost dev server

## Implementation Rules

1. Do not integrate old backend yet.
2. Do not build all modules before the P0 flow is strong.
3. Do not copy old JSP UI.
4. Build visually polished screens.
5. Use realistic mock data.
6. Keep components reusable.
7. Keep layout responsive enough for desktop and tablet.
8. Make text internationalization-friendly.
9. Use status colors consistently.
10. Avoid overbuilding logic before design approval.

## Definition Of Done For First Demo

First demo is ready when:

- Login looks premium and global.
- Sign In transitions to Overview.
- Overview shows realistic EV operations dashboard.
- Live Monitoring shows grid, filters, counters, auto-refresh control.
- Clicking a charger opens detail drawer.
- Remote command modal opens from drawer.
- Confirm command shows result state.
- UI is polished enough to show to leadership.
- No dependency on real API.

## Immediate Next Step

Create the local frontend app in this folder or a clean subfolder.

Recommended folder:

`/Users/abdulboriy/Desktop/CSMS-figma`

Recommended first app name:

`bluecharger-ui`

Then implement:

1. Project setup
2. Global style/theme
3. Login screen
4. App shell
5. Overview dashboard
6. Live Monitoring
7. Charger drawer
8. Command modal/result

## Notes For Future Sessions

If this session is reopened later:

1. Read this file first.
2. Do not ask again whether the project is Figma or code; it is code/localhost now.
3. Continue from the P0 prototype flow.
4. Keep the old BNCPOs project as business reference only.
5. Prioritize visual quality and operational clarity.
