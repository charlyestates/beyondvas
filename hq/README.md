# BeyondVAs HQ: clickable prototype

The back office described in the HQ Blueprint, as a single web page with seed data. No backend, no login: a role
switcher stands in for sign-in, and nothing a person does inside it is saved. Published as a Claude artifact at
https://claude.ai/artifact/JfDqhq9KuabGazh8EehSHA; the same files run from any static host or from disk.

## What is in this folder

| Path | What it is |
| --- | --- |
| `index.html` | The page as published (artifact format: no doctype or head wrapper). Built from `head.html` + `body.html` by `build.ps1`. |
| `local.html` | The same page as a complete HTML document, for a static host or for opening from disk. |
| `debug.html` | `local.html` plus an error log and URL parameters (`?user=&screen=&id=&lang=&theme=&script=`) used by the automated checks. |
| `head.html` | Title, fonts, all CSS: the Beyond Estates light theme and the black-and-gold dark theme, the app frame (rail, sidebar, main, tabs), chat, cards, forms. |
| `body.html` | The script tags in load order and `HQ.boot()`. |
| `app/i18n.js` | Shared UI strings, English and Spanish side by side. Each module adds its own. |
| `app/core.js` | Runtime: state, language, routing, formatting (money, hours, dates, two time zones), data access with the role rules, the frame, sheets and toasts, the role picker, `HQ.status` (working now / finished / not started) and `HQ.h.money` (who may see which amount). |
| `app/channels.js` | The Slack-style channels: list, conversation, report cards, compose, reactions, search, the daily report form, announcements. |
| `app/home.js` | Home per role (owner Today, VA Today, client My VA, applicant My steps) and the manager inbox. |
| `app/people.js` | Clients, people directory, person, profile, pipeline, applicant card, bench (call mode), academy and cohorts, documents, onboarding, tests. |
| `app/hours.js` | Hours per role, the Monday approval that locks a week, manual edits with a reason, placements, the placement page with "View as client", the outage log. |
| `app/money.js` | Money hub, blocks and invoices, invoice detail, payout runs and statements, owner reports, settings. |
| `app/calendar.js` | Calendar with two holiday sets, events with RSVP, time off and the 10-business-day rule. |
| `app/compliance.js` | Scope cards, telemarketing files, call QA, tickets and the escalate flow, audit log, support threads, the client Help tab. |
| `data/core.js` | The fixed people, clients, placements, channels, support threads, rates. Every other file refers to these ids. |
| `data/messages.js`, `hours.js`, `pipeline.js`, `calendar.js`, `compliance.js` | Seed data per area, generated against `BRIEF.md`. |
| `data/academy.js` | The academy curriculum (five foundation modules from the VA Hub, nine ISA-track modules carried over from the Beyond HQ training, de-branded) and everyone's progress. Loads last and replaces the academy keys. |
| `data/check.html` | Loads every seed file and reports errors and unknown ids. |
| `BRIEF.md` | The product brief and data conventions the generators followed. |
| `DESIGN-SPEC.md` | The screen spec (navigation, home screens, channel view, report form, every other screen by role, shared components, what was left out). |
| `APP-CONTRACT.md` | How a screen module is written and the rules every screen must follow (money by role, first names for clients, bilingual, time zones, phone first). |
| `tools/` | The workflow scripts that generated and reviewed the prototype (`wf-*.js`) and the check scripts that were run against it (error scans, layout and phone audits, privacy sweeps, flow checks). |
| `shots/` | Reference screenshots of the main screens: desktop and phone, light and dark, per role. |

The check scripts write their DOM dumps (`dom*.txt`) and temporary folders next to `debug.html`; Git ignores them.

## Language, people and "view as client"

- The EN | ES tabs in every top bar set the interface language for the viewer; the choice sticks across person switches. With no choice made, the app follows the person's own profile language (Charly and the client logins are English; Daniela and the VAs are Spanish). The "Open HQ as…" picker has a row to return to "each person's own".
- Owner and manager can open any placement and press "View as client": the client's screens render exactly as the client sees them, read-only, and amounts are masked for the manager ("$ •••") because managers never see bill rates.

## Names are placeholders

Every person except Charly is fictional (Daniela, Mariela, José, Andrea, Kevin, Lucía, Carlos, Fernanda, the client
contacts, the applicants). Phone numbers and emails are `example.com` and `9xxx` placeholders. Bill rates are the
decided $8 / $10 / $12 tiers; pay rates are example values inside the $4.50 to $7.00 band and are easy to change in
`data/core.js`.

## Running it locally

Open `local.html` in a browser (double-click works; the fonts need internet). To rebuild after editing `head.html`,
`body.html` or any file they reference, run from the repository root:

```powershell
powershell -NoProfile -File hq\build.ps1
```

## Checking a change

```powershell
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$u = "file:///" + ((Resolve-Path hq\debug.html).Path -replace '\\','/') + "?user=u-daniela&screen=inbox&lang=es"
& $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --dump-dom $u | Out-File -Encoding utf8 hq\dom.txt
```

`hq\dom.txt` then holds the rendered page; an empty `<pre id="errlog">` means no JavaScript errors. `hq/phone.html`
with the same parameters frames the page at 390 × 844 for phone screenshots (`--screenshot=path.png`).

## How this relates to the real VA Hub

The real app is a separate project, `beyond-va-hub` (Vite + React + Supabase, project `beyond-va-hub`), not in this repository.
Its schema already covers people, applications, channels and messages, support threads, events, academy, onboarding,
client teams and placements. The prototype's extra areas (client logins, hours import and approval, blocks and
invoices, payouts, documents with expiry, scope cards and telemarketing files, tickets, audit log) are the tables the
HQ Blueprint lists under "Data model", and the academy content in `data/academy.js` maps one to one onto the Hub's
`academy_modules` and `academy_lessons` tables.
