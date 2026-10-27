# Squad Team

> oaf-website

## Coordinator

| Name | Role | Notes |
|------|------|-------|
| Squad | Coordinator | Routes work, enforces handoffs and reviewer gates. |

## Members

| Name | Role | Charter | Status |
|------|------|---------|--------|
| Keaton | Lead | `.squad/agents/keaton/charter.md` | ✅ Active |
| McManus | Frontend Developer | `.squad/agents/mcmanus/charter.md` | ✅ Active |
| Fenster | Deployment & Local Preview | `.squad/agents/fenster/charter.md` | ✅ Active |
| Hockney | QA | `.squad/agents/hockney/charter.md` | ✅ Active |
| Scribe | Session Logger & Memory Manager | `.squad/agents/scribe/charter.md` | 📋 Silent |
| Ralph | Work Monitor | `.squad/agents/ralph/charter.md` | 🔄 Monitor |
| Rai | RAI Reviewer | `.squad/agents/Rai/charter.md` | 🛡️ Background |
| Fact Checker | Verification & Devil's Advocate | `.squad/agents/fact-checker/charter.md` | 🔍 Verifier |


## Coding Agent

<!-- copilot-auto-assign: false -->

| Name | Role | Charter | Status |
|------|------|---------|--------|
| @copilot | Coding Agent | — | 🤖 Coding Agent |

### Capabilities

**🟢 Good fit — auto-route when enabled:**
- Bug fixes with clear reproduction steps
- Test coverage (adding missing tests, fixing flaky tests)
- Lint/format fixes and code style cleanup
- Dependency updates and version bumps
- Small isolated features with clear specs
- Boilerplate/scaffolding generation
- Documentation fixes and README updates

**🟡 Needs review — route to @copilot but flag for squad member PR review:**
- Medium features with clear specs and acceptance criteria
- Refactoring with existing test coverage
- API endpoint additions following established patterns
- Migration scripts with well-defined schemas

**🔴 Not suitable — route to squad member instead:**
- Architecture decisions and system design
- Multi-system integration requiring coordination
- Ambiguous requirements needing clarification
- Security-critical changes (auth, encryption, access control)
- Performance-critical paths requiring benchmarking
- Changes requiring cross-team discussion

## Project Context

- **Project:** oaf-website
- **Created:** 2026-07-29
- **Owner:** repository maintainer
- **Stack:** Jekyll, Ruby/Bundler, Markdown, Liquid, HTML, Sass; GitHub Pages workflow
- **Description:** Operation Antifragile public website with training, program, and blog pages.
- **Local team initialized:** 2026-10-26T19:36:17.909-05:00
- **State backend:** local — this worktree's `.squad/` filesystem; no shared teamRoot.
- **Current scope:** CTA and TrainHeroic updates with local preview only; broader copy awaits supporting documents.
- **Working constraints:** Stay in this worktree and branch. No website changes during team initialization; no deployment, commits, or pushes authorized.
