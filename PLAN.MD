# Chiroptère BXL — Implementation Plan

## Goal

Build a simple Next.js application for bat monitoring.

The app must allow users to:
- create monitoring sites;
- create monitoring sessions;
- count bat contacts by group and species;
- use a timer with intervals;
- save data locally when offline;
- export observations as CSV and JSON.

## Constraints

- Keep the architecture simple.
- Use Next.js App Router.
- Use Supabase for auth and database.
- Use Server Components by default.
- Use Client Components only for interactive screens.
- Do not add unnecessary abstractions.
- Do not add admin, roles, emails, maps or realtime in V1.

## Pages

Create these routes:

- `/dashboard`
- `/sites`
- `/sites/new`
- `/sites/[siteId]`
- `/sessions/[sessionId]`
- `/sessions/[sessionId]/export`

## Main Components

### Layout components

- `AppShell`
- `TopBar`
- `BottomNav`
- `OfflineStatus`

### Site components

- `SiteForm`
- `SiteList`
- `SiteCard`

### Session components

- `SessionSetupForm`
- `PointList`
- `PointCard`

### Chrono-counter components

- `ChronoCounterScreen`
- `Timer`
- `IntervalDots`
- `BatGroupCounter`
- `SpeciesCounter`
- `PointRemarks`
- `ValidatePointButton`

### Export components

- `ExportActions`
- `ExportPreview`

## Development Order

1. Create database tables.
2. Build `/dashboard`.
3. Build site CRUD.
4. Build session creation.
5. Build chrono-counter UI.
6. Save observations online.
7. Add local IndexedDB draft storage.
8. Add sync when back online.
9. Add CSV/JSON export.