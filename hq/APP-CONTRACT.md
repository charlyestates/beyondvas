# HQ prototype: how screens are built (the contract every app/*.js file follows)

The prototype is plain browser JavaScript, no framework, no modules. Files load in this order (see `body.html`): `data/*.js` (seed data into `window.HQD`; `data/academy.js` loads after `pipeline.js` and replaces `academyModules` (14: five foundation, nine ISA-track with `track: 'isa'`), `academyLessons` (62, kinds text/task/quiz/signoff, each with a bilingual `summary`) and `academyProgress`), `app/i18n.js` (strings into `HQ.T`), `app/core.js` (runtime), `app/channels.js` (chat, daily report, search), then the screen modules `app/home.js`, `app/people.js`, `app/hours.js`, `app/money.js`, `app/calendar.js`, `app/compliance.js`. Each screen module is an IIFE that registers views on `HQ.V` and actions on `HQ.act`, and may add strings with `Object.assign(HQ.T, {...})`. Read `app/core.js` and `app/channels.js` once before writing a module; they are the reference implementation.

## A view

```js
HQ.V.someScreen = function (params) {
  return {
    title: 'text or escaped html',   // h1 in the top bar (use HQ.esc on data)
    sub: 'escaped text',             // optional line under the title
    body: html,                      // the main content (string)
    actions: html,                   // optional icon buttons for the top bar (<button class="iconbtn" ...>)
    side: html,                      // optional desktop sidebar (300px); omit on phone (HQ.isPhone())
    pane: html,                      // optional right pane (340px, desktop only)
    wide: true,                      // optional: main content uses the full width instead of max 860px
    chat: true,                      // only for the chat layout
    after: function () {}            // optional: runs after the DOM is in place (focus, scroll, listeners)
  };
};
```

Navigation: `params` come from `data-go="screen" data-id="..."` attributes (every `data-*` becomes a param) or from `HQ.go('screen', {id: ...})`. `HQ.back()` pops history. The bottom tabs and the rail are defined in `HQ.NAV` (core.js); "More" lists the rest per role in `HQ.MORE`.

Actions: any element with `data-act="name"` calls `HQ.act.name(el, event)`; read parameters from `el.dataset`. After changing data call `HQ.render()`. Forms inside a sheet: `HQ.sheet(html, title)`, read values with `HQ.formVals(document.getElementById('sheet'))`, close with `HQ.closeSheet()`, confirm with `HQ.toast(msg)`. Nothing persists; mutate `HQD` in memory.

## Helpers (all in core.js)

- `HQ.me()` the current person (respects "view as"); `HQ.role()`; `HQ.isStaff()`; `HQ.realMe()`.
- `HQ.t('key')` UI string in the current language; `HQ.L(obj)` picks `{en, es}` from data; `HQ.esc(s)` escapes.
- `HQ.D`: `person(id)`, `client(id)`, `placement(id)`, `vas()`, `placementsOf(user)`, `activePlacements()`, `placementForVa(vaId)`, `placementForClient(clientId)`, `channelsFor(user)`, `channelName(c, viewer)`, `messagesIn(id)`, `unread(id, user)`, `unreadTotal(user)`, `notificationsFor(user)`, `can('bill'|'pay'|'margin'|'approve', user)`, `vaLabel(va, viewer)` (clients see first names only), `tierLabel(tier)`, `tierShort(tier)`, `today()`.
- `HQ.fmt`: `money(n)`, `rate(n)` ("$12/hr"), `hrs(minutes)` ("6h 50m"), `hdec(hours)`, `pct(x)`, `tz(tz)` ("PT"), `date(iso, 'long'|'full'|'num')`, `time(iso, tz)`, `time2(iso, otherTz)` (viewer's time with the other zone in small text), `clock('08:00', fromTz, toTz)`, `ampm('08:00')`, `rel(iso)`, `daysUntil(iso)`, `dayLabel(iso)` ("Today", "Tomorrow", else a date).
- `HQ.now()` is the prototype's clock (Wed 2026-10-21 15:35Z). `HQ.isoDate(iso)` gives 'YYYY-MM-DD'.
- `HQ.h` components: `avatar(personOrId, 'sm'|'lg'|'xl')`, `chip(text, 'good'|'warn'|'bad'|'blue'|'gold', dot)`, `statusChip(status)`, `badge(n)`, `kpi(value, label, kind)`, `card(inner, cls)`, `btn(label, act, 'btn-gold'|'btn-blue'|'btn-ghost'|'btn-danger'|' btn-sm'|' btn-lg', dataObj)`, `go(label, screen, paramsObj, kind)`, `li({lead, title, sub, trail, go, params, act, data})`, `table(cols, rows)` with `cols: [{l, num}]`, `empty(title, sub)`, `progress(pct, kind)`, `note(html, kind)`, `seg(options, activeValue, act, data)`, `field(label, inputHtml, hint)`, `sec(title, linkHtml)`, `person(p, sub)`.
- Icons: `HQ.I.name` (home, chat, report, hours, people, money, chart, calendar, inbox, bell, search, send, plus, clip, gear, shield, doc, school, check, x, flag, eye, lock, pin, user, globe, briefcase, chev, phone, camera, sparkle, steps, alert). Inside `.btn` and `.iconbtn` they size themselves; elsewhere set width/height inline.
- Money gate: `HQ.h.money('bill'|'pay'|'margin', value, {rate: true, mask: true})` renders the amount only when the viewer may see that kind (otherwise nothing, or "$ •••" with `mask`). Use it for every bill rate, pay rate, block amount, invoice, payout and margin.
- Work status: `HQ.status(placement)` → `{key: 'working'|'finished'|'notStarted'|'off'|'paused'|'ended', live, text, since, at, tz, minutesToday, lastActivityMin}` computed from today's time entries; `HQ.h.statusPill(placement)` renders the pill with its detail line. Add the class `live` to an avatar wrapper to show the green pulsing dot when `status.live`.
- Navigation per role is `HQ.navFor(role)` (DESIGN-SPEC §2): owner Home / Chat / Clients / Money / More; manager Home (inbox) / Chat / Hours / People / More; VA Home / Chat / Report (raised, Academy instead for bench and onboarding VAs) / Hours / Me (= `profile`); client Home / Chat / Hours / Billing / Help (+ an outlined red Escalate pill in every client top bar, added by core); applicant Home / Tests / Academy / Me. "More" lists the rest (`HQ.MORE`).
- From channels.js: `HQ.todayReport(placementId)`, `HQ.lastReportFor(placementId)`, `HQ.channelForPlacement(placementId)`, `HQ.isPhone()`, screens `channels`, `channel`, `search`, `report` (VA form; staff and clients see today's report status), `announce` (owner/manager post in both languages).

## Screen names (so links between modules agree)

core: `home`, `more`, `notifications`, `missing`. channels.js: `channels`, `channel`, `search`, `report`, `announce`. home.js: `home` (role-aware), `inbox`. people.js: `people`, `person`, `client`, `clients`, `profile`, `pipeline`, `applicant`, `bench`, `academy`, `cohorts`, `documents`, `onboarding`, `tests`. hours.js: `hours`, `week`, `placements`, `placement`, `outages`. money.js: `money`, `billing`, `invoice`, `payouts`, `statement`, `reports`, `settings`. calendar.js: `calendar`, `timeoff`, `event`. compliance.js: `compliance`, `scope`, `telemarketing`, `callqa`, `tickets`, `ticket`, `audit`, `support`, `help`.
- Escalation from a client: `HQ.act['open-escalate']` must exist (compliance.js provides it); the client channel's compose bar calls it with `data-id` = placement id.
- `HQ.inboxCount()` and `HQ.pendingWeeks()` are optional globals the rail badges call if defined (manager inbox count, pending week approvals).

## Rules that must hold on every screen

1. **Money by role.** Bill rates, block amounts and invoices: owner and client only (`HQ.D.can('bill')`). Pay rates, payout lines and statements: owner, manager and the VA themself (`can('pay')`). Margin: owner only (`can('margin')`). A VA screen never shows a bill rate; a client screen never shows a pay rate or another client. When a value is not allowed, leave it out entirely (no "hidden" placeholder).
2. **Clients see first names.** Use `HQ.D.vaLabel(va)` whenever a VA is shown to a client.
3. **Bilingual.** Every UI label through `HQ.t()` with a key in `HQ.T` (add keys with `Object.assign(HQ.T, {...})` in the module; both `en` and `es`, natural Latin American Spanish). Data strings through `HQ.L()`.
4. **Time zones.** Schedules are stored in the client's zone. Show times in the viewer's zone and add the other zone in small text when it differs (`HQ.fmt.time2`, `HQ.fmt.clock`).
5. **Phone first.** Content stacks in one column under 900px; tables that would overflow go in `h.table` (scrolls) or become `h.li` rows. No fixed widths over 100%.
6. **Escape data.** Every data string goes through `HQ.esc` (or `h.*` helpers that escape). Never inject raw text.
7. **Empty and "view as".** Every list handles zero items with `h.empty`. Screens must work for every person in `HQ.PICK` (including applicants and bench VAs): check `HQ.me().role` and degrade gracefully.
8. **No network, no storage.** Buttons that would upload, pay or email show `HQ.toast(HQ.t('prototypeOnly'))` or mutate in-memory data and re-render.

## Checking a module

Build and open the debug page in headless Edge from the repository root:

```powershell
powershell -NoProfile -File hq\build.ps1
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$u = "file:///" + ((Resolve-Path hq\debug.html).Path -replace '\\','/') + "?user=u-daniela&screen=inbox&lang=es"
& $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --dump-dom $u | Out-File -Encoding utf8 hq\dom.txt
# errors: look for <pre id="errlog">...</pre> in hq\dom.txt (empty = clean)
New-Item -ItemType Directory -Force hq\shots | Out-Null
& $edge --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=4000 --window-size=1280,900 --screenshot="$PWD\hq\shots\inbox-desktop.png" $u
```

Query parameters: `user` (any id from core.js people), `screen`, `id`, `q`, `lang` (en|es), `theme` (light|dark). For a phone-width screenshot open `hq/phone.html?...` (same parameters), which frames the page at 390×844.
