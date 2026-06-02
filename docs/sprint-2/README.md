# Sprint 2 — Client Documents

Four documents for the Sprint 2 proposal to SSSGS. Edit the `_[bracketed]_`
placeholders before sending.

| File | When to use it |
|---|---|
| [`00-cover-email.md`](./00-cover-email.md) | The email body when sending the SoW to the client |
| [`01-statement-of-work.md`](./01-statement-of-work.md) | Formal SoW for client signature — attach as PDF |
| [`02-invoice-template.md`](./02-invoice-template.md) | Invoice template — use after signature for the 50% advance, then again after handover for the balance |
| [`03-sprint-3-roadmap.md`](./03-sprint-3-roadmap.md) | Roadmap for what comes next — share alongside the SoW so the client sees the full arc |

## Recommended send order

1. **Today** — Send the cover email with the SoW PDF and the Sprint 3 roadmap PDF attached
2. **On signature** — Raise invoice #1 (50% advance), share by email
3. **Day 1 kickoff** — Receive payment, confirm asset handover, start work
4. **Day 7 handover** — Receive client acceptance, raise invoice #2 (50% balance)
5. **Day 14** — Payment due; follow up if not received

## Convert to PDF

Quick options:
- **VS Code** with the "Markdown PDF" extension: right-click the `.md` file → Export (pdf)
- **Pandoc** (CLI): `pandoc 01-statement-of-work.md -o sow.pdf --pdf-engine=wkhtmltopdf`
- **Online** (sensitive: client/contract data — prefer offline): paste into typora.io or markdowntopdf.com

## Before sending, double-check

- [ ] Your name, address, phone, email, GST/PAN are filled in
- [ ] Client name, address, contact filled in
- [ ] Invoice number assigned and tracked
- [ ] Day rates filled in (or fixed bid amount)
- [ ] Bank details / UPI for payment filled in
- [ ] Estimated start date / handover date filled in
- [ ] Governing law jurisdiction selected (India or Singapore — based on where you're billing from)
- [ ] All `_[brackets]_` placeholders replaced
