# BeyondVAs: handoff for the person building this with Charly

Everything in this folder was built with Claude Code in October 2026. This page says what is here, what is decided,
what is still open, and how to pick it up from your own machine or cloud.

## The company in one paragraph

BeyondVAs places bilingual (English/Spanish) virtual assistants and inside sales agents from Honduras and across Latin
America with US real estate teams (other industries welcome). BeyondVAs invoices the client in prepaid two-week blocks,
pays the VA on the 5th and 20th, tracks hours with Hubstaff (screenshots about every two minutes), and backs every
seat with a 90-day fit guarantee and a 9-month replacement guarantee. Pricing is shared on the sales call, never on
the website. The founder is Charly (Beyond Estates, Palmdale CA); a partner on the ground in Honduras leads recruiting.

## What is in this folder

| Path | What it is | Status |
| --- | --- | --- |
| `beyondvas/` | The public website (single page, Netlify Forms). `site/index.html` is the deployable file; `README.md` has the launch steps and the three placeholders to replace. | Done, not deployed |
| `hq/` | The clickable prototype of the back office (BeyondVAs HQ). `README.md` lists every file; `BRIEF.md`, `DESIGN-SPEC.md` and `APP-CONTRACT.md` are the product brief, the screen spec and the coding rules the real app should keep. | Version 4 published |
| `hq/data/academy.js` | The academy curriculum: five foundation modules (from the VA Hub) and nine ISA-track modules carried over from the Beyond HQ agent training, de-branded. | Content final, pending Charly's read |
| `tools/` | Research digests behind the business plan (competitors, US and Honduran law, payments, monitoring, rates, conversion). | Reference |

Living documents on claude.ai (ask Charly for access):

- Business plan and launch blueprint: https://claude.ai/code/artifact/7a80c06d-ad7c-49df-85a9-4f851ec91486
- HQ blueprint (the back office, data model, build plan): https://claude.ai/artifact/JX14HjyMHMzAzHjCXwsmT8
- Legal drafts for attorney review: https://claude.ai/artifact/CZZodB1RcPdWJDjoNZ6fFQ
- The website as published: https://claude.ai/artifact/53sD5CBPnrWU8eKTCDKyMd
- The HQ prototype as published: https://claude.ai/artifact/JfDqhq9KuabGazh8EehSHA

## The real app already started

The production VA Hub lives at `C:\Users\Charlie\Desktop\beyond-va-hub` on Charly's computer: Vite + React 19 +
TypeScript, Supabase project `beyond-va-hub` (ref `cmzsrgpgicypyzyewnao`), Netlify project `beyond-va-hub`, 33 tables
already migrated (profiles, applications pipeline, channels and messages, support threads, events, academy, onboarding,
client teams, placements). Its `README.md` explains local development (a portable Node 22 lives in
`%LOCALAPPDATA%\Programs\node`) and deployment. The HQ blueprint's "Data model" section lists what to add to that
schema; the prototype's `data/*.js` files show the shapes with realistic values.

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
- beyondvas.com has no mailbox yet (no MX records), so no HQ email can go out until that is set up.
- Real names, photos and the US business address for the website; the booking link.

## How to work on it together

The source lives at `C:\Users\Charlie\Desktop\beyondvas` on Charly's computer (this folder). Git and the GitHub CLI
were not installed there as of October 22, 2026; `winget` is, so Git installs with one command.

1. Charly installs Git, turns this folder into a repository and pushes it to a private GitHub repository, then adds
   you as a collaborator (repository Settings, Collaborators):

   ```powershell
   winget install --id Git.Git -e --source winget
   ```

   then, in a new terminal opened in this folder (create the empty private repository on github.com first, with no
   README, and put its address in the `remote add` line):

   ```powershell
   git init -b main
   git add .
   git commit -m "BeyondVAs: website, HQ prototype, research and handoff"
   git remote add origin https://github.com/<your-github-user>/beyondvas.git
   git push -u origin main
   ```

2. You clone it, or open it as a Claude Code cloud session from the repository. Start with `HANDOFF.md` (this file),
   `hq/README.md` and `hq/APP-CONTRACT.md`; run `powershell -File hq\build.ps1` or open `hq/local.html` to see the
   prototype. Nothing needs installing to run it.
3. Work in branches and pull requests, one screen or module at a time. The prototype's `hq/tools/*.js` files show
   the automated checks that were run (headless Edge sweeps for errors, placeholders, privacy strings, screenshots).
4. For the real app, start from the VA Hub repository rather than from scratch: extend its schema per the blueprint,
   and port screens from the prototype one by one, keeping the rules in `hq/APP-CONTRACT.md` (money by role, first
   names for clients, bilingual strings, two time zones, phone first).
5. The published prototype link (https://claude.ai/artifact/JfDqhq9KuabGazh8EehSHA) is private to Charly's account
   until shared from its Share menu; the files in `hq/` are the same thing and need no account.
