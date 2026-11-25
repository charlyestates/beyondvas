# LockedIn VAs ISA Boot Camp: one-day, bite-size, interactive (writer spec)

## Why this exists

The first program (the long modules in `modules/`) had the right knowledge but was far too much text. New ISAs felt
overwhelmed and scrolled past it. The owner wants the same core knowledge as a ONE-DAY boot camp: about 3 to 4 hours of
tapping through small screens, so a new ISA can start calling Zillow and Realtor.com buyer and seller leads the next day.
Think Duolingo or Zillow Academy: one idea per screen, very few words, something to tap on most screens.

## The learner

Lives in Honduras or Latin America. English is a second or third language. Write at US grade 3 to 5 reading level:
- Sentences of 12 words or fewer. One idea per sentence. Common words only.
- No idioms, no slang, no long words when a short one exists. Explain a real estate word the first time, in 6 words.
- Talk to them as "you". Friendly, calm, a little fun. Never scary. Short wins.
- Call scripts stay natural spoken US English, but short.

## Sources

- The knowledge: `C:\Users\Charlie\Desktop\beyondvas\beyondvas\private\curriculum-src\modules\*.json` (17 long modules:
  F1-F6 foundations, I1-I11 ISA track) and `sim.json`. Take the most useful 20 percent. Leave the rest out. Less is more.
- The house rules: the section "House rules every module must respect" in
  `C:\Users\Charlie\Desktop\beyondvas\beyondvas\private\curriculum-src\WRITER-SPEC.md`. They are decided. Never contradict
  them. (Pay is ONCE A MONTH in USD. The company is LockedIn VAs.)
- Zillow and Realtor.com: most leads come from these two sites. Teach only safe, widely known practice: the lead tapped
  "Contact agent" or "Request a tour" on a home; they expect a fast call; they may have asked more than one agent, so the
  first helpful call usually wins; say the address of the home they looked at; ask about that home first, then A.L.M.;
  offer a tour time; many are early and just looking, so be kind and follow up; log everything in Follow Up Boss. Do NOT
  state any Zillow or Realtor.com program rule, fee, score, policy or statistic. Do not say anything negative about them.
- Never mention Beyond Estates, real people, real phone numbers or emails. Fictional names, 555 phones, example.com.

## The 12 chapters

| id | Title | Must cover |
| --- | --- | --- |
| C1 | Welcome. Your job in one line | What an ISA is; you call leads and set appointments for an agent ("your client"); LockedIn VAs, your coordinator, the client channel; paid monthly in USD for tracked hours; how this boot camp works |
| C2 | Your tools and your day | Hubstaff clock in/out and screenshots; Follow Up Boss is where leads live; password vault; internet or power outage: tell your coordinator at once; daily report at end of shift; what a normal shift looks like |
| C3 | Real estate in 15 minutes | Buyer, seller, agent, lender, pre-approval, listing, showing/tour, offer, escrow/closing, MLS; the buyer's road and the seller's road in 5 steps each |
| C4 | What you can say. What you cannot | You do discovery, A.L.M. and appointments. You never: price opinions, legal or loan advice, inspection, negotiate, commission. "Great question for your agent." Fair housing: never describe an area by people, schools, crime or safety. Client data stays private |
| C5 | Calling rules that protect you | Calling window 9 AM-8 PM lead's time Mon-Sat, noon-8 PM Sunday, texts too; STOP / remove me / don't call = DNC now, never argue, never delete; inbound leads vs other lists (must be scrubbed); text only with consent; dial by hand; say the call may be recorded |
| C6 | Zillow and Realtor.com leads | Where the lead came from and what they just did; what they expect; why the first call wins; open with the home's address; tour request vs question vs just looking; early browsers are normal |
| C7 | Speed to lead and the 3 strikes | Call within 180 seconds, inside the window; 5 minutes vs 30 minutes = about 21 times better odds; Strike 1 call (5-6 rings, 20-second voicemail), Strike 2 text at 2 min, Strike 3 call about 4 hours later before 6 PM their time; lead arrives after hours = first thing when the window opens |
| C8 | A.L.M. and the two-minute call | A = Appointment, L = Location, M = Motivation; the opening line; 4 easy questions; always ask for a day and time with two choices; buyer call start to finish; what a great two-minute call sounds like |
| C9 | Objections made easy | Acknowledge, ask, appointment. "Just looking", "I already have an agent" (ask if they signed; if yes respect it and tell your agent), "Send me info", "Call me later", "Is this a sales call?", "What are rates?" (no loan advice; the agent or their lender helps) |
| C10 | Seller leads | Seller wants: what is my home worth, how fast, what do I net. You never give a value. The goal is a listing consultation with the agent. Seller A.L.M.: address, timeline, why. Three seller objections |
| C11 | Follow Up Boss and the handoff | Smart List order (New Speed-to-Lead, Hot Active, Tasks due today, 30-60 Day Nurture); the 6-part note (Date/Time, Disposition, A, L, M, Next Step); stage Pending Handoff after booking; calendar invite with the Follow Up Boss link and 24-hour and 1-hour reminders; the agent needs a signed buyer agreement before a tour, the agent handles it; 3-way warm handoff line |
| C12 | Follow-up, mistakes and your numbers | Most appointments come after several tries; simple nurture rhythm; if you make a mistake: tell your agent fast, with the fix; daily numbers 80-100 dials, 12-15 talks, 2-3 appointments; the 100-point QA rubric in one screen; you are ready |

The 7 original boot camp quiz ideas must survive somewhere (first 3 minutes goal; A.L.M. meaning; what every note needs;
no answer on first call; stage after booking; "STOP CALLING ME"; what a great ISA does).

## Output: one JSON file per chapter

Write to `C:\Users\Charlie\Desktop\beyondvas\beyondvas\private\curriculum-src\chapters\<id>.json`, UTF-8, valid JSON.
Validate each: PowerShell `& "$env:LOCALAPPDATA\Programs\node\node.exe" -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));console.log('ok')" <file>`

```
{ "id": "C7", "title": "...", "steps": [ STEP, ... ],          // 22 to 28 steps
  "quiz": [ { "q": "...", "options": ["..","..",".."], "answer": 0, "explain": "..." } ] }   // exactly 5, 3 options each
```

STEP types (only these; plain text, `**bold**` allowed, no HTML):

- `{"t":"say","icon":"📞","h":"Short headline","text":"Up to 35 words."}` one idea. `icon` is one emoji.
- `{"t":"tattoo","text":"Rule in 10 words or fewer.","sub":"One short line why."}` a "brain tattoo": the rule to remember. 2 or 3 per chapter.
- `{"t":"flip","h":"Tap each card","cards":[{"front":"Word or question","back":"Answer in up to 14 words"}]}` 2 to 4 cards.
- `{"t":"pick","q":"Question?","options":["..",".."],"answer":1,"why":"Up to 20 words."}` 2 to 4 options. The learner must find the right one.
- `{"t":"chat","who":"Maria","channel":"call","says":"What the lead says.","options":[{"text":"A reply you could say","good":false,"why":"Up to 18 words"},{"text":"The right reply","good":true,"why":"Up to 18 words"}]}` 2 or 3 options, exactly one good. `channel` is "call" or "text".
- `{"t":"sort","h":"Can you say it?","left":"OK to say","right":"Not OK","items":[{"text":"Short line","side":"left"}]}` 4 to 6 items, both sides used.
- `{"t":"order","h":"Put the 3 strikes in order","items":["First","Second","Third"]}` 3 to 5 items, written in the CORRECT order (the page shuffles them).
- `{"t":"fill","h":"Finish the line","before":"Would Saturday at 11 or ","after":" work better?","options":["2","never","maybe"],"answer":0}` 3 options, one word or short phrase each.
- `{"t":"speak","h":"Say it out loud","line":"A script line of up to 22 words.","times":3}` they say a key line aloud. 1 to 3 per chapter.
- `{"t":"win","text":"One short line of praise and what they can now do."}` always the LAST step.

Rules for a chapter: start with a `say` that hooks them (a tiny story or a question). Never more than two `say` steps in
a row. At least 60 percent of steps are interactive (flip, pick, chat, sort, order, fill, speak). Put the correct option
in different positions. Wrong options must be believable. Every fact in the quiz was taught in the chapter. Total words
per chapter under 900. If you are unsure a detail matters on day one, leave it out.
