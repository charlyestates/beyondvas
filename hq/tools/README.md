# Prototype check scripts

These are the checks that were run while the prototype was built. Each one opens `hq/debug.html` in headless
Microsoft Edge, drives it through screens, people and languages, and prints what it found. They need Windows with Edge
at its default install path. Run them from the repository root. Their output (`hq/dom-*.txt`, `hq/tmp-*`,
`hq/shots/`) is ignored by Git.

Scripts that take `-Root` want the repository root, so pass `-Root .` when running from there. `errscan-*`,
`sweep-aurora-analyze.ps1`, `check-hours*`, `check-money*`, `money-inpage.ps1` and `shots-money.ps1` find the folder on
their own. `check-calendar*.ps1`, `people-matrix.ps1` and `people-sweep.ps1` only work when the current directory is
the repository root.

To pass a list to a parameter such as `-Users`, call the script with `-Command` rather than `-File`:

```powershell
powershell -NoProfile -Command "& .\hq\tools\privacy-sweep.ps1 -Root . -Js hq\tools\privacy-scan.js -OutDir hq\privacy-sweep -Users u-ana,u-mariela"
```

## Start here

| Script | What it checks |
| --- | --- |
| `errscan-run.ps1`, then `errscan-analyze.ps1` | Every main screen for ten people in English and Spanish: JavaScript errors, VA surnames shown to clients, pay rates shown where they should not be. |
| `sweep-aurora-run.ps1 -Root . -Js hq\tools\sweep-aurora.js`, then `sweep-aurora-analyze.ps1` | The same full sweep, plus raw placeholders such as `{name}`, `undefined` or escaped HTML on screen (`sweep-aurora-html.js`). |
| `privacy-sweep.ps1 -Root . -Js hq\tools\privacy-scan.js -OutDir hq\privacy-sweep` | Every screen per role, scanned for strings that role must never see (`privacy-dump.js` dumps the visible text instead). |
| `audit-run.ps1 -Root .` | Every screen × person × language (`audit-matrix.js`). Pass `-Js` to run `audit-actions.js` (every button), `audit-links.js` (every link) or `audit-notifs.js` (every notification). |

### What a clean run looks like

A clean run has an empty errlog on every line. The privacy scanners still print a few known false positives, and
those are expected:

- Jenna Ortiz is a client contact, and Ortiz is also on the VA surname list (Fernanda Ortiz), so her own name is
  flagged on her screens and on Mike's.
- A `$6.00` true-up line on invoices BV-1014 and BV-1015 is a credit to the client, not a pay rate.
- The settings screen's two-factor sign-in row says it is not in the prototype yet.
- Search screens echo what you typed, so a search for a surname or "margin" matches itself.

Anything else they print is worth a look.

## One module at a time

`check-calendar*.ps1`, `check-compliance.ps1 -Root .`, `check-home*.ps1`, `check-hours*.ps1`, `check-money*.ps1`,
`money-inpage.ps1`, `people-matrix.ps1` and `people-sweep.ps1` each cover one screen module. The comment at the top
of each says what it prints. `check-compliance.ps1` takes about six minutes and prints only at the end.

## Screenshots

`phone-audit.ps1 -Root .` (390 × 844 phone frame via `hq/phone.html`), `layout-shots.ps1 -root .` (desktop and phone)
and `shots-money.ps1` write PNGs under `hq/shots/`.

## Scripted flows and one-off checks

`run-harness.ps1 -Root . -Js <script> -Out <file>` runs any in-page script through the `?script=` hook of
`debug.html`. The scripts it was used with:

- `fp/*.js`: end-to-end flows (daily report, approving hours, escalation, day off, chat, applicant, money, recompute).
- `flows-compliance.js`, `harness-compliance.js`: escalation, tickets and scope cards.
- `errscan-viewas.js`, `rf-viewas-c32.js`: "View as client" stays read-only and masks money.
- `audit-keys.js`, `audit-width.js`: seed-data shape and phone-width layout probes.

## The workflow scripts

`wf-build.js`, `wf-review.js` and `wf-recheck.js` are the Claude Code workflow scripts that generated the screen
modules and ran the two review rounds. They are kept as a record and are not run directly.
