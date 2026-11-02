# BeyondVAs website

## What is in this folder

| File | What it is |
| --- | --- |
| `site/index.html` | The whole website in one file: the HTML, the CSS and the small script for the calculator, role tabs and forms. Edit it directly; there is no build step. |
| `site/bootcamp.html` | The ISA 7-Day Certification Boot Camp, served at `/bootcamp`: a 7-day curriculum with a quiz each day, a simulated Follow Up Boss workspace with three practice calls, and a certificate. One self-contained file like the home page. |
| `site/favicon.svg` | The browser-tab icon, cut from the logo mark in the header. Both pages use it. |

Deploy the `site/` folder as it is. The page was first built as a Claude artifact from two other files. Those were
retired in October 2026, so `site/index.html` is the only source now. The artifact link in `HANDOFF.md` is an
earlier preview and does not update when this file changes.

## Deliberate choices on the page

- No hourly rate and no setup-fee amount appear anywhere. Pricing is shared on the 15-minute call, so applicants never
  see client rates. The calculator shows only what a US hire costs. The FAQ says a one-time setup exists, without an
  amount.
- VAs are described as being in Honduras and across Latin America and available for every US time zone. The
  application forms have a country dropdown.

## Before the site goes live

1. **Email.** `hello@beyondvas.com` appears in the Book section, its Copy button, the form messages and the footer.
   The domain has no mailbox yet, so set one up or change the address everywhere.
2. **Booking.** The Book section is a request form (`book-a-call`); there is no calendar link on the page. Add one
   next to the form if Charly wants people to pick their own time.
3. **Footer contact.** Add a phone number for texting and, ideally, a US business address.
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

There are four forms, all for Netlify Forms: `book-a-call`, `va-application` (English) and `va-application-es`
(Spanish) on the home page, and `isa-certification` on the boot camp page. Each has `data-netlify="true"`, a hidden
`form-name` input and a honeypot field. Both application forms have an optional `bootcamp_certificate` field.

1. Deploy to Netlify: drag the `site/` folder onto app.netlify.com, or connect this GitHub repository with
   `beyondvas/site` as the base directory and no build command.
2. In the Netlify project, open Forms, enable form detection, then redeploy so Netlify registers the four forms.
3. Under Forms, then Form notifications, add an email notification for each form: `book-a-call` to Charly, both
   application forms and `isa-certification` to the Honduras recruiting team.
4. Submit each form once on the live site and confirm it shows up in the Forms tab and sends the email.

If a post fails, the page shows the visitor what they typed with a Copy button and asks them to email it, so nothing
is lost.

## The ISA Boot Camp

How it fits the VA process (decided by Charly on November 1, 2026): the boot camp is recommended before applying and
part of every ISA's onboarding, so the certificate field on the application stays optional. The home page links to it
from the nav, the "Trained" pillar, a card in both VA application sections and the footer. When they finish, the certificate shows a
verification ID (`BVA-ISA-XXXX-XXXX`). "Register my certificate" sends their name, ID and scores to the
`isa-certification` form, so recruiters can match the ID that appears in an application's `bootcamp_certificate`
field. "Apply with this certificate" opens the application, which fills in the ID saved in that browser.

How it works:

- Days unlock in order. Each quiz allows retries; the first try is recorded.
- Each simulator call scores 100 if the first response is right, otherwise 100 minus that response's penalty. The QA
  score average is the mean of the three call scores. The live QA score starts at 85 and stays between 0 and 100.
- The certificate unlocks after all 7 quizzes and all 3 calls. "Print or save as PDF" prints only the certificate.
- Progress lives in the visitor's browser only (`localStorage` key `bv-bootcamp-v1`), so it does not follow them to
  another device, and anyone with browser tools could fake a certificate on screen. The registered record in Netlify
  Forms is what counts. A real check belongs in the VA Hub later.
- The curriculum, quiz answers and the three leads live in the `DAYS` and `LEADS` lists near the top of the page's
  script. Every lead, name, phone number and email is fictional.

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
  home page already promises clients. Opted-out contacts are never deleted.
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
