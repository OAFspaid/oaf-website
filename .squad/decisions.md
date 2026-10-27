# Squad Decisions

## Active Decisions

### 2026-10-26T19:36:17.909-05:00: Approved local team and bounded website scope

**By:** Copilot, implementing repository maintainer approval

**What:** Initialize Keaton (lead), McManus (frontend), Fenster (deployment/local
preview), Hockney (QA), and the fixed-name builtins Scribe, Ralph, Rai, and Fact
Checker in this worktree only. Preserve @copilot with auto-assignment disabled.
Use `stateBackend: local`; remove the unavailable external Windows `teamRoot`.
Local state writes use filesystem operations and do not require a runtime state
bridge. Preserve existing governance, templates, policies, and union attributes.

**Why:** The local roster was empty and external-team resolution was unavailable.
The repository maintainer explicitly approved local initialization. The four
domain names retain the approved The Usual Suspects casting; builtins are exempt.

**Scope:** Team scaffolding only in this initialization. Next work is limited to
CTA/TrainHeroic updates and local preview. Broader copy remains deferred pending
supporting documents. Do not spawn agents, change website code, switch branches,
use the main checkout, deploy, commit, or push during initialization.

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
