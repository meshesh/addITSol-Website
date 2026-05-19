# PRD — Add IT Solutions (Enterprise Consulting Website)

## Problem Statement
Build a premium, mobile-first enterprise consulting website for "Add IT Solutions" positioning the company as a delivery transformation partner (Agile Transformation, PMO Consulting, Project Delivery Consulting, Specialized Project Resources). Aesthetic: dark enterprise editorial (IBM / McKinsey / Linear / Stripe Enterprise). Must NOT feel like a training institute, staffing agency, generic IT services firm, or SaaS landing page.

## Locked Brand System
- Palette: #071120 background, #0F1B33 surface, #E7B85C accent gold, #B8C2D1 supporting gray, #4D7CFE interactive blue.
- Typography: Sora (headings) + Inter (body) via Google Fonts.
- Framer Motion approved for subtle reveals.

## User Personas
- **Enterprise decision maker** (CIO, VP Delivery, Head of PMO) browsing on mobile to evaluate a transformation partner.
- **Operational owner** seeking specialized PM/Agile resources for an active program.
- **Inbound lead** filling the consultation form for a discovery call.

## Architecture
- Backend: FastAPI + MongoDB. Lead endpoint `/api/leads` fans out concurrently to Telegram, Resend email, and Google Sheets — each integration gracefully skips if env vars are blank.
- Frontend: React 19 single-page site (smooth scroll anchors) with `BrowserRouter`. Components under `/app/frontend/src/components/site/`.

## What's Been Implemented (2026-02)
- Backend `/api/leads` (create + list), `/api/options` (dropdowns).
- MongoDB persistence with timezone-aware ISO timestamps and `_id` excluded.
- Telegram (httpx), Resend email (httpx), Google Sheets (gspread + service account) — all optional via env.
- Frontend single-page landing: Navbar with scroll blur + mobile overlay, Hero with workflow background visual, Trust Metrics with animated counters (horizontal scroll on mobile / asymmetric grid on desktop), Services (4 cards), Agile Transformation capabilities grid, PMO Governance, Resources accordion (9 roles), Why Choose Us (8 points editorial grid), Engagement Models (5 cards), Consultation Form with conditional resource dropdown + WhatsApp link (non-green), Final CTA, Footer with LinkedIn.
- Toaster (sonner) themed dark for form feedback.
- `data-testid` attributes across every interactive and key info element.

## Core Requirements (Static)
- Mobile-first; desktop is an enhanced extension.
- No prohibited imagery (handshakes, AI robots, coding screens, bright startup gradients).
- WhatsApp link styled as elegant secondary link (no bright green button).
- Single-page, smooth scroll, anchor nav.

## Prioritized Backlog
- **P1**: Wire real Telegram bot token + Resend API key + Google Sheets credentials once user provides them.
- **P1**: Replace placeholder contact (email/phone/WhatsApp number) with real details.
- **P2**: Admin dashboard for leads (currently `/api/leads` GET available; no UI).
- **P2**: Add LinkedIn URL, social proof / client logos strip, case studies section.
- **P2**: Microsite for each service (multi-page expansion).

## Next Tasks
1. Collect real credentials and update `/app/backend/.env`.
2. Optional: case-studies / client logos band beneath Trust Metrics.
3. Optional: SEO meta tags + OpenGraph image.
