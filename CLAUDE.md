# CLAUDE.md

## Read First

Before doing any work in this project, read:

`ATIGRAVITY_PROJECT_BRIEF.md`

That file contains the full project background, product direction, old system reference, target UI scope, and implementation plan.

## Project

We are building a new modern frontend for an EV charging management / CSMS platform.

Working names:

- BlueCharger
- BlueNetworks CSMS
- CSMS Operations Platform

This is an operator/admin web application for managing EV charging stations, chargers, real-time monitoring, remote control, customers, billing, settlement, reports, and admin settings.

## Current Plan

The plan changed from Figma-first to code-first.

Build a local interactive UI prototype with code and run it on localhost.

Do not build a static visual-only mockup. The first prototype must be interactive enough to demo:

`Login -> Overview -> Live Monitoring -> Charger Detail -> Control Command -> Result`

## Stack Direction

Use a modern frontend stack:

- React
- TypeScript
- Vite
- SCSS / Sass (SCSS modules, no plain CSS)
- Lucide icons
- Recharts/ECharts or another suitable chart library
- Local mock data first

Do not use:

- JSP
- jQuery
- jqGrid
- old Bootstrap UI
- copied legacy CSS from BNCPOs

## Old System

Old reference project:

`/Users/abdulboriy/Desktop/BNCPOs`

Use it only for:

- business modules
- menu structure
- workflow reference
- permission concepts
- existing controller/API hints
- table column ideas

Do not copy the old visual design.

## Product Direction

The new UI should feel:

- modern
- premium
- global
- operational
- trustworthy
- data-focused
- fast to scan

It should not feel like:

- an old admin panel
- a marketing landing page
- a generic CRM
- a Korean-only legacy system

## First Demo Scope

Build only the P0 flow first:

1. Login
2. Overview dashboard
3. Live Monitoring
4. Charger detail drawer
5. Control command modal
6. Command result state

Use realistic mock data. Do not connect the backend yet.

## Implementation Rules

1. Read `ATIGRAVITY_PROJECT_BRIEF.md` before implementation.
2. Build reusable components.
3. Keep visual quality high.
4. Prefer operator clarity over decorative UI.
5. Use status colors consistently.
6. Make language/global readiness visible.
7. Keep the app runnable on localhost.
8. Do not overbuild non-P0 pages before the first demo flow is polished.

## Definition Of Done

The first demo is done when:

- Login looks premium and global.
- Sign In transitions to Overview.
- Overview shows network health quickly.
- Live Monitoring has filters, counters, grid, and status rows.
- Selecting a charger opens a detail drawer.
- Remote command modal works with mock state.
- Command result state is visible.
- The app runs locally without real API dependency.
