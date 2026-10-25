# BeyondVAs HQ · Design spec for the clickable prototype

Single HTML page, seed data in `hq/data/*.js`, no backend, no login. Ids come from `hq/data/core.js` and are used exactly. Tokens and classes come from `hq/head.html` unchanged (`.tabs`, `.badge.blue/.gold`, `.avatar`, `.chip`, `.kpi`, `.btn-gold`, `.report`, `.msg.system .pill`, `.compose`, `.sheet`, `.rolepick`, `.kanban`, `.cal`, `.steps`, `.timeline`, `.lock`, `.money`, `.scope-list`, `.pinbar`, `.unread-line`, `.seg`, `.toggle`, `.note`, `.empty`, `.progress`, `.tbl`, `.li`).

**Prototype clock (do not change):** `HQ.now()` = Wed 2026-10-21 08:35 PT · 09:35 Honduras · 10:35 CT · 11:35 ET. All three VAs are on the clock; no report is in yet today; yesterday Tue Oct 20 José sent none (seed example for the manager inbox).

**Structure chosen:** the phone-first proposal's skeleton (five labelled tabs, pinned client channel, raised gold Report tab, two-level badges, report form). Grafted: the client-first proposal's client projection, status vocabulary, Escalate fork, audience-tagged system cards and outage form; the ops-first proposal's manager inbox of decisions, one-tap Monday approval, bench call mode, two-holiday-set calendar and cohort grid.

## 1. Principles

1. The report is a form, not a message: three boxes and four numbers, HQ writes the card, the numbers are stored.
2. Nobody picks a channel to do their job: the client lands in "Client · Mariela", the VA's client channel is pinned first, the manager's home is an inbox.
3. Two clocks everywhere: times are stored in the client's zone and shown in the viewer's zone with the other zone in small grey text.
4. The client sees one projection (`clientView(placement)`) with first name, role, avatar, hours, reports, block, scope, ticket; nothing else exists on client surfaces, and "View as client" renders the same projection.
5. Deliberately less than Slack: no nested threads, six reactions, no apps, no custom emoji, one list and one form, readable on a mid-range Android.

## 2. Navigation

### 2.1 Phone (≤ 900 px, `.tabs`)

Bottom tab bar on every main screen, 62 px plus safe-area, 22 px icon plus 11 px label (never icon-only), active in `--blue` (light) / `--gold` (dark), 44 px targets, hidden while the keyboard is open in a channel.

| Role | Tabs left → right (EN / ES · icon) |
| --- | --- |
| VA (placed) | Home / Inicio · house — Chat / Canales · speech bubble — **Report / Reporte** · clipboard, `.tab.primary` raised gold circle; shows a check after sending — Hours / Horas · clock — Me / Yo · person |
| VA (bench, onboarding) | same, the center tab becomes **Academy / Academia** · graduation cap |
| Client | Home / Inicio · house — Chat / Chat · speech bubble — Hours / Horas · clock — Billing / Facturación · receipt — Help / Ayuda · life ring. An outlined red Escalate pill sits in the top bar of every client screen. |
| Manager | Inicio / Home · house — Canales / Chat · speech bubble — Horas / Hours · clock — Personas / People · people — Más / More · grid (sheet: Reclutamiento, Banca, Cohorte, Calendario, Documentos, Escalaciones, Cumplimiento, Anuncio, Ajustes) |
| Owner | Home / Inicio · house — Chat / Canales · speech bubble — Clients / Clientes · building — Money / Dinero · dollar — More / Más · grid (sheet: People, Recruiting, Reports, Calendar, Settings, Audit log) |
| Applicant | Inicio / Home · house — Pruebas / Tests · pencil — Academia / Academy · cap with padlock until accepted — Yo / Me · person |

Badges: Chat shows a gold `.badge.gold` number = mentions + DMs + messages in your own client channel, plus a small blue dot for other unread. Horas/Hours shows a dot when a week waits for approval (manager) or was just approved (VA, client). Report turns red after 7 PM client time with no report. Home shows a dot when the inbox (manager) or Needs you (owner) has rows.

Top bar: screen title in the display font, avatar at the left opens the account sheet (language EN/ES, theme system/light/dark, notifications, switch person, sign out), one contextual action at the right, chevron back. Forms (report, outage, escalate, approve, new thread) are `.sheet` bottom sheets with a visible Cancel. 16 px gutters, no horizontal page scroll.

### 2.2 Desktop (≥ 901 px, `.app` grid)

| Column | Width | Content |
| --- | --- | --- |
| Rail | 64 px | Brand mark; the role's modules as icon + 10 px label (phone tabs plus the More items unfolded); badges on icons; bottom: language toggle EN/ES, theme toggle, avatar opening the account sheet with the prototype **role switcher** ("Open as…", every person in `HQD.people`). |
| Sidebar | 300 px | The list for the active module: Chat → channel list with search on top; People → person list with segment chips; Hours → placements with weekly approval state; Money → blocks by client; Recruiting → stages with counts; Calendar → month grid; Home → the role's queue (Needs you / Pendientes) so main can show the cards. Hidden (`.no-side`) for Report, Settings, applicant screens. |
| Main | fluid, `.content.narrow` 860 px except channels and tables | The screen; a channel keeps the compose pinned at the bottom. |
| Right pane | 340 px, `.has-pane`, toggle in the top bar | Context only: client channel → placement card (status pill, schedule in both zones, hours this block approved / pending, last report numbers, next invoice, Hubstaff link, Escalate for clients, View as client + pay rate for manager, bill rate + margin for owner); #team → members and upcoming events; support thread → VA card, topic, status; Hours → selected week flags and outages; Person → documents and pay history (staff). |

Rail modules per role: owner Home, Chat, Clients, People, Recruiting, Money, Reports, Calendar, Settings; manager Inicio, Canales, Horas, Personas, Reclutamiento, Academia, Calendario, Documentos, Cumplimiento; VA Inicio, Canales, Reporte, Horas, Academia, Calendario, Yo; client Home, Chat, Hours, Reports, Billing, Help; applicant Inicio, Pruebas, Academia, Yo. Keys: Enter sends, Shift+Enter newline, Ctrl/Cmd+K search, Esc closes pane or sheet, J/K walk inbox and approval rows, A approves.

## 3. Home screen per role

### Owner (Charly) · primary: **Post an announcement / Publicar un anuncio** (gold, top right); the cards carry their own buttons

| # | Card | Data |
| --- | --- | --- |
| 1 | Today bar | "Wed, Oct 21 · block Oct 12–25 · day 10 of 14"; three avatars (Mariela, José, Andrea) with live dot + minutes today + client-local clock; reports today 0/3, yesterday 2/3; next invoice date |
| 2 | Needs you (max 5 rows, one button each) | Lone Star next-block invoice $480 failed Oct 19, retry Oct 22, pauses José Oct 26 if unpaid [Retry charge] [Message Mike]; Sunshine hours Oct 12–18 unapproved, 2 days overdue [Open]; Mariela fit window ends Nov 8 (18 days) [Plan check-in]; José no report Tue Oct 20 [Open channel] |
| 3 | This block Oct 12–25 | `.kpi` tiles billed $2,240 · VA cost $1,260 · margin $980 (44%); one row per placement: Mariela 80 h × $12 = $960 / $520 / $440 · José 60 h × $8 = $480 / $300 / $180 · Andrea 80 h × $10 = $800 / $440 / $360; footer "next block invoiced Oct 19 · 2 of 3 paid · next payout Nov 5"; link Margin per placement |
| 4 | Chat | top five unread rows: gold @ count (DMs `dm-ana-charly`, `dm-charly-daniela`), the three client channels with blue counts, report tick per client row |
| 5 | Bench and pipeline | Kevin (ISA, certified Oct 9) · Lucía (admin, certified Oct 16) · 8 applicants by stage · overdue replies count · Carlos module 3 of 5, tasks 5/8; link Recruiting |
| 6 | Client pulse | October: Rodriguez 5, Lone Star 4, Sunshine not asked yet (since Oct 1); next question posts Nov 1 |
| 7 | Coming up | Andrea day-30 checkpoint Oct 31 · next block invoice Nov 2 for Nov 9–22 · payday Nov 5 · pulse Nov 1 |

### Manager (Daniela) · primary: **Aprobar horas / Approve hours** (jumps to the oldest unapproved week)

| # | Card | Data |
| --- | --- | --- |
| 1 | Hoy | one row per placement: VA · client · status pill (`.live`, "trabajando · 1 h 35 min · última actividad hace 2 min") · report state ("pendiente · vence 5 PM PT = 6 PM aquí" / "✓ 2:48 PM" / red "sin reporte"); today's outages and low-activity flags as small chips |
| 2 | Bandeja (the inbox: grouped rows, counts, one primary button + Posponer per row, hard order) | Reportes faltantes (José · ayer) [Recordar] [Día libre] · Horas por aprobar (Sunshine Oct 12–18 · 40.5 h · 1 alerta · 2 días de retraso, red) [Aprobar] · Soporte (th-mariela-pay 2 h, th-jose-client 1 día, th-carlos-tech 3 días) [Responder] · Solicitudes vencidas (expected reply date passed) [Responder] · Checkpoints (p-sun-1 día 30 · 31 oct) [Agendar] · Documentos por vencer 60 días [Pedir] · Feriados por declarar (HN holidays inside 10 business days) · Cumplimiento (DNC scrub c-rodriguez, QA llamadas Mariela 0/3) [Abrir]. Rows without a due date are not rows. |
| 3 | Reportes de ayer | Mariela ✓ 5:42 PM PT · José — sin reporte · Andrea ✓ 6:20 PM ET; tap opens the card |
| 4 | Menciones y mensajes | gold @ count, DM rows (Mariela, Kevin, Charly), support threads with lock |
| 5 | Reclutamiento y cohorte | entrevistas esta semana · respuestas vencidas · Carlos 5/8 tareas · módulo 3 · buddy José |
| 6 | Banca | Kevin (ISA, 07–20 HN, B2+, video) · Lucía (admin, CO, 07–16, B2) [Proponer a un cliente] |
| 7 | Esta semana | calendar rows in Tegucigalpa time with client time in grey: interviews, Andrea day 30, training, payday Nov 5; link "Días no disponibles declarados" |

### VA (Mariela; variants Kevin bench, Carlos onboarding) · primary: **Send today's report / Enviar el reporte de hoy** (full-width gold inside card 2)

| # | Card | Data |
| --- | --- | --- |
| 1 | Hero | "Hola, Mariela" · Rodriguez Home Team · ISA · "Turno 9:00 AM–6:00 PM (8–5 PT)" · `.live` "Hubstaff activo · 35 min hoy · última actividad hace 2 min"; links Ver capturas en Hubstaff · Reportar un corte. Kevin: "En banca · ISA certificado 9 oct · tu perfil está visible a clientes" + preview card + [Actualizar disponibilidad]. Carlos: ring "5 de 8 tareas · módulo 3 de 5" + buddy José + [Continuar la academia] |
| 2 | Reporte de hoy | "Pendiente · se espera 5:00 PM PT (6:00 PM tu hora) · recordatorio 7:00 PM PT"; after sending "Enviado 4:52 PM PT ✓ · 148 marcaciones · 2 citas" + week-so-far strip + "Agregar una actualización"; red "Reporte atrasado" after 7 PM client time; "Día libre" on weekends, client holidays, declared days |
| 3 | Cliente · Mariela | last line with sender first name ("Ana: Can you call the Vasquez lead back…"), time in Honduras, blue count or gold @; tap opens the channel |
| 4 | Horas y pago | Lun 8 h 05 · Mar 8 h 10 · Mié 0 h 35 · Jue — · Vie — as a bar row vs 40 h; "Semana pasada 40 h 00 aprobadas ✓ (Daniela, 19 oct)"; "Próximo pago 5 nov · estimado $xxx"; "Último estado 20 oct [Ver]" (own pay only) |
| 5 | Tu apoyo (lock, "solo tú, Daniela y Charly") | "Pregunta sobre el estado de pago · Daniela respondió ayer" [Abrir] · [Nuevo tema: Pago, Cliente, RR. HH., Tecnología] |
| 6 | Próximo | checkpoint día 90 · 7 dic; next training or social; declared unavailable days; next client holiday (Thanksgiving Nov 26 = día libre); next HN holiday with the 10-business-day countdown; ISA: "QA de llamadas esta semana 0 de 3" |
| 7 | Academia | hidden when certified and placed unless a module is assigned; bench and onboarding: module list with progress |

### Client (Ana; variants Mike/Jenna, Priya) · primary: **Message Mariela / Escribir a Mariela** (VA first name substituted)

| # | Card | Data |
| --- | --- | --- |
| 0 | Open ticket (only when one exists) | pinned on top: category, "acknowledge by Thu Oct 22 5:00 PM PT", fix window ends Oct 28, status |
| 1 | VA status hero | gold initials avatar "MC", "Mariela · ISA", `.live` "Working now · since 8:02 AM · 33 min today · last activity 2 min ago" (variants: Finished 5:02 PM · Off today · holiday · Outage: internet since 10:14 AM, Daniela notified · Paused: block unpaid); today's schedule 8:00 AM–5:00 PM PT; buttons Message · Screenshots in Hubstaff (external) |
| 2 | Today's report | "Not yet · expected by 5:00 PM PT" in grey; after 7 PM "No report yet for Wed · Daniela has been notified"; when sent, the report card (§4.3) with "Looks good 👍"; below, yesterday's card collapsed + "All reports" |
| 3 | Hours · Oct 12–25 | approved 40h 00m (week of Oct 12, by BeyondVAs on Oct 19) · pending 16h 50m · scheduled 80h as one bar; "Hours are approved every Monday"; tap opens Hours |
| 4 | This week's numbers (ISA only) | dials 412 · conversations 38 · appointments set 5 · held 2 · "target 6+ a week"; 30-day sparkline of appointments set |
| 5 | Chat | "2 unread in Client · Mariela" with last line; staff names as "Daniela · BeyondVAs" |
| 6 | Next invoice | "Oct 26–Nov 8 · $960 · Paid Oct 19"; Lone Star: gold banner "Next block invoice $480 did not go through · Update card · José pauses on Oct 26 if unpaid"; true-up note when one applies |
| 7 | Something wrong? | outlined red [Escalate] with "We acknowledge within 1 business day and fix within 5 days"; lighter: [Just a question → Message Daniela] |

### Applicant (Sofía) · primary: **Continue my application / Continuar mi solicitud**

| # | Card | Data |
| --- | --- | --- |
| 1 | Tu solicitud | `.steps` Enviada ✓ → Evaluada → Entrevista (now, gold) → Prueba práctica → Oferta; "Te respondemos antes del vie 24 oct" |
| 2 | Siguiente paso | one card, one button: "Entrevista por video con Daniela · jue 23 oct · 10:00 AM hora de Honduras [Confirmar]" or "Prueba de inglés escrito · 20 min [Empezar]"; "Nada que hacer por ahora" when the ball is on BeyondVAs' side |
| 3 | Tus pruebas | Mecanografía ✓ enviada · Inglés escrito pendiente · Llamada simulada por agendar (no scores shown) |
| 4 | Mensajes de reclutamiento | read-only notes from Daniela with dates; reply box only when a question is open |
| 5 | Qué preparar | ID, antecedentes, W-8BEN, contrato; equipment and internet check (info only) |
| 6 | Cómo funciona BeyondVAs | academia 5 módulos → certificación → banca → colocación; banda $4.50–$7.00/h; pagos 5 y 20 |
| 7 | Academia | locked tile "Se desbloquea cuando seas aceptada" with the five module titles greyed |

## 4. Channel view

### 4.1 Channel list (Chat tab on the phone, sidebar on desktop)

- Search field on top. One flat list, groups in this order, no workspaces: (1) client channel(s) pinned (VA: "Cliente · Mariela"; client: "Client · Mariela"; staff: the three, unread first then by VA first name); (2) #announcements / #anuncios; (3) #team / #equipo (not for clients); (4) Direct messages; (5) Support (VA: "Mi apoyo privado" rows per open topic + [Nuevo tema]; manager and owner: "Soporte" rows "Mariela · Pago"); (6) Archived, collapsed, read-only (placement channels 90 days after end).
- Row (`.srow`, 64 px on the phone): 44 px avatar (gold initials for DMs; `.hash` tile for # channels, `.hash.ann` for announcements; house tile with the VA's live dot for client channels; `.lock` tile for threads); name bold when unread; one-line preview "Ana: Can you call…", a report previews as "Report · 148 dials · 2 appts"; time in the viewer's zone; badges right: blue count pill = unseen messages, gold @ pill = addressed to you (mention, DM, your own client channel); on staff rows a report tick "✓ 5:42 PM" or a red dot after 7 PM client time.
- Muted: crossed bell, never badges; #announcements cannot be muted; #team is "mentions only" for VAs by default.
- Buttons: New message (DM); owner and manager also Announcement.

### 4.2 Message row (`.msg`)

- 36 px avatar; first name bold; role chip (`.chip.blue`: ISA / Admin / Ops / Manager / Client / BeyondVAs) always in client channels, first message of the day elsewhere; time 11.5 px in the viewer's zone, long-press or hover shows both ("4:52 PM PT · 5:52 PM Honduras"); body 15 px pre-wrap, links in `--blue`; attachment chip (`.att`: type tile, name, size) or 160 px image thumbnail; "edited" marker (edits allowed 10 min); reactions row of pills, own in `.mine`.
- Same sender within 5 minutes collapses under one header. Day dividers "Today / Yesterday / Mon Oct 19" in the viewer's language. Red `.unread-line` "New" at the first unread; the channel opens there; "Jump to latest" pill when scrolled up.
- Long-press or hover: six reactions (👍 ✅ 🙏 🎉 👀 ❤️), Reply (inserts a quote block in `--bg-3`), Copy, Mention. No nested threads.
- In client channels every name renders through `displayName(person, surface)`: first name + role chip, never a surname.

### 4.3 Report message (`.report`)

- Card, not a bubble: 4 px gold left border, max 640 px. Header: clipboard icon, "DAILY REPORT · WED OCT 21" in the display font, sent time in the reader's clock, chips "Late" (gold, after 7 PM client time) and "edited 6:10 PM".
- ISA placements only: 4-up `.kpi` strip DIALS 148 · CONVERSATIONS 14 · APPTS SET 2 · APPTS HELD 1, each with "412 this week" in `--fg-3` beneath.
- Three stacked boxes with label chips in the reader's language, VA text as written: ✅ Done today / Hecho hoy (green), ⛔ Blocked / Bloqueado (gold; empty collapses to one grey line "Nothing blocked"), ➡️ Tomorrow / Mañana (blue); four bullets then "Show all".
- Footer: "Hours today 0h 35m · View screenshots in Hubstaff" (external); reactions; clients get one-tap "Looks good 👍"; staff get "Open week".
- An Update posted later renders as a smaller card linked to the original. The same component renders in chat, Client Home, Reports pages and the digest preview.

### 4.4 System messages (`.msg.system .pill`)

- Centered grey pill with icon and time, never an avatar row: week approved ("Week Oct 12–18 approved · 40.0 h"), block paid or failed, placement paused or resumed, checkpoint scheduled or done, outage reported and ended, pulse question, report posted.
- Each carries `audience: 'all' | 'internal'`; internal (hours edited with reason, low-activity flag, escalation opened, pay change, QA result) is filtered out of client channels at the data layer, not by CSS.

### 4.5 Compose (`.compose`)

- Pinned above the tab bar, safe-area aware. Left: paperclip (any file ≤ 25 MB, inline red line "Files up to 25 MB" when larger, image thumbnail before sending) and @ button. Middle: textarea 1→5 lines, placeholder "Message Client · Mariela" / "Escribe en Cliente · Mariela". Right: 38 px gold round send, enabled only with text or a file.
- Phone: Return inserts a newline, only the button sends. Desktop: Enter sends, Shift+Enter newline. Drafts kept per channel. Offline: clock icon, sends when back.
- Hint line above the box, in the writer's language: VA in a client channel "Escribes a Ana · en inglés" plus a "Reporte" chip opening the form; support thread "Solo tú, Daniela y Charly pueden leer esto"; #announcements shows EN and ES boxes for owner and manager, "Only BeyondVAs posts here" for everyone else.
- Staff guard in client channels: a $ amount, a VA surname from `HQD.people`, or "pay rate" / "tarifa" triggers a yellow inline confirm "Send to the client channel?" with the match highlighted.

### 4.6 @mentions, reactions, attachments, search

- @ lists only this channel's members (avatar, first name, role); @manager first, "reaches Daniela" (resolves to the placement's assigned manager); @everyone only for owner and manager in #announcements and #team. Mentions render as blue chips; tap opens the profile the viewer may see.
- Reactions: the six fixed pills, tap toggles. Attachments: 25 MB checked before upload.
- Search (field above the list; Ctrl/Cmd+K on desktop) searches message text, the three report boxes and file names through the same membership function as the list. Chips: Reports, Files, From…, In…, This week. Results group by channel with highlighted snippet, sender first name, date; tap opens the channel scrolled to the message. Empty: "Nothing found in the channels you can see".

### 4.7 What a client sees differently

- Chat opens straight into their client channel (a list only when the team has two placements or a DM with Charly). Header is the status ribbon: avatar, "Mariela · ISA", `.live` pill, today's schedule in the client's zone, buttons Hours · Escalate (outlined red).
- Members list: first names and roles only ("Mariela · ISA", "Daniela · BeyondVAs", "Charly · BeyondVAs"). No #team, no support threads, no other clients, no pay rate, no activity %, no edit reasons.
- Desktop right pane = placement card from `clientView(placement)`. Manager and owner "View as client" render the same projection read-only under a persistent `.pinbar` banner.
- `check.html` renders every client screen for Ana, Mike, Jenna and Priya and fails if any VA surname, any `payRate` value, the word "margin" or another client's name appears.

### 4.8 Digest note

- Under the client's channel header: "You also get an email if you miss something for 30 minutes". Settings → "Preview digest email" shows: subject "Client · Mariela: 2 new messages and today's report", messages with first name and client-zone time, the report card, one gold "Open in HQ" button; one email per channel per 30-minute window, never for reactions or system pills.
- Staff see "Emailed to Ana · 6:12 PM" under the last message of a window. VAs and managers get push instead (note under their compose).

## 5. Daily report form

### 5.1 Entry and header

- Opens from the raised Report tab, the Home card, the "Reporte" compose chip, the 7 PM push. Full-screen `.sheet`. One report per placement per working day, dated in the client's zone; a VA with two placements picks from two tiles first.
- Header: "Reporte diario · Miércoles 21 oct · Rodriguez Home Team", two clocks "4:12 PM PT · 5:12 PM tu hora", due line "Se espera a las 5:00 PM PT (6:00 PM tu hora) · recordatorio 7:00 PM PT si no se envía" (Andrea: 6:00 PM ET; José: only the 7 PM CT rule). Hint: "Escribe en inglés: Ana lo leerá en el canal". Read-only strip "Hoy en Hubstaff: 0 h 35 min · ver capturas".

### 5.2 Fields in order

| # | Field | Behaviour |
| --- | --- | --- |
| 1 | ISA numbers (tier `isa` only) | four steppers MARCACIONES · CONVERSACIONES · CITAS AGENDADAS · CITAS REALIZADAS (English labels for an English-setting VA), big −/+, numeric keyboard, start at 0, 7-day average in grey under each |
| 2 | Hecho hoy / Done today | textarea, Enter starts a new bullet, placeholder from the placement's expectations; chip "Usar lo planeado ayer" drops yesterday's Tomorrow lines in |
| 3 | Bloqueado / Blocked | `.toggle` "Nada me bloqueó" (off by default; the VA must choose) + textarea, placeholder "Waiting on Ana for the new script" |
| 4 | Mañana / Tomorrow | textarea, placeholder "Follow up the 5 warm leads from today…" |
| 5 | Adjuntar | up to 3 files, 25 MB each |
| 6 | Vista previa | toggle "Ver como lo verá Ana" renders the card |
| — | Sticky bar | full-width 52 px gold "Enviar reporte" (Ctrl/Cmd+Enter on desktop) + ghost "Guardar borrador"; draft autosaves to localStorage on every keystroke |

### 5.3 Validation (inline, VA's language, never a modal)

- Done ≥ 20 characters; Tomorrow ≥ 10 characters; Blocked needs the toggle on or ≥ 5 characters.
- ISA: integers 0–999; conversations ≤ dials; appointments set ≤ conversations; held is independent. Four zeros ask once "Pusiste 0 en todo. ¿Enviar así?". Soft warnings never block: dials < 50 % of the 7-day average, text that looks Spanish, a report on a non-schedule day.
- Send disabled until required fields pass; tapping while disabled scrolls to the first failing field with a red helper line.

### 5.4 After sending

- 1.5 s success "Enviado a Rodriguez Home Team · 4:52 PM PT", then the client channel scrolled to the new card. HQ posts the card as the VA; `HQD.reports` stores placementId, date, three boxes, four numbers, sentAt, late, edited.
- Editing within 60 minutes replaces the card and marks it "edited"; later, "Agregar una actualización" posts a smaller Update card (nothing is deleted).
- VA Home flips to "Enviado ✓" with the week-so-far strip; the Report tab shows a check; the manager's Hoy row turns green and her channel row gets the tick; the client's Home card and channel show the card, then the 30-minute digest; manager gets an immediate push only when Blocked is non-empty.

### 5.5 Soft nudge and the 7 PM reminder

- At the placement's stated expectation time (5 PM PT Mariela, 6 PM ET Andrea) the VA's Home card and Report tab turn gold, no notification.
- At 7:00 PM in the client's zone (8 PM HN for Rodriguez, 6 PM HN for Lone Star, 5 PM SV for Sunshine) on a scheduled day with no report: push to the VA "Falta tu reporte de hoy para Rodriguez Home Team" deep-linked to the form; notification to the manager; inbox row "Reporte faltante · Mariela · 21 oct" with [Recordar] (prefilled Spanish DM) and [Marcar día libre] (clears the row, records why); VA Home card and tab turn red "Reporte atrasado"; the client's card reads "No report yet · Daniela has been notified" in grey. Nothing is posted in the channel. Next morning the inbox shows "Ayer sin reporte" (seed: José, Tue Oct 20); the client's Reports page shows a grey gap.
- No report expected on weekends, client holidays or declared unavailable days ("Día libre").

## 6. Every other screen

Priority: **must** builds first, **should** second, **later** is a stub screen with an `.empty` line. "Who" lists roles that can open it. The Home screens (§3), the channel list and conversation (§4) and the report form (§5) are all **must**.

### 6.1 Shared

| Screen (EN / ES) | Who | Purpose | Elements in order | Priority |
| --- | --- | --- | --- | --- |
| Role switcher / Selector de persona | all | Stand-in for login | `.rolepick` grid of every `HQD.people` entry grouped by role (Charly; Daniela; VAs; client logins; applicants), each with avatar, name, role, lang, tz; theme toggle; note "MFA required for owner and manager (not in the prototype)" | must |
| Conversation / Conversación | owner, manager, VA, client | §4 | header (name, members, kebab: mute, search here, members, Escalate or View as client), status ribbon in client channels, messages, compose, mention picker, attachment preview, archived banner | must |
| Search / Buscar | owner, manager, VA, client | §4.6 | field with recent searches; chips; grouped results; empty state | should |
| Notifications / Notificaciones | owner, manager, VA, client | What pinged you | rows: mention, DM, report posted, hours approved, block paid or failed, checkpoint due, escalation, each a deep link; Mark all read; link to settings | should |
| Settings / Ajustes | all | The few switches | language EN/ES; theme system/light/dark; notifications push on/off, clients "Email digest after 30 minutes" + Preview digest email; time zone read-only; MFA status (owner, manager); sign out | should |
| Calendar / Calendario | owner, manager, VA, client | Events with two holiday sets | month `.cal` + agenda list; today Oct 21 outlined gold; toggle chips US holidays (blue, client) and Honduras holidays (gold, VA; El Salvador / Colombia per VA country); event kinds meeting, training, payday (5, 20), holiday, social, time off, interview, deadline, checkpoint (Andrea day 30 Oct 31); time in two zones; audience all / channel / user; RSVP; HN holiday rows "declarar antes de …" (10 business days); manager and owner [New event] | should |
| My profile / Mi perfil | owner, manager, VA, client | What others see | avatar, name (first only to clients), role, title, language, time zone, email and WhatsApp placeholders (never to clients), Edit | should |

### 6.2 VA

| Screen (EN / ES) | Who | Purpose | Elements in order | Priority |
| --- | --- | --- | --- | --- |
| Report sent / Reporte enviado | VA | Confirm and allow an update | success state; the card; [Editar] for 60 min then [Agregar una actualización]; "Ver en el canal" | must |
| My hours / Mis horas | VA | Tracked time, flags, lock | week `.seg` (this week, last week…); day rows in VA time with client time grey: start–end, minutes, activity %, on-call minutes (ISA), flag chips "Daniela puede preguntar por mar 2:10–2:50 PM" with [Explicar]; total vs scheduled; `.lock` "Aprobada por Daniela · 19 oct" or "Pendiente"; [Reportar un corte]; "Ver capturas en Hubstaff"; "Declarar un día no disponible" | must |
| Log an outage / Reportar un corte | VA, manager (on behalf, "registrado por Daniela") | Keep the client's status truthful | tiles Luz / Internet; started at (now, editable); toggle "Sigue ahora" or ended at; note (Spanish ok, internal); preview "Outage: internet since 10:14 AM PT"; Send (queues offline); closing posts "Back online 10:52 AM PT · 38 min" as an audience-all pill | should |
| My placement / Mi colocación | VA | The deal in plain words | client, tier, hours/week; schedule in VA time with client time grey; expectations ES with EN collapsible; scope rules for the state; checkpoints 5/14/30/90 with done dates; fit and replacement windows; own pay rate and history (never the bill rate); buddy; tools list (links only) | should |
| Support thread / Hilo de apoyo | VA, manager, owner | Private channel per topic | topic chip + open/closed; lock line "Solo tú, Daniela y Charly pueden leer esto"; conversation layout; Close (manager) / Reopen (VA) | must |
| New support thread / Nuevo tema | VA | Start by topic, not ticket | four tiles Pago · Cliente · RR. HH. · Tecnología; title; first message; Send | should |
| Payout statements / Estados de pago | VA | What I was paid and why | rows by payday (Oct 20, Oct 5…): period, approved hours × pay rate + bonuses = total, method Mercury / Payoneer, status; detail per placement; [Subir factura] per statement; next payday Nov 5 with estimate | should |
| Upload invoice / Subir factura | VA | Attach an invoice | statement summary; file picker PDF/image; confirm → "Factura recibida" | later |
| Academy / Academia | VA, applicant (locked) | 5 modules, 15 lessons | module cards m1–m5 with `.progress` rings, m5 tagged ISA track; lesson rows typed video / text / quiz / sign-off / task; certification banner (date, ISA-certified flag); supervised-dialing log (ISA) | should |
| Lesson / Lección | VA | One lesson | title, type, minutes; body; "Marcar como completada" or quiz submit; next lesson | later |
| Onboarding checklist / Lista de onboarding | VA | 8 tasks to bench-ready | ob1–ob8 rows with kind icon (upload, link, check), status, action; buddy card (José) [Escribirle]; progress "5 de 8" and what unlocks | should |
| Me / Yo (profile & documents) | VA | Profile, documents, equipment | role, status, level, English, skills, industries, languages, time zone; documents (type, signed, expiry, status, upload; 60-day reminders; W-8BEN rule explained); equipment and internet check; availability window; own pay-rate history; review dates and buddy; links Payouts, Academy, Settings | should |
| Bench preview / Vista de banca | VA (bench) | What a client sees of me | the client-view card as Bench renders it; [Actualizar disponibilidad] [Actualizar video]; days on bench | later |
| Declare unavailable day / Declarar día no disponible | VA | HN holiday or time off 10 business days ahead | date picker with both holiday sets and the deadline countdown; reason holiday / time off; client calendar conflict; Send → manager approval state; auto system pill in the client channel | later |

### 6.3 Client

| Screen (EN / ES) | Who | Purpose | Elements in order | Priority |
| --- | --- | --- | --- | --- |
| Hours / Horas | client | Approved vs pending with the tracker one tap away | block `.seg` (Oct 12–25); week cards: approved (`.lock`, "by BeyondVAs on Oct 19") or pending; day bars approved `--good`, pending `--blue-soft`, scheduled outline, outage markers; day rows with "Screenshots" link; scheduled vs approved and the true-up preview for the next block; "Hours are approved every Monday"; Escalate link | must |
| Reports / Reportes | client | Every report and the numbers | calendar strip sent / late / missing; day rows with four numbers inline and sent time; week totals vs target; 30-day chart dials and appointments; tap opens the card in the channel | should |
| Escalate / Escalar | client | One tap to a human, with a fork | step 1 two big choices "Just a question → Message Daniela" (opens DM, no ticket) / "Something is wrong → Escalate"; step 2 chips Quality of work · Hours or availability · Communication · Out of scope · Other; text (500 chars) + attach; "We acknowledge within 1 business day and fix within 5 days"; Send (gold), Cancel; confirmation: ticket number, acknowledge by Thu Oct 22 5:00 PM PT, fix window ends Oct 28, "Daniela and Charly get this; your VA is not notified by HQ" | must |
| Escalation status / Estado de la escalación | client | Where the ticket stands | `.timeline` Received → Acknowledged (clock) → Coaching plan → Fixed / Replacement; messages on the ticket; Close when satisfied | should |
| Billing / Facturación | client | Blocks without surprises | this block card Oct 12–25: 80 h × $12 = $960, invoice number, paid date, card last 4; hours-used bar and true-up line ("becomes a credit or debit on the next block, never a refund"); next block Oct 26–Nov 8 invoiced Oct 19, due before Oct 26, Paid / Failed with [Pay now] [Update card]; pause rule in one sentence when unpaid; past blocks with PDF links; setup fee $499 paid date; billing email; two-week notice note | must |
| Invoice detail / Detalle de factura | client | One invoice | lines scheduled hours × tier rate, true-up, setup fee; status, paid date; Download PDF | later |
| Your VA / Tu VA | client | The placement in the client's words | avatar, first name, role, "with you since Sep 8"; schedule in client time; expectations EN; checkpoints 5/14/30/90; fit window ends Nov 8; replacement window to May 10; [Request a check-in] (messages Daniela) | should |
| Scope card / Tarjeta de alcance | client | What the VA may do in this state | preset title (California / Texas / Florida / Other); `.scope-list` may do / needs a licensed agent; ISA: calling hours, last DNC scrub date and validity, approved script version, recording practice; "Ask to change scope" → DM Daniela | should |
| Help / Ayuda | client | Everything besides the channel | large Escalate; open ticket status; Your VA; Scope card; guarantees (fit and replacement dates); how hours, blocks, true-ups and paydays work (five lines); contact Daniela, Charly; team logins (Lone Star: Mike, Jenna) | should |
| Team logins / Accesos del equipo | client | Who can open HQ | login rows; invite by email; billing contact | later |
| Monthly pulse / Pulso mensual | client | The 1-to-5 question on the 1st | system pill card in the channel with five big buttons; optional comment; thank-you; result visible to staff only | later |
| Referrals / Referidos | client | Refer a team | form; credits list | later |

### 6.4 Manager (owner opens all of these too)

| Screen (EN / ES) | Who | Purpose | Elements in order | Priority |
| --- | --- | --- | --- | --- |
| Inbox / Bandeja (full page of Home card 2) | manager | Clear the queue | date strip with counts per group; grouped rows in the hard order of §3; row: icon, who, what, due in HN time + client time, primary button, Posponer; "Despejar la bandeja" step mode with J/K and Enter | must |
| Hours to approve / Horas por aprobar | manager, owner | Monday's job | week picker defaulting to the oldest unapproved week (Oct 12–18); one `.card` per placement: VA · client, tracked vs scheduled, activity %, flags count, outages, manual edits, status (locked: "Aprobado por Daniela · 19 oct 10:12"; pending: days overdue in red); [Revisar] [Aprobar] per card; [Aprobar todas sin alertas]; a card with an unresolved flag cannot be approved; note "approval records who and when" | must |
| Placement week / Semana de la colocación | manager, owner | Resolve flags before locking | header client, VA, week, scheduled, tier, pay rate (bill rate hidden from manager); day rows in client zone with VA zone small: start, end, minutes, activity %, on-call (ISA), source "nightly import"; flag rows with Keep / Trim (reason required) / Ask VA (prefilled DM); outage rows type, window, note; Edit entry sheet (start, end, minutes, reason ≥ 10 chars, delta preview → internal pill + audit row); "Ver capturas en Hubstaff" per entry; totals tracked, trimmed, to approve; sticky gold "Aprobar 40.5 h" → lock stamp + audience-all pill in the client channel | must |
| People / Personas | manager, owner | Everyone by state | `.seg` Colocados · Banca · Onboarding · Candidatos · Inactivos; rows avatar, name, tier, level, country · tz, English, status chip, client or stage; search and filters (skills, tools, country); [Nueva persona] | must |
| Person / Persona | manager, owner | The full profile the client never sees | identity, role, status, language, zone, country, city, WhatsApp and email placeholders; skills, tools, industries, level, buddy; pay rate and history with reasons; availability; equipment and internet check; documents with expiry; placements and review dates; support threads; notes; audit rows; [Escribirle] | should |
| Placements / Colocaciones | manager, owner | All seats | rows client, VA, tier, h/week, status, next checkpoint due, fit window end; filter by status; chain indicator p-rod-1 → p-rod-2; [New placement] (later) | should |
| Placement / Colocación | manager, owner | The seat end to end | header VA, client, tier, status, [Ver como cliente]; schedule in both zones; pay rate + history (manager, owner), bill rate and margin (owner only, via Money component); expectations EN/ES; checkpoints 5/14/30/90 with [Agendar] on the open one; fit and replacement windows from seatStart; scope card and telemarketing summary; tabs Horas · Reportes · Canal · Cumplimiento; actions Pause, End with reason, Replace, Offboarding | must |
| View as client / Ver como cliente | manager, owner | Prove no leakage | `.pinbar` "Viendo como Ana · Rodriguez Home Team · solo lectura · Salir"; login picker when several (Mike / Jenna); client Home, Chat, Hours, Billing, Help from `clientView`; bill amounts masked "$ ••• oculto para gerentes" for managers, visible for the owner; nothing can be typed | must |
| Support inbox / Soporte | manager, owner | Every private thread by urgency | rows VA, topic chip, title, waiting time, status; filter topic and status; open thread (conversation layout); Close / Reopen | must |
| Reports today / Reportes de hoy | manager, owner | Who reported, who is late | rows per placement: status, time, four numbers; "Ayer sin reporte"; week and 30-day totals per placement; tap opens the card | should |
| Pipeline / Reclutamiento | manager, owner | Move applicants, never miss a reply date | `.kanban` columns draft · submitted · scored · interview · trial · offer · active · placed · talent_pool (horizontal scroll on phone); `.kcard` name, country, tier, English, days in stage, expected reply date (red when past), cohort, source; stage picker on the card (drag on desktop); filters tier, country, overdue, cohort; [Nuevo aplicante] | must |
| Applicant / Candidato | manager, owner | Score and decide | header name, city, country, tz, source, cohort; scores spoken English, Spanish, presence, followed the brief, accomplishment, setup, typing, written English, mock call; notes timeline; stage history; expected reply date editor; actions schedule interview (calendar event), move stage with note, bilingual email template, talent pool | should |
| Bench / Banca (call mode) | manager, owner | Screen-share safe matching | client selector overlaying the client's hours on each availability bar; cards Kevin, Lucía: avatar, first name, tier, country, tz, availability, English, video link, skills, certified on; "Modo llamada" toggle hides surnames and pay, enlarges cards, arrow keys switch; sort by fit; filters tier, country, ISA-certified; [Proponer a cliente] → draft placement prefilled | should |
| Cohort / Cohorte (academy admin) | manager, owner | Progress and certification | cohort selector (Oct-2026: Carlos); grid person × m1–m5 (progress, quiz, sign-offs); ob1–ob8 status per person; ISA dialing log and flag; buddy column; [Certificar] enabled only when all done → status bench; [Recordar] DM in Spanish | should |
| Escalations / Escalaciones | manager, owner | Tickets with clocks | rows ticket, client, VA first name, category, opened (client zone), acknowledge-by countdown, fix window end, status; filter open / all; ticket: two clocks, client text, Acknowledge (opens DM with client logins, VA excluded, template, stamps time), coaching plan (linked support thread, plan, review date), outcome Fixed / Replacement, replacement shortlist from bench matched by tier, zone, English with the 10-business-day deadline → chained placement keeping seatStart; timeline | should |
| Replacement & offboarding / Reemplazo y cierre | manager, owner | Chain a seat, close cleanly | candidates within 10 business days; proposed start; client confirmation; checklist vault user removed, tracker deactivated, client confirms seats disabled, data-return attestation, final payout date, channel archived | later |
| Call QA / QA de llamadas | manager | 3 calls per ISA per week | ISA picker (Mariela) and week; three call slots with recording link (in the dialer); checks identification within 30 s, script adherence, DNC and opt-out, recording disclosure, appointment handoff; pass / fail + notes; "two failing weeks → coaching ticket" banner | later |
| Compliance / Cumplimiento | manager, owner | Scope card and telemarketing file | per placement: preset CA / TX / FL / other with allowed and blocked lists, [Publish to client scope card] preview; per client telemarketing file: last DNC scrub (outbound blocked when older than 31 days), list source, scripts with versions, consent records, calling hours, addendum date, recording practice; edit with audit entry | should |
| Documents / Documentos | manager, owner | Expiring and missing | "Expiring within 60 days" first; table person or client, type (ID, police record, W-8BEN, contractor agreement, confidentiality addendum, client agreement, telemarketing addendum, data addendum), signed, expiry, status; W-8BEN rule shown; [Pedir documento]; upload / mark received | should |
| Post announcement / Publicar anuncio | manager, owner | Say it once in both languages | EN box and ES box side by side; attachment; preview as a VA (ES) and as the manager; [Publicar a todos] | should |

### 6.5 Owner

| Screen (EN / ES) | Who | Purpose | Elements in order | Priority |
| --- | --- | --- | --- | --- |
| Clients / Clientes | owner | Every team and its billing state | rows client, brokerage, state, VA(s), block chip Paid / Due / Failed, unread; search; [New client] ($499 setup step) | must |
| Client detail / Detalle del cliente | owner | One client, rates included | contacts and logins; billing email, Stripe customer, tracker workspace; placements with bill, pay and computed margin; blocks and invoices; scope preset and telemarketing file; documents; referrals; notes | should |
| Money · Blocks and invoices / Bloques y facturas | owner | Two-week blocks with payment state | timeline per client: current Oct 12–25 and next Oct 26–Nov 8 (invoiced Oct 19); amount = scheduled hours × bill rate; status Paid / Due / Failed / Retrying (Lone Star failed, retry Oct 22); true-up lines; warning "pauses the placement if unpaid at start"; setup fees; [Retry charge] [Open in Stripe] | must |
| Margin per placement / Margen por colocación | owner | Margin by seat | `.seg` block / approved week / 30 days; `.tbl` placement, VA, client, scheduled h, approved h, bill, pay, revenue, cost, margin $ and %, utilization; totals row; churn line (p-rod-1 replaced under the fit guarantee); Export CSV | must |
| Payout run / Corrida de pagos | owner (manager read-only) | The 5th and 20th | run picker (Oct 20 done, Nov 5 next); rows per VA: approved hours, pay rate, bonuses, total, method, statement sent, invoice received; [Build wire file] [Payoneer export]; [Mark released] | should |
| Reports / Reportes | owner | The business over time | `.kpi` tiles with one chart each: margin per placement, utilization (approved ÷ scheduled), churn and replacement chain (p-rod-1 → p-rod-2), pipeline funnel (counts and days per stage), bench days per VA, capacity (bench by tier vs open requests), cash in / out (blocks paid vs payout runs); `.seg` week / 4 weeks / quarter; pulse answers per client | later |
| Settings / Ajustes (rates, holidays, templates) | owner | Reference and security | tier rates (admin $8, ops $10, ISA $12) and pay band $4.50–$7.00 from `HQD.rates` (read-only); setup fee $499, notice 14 days, paydays 5 and 20; scope presets per state (CA / TX / FL / other); holiday sets US / HN / SV / CO with the 10-business-day declaration rule; message templates EN/ES (report reminder DM, escalation acknowledgment, digest email, announcement); MFA status; audit log link | later |
| Audit log / Registro de auditoría | owner | Who changed what | rows when, who, what, before → after, reason (rates, placements, payouts, hours edits) | later |
| Referrals / Referidos | owner | Credits | rows referrer, referred, date, credit, status; apply credit to a block | later |
| New placement / Nueva colocación | owner, manager | Create or chain a seat | pick VA (bench) and client; tier, hours/week, schedule in client time; bill rate (owner) and pay rate within the band; expectations EN/ES; checkpoints auto-created | later |

### 6.6 Applicant

| Screen (EN / ES) | Who | Purpose | Elements in order | Priority |
| --- | --- | --- | --- | --- |
| Application steps / Pasos de la solicitud | applicant | Resume the multi-step form | steps profile, experience, setup, video with progress; fields per step; Save and continue | should |
| Tests / Pruebas | applicant | Typing, written English, mock call | cards with estimate and [Empezar]; typing test with WPM result; written prompt and submit; mock call slot picker in Honduras time; results "Recibido", never scored | should |
| Book interview / Agendar entrevista | applicant | Pick a slot | slots in the applicant's zone; confirm → calendar event | later |
| Offer / Oferta | applicant | Accept and start onboarding | summary; Accept → status onboarding, Academia unlocks | later |
| Academy (locked) / Academia (bloqueada) | applicant | Preview | greyed module titles; "Se desbloquea cuando seas aceptada" | later |

## 7. Shared components

| Component | Rule |
| --- | --- |
| Avatar | `.avatar` with initials from `person.initials`; colour from `--av1…--av8` by a stable hash of the id; `.avatar.sys` for HQ; live dot (8 px, `--good`, pulsing) bottom-right when on the clock |
| Status pill (`.chip` + dot) | one vocabulary everywhere (client Home, ribbon, manager rows): Working now / Break / Not started / Finished / Off today / Outage / Holiday / Paused; always with "last activity N min ago"; degrades to "Last seen 2:10 PM" when tracker data is older than 15 min. ES: Trabajando / Pausa / No ha empezado / Terminó / Libre hoy / Corte / Feriado / Pausada |
| Chips | `.chip.good` approved, on time, certified · `.chip.warn` pending, late · `.chip.bad` overdue, failed, missing · `.chip.blue` role, info · `.chip.gold` blocked, bench |
| Badges | `.badge.blue` = unseen count; `.badge.gold` with "@" = addressed to you; plain dot = other unread; tab badge shows only the gold number |
| Money | one `Money(kind, value)` component; `HQ.D.can('bill'|'pay'|'margin')` decides: bill → owner and the client's own; pay → owner, manager, the VA's own; margin → owner only; otherwise renders "—" (manager sees "$ •••" in View as client) and logs a console privacy error. Margin is computed (bill − pay) × hours, never stored. `.money` numerals, tabular |
| Time zones | stored in the client's zone (`placement.schedule.tz`); shown in the viewer's zone big with the other zone in `.small .muted` ("8:00 AM PT · 9:00 AM tu hora"); zone labels PT, CT, ET, HN, SV, CO; never a bare time, never raw ISO |
| Dates | EN "Wed, Oct 21" / "Oct 12–25" / "4:52 PM"; ES "mié 21 oct" / "12–25 oct" / "4:52 PM"; day dividers Today / Yesterday / weekday; week labels "Oct 12–18"; relative "2 min ago / hace 2 min" under 1 h |
| Hours | `fmt.hrs` "6h 12m"; totals in decimal where the brief does ("40.5 h") |
| Numbers | `.num` tabular everywhere; KPI tiles in the display font |
| System pill | `.msg.system .pill` with icon, text, time; `audience` all / internal |
| Report card | `.report`, §4.3, one component for chat, Home, Reports, digest preview |
| Sheets and toasts | `.sheet` for forms with Cancel; `.toast` for confirmations (1.5 s) |
| Empty states (`.empty`) | Chat "No messages yet · say hello" / "Aún no hay mensajes"; Inbox "Bandeja despejada"; Needs you "Nothing needs you today"; Hours "No tracked time this week"; Reports "No report yet"; Support "Sin temas abiertos"; Pipeline column "No one here"; Bench "Nobody on the bench"; Documents "Nothing expiring in 60 days"; Escalations "No open tickets"; Search "Nothing found in the channels you can see"; Calendar "No events this week"; Academy "Todo completado" |

## 8. Left out of the prototype (explicitly)

- Real login, email codes, MFA, password reset, row-level security: the role switcher stands in; MFA is a note.
- Sending email or push: the digest is a preview page and a note; notifications are seeded rows.
- Live tracker integration: hours, activity % and "working now" come from seed; nothing polls Hubstaff; screenshots never load, only the external link.
- Stripe, Mercury, Payoneer calls: payment states are seeded; Retry, Pay now, Build wire file show a toast and flip the seed state.
- File upload storage: attachments are chips with name and size; the 25 MB check runs on the picked file's size only.
- Video playback, quizzes with scoring, typing test engine: lessons and tests are mocked bodies with a submit.
- Nested threads, custom emoji, apps, voice, message deletion, read receipts, typing indicators.
- Auto-translation and language detection beyond the "looks Spanish" soft hint.
- Drag-and-drop on the phone (stage picker instead), virtualised message lists, offline queueing beyond the localStorage draft.
- Real holiday calendars: one seeded US set and one Honduran set for Oct–Dec 2026 only.
- Audit log writes outside hours edits and approvals; referrals credit math; report charts beyond a simple sparkline.
