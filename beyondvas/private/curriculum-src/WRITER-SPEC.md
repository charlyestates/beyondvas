# BeyondVAs ISA Certification Program: writer spec

## What we are building

BeyondVAs places bilingual (Spanish native, English B2+) virtual assistants and inside sales agents (ISAs) from Honduras and
Latin America with US real estate agents and teams. Approved VAs (never the public) take this program before their first
client. It replaces a thin "7-day boot camp" that took minutes. The new program must be a real curriculum: about 20 to 26
hours in total, which is roughly three working days, counting reading plus hands-on practice.

Readers are Spanish-native professionals reading English. Write clear, warm, direct US English at B2 level: short sentences,
concrete examples, no idioms without explanation. Use "you". Use realistic US real estate situations with fictional people
(no real names except none), phone numbers in the 555 range, emails at example.com. Never mention Beyond Estates, Charly,
Zillow Preferred program rules, commission splits, team incentives, real vendors, transaction coordinators or Drive links.
"Your client" means the US agent or team the VA works for. Their leads are "leads" or "prospects".

## Sources to mine (read them)

- C:\Users\Charlie\Desktop\beyondvas\hq\data\academy.js : 14 modules, 62 lesson summaries (the outline of the existing academy;
  m1-m5 foundations, m6-m14 ISA track). Expand these into full lessons.
- C:\Users\Charlie\Desktop\beyondvas\hq\research\beyond-hq-onboarding-content.js : the original agent training (7 chapters, 73
  steps: buyer's shoes, speed to lead, A.L.M., two-minute conversations, appointment setting, financing conversation,
  objections with ask-listen-mirror and acknowledge-pivot-appointment, CRM discipline, client recovery). It contains
  PRIVATE team material: never copy names, phone numbers, emails, splits, incentives, links or team rules. Take the
  teaching ideas only, and rewrite them for an ISA working for any client team.
- C:\Users\Charlie\Desktop\beyondvas\beyondvas\private\bootcamp.html : the current boot camp. In its script, the DAYS array
  holds 7 days of lessons and one quiz each, and LEADS holds 3 simulator calls. Every one of those 7 quiz questions and
  every lesson fact must survive somewhere in the new modules (they are mapped below). Keep the quiz questions, options,
  answers and explanations verbatim.
- C:\Users\Charlie\Desktop\beyondvas\beyondvas\site\index.html : the public site's promises about training (scripts,
  objection handling, mock calls, CRM habits, real estate vocabulary, what an unlicensed assistant can and cannot say,
  Do-Not-Call-scrubbed lists, manual dialing, legal calling hours, honoring opt-outs, time tracking with screenshots,
  daily/hourly reports, idle time reviewed before billing). The program must teach what the site promises.

## House rules every module must respect (these are decided; never contradict them)

1. Calling window: 9:00 AM to 8:00 PM in the lead's local time Monday to Saturday, noon to 8:00 PM Sunday. Texts follow the
   same window. Federal rules allow 8 AM to 9 PM; Texas allows no solicitation calls before 9 AM (noon Sunday); Florida
   none after 8 PM; some states are stricter still (Rhode Island: 9 AM-6 PM weekdays, 10 AM-5 PM Saturday, none Sundays or
   holidays). The lead's state counts; the manager gives state rules before dialing.
2. Opt-outs: "STOP", "remove me", "don't call" = tag DNC, stage Archived / DNC, pause all automations, log it. Never delete
   an opted-out contact. Do not argue.
3. Before you dial: inbound leads who asked to be contacted may be called in the window. Any other list (old database,
   farm, purchased) only if scrubbed against the National Do Not Call Registry and the client's own DNC list. Text only
   leads who agreed to texts. Dial by hand: no autodialer or prerecorded messages unless the manager confirms written
   consent.
4. Fair housing: treat every caller the same; never steer; never describe areas by who lives there, schools, crime or
   "safety", religion or "family-friendly"; say "Great question for your agent. I can also send you public sources."; log
   what the lead wants in the home, not who they are.
5. Unlicensed scope: ISAs do discovery, A.L.M. qualification and appointment scheduling. Never give pricing promises, quote
   legal clauses, interpret inspection reports, sign agency agreements, negotiate, discuss price, terms or commission, act
   as an agent or give an opinion of value. Scope depends on the client's state (Texas, for example, does not let an
   unlicensed assistant call to find out whether someone wants to buy, sell or lease); the manager sets scope.
6. "I already have an agent": ask whether they signed an agreement; if yes, respect it, note it, tell your agent, never pitch
   around it; if not, offer a second opinion and ask for a time.
7. Buyer agreements: since August 2024, an agent working with a buyer needs a written buyer agreement before any tour. The
   agent sends and explains it; the ISA never does, but flags it in the calendar invite.
8. Financing: never give loan, rate or credit advice; connect them with the client's preferred lender only when the agent
   says so.
9. Call recording: always announce that the call may be recorded; treat every state as requiring everyone's consent.
10. Speed to lead: dial within 180 seconds of a lead arriving, inside the window; contacting within 5 minutes makes the odds of
    qualifying about 21 times higher than at 30 minutes (Lead Response Management Study, Dr. James Oldroyd (MIT) with
    InsideSales.com, 2007). 3-strike cadence: call at 0 min (ring 5-6 times, 20-second voicemail), personalized text at 2 min
    (to leads who agreed to texts), second call about 4 hours later before 6 PM their time, all inside the window.
11. A.L.M. = Appointment, Location, Motivation. Every Follow Up Boss note: Date/Time, Call/Text Disposition, A, L, M, Next Step.
12. Smart List order: New Speed-to-Lead (0-15 min), Hot Active (ready within 30 days), Scheduled Follow-Up Tasks (due today),
    30-60 Day Nurtures. Stage after booking an appointment: Pending Handoff.
13. Daily KPIs per shift: 80-100 dials, 12-15 live conversations, 2-3 A.L.M.-qualified appointments. QA rubric (100): Speed to
    Lead 20, ALM Discovery 30, Objection Handling 20, Follow Up Boss Hygiene 15, Compliance 15. Standard: 90+.
14. BeyondVAs operations: VAs are independent contractors paid in USD twice a month (5th and 20th); Hubstaff tracks time with
    random screenshots about every two minutes while clocked in; the client can see hours and screenshots; unexplained idle
    time is flagged and reviewed by the manager before billing; a daily report goes in the client channel at end of shift;
    a BeyondVAs coordinator/manager backs the VA up; clients talk to VAs only inside the client channel (no private DMs);
    passwords only through a password vault; never download or export client data; outages: tell the manager at once and
    switch to backup internet/power.

## Module outline and owners

Foundations (every VA):
- F1 Welcome to BeyondVAs: how the program, your coordinator, your client and getting paid work. (academy m1)
- F2 Working with US clients: culture, time zones, phone English, email and text etiquette, reliability. (m2)
- F3 Your tools: Hubstaff time tracking and screenshots, Follow Up Boss tour, Google Workspace, password vault, internet and
  power backup, outage protocol. (m3)
- F4 Real estate basics and vocabulary: the buyer and seller journeys, who does what (agent, broker, lender, escrow/title,
  inspector, appraiser, transaction coordinator), MLS and portals, a 40+ term glossary. (m4)
- F5 Professionalism, confidentiality and your scope: unlicensed scope, data protection, what you can and cannot say. (m5;
  boot camp Day 1 lesson 2 + its scope callout)
- F6 Compliance essentials: TCPA calling window, Do Not Call, consent, opt-outs, call recording consent, fair housing. (m14;
  boot camp Day 6 lessons 1-3 and its quiz)
ISA track:
- I1 In the buyer's shoes and A.L.M. (m6; boot camp Day 2 lesson 1 and Day 2 quiz)
- I2 Speed to lead and the 3-strike cadence (m7; boot camp Day 1 lessons 1 and 3, Day 1 quiz, Day 4 lesson 1, Day 4 quiz)
- I3 Conversations that set appointments: two-minute conversations, discovery questions, scripts for portal, ad, open-house
  and past-client leads, always asking for the appointment. (m8)
- I4 The financing conversation (m9)
- I5 Mastering objections: ask-listen-mirror, acknowledge-pivot-appointment, at least 12 objections with replies. (m10;
  boot camp Day 2 lesson 2)
- I6 Working with sellers: seller leads, home-value questions without giving value, setting the listing consultation. (m11)
- I7 Follow Up Boss discipline: Smart Lists, stages, A.L.M. notes, tasks, tags, action plans. (m12; boot camp Day 3
  lessons 1-2 and Day 3 quiz)
- I8 Appointments, calendars and the 3-way handoff (boot camp Day 5 lessons 1-2 incl. buyer-agreement rule and Day 5 quiz)
- I9 Nurture and long-term follow-up: texts, emails and calls that re-engage cold leads, cadence by timeline. (new)
- I10 When you mess up: win the client back (m13)
- I11 QA scorecard, daily KPIs and your daily report (boot camp Day 4 lesson 2, Day 6 lesson 4 rubric, Day 7 quiz)

## Output format (one JSON file per module)

Write `C:\Users\Charlie\AppData\Local\Temp\claude\C--Users-Charlie-Desktop-beyondvas\0e25b4c8-284d-40a2-b0f6-c84274b9722e\scratchpad\curriculum\modules\<ID>.json`
(ID like F1, I7), UTF-8, valid JSON (validate it: run
`& "$env:LOCALAPPDATA\Programs\node\node.exe" -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));console.log('ok')" <file>`
from PowerShell). Shape:

{
  "id": "I7", "part": "foundations" | "isa", "title": "...", "summary": "one sentence",
  "objectives": ["3-5 things they can do after"],
  "lessons": [ { "id": "I7-1", "title": "...", "minutes": 12, "body": [ BLOCK, ... ] } ],   // 4-6 lessons
  "practice": { "title": "...", "minutes": 60, "intro": "...", "steps": ["..."], "deliverable": "what they send their coach" },
  "quiz": [ { "q": "...", "options": ["A","B","C","D"], "answer": 1, "explain": "..." } ]      // 8-10 questions
}

BLOCK types (only these): {"t":"p","text":"..."} paragraph; {"t":"list","items":["..."]}; {"t":"steps","items":["..."]}
numbered; {"t":"callout","title":"...","text":"..."}; {"t":"script","title":"...","lines":[{"who":"You","text":"..."},
{"who":"Lead","text":"..."}]}; {"t":"dodont","do":["..."],"dont":["..."]}; {"t":"table","head":["..",".."],"rows":[["..",".."]]};
{"t":"glossary","terms":[{"term":"...","def":"..."}]}. In any text, **double asterisks** make bold. No HTML.

Depth: each lesson 500-900 words of real teaching (explanations, examples, scripts, mistakes to avoid), minutes = words / 120
rounded. Practice assignments are real work: role-plays recorded and sent to the coach, scripted drills, CRM exercises in a
practice account, written notes, shadowing a live call; 45-120 minutes each. Quizzes test understanding with plausible wrong
options, 4 options each, answer index 0-3, varied correct positions, an explanation for each. When a boot camp quiz question
maps to the module, include it verbatim (its correct answer and explanation unchanged) as one of the questions.
