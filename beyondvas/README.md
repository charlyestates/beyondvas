# BeyondVAs website

## What is in this folder

| File | What it is |
| --- | --- |
| `site/index.html` | The whole website in one file: the HTML, the CSS and the small script for the calculator, role tabs and forms. Edit it directly; there is no build step. |
| `site/favicon.svg` | The browser-tab icon, cut from the logo mark in the header. |

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
