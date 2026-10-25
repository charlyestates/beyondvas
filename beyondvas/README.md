# BeyondVAs website: files and how to launch it

## What is in this folder

| File | What it is |
| --- | --- |
| `index.html` | The page as published to the private Claude artifact (no doctype or head, because the artifact viewer adds them). Edit this file, then republish. |
| `site/index.html` | The same page wrapped as a complete HTML document. This is the file to deploy to Netlify or any static host. It is regenerated from `index.html` and `head.html`. |
| `head.html` | The title, fonts and all CSS (design tokens for the light Beyond Estates theme and the dark black-and-gold theme). |
| `site/*.png` | Render checks (desktop, mobile, dark) used during the build. Safe to delete. |
| `site/mobile-harness.html`, `site/index-dark.html` | Test harnesses. Safe to delete. |

## Deliberate choices on the page

- No rates or setup fee appear anywhere; pricing is shared on the 15-minute call (so applicants never see client rates). The calculator shows only what a US hire costs.
- VAs are described as being in Honduras and across Latin America, available for every US time zone; the application form has a country dropdown.

## Before the site goes live, replace three placeholders

1. `hello@beyondvas.com` (appears in the Book section, the Copy button and the footer).
2. The booking link `https://calendly.com/beyondvas/15min` on the "Open the calendar" link (id `calendly`).
3. Add a mobile number for texting and, ideally, a US business address in the footer.

## Forms

Both forms (`book-a-call` and the two `va-application` forms) carry Netlify Forms attributes (`data-netlify="true"`, a hidden `form-name` input and a honeypot). On a Netlify-hosted site they work with no backend:

1. Deploy `site/` to Netlify (drag the folder onto app.netlify.com, or connect a repo).
2. In the Netlify project: Forms, then Form notifications, then add an email notification to your inbox (and to the Honduras team for `va-application`).
3. Submissions also appear in the Netlify Forms tab.

Inside the Claude artifact preview the forms cannot send anything, so they show the visitor what would be sent and offer a Copy button. The page detects which environment it is in automatically.

## Editing copy

Everything is in one file. Section ids: `#bottleneck`, `#imagine`, `#roles`, `#pricing`, `#math`, `#compare`, `#how`, `#system`, `#guarantee`, `#carry`, `#who`, `#story`, `#faq`, `#book`, `#apply`. The role tabs, pricing tiers and FAQ are plain HTML lists you can edit directly.

## Rebuilding `site/index.html` after an edit

Run from the session folder in PowerShell:

```powershell
$body = (Get-Content beyondvas\index.html -Raw -Encoding UTF8); $i = $body.IndexOf('<header class="nav">'); $body = $body.Substring($i); $head = Get-Content beyondvas\head.html -Raw -Encoding UTF8; $skel = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'; [IO.File]::WriteAllText((Resolve-Path beyondvas\site).Path + '\index.html', $skel + "`n" + $head + "`n" + $body + "`n</body></html>", (New-Object System.Text.UTF8Encoding $false))
```

## Claims on the page and where they come from

- 73% of phone inquiries got no follow-up within 24 hours: Pied Piper, 2,198 inquiries to 21 brands, June to July 2026.
- 7x more likely to qualify a lead within an hour: Harvard Business Review, March 2011 (cross-industry, measures qualification, not closings).
- 50% of a typical Realtor's business from repeat and referral: NAR 2026 Member Profile (28% repeat, 22% referral).
- 43% benefits on top of wages: US Bureau of Labor Statistics, Employer Costs for Employee Compensation, June 2026 (benefits are 30% of total compensation).
- $21 average US real estate assistant wage: Indeed, October 2026 (advertised pay).

Re-check these quarterly; the footer says they were current as of October 2026.
