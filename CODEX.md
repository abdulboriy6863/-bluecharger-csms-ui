# CODEX.md

## Context For Codex

This file exists for human readability. Codex-oriented project instructions are also in:

`AGENTS.md`

Full project context is in:

`ATIGRAVITY_PROJECT_BRIEF.md`

Read both before starting implementation.

## What We Are Building

A new code-first frontend prototype for BlueCharger / BlueNetworks CSMS.

This is an EV charging operations platform for:

- charger monitoring
- charger remote control
- stations and chargers
- customers
- charging sessions
- billing and settlement
- tariffs and promotions
- reports
- admin settings

The app should run locally on localhost and use mock data first.

## First Target

Build and polish this interactive flow first:

`Login -> Overview -> Live Monitoring -> Charger Detail -> Control Command -> Result`

## Key Rule

Do not recreate the old BNCPOs JSP/jQuery UI.

Use the old project only for business reference:

`/Users/abdulboriy/Desktop/BNCPOs`

## Preferred Stack

- React
- TypeScript
- Vite
- modern SCSS / Sass (no plain CSS)
- reusable components
- mock data

## Avoid

- static-only screenshots
- Figma-specific work
- old Bootstrap/admin look
- jQuery/jqGrid
- backend integration before approval
