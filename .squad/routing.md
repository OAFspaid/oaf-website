# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Frontend | McManus | CTA and TrainHeroic links, Liquid layouts, HTML, Sass, accessibility |
| Deployment & local preview | Fenster | Jekyll/Bundler build, loopback preview, Pages workflow review; no publishing without approval |
| QA | Hockney | Link destinations, responsive layout, accessibility, build and regression checks |
| Code review | Keaton | Review changes, enforce scope and quality gates |
| Testing | Hockney | Verify requirements, edge cases, and local preview behavior |
| Scope & priorities | Keaton | Coordinate work, resolve trade-offs, defer unsupported copy changes |
| Session logging | Scribe | Automatic — never needs routing |
| Work queue monitoring | Ralph | Track approved work and blockers; no unrequested expansion |
| RAI review | Rai | Content safety, bias checks, credential detection, ethical review |
| Verification & fact-checking | Fact Checker | Verify URLs and claims, challenge assumptions, flag unsupported copy |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Lead |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, the **Lead** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Lead review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a feature is being built, spawn the tester to write test cases from requirements simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. The Lead handles all `squad` (base label) triage.

## Current Local Scope

- The repository maintainer approved this eight-member roster; preserve @copilot with auto-assignment disabled.
- For this initialization, do not spawn agents or modify website code.
- Next work is limited to CTA/TrainHeroic updates and local preview. Broader copy is deferred pending documents.
- `STATE_BACKEND=local`: resolve `.squad/` in the current worktree and use filesystem operations for state. Do not follow external team roots, switch branches, deploy, commit, or push.
- These task-specific constraints take precedence over the eager-spawning defaults above. Builtin membership does not authorize launching background processes or monitors.
