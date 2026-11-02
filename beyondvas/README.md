# BeyondVAs website

## What is in this folder

| File | What it is |
| --- | --- |
| `site/index.html` | The whole website in one file: the HTML, the CSS and the small script for the calculator, role tabs and forms. Edit it directly; there is no build step. |
| `site/favicon.svg` | The browser-tab icon, cut from the logo mark in the header. |
| `private/bootcamp.html` + `private/curriculum.js` | The ISA Certification Program (formerly the 7-day boot camp). Private training for approved VAs, kept outside `site/` so it is never deployed with the public website. See "The ISA Certification Program" below. |
| `private/curriculum-src/` | The editable source of the program: one JSON file per module, `sim.json` for the extra practice calls, the writer spec with the house rules, and `build.js`, which validates them and regenerates `curriculum.js`. |

Deploy the `site/` folder as it is, and never the `private/` folder. The page was first built as a Claude artifact from two other files. Those were
retired in October 2026, so `site/index.html` is the only source now. The artifact link in `HANDOFF.md` is an
earlier preview and does not update when this file changes.

## Deliberate choices on the page

- No hourly rate and no setup-fee amount appear anywhere. Pricing is shared on the 15-minute call, so applicants never
  see client rates. The calculator shows only what a US hire costs. The FAQ says a one-time setup exists, without an
  amount.
- VAs are described as being in Honduras and across Latin America and available for every US time zone. The
  application forms have a country dropdown.

## Before the site goes live

1. **Contact details (done November 2, 2026).** Email `beyondvas@gmail.com`, text or WhatsApp (661) 916-4450, and
   Charly's Calendly link (https://calendly.com/charlyestates/book-a-meeting-with-charly-personally) are in the Book
   section and the footer. Switch to an `@beyondvas.com` address once the domain has a mailbox.
2. **Live addresses (November 2, 2026).** The public site is Netlify project `beyondvas` at
   https://beyondvas.netlify.app, deployed from `site/` only. The boot camp is a separate, unlisted project,
   `bva-isa-training-k7q4m`, at https://bva-isa-training-k7q4m.netlify.app (noindex, no links from the public
   site), deployed from a copy of `private/bootcamp.html` saved as `index.html` with its header links pointing at the
   public site. Send that link to VAs only after they are approved. Connect a real domain when there is one.
3. **Footer contact.** Ideally add a US business address.
4. **Privacy policy and terms.** The footer says they are published at launch. They are among the legal drafts
   waiting for attorney review; link them from the footer once they are final.
5. **Social preview and icons.** Add a 1200 × 630 share image with `og:image`, `og:url` and `twitter:card` tags once
   the domain is final, and a 180 × 180 `apple-touch-icon.png`.
6. **Footer "Beyond family".** Beyond Movers and Beyond Renovation have no links yet. Add their addresses or remove them.
7. **Charly decides.** Whether the hero's example dashboard (María R. and example numbers) stays or shows a real VA
   with consent; testimonials and client logos once the first clients agree; social links; whether the FAQ may keep
   saying that a setup fee exists.
8. **Dates.** Re-check the statistics below and update "current as of October 2026" in the footer at launch.

## Forms

There are three forms, all for Netlify Forms: `book-a-call`, `va-application` (English) and `va-application-es`
(Spanish). Each has `data-netlify="true"`, a hidden `form-name` input and a honeypot field.

1. Deploy to Netlify: drag the `site/` folder onto app.netlify.com, or connect this GitHub repository with
   `beyondvas/site` as the base directory and no build command.
2. In the Netlify project, open Forms, enable form detection, then redeploy so Netlify registers the three forms.
3. Under Forms, then Form notifications, add an email notification for each form: `book-a-call` to Charly, and both
   application forms to the Honduras recruiting team.
4. Submit each form once on the live site and confirm it shows up in the Forms tab and sends the email.

If a post fails, the page shows the visitor what they typed with a Copy button and asks them to email it, so nothing
is lost.

## The ISA Certification Program

Who it is for (decided by Charly on November 1, 2026): only VAs who have applied and been approved. Nothing on the
public website links to it and search engines are told not to index it. It is live at the unlisted address
https://bva-isa-training-k7q4m.netlify.app, which is sent to VAs once they are approved.

What it contains (rebuilt November 2, 2026, from the 7-day boot camp, the HQ academy outline and the Beyond HQ agent
training with all team-specific material removed): 17 modules, about 35 hours, so four to five working days.

- Foundations: Welcome to BeyondVAs, Working with US clients, Your tools, Real estate basics and vocabulary,
  Professionalism and scope, Compliance essentials.
- ISA track: buyer's shoes and A.L.M., speed to lead and the 3-strike cadence, conversations that set appointments,
  financing, objections, sellers, Follow Up Boss discipline, appointments and the 3-way handoff, nurture, client
  recovery, QA and daily KPIs.
- Each module has 5 or 6 full lessons, a hands-on practice assignment sent to the coach, and a 9 or 10 question quiz.
  There are 8 practice calls in the simulator: the original 3 plus a Spanish-speaking buyer, a seller asking for a
  home value, a rate question, a lead with a signed agent agreement, and a past client with a referral.

How it works:

- Modules unlock in order. A module's quiz opens when its lessons are marked complete and passes at 80%. Retakes are
  allowed and the best score counts.
- The certificate needs every module quiz passed, every practice assignment marked done, and every practice call
  completed. "Register my certificate" posts the name, ID and scores to the `isa-certification` form on that Netlify
  project.
- Each practice call scores 100 if the first response is right, otherwise 100 minus that response's penalty. The QA
  average is the mean of the call scores.
- Progress lives in the visitor's browser only (`localStorage` key `bv-isa-program-v1`). Anyone with browser tools could
  fake a certificate on screen, so the registered record in Netlify Forms is what counts.
- To change the content, edit the JSON in `private/curriculum-src/`, run `node private/curriculum-src/build.js`, and
  redeploy `private/` (as `index.html` plus `curriculum.js`) to the unlisted project. Every lead, name, phone number and
  email in it is fictional.
- Writers flagged facts for Charly to confirm, among them the contractor tax wording, pay calendar details, whether
  flagged idle time is paid, and time-zone examples. Have an attorney check the compliance module.

Changes from the brief the boot camp was built from, for accuracy and compliance:

- "Follow Up Boss" instead of "FOB", and the 21x lead-response figure stated as odds, with its source.
- The "I already have an agent" reply no longer pitches off-market listings and respects signed agreements.
- The calling window is 9 AM to 8 PM Monday to Saturday and noon to 8 PM Sunday in the lead's time zone, because
  Texas starts at 9 AM and noon on Sunday. Days 1 and 4 now say every call and text stays inside that window.
- Marcus no longer says "please don't call": in the brief, the "correct" answer kept calling him, which contradicted
  the Day 6 opt-out rule.
- Added to Day 1: ISAs never negotiate or give an opinion of value, and their scope depends on the client's state.
- Added to Day 5 and Elena's note: the agent needs a signed buyer agreement before any tour.
- Added to Day 6: "Before You Dial" (Do Not Call Registry, text consent, manual dialing) and "Fair Housing", which the
  public home page already promises clients. Opted-out contacts are never deleted.
- The certificate says "simulated CRM practice calls" and "a training certificate, not a real estate license".

Have an attorney confirm the calling and Do Not Call rules before launch.

## Editing copy

Section ids, top to bottom: `#bottleneck`, `#imagine`, `#roles`, `#pricing`, `#math`, `#compare`, `#how`,
`#system`, `#guarantee`, `#carry`, `#who`, `#story`, `#faq`, `#book`, `#apply`. The role tabs and the FAQ are plain
HTML you can edit directly. To check a change, open `site/index.html` in a browser; the fonts need internet.

## Claims on the page and where they come from

- 73% of phone inquiries got no follow-up within 24 hours: Pied Piper, 2,198 inquiries to 21 brands, June to July 2026.
- 7x more likely to qualify a lead within an hour: Harvard Business Review, March 2011 (cross-industry, measures qualification, not closings).
- 50% of a typical Realtor's business from repeat and referral: NAR 2026 Member Profile (28% repeat, 22% referral).
- 43% benefits on top of wages: US Bureau of Labor Statistics, Employer Costs for Employee Compensation, June 2026 (benefits are 30% of total compensation).
- $21 average US real estate assistant wage: Indeed, October 2026 (advertised pay).
- $30 US inside-sales base wage (the calculator's ISA default): labelled on the page as our estimate. Add a source if one turns up.

Re-check these quarterly.
