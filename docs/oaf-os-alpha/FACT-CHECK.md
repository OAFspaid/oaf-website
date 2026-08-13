# OAF OS Alpha — Crisis Resources Fact-Check

**Auditor:** Fact Checker (Squad agent, Verification mode)  
**Date:** 2026-08-11  
**Scope:** Crisis resource copy sourced from https://app.operationantifragile.com/crisis-resources  
**Audience risk level:** HIGH — veterans and first responders, elevated crisis risk

---

## Verification Table

| # | Claim | Rating | Evidence / Source | Correction if needed |
|---|-------|--------|-------------------|----------------------|
| 1a | "Call or text 988" — number is correct | ✅ Verified | `988lifeline.org` site title: *"988 Suicide & Crisis Lifeline"*; SAMHSA confirms 988 as the national crisis line. Number matches. | None |
| 1b | 988 accepts text (SMS) | ✅ Verified | `988lifeline.org/get-help/` describes text as a supported contact method in addition to call and chat. | None |
| 1c | Official name is "988 Suicide & Crisis Lifeline" | ✅ Verified | Meta description on `988lifeline.org`: *"At the **988 Suicide & Crisis Lifeline**…"* — this is the exact official name. | None |
| 2a | Veterans Crisis Line: "Call 988 and press 1" | ✅ Verified | `veteranscrisisline.net` HTML `<meta name="Description">`: *"Dial 988 then Press 1"* and nav CTA `<a href="tel:988">Dial 988 then Press 1</a>`. Fully confirmed. | None |
| 2b | Veterans Crisis Line: text 838255 | ✅ Verified | Same VCL meta description: *"text 838255"*; nav shows `<a href="sms:838255">838255</a>` and `Text` button. | None |
| 2c | Veterans Crisis Line: online chat option exists | ✅ Verified | VCL nav includes `<a href="/get-help-now/chat/">Chat</a>`. Chat confirmed. | None |
| 2d | Correct official URL for Veterans Crisis Line | ✅ Verified | Canonical URL confirmed as **https://www.veteranscrisisline.net/** | Update any in-app links to use `https://www.veteranscrisisline.net/` |
| 3a | QRFup site resolves at https://www.qrfup.org/ | ✅ Verified | Site loaded and rendered mission/about content successfully (August 2026). | None |
| 3b | QRFup serves veterans, first responders, and families | ✅ Verified | Qrfup.org mission: *"ending the suicide epidemic afflicting our U.S. military service men and women, veterans, first responders and their families"* | None |
| 3c | QRFup: "Press SOS to reach a trained therapist" | ⚠️ Unverified — **BLOCKER** | Qrfup.org homepage does not describe an "SOS button" feature. The mission page was the only public content retrieved; no feature documentation is publicly visible. The phrase "trained therapist" cannot be confirmed from any publicly accessible page. Site mission references *"licensed therapists and physical peer-to-peer support specialists"* but that is for their broader program, not specifically tied to an in-app SOS function. We cannot verify that pressing SOS routes to a therapist, nor that the individual reached holds any particular credential. | **Remove "Press SOS to reach a trained therapist."** Replace with language drawn only from what the org publicly claims (see Required Corrections). |
| 3d | QRFup: "confidential follow-up support" | ⚠️ Unverified | No public documentation of follow-up support policy or confidentiality standard found on retrieved pages. | **Remove "confidential follow-up support"** until source documentation is provided directly by QRFup. |
| 4 | EIN `99-2773713` in `_config.yml` | 🔍 Needs Investigation | EIN is present in config. Per task scope, no external registry validation was performed. See "Do not claim" section. | See handling note below. |
| 5 | Operation Antifragile described as 501(c)(3) in config | 🔍 Needs Investigation | `_config.yml` comment reads *`# 501(c)(3) Employer Identification Number`*, confirming the claim is being made internally. External verification was not in scope. | See handling note below. |

---

## Required Corrections

The following app copy **must change** before this page ships. Copy-paste ready replacements:

### 1. QRFup description — remove unverifiable clinical claim

**Current:**
> QRFup Crisis App — A free crisis-intervention app for veterans, first responders, and their families. Press SOS to reach a trained therapist, with confidential follow-up support.

**Replace with** (based only on what qrfup.org publicly states):
> **QRFup Crisis App** — A free crisis-support app for veterans, first responders, and their families. [Visit qrfup.org](https://www.qrfup.org/) to learn more and download the app.

> ⚠️ **Before shipping any richer description of QRFup**, obtain written documentation from QRFup confirming: (a) the SOS feature exists and is active, (b) who answers (credentials, licensing), and (c) their confidentiality policy. Do not republish clinical claims ("therapist", "licensed") based on their homepage alone — those describe their program broadly, not the in-app experience specifically.

---

## Recommended Additions

The following resources for **first responders specifically** (not only veterans) were verified and are appropriate to list. Maximum 2 additions:

### ✅ CopLine (Law Enforcement)
- **What it is:** 24/7 confidential crisis hotline staffed by *retired* law enforcement officers. Operated by a nonprofit. Calls answered by Retired Active Peer Listeners.
- **Phone:** 1-800-267-5463 (1-800-COPLINE)
- **Website:** https://www.copline.org/
- **Source verified:** Homepage and contact page retrieved 2026-08-11. Operational status confirmed (site last published 2026-07-10 per Webflow metadata).
- **Suggested copy:**
  > **CopLine** — 24/7 confidential support for law enforcement officers (active and retired) and their family members, answered by retired officers. Call **1-800-267-5463** or visit [copline.org](https://www.copline.org/).
- **Note:** CopLine is law enforcement-focused, not fire/EMS. For fire/EMS, no second resource could be independently verified to the same standard in this audit pass. The second slot should remain empty until a verified resource is found.

> ⚠️ For fire and EMS responders, the **988 Suicide & Crisis Lifeline** (call or text 988) applies universally and should be prominently cross-listed.

---

## Do Not Claim

The following specific phrasings **must not appear** in OAF OS app copy:

| Phrase | Reason |
|--------|--------|
| "trained therapist" (re: QRFup SOS) | Clinical credential claim we cannot verify from any public QRFup documentation |
| "confidential follow-up support" (re: QRFup) | Confidentiality policy not publicly documented by QRFup |
| "Press SOS to reach a [person type]" (re: QRFup) | The SOS feature, its routing, and staffing are not described in any publicly accessible QRFup page |
| "Operation Antifragile EIN: 99-2773713" in app UI | EIN should not appear in user-facing app copy — it belongs only in donor receipts and official filings. No external validation was performed in this audit. |
| "Operation Antifragile is a 501(c)(3)" as a standalone claim in app UI | The 501(c)(3) claim may be accurate, but app crisis resource pages are not the appropriate venue. Restrict this claim to About/donation pages, and ensure legal counsel has reviewed. |

---

## Blocker Summary

| Severity | Item |
|----------|------|
| 🚨 **BLOCKER — must fix before launch** | QRFup "trained therapist" and "confidential follow-up support" claims are unverifiable. Publishing them exposes OAF to reputational and legal risk and may mislead people in acute crisis. |
| ⚠️ **Action required** | QRFup SOS feature description entirely unverified. Either obtain documentation from QRFup or reduce listing to organization name + link only. |
| ℹ️ **Informational** | EIN and 501(c)(3) claim in `_config.yml` are out of scope for in-app crisis resource pages. Move to appropriate pages only. |

---

## Sources Used

- https://988lifeline.org/ — retrieved 2026-08-11
- https://988lifeline.org/get-help/ — retrieved 2026-08-11
- https://www.veteranscrisisline.net/ — retrieved 2026-08-11 (HTML source, meta description confirmed)
- https://www.qrfup.org/ — retrieved 2026-08-11
- https://www.copline.org/ — retrieved 2026-08-11
- https://www.copline.org/contact-us — retrieved 2026-08-11
- https://www.samhsa.gov/find-help/988 — retrieved 2026-08-11
- `_config.yml` in this repository — read directly
