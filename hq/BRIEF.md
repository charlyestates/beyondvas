# BeyondVAs HQ: brief for the clickable prototype

BeyondVAs places bilingual (English/Spanish) virtual assistants and inside sales agents (ISAs) from Honduras and across Latin America with US real estate teams. The company invoices the client, pays the VA, tracks hours with a time tracker (Hubstaff) that takes screenshots about every two minutes, and gives a 90-day fit guarantee plus a 9-month replacement guarantee. HQ is the back office: one home-screen web app (phone first) where everyone works, with a Slack-style channels feature at its heart. The prototype is a single HTML page with seed data, no backend.

Today in the prototype is **Wednesday, October 21, 2026**. The current billing block runs October 12 to 25; the next block (October 26 to November 8) was invoiced on October 19.

## Who uses it and what each one must never see

| Role | Who | Sees | Never sees |
| --- | --- | --- | --- |
| Owner | Charly (founder, Beyond Estates, Palmdale CA) | Everything: bill rates, pay rates, margins, all channels, settings, payouts, Stripe | |
| Manager | Daniela (operations lead in Tegucigalpa, Honduras) | Every VA and placement, channels, hours approval, recruiting, academy, support threads, VA pay rates | Bill rates and margins; Stripe and bank |
| VA | A placed or bench VA | Own profile, documents, placement and schedule, the channel with their client, own hours and payout statements, academy, a private support thread with the manager, calendar | Any other VA's pay, any client's bill rate, any other client's channel |
| Client | Agent, team leader or broker (a client team can have several logins) | Their placements: the VA's first name, role and avatar; hours approved and pending; a link to screenshots in the tracker; daily reports; their channel; blocks and invoices; their state scope card; one Escalate button | The VA's pay rate, other clients, recruiting, documents, margins |
| Applicant | Someone who applied on beyondvas.com | Their application steps, status and tests; the academy once accepted | Everything else |

Rules: one login, one language setting per person. The client sees the VA's first name, role and avatar only. The manager has a "view as client" button on every placement. Pay rate and bill rate are stored apart; margin is computed, never stored. Screenshots never enter HQ; HQ links to the tracker.

## Modules

1. **Channels** (the Slack replica): #announcements (everyone reads, owner and managers post, both languages), #team (all VAs and managers), one client channel per placement named "Client · <VA first name>" (client logins, the VA, the manager, the owner), direct messages, and a private support thread per VA with topics pay, client, HR, tech. Unread badges, @mentions (@manager reaches the assigned manager), reactions, attachments up to 25 MB, search within what you may see. Clients get an email digest after 30 minutes unread; VAs and managers get push. Placement channels are archived 90 days after the placement ends; messages are never deleted. Deliberately absent: nested threads, custom emoji, apps, voice.
2. **The daily report is a form, not a message.** The VA taps Report, fills three boxes (done today, blocked, tomorrow) and, for ISAs, four numbers (dials, conversations, appointments set, appointments held). HQ posts it into the client channel as a formatted report message and keeps the numbers for weekly and 30-day reviews. No report by 7 PM in the client's time zone: the VA and the manager are notified.
3. **People**: profiles with role, status (applicant, onboarding, bench, placed, inactive), language, time zone, country, city, WhatsApp, skills, tools, industries, level, buddy, pay-rate history (hidden from clients), availability window, equipment and internet check, review dates.
4. **Recruiting pipeline**: stages draft, submitted, scored, interview, trial, offer, active, placed, talent_pool. Scores on spoken English, Spanish, presence, followed the brief, accomplishment, setup, plus typing, written English and mock call. Notes, stage history, expected reply date, cohort, source.
5. **Academy and onboarding**: 5 modules, 15 lessons (video, text, quiz, sign-off, task); 8 onboarding tasks (check, link, upload); certification flips the VA to bench; ISA track adds a supervised-dialing log and an ISA-certified flag. Bench page lists certified unplaced VAs with role, country, time zone, availability, English score and video link.
6. **Placements**: VA, client team, role tier (admin $8, operations $10, ISA $12 per hour billed), hours per week, schedule stored in the client's time zone and shown in the VA's, bill rate (client side) and pay rate (VA side), expectations in both languages, checkpoints at day 5, 14, 30 and 90, the 90-day fit window and the 9-month replacement window both counted from the first VA's start date on that seat (replacements are chained), status active, paused, ended.
7. **Hours**: nightly import from the tracker into time entries per placement (date, start, end, minutes, activity %, on-call minutes for ISAs); low-activity flags outside call time; an outage log (power, internet) with reasons; every Monday the manager approves the previous week per placement, which locks it and records who and when; manual edits need a reason.
8. **Billing**: prepaid two-week blocks (scheduled hours × bill rate), Stripe invoice issued 5 business days before the block starts, webhook marks paid or failed, failed card retries, a block unpaid when it starts pauses the placement and notifies both sides. True-ups (approved minus scheduled hours) become a credit or debit on the next block, never a refund. One-time $499 setup fee per client at signing.
9. **Payouts**: on the 5th and 20th HQ computes approved hours × pay rate plus bonuses per VA, builds a payout run (Mercury wire file or Payoneer) and a statement the VA sees; the VA uploads an invoice against it.
10. **Documents**: per person and per client: type (ID, police record, W-8BEN, contractor agreement, confidentiality addendum, client agreement, telemarketing addendum, data addendum), file, signed date, expiry, status; reminders 60 days before expiry; W-8BEN expires at the end of the third calendar year after signature.
11. **Calendar**: events (meeting, training, payday, holiday, social, time off, interview, deadline) with audience all, channel or user, RSVPs; holiday sets per country and per client (the VA works the client's calendar; Honduran holidays are unavailable days declared 10 business days ahead); checkpoint events created from placements.
12. **Compliance and quality**: scope card per placement from the client's state (Texas and Florida presets limit outbound calling by unlicensed assistants; California preset; other states default to inbound and admin until reviewed); telemarketing file per client (last Do-Not-Call scrub date, outbound blocked when older than 31 days, list source, approved scripts with versions, consent records, calling hours, addendum date, recording-consent practice); call QA: the manager scores 3 recorded calls per ISA per week (identification within 30 seconds, script adherence, DNC and opt-out handling, recording disclosure, appointment handoff), two failing weeks open a coaching ticket.
13. **Escalations and replacements**: client taps Escalate → ticket with a 1-business-day acknowledgment clock and a 5-day fix window → coaching plan → replacement workflow (candidates within 10 business days) → chained placement. Offboarding checklist: vault user removed, tracker deactivated, client confirms seats disabled, data-return attestation signed, final payout date, channel archived.
14. **Reports (owner)**: margin per placement, utilization, churn, pipeline, bench, capacity. Client pulse: one 1-to-5 question in each client channel on the 1st of the month.
15. **Referrals**: records and credits for clients and VAs.
16. Security: MFA for owner and manager, row-level security, audit log for rates, placements, payouts, hours edits.

## Style and content rules for everything generated

- Bilingual: every system-generated string has `en` and `es` variants (objects `{en:'…', es:'…'}`). Human messages are written in one language, the one that person speaks (Honduran VAs write Spanish to the manager and English to clients; clients write English; the manager writes both).
- Spanish is Latin American, natural, with correct accents; English is plain and friendly.
- Names are fictional placeholders (the real team's names come later). No real phone numbers, emails or addresses: use `name@example.com` and `+504 9xxx-xxxx` style placeholders.
- Never invent policies beyond this brief. Rates: bill $8 admin, $10 operations, $12 ISA per hour; pay band $4.50 to $7.00 per hour; setup fee $499; blocks of two weeks; paydays 5th and 20th; two-week notice to cancel.
- No screenshots are stored; refer to "View screenshots in Hubstaff".
- Money in US dollars, numbers as JS numbers, dates as ISO strings. Times carry the client's time zone offset (Pacific is -07:00 in October, Central -05:00, Eastern -04:00; Honduras is -06:00 all year).

## Data conventions for the seed files

- Each seed file is plain browser JavaScript (no modules, no imports, no `export`), ES2018 syntax, that starts with `window.HQD = window.HQD || {};` and then assigns `HQD.<key> = …` object or array literals. Nothing else executes.
- All IDs for people, clients, placements and channels come from `hq/data/core.js` and must be used exactly. New IDs you mint use the prefixes given in your task.
- Keep files under about 60 KB each. Prefer realistic variety over volume.
