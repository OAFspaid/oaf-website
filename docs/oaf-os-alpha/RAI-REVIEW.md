# OAF OS Alpha — RAI Review

**Reviewer:** Rai (Responsible AI agent, Squad)
**Date:** 2026-08-11
**Scope:** `app/` — `data/seed.json`, `data/copy.json`, `offline.html`, `index.html`, `js/components/views/**`, `js/components/header.js`, `js/components/nav.js`, `js/components/crisis-modal.js`, `js/components/safety-banner.js`, `js/state.js`; cross-referenced `docs/oaf-os-alpha/FACT-CHECK.md`
**Audience risk level:** HIGH — veterans and first responders, elevated crisis risk

---

## Verdict

🟡 **Yellow — conditionally safe to preview with stakeholders**

The app's safety architecture is genuinely well-constructed: crisis resources are in the global header (every screen), the footer, the nav, and the offline page; all numbers are correct; the check-in feature is explicitly framed as self-tracking and not clinical; seed data contains no real PII; no credentials were found. The Fact Checker's critical blockers (QRFup "trained therapist" and "confidential follow-up support") have been correctly removed, and CopLine has been added. The app demonstrates real safety discipline that most apps in this space lack.

Two issues prevent 🟢: (1) `copy.json` retains a `"Secure mission access"` subheading on the login screen object that is never rendered in the current alpha but is a live misleading string in the codebase, and (2) the 404/not-found view omits any crisis resource link or footer, creating a gap in the "crisis accessible from every screen" requirement. Both are straightforward to fix. No ship-blockers were found.

---

## Findings

| ID | Severity | Category | Finding | File:line | Required Fix |
|----|----------|----------|---------|-----------|--------------|
| R-01 | Advisory | Honest capability representation | `copy.json` login screen retains `"subheading": "Secure mission access"`. The login.js view does not render this field (it renders `demo.rolePickerHeading` / `demo.rolePickerBody` instead), so it is not currently visible. However, it is a live data string that could be picked up if the full login form path is ever activated or if a developer renders `copy.screens.login.subheading`. A demo app with a role-picker and no real auth must not carry language implying real secure authentication. | `app/data/copy.json:27` | Change to: `"subheading": "Alpha preview — no real accounts or authentication."` |
| R-02 | Critical | Crisis resource integrity | The `not-found.js` (404) view renders a plain "Page Not Found" card with a home link but no crisis resource link, no footer, and the safety-banner component is not invoked. Architecture §10 requires crisis resources to be accessible from every screen. A member who lands on a broken URL — including one who types directly into the address bar — is dropped into a screen with no path to 988. | `app/js/components/views/not-found.js:1–11` | Add a crisis link below the home button: `<p class="crisis-footer-note" style="margin-top:1.5rem;">If you are in crisis, <a href="#/crisis-resources">Crisis Resources are here</a> — or call or text <a href="tel:988">988</a>.</p>` Alternatively, ensure the app-level footer (safety-banner) is rendered on this view. |
| R-03 | Advisory | Privacy & data handling | `copy.json` `offline.body` says "Your data is saved in this browser" which is accurate, but nowhere in the in-app UI (settings, check-in forms, apply forms) is there explicit disclosure that localStorage on a shared device means other users of that device could access the data. The settings view shows "localStorage active" to staff/coaches but a member never sees this. `seed.json` `safety.privacy` says "handled with discretion" — which is not the same as "stored locally on this device, visible to anyone with access to this browser." | `app/data/copy.json:303–306`; `app/js/components/views/settings.js:23` | Add to the settings view (member-visible) and check-in intro: `"Data you enter is saved on this device only, in your browser's local storage. Anyone with access to this browser can see it. It is never sent to OAF servers in this demo."` |
| R-04 | Advisory | Crisis resource integrity | The `noscript` block in `index.html` correctly includes 988 and Veterans Crisis Line, but omits CopLine. For first responders (a stated served population), CopLine is the most directly relevant resource. This is a low-weight omission given the `noscript` path is already an extreme fallback, but it should be consistent with the full crisis resource list. | `app/index.html:28–35` | Add to noscript: `<strong>CopLine (Law Enforcement):</strong> <a href="tel:18002675463" style="color:#c8ad70;">1-800-267-5463</a>` |
| R-05 | Advisory | Honest capability representation | The staff and coach dashboards omit the crisis footer note that the member dashboard includes (`s.noticeCrisis`). This is not a critical gap (the header crisis button is present on all screens), but it is an inconsistency. Staff and coaches interacting with members in distress should see the same reminder. | `app/js/components/views/dashboard-staff.js`; `app/js/components/views/dashboard-coach.js` | Add to both: `<p class="crisis-footer-note">${s.noticeCrisis || 'If you are in crisis, do not wait. Call or text 988.'}</p>` |
| R-06 | Advisory | Non-emergency promises | `copy.json` `forms.success.applicationSubmitted` says "A staff member will review it and follow up." and `carePackageSubmitted` says "Staff will review eligibility and be in touch." These are reasonable, but neither message includes a time qualifier. For a member submitting at 2am in a difficult moment, "will follow up" can be misread as "soon." The apply-form.js augments the toast with "(Saved to local demo — not submitted to OAF.)" which correctly deflates expectations in the demo — but if real submission is ever wired in, this copy is the live text and should include a realistic timeframe. This is an Advisory flag for the transition to production, not a demo blocker. | `app/data/copy.json:317–318` | For production use, update to: `"applicationSubmitted": "Application submitted. A staff member will review it — allow a few business days for a response."` and `"carePackageSubmitted": "Request submitted. Staff review eligibility and follow up within a few business days."` |

---

## Fact-Check Corrections Verification

The Fact Checker's BLOCKER items were:
1. **QRFup "trained therapist" claim** — **✅ Confirmed removed.** `seed.json` res-011 reads: `"blurb": "A free crisis-support app for veterans, first responders, and their families."` No clinical credential claim present. The `crisisResources` entry for QRFup reads: `"detail": "A free crisis-support app for veterans, first responders, and their families."` — clean.
2. **QRFup "confidential follow-up support"** — **✅ Confirmed removed.** No instance of "confidential follow-up" linked to QRFup in any scanned file.
3. **CopLine added** — **✅ Confirmed.** CopLine appears in `seed.json` `crisisResources` (id: `crisis-copline`), in `resources` (id: `res-015`), in `offline.html` with correct number `1-800-267-5463` and `tel:18002675463` link, and in `crisis-modal.js` rendering logic.
4. **Crisis numbers correct** — **✅ Verified.** 988 ✓, VCL 988 press 1 / text 838255 ✓, CopLine 1-800-267-5463 ✓. All use `tel:` / `sms:` links throughout.
5. **VCL URL** — **✅ Correct.** `https://www.veteranscrisisline.net/` used in seed.json and offline.html.

All three Fact Checker blockers have landed correctly.

---

## Category Summaries

**1. Non-clinical claims** — Clean. Check-in copy explicitly says "not a clinical form." Coaching copy says "not a clinical record." Safety banner says "does not provide medical, clinical, or emergency services." `seed.json` `safety.notClinical` is clear. No treatment, diagnosis, or outcome promises found anywhere.

**2. Non-emergency promises** — Substantially clean. Every application form has a required checkbox: "I understand OAF OS is not an emergency service." Every form has a crisis notice above the submit button. Apply-form toast appends "not submitted to OAF" in demo mode. The care-package urgency field help text says "This is not an emergency intake." One advisory flag (R-06) for production copy.

**3. Crisis resource integrity** — Good overall. Header crisis button on every authenticated screen. Footer "Crisis Resources" link on every screen via safety-banner. Offline page has all three resources with working tel: links. One Critical finding (R-02): the 404 view breaks the "every screen" requirement.

**4. Privacy & data handling** — Honest but incomplete. The app correctly says data is local/demo throughout. No false encryption or confidentiality claims for member-submitted data. Advisory flag R-03 for shared-device disclosure.

**5. Credential/secret scan** — **Clean.** No API keys, tokens, Stripe keys, or real credentials found in `app/**`. The `passwordLabel` in copy.json is a UI label string, not a credential. Sponsor page routes to external Stripe URL rather than handling payment in-app — correct.

**6. Honest capability representation** — One Advisory (R-01): `"Secure mission access"` dormant string. Login.js correctly renders the role-picker body and never shows email/password fields. `header.js` shows "Demo / Alpha" badge prominently. Role indicator visible. Well-handled overall; the dormant string needs cleanup.

**7. Dignity & framing** — Clean. Members are referred to as active participants, not cases or subjects. Coaching notes discuss performance and habits, not diagnoses or conditions. Seed data personas use initials not full names in the demo; application summaries describe situations without pity framing. Staff/coach internal notes (visible to coaches only) are professional and outcome-focused. No savior language found.

**8. Bias & inclusion** — Clean. Service background dropdown includes all categories including "Prefer not to say." No gender fields on any intake form. No family structure assumptions. No ability-status assumptions. Seed personas span Army, firefighter, veteran, first responder — not stereotyped. One note: there is no "Coast Guard" or "Space Force" option in the military background select — these are technically valid service branches. This is a minor gap worth tracking for production but not a finding for alpha preview.

---

## Safe to Preview with Stakeholders?

**Yes, conditionally.** Fix R-02 (404 crisis link) before showing to any veteran or first responder audience — it is the only screen currently without a path to crisis resources. R-01 (dormant copy string) should be cleaned before a wider technical review. R-03 through R-06 are Advisory and can be tracked for the production transition.

The app's safety posture is substantially better than typical nonprofit alpha software. The consistent crisis resource integration, the explicit non-clinical disclaimers, the honest demo-mode disclosures, and the required acknowledgement checkboxes on every intake form reflect genuine care. This review is not a flag on the team's intent — it is targeted at the two genuine gaps.

---

---

# Re-Verification (2026-08-11)

**Reviewer:** Rai (Responsible AI agent, Squad)
**Re-verification date:** 2026-08-11T09:59 CDT
**Scope of this pass:** All changes since the 🟡 Yellow verdict; new surfaces (`task-detail.js`, `coaching-detail.js`, `members.js`, `member-detail.js`, expandable shared-device notice in `header.js`); regression sweep across the schema refactor in `seed.json` and `app/js/**`.

---

## New Verdict

🟢 **Green — safe to preview with stakeholders, with one regression to fix before the demo.**

The core safety architecture is intact after Basher's schema refactor and Linus's copy revisions. All five critical/advisory findings from the first pass are closed or substantially resolved. Two new advisory gaps were introduced in the refactor: the crisis resources UI now shows blank description text for every resource (the `r.detail` field was renamed to `r.description` in `seed.json` but the view and modal code still read `r.detail`) — the tel: contact buttons still work correctly, but the page looks broken. A second minor gap is the member-detail not-found state, which is staff/coach-only and lacks a crisis link.

Fix N-01 before any demo run involving the crisis resources screen.

---

## Disposition Table

| ID | Original Severity | Status | Evidence |
|----|------------------|--------|----------|
| R-01 | Advisory | **FIXED** | `copy.json:27` now reads `"subheading": "Alpha preview — no real accounts or authentication."` The misleading `"Secure mission access"` string is gone. |
| R-02 | Critical | **FIXED** | `not-found.js:9` renders a crisis link and 988 number. `task-detail.js:12` and `coaching-detail.js:10` both render the same crisis link in their not-found branches. Error boundary surfaces checked. All terminal states from router dead ends now include a path to crisis resources. |
| R-03 | Advisory | **PARTIAL** | `settings.js:30–34` renders a full `privacy-notice` div with the localStorage/shared-device disclosure string (always visible to all roles). `apply-form.js:25–28` renders the same disclosure on all four intake forms. `header.js` adds an expandable shared-device notice (requires one tap; resets collapsed on each page load, so a second device user sees it collapsed — not auto-dismissed forever). `check-in-new.js` has **no** localStorage disclosure. Settings page coverage is sufficient for the alpha, but the check-in form gap is the remaining item from the original fix spec. |
| R-04 | Advisory | **FIXED** | `index.html:34` now includes `<strong>CopLine (Law Enforcement):</strong> <a href="tel:18002675463">1-800-267-5463</a>` in the noscript block. All three resources (988, VCL, CopLine) are present. |
| R-05 | Advisory | **FIXED** | `dashboard-staff.js:35` and `dashboard-coach.js:31` both render `<p class="crisis-footer-note">${s.noticeCrisis || …}</p>`. Consistent with member dashboard. |
| R-06 | Advisory | **FIXED** | `copy.json:319–320` `applicationSubmitted` and `carePackageSubmitted` success messages now read: "This is demo data — your submission was saved in this browser only and was not sent to OAF. If you need help now, call or text 988…" — demo honesty and crisis reference in a single sentence. Strong improvement over the previous vague "will follow up" phrasing. |

---

## New Findings

| ID | Severity | Finding | File:line |
|----|----------|---------|-----------|
| N-01 | Advisory | **Schema field rename broke crisis descriptions.** `seed.json` `crisisResources` entries use `description` (populated) but `crisis-modal.js:30` and `crisis-resources.js:18` both read `r.detail` (empty string after refactor). Result: every entry on the Crisis Resources page and in the crisis modal shows a blank `<p></p>` description. The tel: / sms: contact buttons still work because those use `r.contact` and `r.url`, which are correct. This is a UX regression introduced in Basher's schema refactor, not a safety failure — users can still reach 988 — but a demo run will show four blank description slots under each resource name. Fix: change `r.detail` → `r.description` in both files. | `app/js/components/crisis-modal.js:30`; `app/js/components/views/crisis-resources.js:18` |
| N-02 | Advisory | **`member-detail.js` not-found state has no crisis link.** The staff/coach member-detail not-found path (`member-detail.js:9`) renders a plain "Member Not Found" card with a back link but no crisis note. All other not-found states added by Basher include the crisis footer; this one was missed. Low severity — staff and coaches are the only users who can reach this path, and the header crisis button is present — but it is inconsistent with the pattern applied everywhere else. | `app/js/components/views/member-detail.js:9` |
| N-03 | Advisory | **`seed.json` `safety.privacy` is a dormant misleading string.** `seed.json:1214` reads: `"privacy": "Member information is handled with discretion. Private details are never exposed to the wrong audience."` This string is not rendered anywhere in the current UI (confirmed by grep). However, it implies real privacy controls that don't exist in a localStorage demo. If a developer ever surfaces it, the phrasing is inaccurate. The original R-01 dormant string (`"Secure mission access"`) was fixed; this is a parallel case in the seed data. Suggested replacement: `"Data is stored in this browser's local storage only. It is a demo — not a real privacy guarantee."` | `app/data/seed.json:1214` |

---

## Regression Sweep Results

**Crisis numbers accuracy** — ✅ Intact.
- 988: `contact: "Call or text 988"` → `tel:988` / `sms:988` ✓
- VCL: `contact: "Call 988 and press 1 — Text 838255 — Chat at veteranscrisisline.net"` → `tel:988` + `sms:838255` + `https://www.veteranscrisisline.net/` ✓
- CopLine: `contact: "Call 1-800-267-5463"` → `tel:18002675463` ✓
- QRFup: name + `https://www.qrfup.org/` + `description: "A free crisis-support app for veterans, first responders, and their families."` — no credential claims ✓

**QRFup claims** — ✅ Clean. No "trained therapist," no "confidential follow-up" anywhere in `seed.json`, `copy.json`, or view files.

**Non-emergency acknowledgement checkbox** — ✅ Present on all four intake form types (`remote-training`, `in-person-training`, `care-package`, `retreat`) with label: `"I understand OAF OS is not an emergency service. If I am in crisis, I will contact 988 or the Veterans Crisis Line."` All four are `required: true` fields in `seed.json`.

**Safety strings rendered** — ✅ `safety.notEmergency`, `safety.notClinical`, and `safety.demoNotice` from seed.json are confirmed in the UI via the safety-banner and crisis modal intro. `safety.privacy` is not rendered (see N-03).

**Clinical/therapeutic language** — ✅ Clean sweep across check-in, coaching, task-detail, coaching-detail views.
- `check-ins` intro: "not a clinical form" ✓
- `coaching` intro: "Not a clinical record" ✓
- `task-detail.js`: No clinical language; status change toast says "Local demo only." ✓
- `coaching-detail.js`: Shows visibility badge (`coach-only`), author, date, content — no clinical framing ✓

**New surfaces — task-detail.js** — ✅ Clean. Not-found state has crisis link. Status updates are functional with honest "Local demo only" toast. No clinical language.

**New surfaces — coaching-detail.js** — ✅ Clean. Not-found state has crisis link. Note rendered verbatim with no app-added framing. Visibility badge (`coach-only`) is accurate. No clinical language.

**New surfaces — members.js / member-detail.js** — ✅ Clean for content.
- `members.js`: Staff/coach only (members see "My Profile" redirect). List shows first-initial + last name, branch, status. No PII displayed in the list.
- `member-detail.js`: Shows email and phone, but seed data uses clearly synthetic values (`rv-demo@example.com`, `(555) 012-3456`). Framing is professional — no diagnostic, caseload, or pity language. N-02 gap noted.
- Seed members data: Names are initials only (`R. Vance`, `J. Caldwell`, `T. Mora`), emails are `*-demo@example.com`, phones are `(555)` numbers. No real PII.

**Dignity and framing** — ✅ Unchanged and clean. No new language treats members as cases or subjects.

**Honesty sweep for secure/confidential/encrypted/private/protected/verified:**
- `"secure"` in copy.json:196 describes Stripe payment processing — accurate and appropriate. The fallback string in `sponsor.js:10` ("processed securely by Stripe") is overridden at runtime by copy.json and never displayed.
- `"confidential"` used in crisis resources context (988, VCL, CopLine) — these are genuinely confidential by law and design. Accurate.
- `"unencrypted"` in `sharedDeviceNotice` (copy.json:347) — correct, honest.
- `"private browsing?"` in `app.js:181` and `settings.js:23` — accurate contextual use.
- `"verified"` used only as a negative in impact screen disclaimers ("not a verified statistic") — correct.
- `"protected"` — no matches in app/.
- No false auth, encryption, or server-side persistence claims found.

---

## Safe to Preview with Stakeholders?

**Yes.** Fix N-01 (blank crisis descriptions) before running the demo — it's a one-line change per file (`r.detail` → `r.description`) and will make the crisis resources screen and modal look polished and complete rather than broken. N-02 and N-03 are clean-up items, not blockers.

The app's safety architecture held up through the schema refactor. Crisis resources are reachable from every meaningful terminal state. All four intake forms have working non-emergency acknowledgement checkboxes and localStorage disclosures. No false clinical, confidentiality, or authentication claims remain in the rendered UI. The new task-detail, coaching-detail, and members surfaces are clean.
