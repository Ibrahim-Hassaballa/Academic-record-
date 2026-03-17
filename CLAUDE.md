# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack bilingual (Arabic RTL / English) educational portal inspired by KSU EduGate. It has four features: Login with 2FA, Student Dashboard, Course Registration, and Academic Plan viewer (Master's in Accounting).

## Commands

### Development (run both simultaneously)
```bash
# Terminal 1 — Backend (Express on :3001)
cd server && npm run dev

# Terminal 2 — Frontend (Vite on :5173)
npm run dev

# Or run both together from root
npm run dev:all
```

### Build & Lint
```bash
npm run build      # TypeScript check + Vite build (frontend)
npm run lint       # ESLint on src/
cd server && npm run build   # TypeScript build (backend)
```

## Architecture

### Frontend (`src/`)
- **React + Vite + TypeScript** with Tailwind CSS
- **Routing**: React Router v6 — `/login` (public), `/dashboard`, `/courses`, `/academic-plan`, `/academic-record` (all protected via `ProtectedRoute`)
- **Auth**: `AuthContext` holds `user` + `accessToken` in `sessionStorage`. Two-step flow: `login()` gets `tempToken`, then `verify2FA()` gets the full `accessToken`.
- **i18n**: `i18next` + `react-i18next`. Locale files in `src/i18n/locales/ar.json` and `en.json`. `LanguageContext` flips `document.documentElement.dir` between `rtl`/`ltr`.
- **API calls**: All go through `src/services/api.ts` — a thin fetch wrapper that attaches the Bearer token and redirects to `/login` on 401.
- **Layout**: `AppShell` wraps all authenticated pages with a collapsible `Sidebar` and `TopBar`.

### Backend (`server/src/`)
- **Express + TypeScript** on port 3001
- **No database** — all data is in-memory in `server/src/data/`. Enrollments persist only while the server is running.
- **Auth flow**: `POST /api/auth/login` → tempToken (5min JWT). `POST /api/auth/verify-2fa` → full accessToken (24h JWT). Protected routes use `authMiddleware` which validates the access token.
- **Mock data**: Demo credentials are `441234567` / `pass123` → 2FA code `123456`

### API Endpoints
| Method | Path | Auth |
|--------|------|------|
| POST | `/api/auth/login` | No |
| POST | `/api/auth/verify-2fa` | No |
| GET | `/api/student/profile` | Bearer |
| GET | `/api/student/announcements` | Bearer |
| GET | `/api/courses` | Bearer |
| POST | `/api/courses/register` | Bearer |
| DELETE | `/api/courses/drop/:courseId` | Bearer |
| GET | `/api/academic-plan` | Bearer |
| GET | `/api/academic-record` | Bearer |

### Vite Proxy
`/api` requests are proxied to `http://localhost:3001` in development — no absolute URLs needed in frontend services.

### KSU Color Tokens (Tailwind)
- `ksu-green`: `#006633` (primary)
- `ksu-dark`: `#004422` (active/hover)
- `ksu-gold`: `#C8A84B` (accent)
- `ksu-light`: `#E8F5E9` (background tint)
- `ksu-blue`: `#0084bd` (academic record accent)

## Key Files
- `src/types/index.ts` — shared TypeScript interfaces (frontend)
- `server/src/types/index.ts` — same interfaces (backend)
- `server/src/data/academicPlan.ts` — Master's in Accounting plan (5 semesters, 33 credit hours)
- `server/src/data/academicRecord.ts` — per-semester transcript with grades, GPA, scores
- `server/src/data/enrollments.ts` — mutable in-memory enrollment state
- `src/contexts/AuthContext.tsx` — auth state and two-step login logic
- `src/contexts/LanguageContext.tsx` — AR/EN toggle with RTL direction switching
