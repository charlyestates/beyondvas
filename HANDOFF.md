# BeyondVAs: handoff for the person building this with Charly

Everything in this repository was built with Claude Code in October 2026. This page says what is here, how to get in,
what to finish first, what is decided and what is still open.

## The company in one paragraph

BeyondVAs places bilingual (English/Spanish) virtual assistants and inside sales agents from Honduras and across Latin
America with US real estate teams (other industries welcome). BeyondVAs invoices the client in prepaid two-week blocks,
pays the VA on the 5th and 20th, tracks hours with Hubstaff (screenshots about every two minutes), and backs every
seat with a 90-day fit guarantee and a 9-month replacement guarantee. Pricing is shared on the sales call, never on
the website. The founder is Charly (Beyond Estates, Palmdale CA); a partner on the ground in Honduras leads recruiting.

## What is in this repository

| Path | What it is | Status |
| --- | --- | --- |
| `beyondvas/` | The public website: one file, `beyondvas/site/index.html`, with Netlify Forms. `beyondvas/README.md` covers the launch to-do list, the forms and deployment. | Copy done, launch items left, not deployed |
| `hq/` | The clickable prototype of the back office (BeyondVAs HQ). `hq/README.md` lists every file; `BRIEF.md`, `DESIGN-SPEC.md` and `APP-CONTRACT.md` are the product brief, the screen spec and the coding rules the real app should keep. | Version 4 |
| `hq/data/academy.js` | The academy curriculum: five foundation modules and nine ISA-track modules adapted from the Beyond HQ agent training, with all team-specific material removed. | Content final, pending Charly's read |

Kept out of the repository on purpose: the business plan PDF, the research digests behind it and a copy of the Beyond
HQ training source. They hold internal financials and real third-party contact details. Ask Charly for the business
plan link below if you need the background.

Living documents on claude.ai, private to Charly until shared from each page's Share menu:

- Business plan and launch blueprint: https://claude.ai/code/artifact/7a80c06d-ad7c-49df-85a9-4f851ec91486
- HQ blueprint (the back office, data model, build plan): https://claude.ai/artifact/JX14HjyMHMzAzHjCXwsmT8
- Legal drafts for attorney review: https://claude.ai/artifact/CZZodB1RcPdWJDjoNZ6fFQ
- An earlier preview of the website (the repository is the source now): https://claude.ai/artifact/53sD5CBPnrWU8eKTCDKyMd
- The HQ prototype as published: https://claude.ai/artifact/JfDqhq9KuabGazh8EehSHA

## Getting access

1. The code lives in the private GitHub repository https://github.com/charlyestates/beyondvas. Charly pushes new work
   from the folder on Charly's computer with `git push`.
2. Charly adds you: the repository's Settings, then Collaborators, then Add people, with your GitHub username or email.
   You accept the invitation from the email or from github.com/notifications.
3. To work in the cloud with Claude Code on the web, you need a Claude Pro, Max, Team or Enterprise plan. Go to
   claude.ai/code, sign in, approve the GitHub connection, and pick `beyondvas` in the repository selector. A private
   repository only appears once the Claude GitHub App is installed on the account that owns it, so Charly installs
   the app on Charly's own GitHub account and gives it access to `beyondvas`. If that is not possible, you can install the
   GitHub CLI, run `gh auth login`, then run `/web-setup` in the Claude Code terminal app; cloud sessions then use
   your own GitHub access instead of the app.
4. To work on your own computer instead, clone it with `git clone https://github.com/charlyestates/beyondvas.git` and
   open the folder in Claude Code or any editor.

The first commit (October 24, 2026) still holds an earlier snapshot: an old copy of the website with the hourly rates,
the retired artifact files and outdated screenshots. None of it is current; do not deploy anything from that commit.

Sessions on the web push their work to a branch and offer a Create PR button, so Charly can review on GitHub before
anything is merged. Nothing needs installing to look at either piece: open `beyondvas/site/index.html` or
`hq/local.html` in a browser.

## First job: finish the website

Edit `beyondvas/site/index.html` directly; there is no build step. `beyondvas/README.md` has the full list. In short:

- Set up the `hello@beyondvas.com` mailbox (the domain has no MX records yet) or change the address.
- Add a phone number for texting and a US business address to the footer, and a calendar link if Charly wants one.
- Link the privacy policy and terms once the attorney-reviewed versions are ready.
- Add a share image, `og:url` and `twitter:card` once the domain is final, plus an apple-touch icon.
- Link or remove Beyond Movers and Beyond Renovation in the footer.
- Ask Charly about the hero's example dashboard, testimonials and social links.
- Deploy `beyondvas/site` to Netlify, turn on form detection, add the three form notifications and test each form.

Rules that do not change: no hourly rates or setup-fee amounts anywhere on the site, and VAs are described as being in
Honduras and across Latin America, covering every US time zone.

## Working on it together

- One branch and pull request per section or screen.
- The prototype's checks are in `hq/tools/` (see its README). They need Windows with Microsoft Edge. `hq/build.ps1`
  runs under Windows PowerShell or PowerShell 7 (`pwsh`). Cloud sessions run Linux with Node.js but no PowerShell, so
  edit `hq/head.html` or `hq/body.html` there only if you can rebuild locally or add `pwsh` in the environment's
  setup script; the data and app files under `hq/data` and `hq/app` need no rebuild.
- For the real back office, start from Charly's existing VA Hub project rather than from scratch. It is a separate
  repository (`beyond-va-hub`: Vite + React 19 + TypeScript, Supabase, Netlify, 33 tables already migrated for
  profiles, the applications pipeline, channels and messages, support threads, events, academy, onboarding, client
  teams and placements). Ask Charly to push it to GitHub and add you when you start on it. The HQ blueprint's "Data
  model" section lists what to add; port screens from `hq/` one by one, keeping the rules in `hq/APP-CONTRACT.md`
  (money by role, first names for clients, bilingual strings, two time zones, phone first).

## Decisions already made (October 2026)

- Website shows no rates; pricing only on the call. VAs come from several countries and cover all US time zones.
- Bill rates: admin $8, operations $10, ISA $12 per hour; $499 one-time setup; prepaid two-week blocks; two weeks' notice.
- The back office is BeyondVAs HQ at hq.beyondvas.com, a separate app from Beyond HQ (the agents' coaching dashboard).
- Hubstaff for client seats (API for the nightly hours import).
- Clients get their own login at launch, before the first invoice.
- The manager approves each week of hours; the client can dispute within 3 business days; approval locks the week.
- VAs and clients talk only inside the client channel; no direct messages between them.
- Charly builds in Claude Code with a collaborator through GitHub.
- The academy reuses the Beyond HQ training minus everything team-specific (see `hq/data/academy.js` and the blueprint).

## Still open

- What the Honduras manager sees about money (pay rates only, or everything).
- Payout rail (Mercury wires plus Payoneer, or Payoneer only); message retention; whether bench time is paid.
- The pay band and whether the $8 admin tier stays; outbound-calling policy for Texas and Florida (attorney).
- beyondvas.com has no mailbox yet (no MX records), so no email can go out from it until that is set up.
- Real names, photos and the US business address for the website; whether to add a calendar link.
