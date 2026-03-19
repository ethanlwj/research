# Mamba-3 Report Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a standalone bilingual dark-mode HTML technical report for the Mamba-3 paper, then verify, commit, and push it.

**Architecture:** The deliverable is a single self-contained HTML document with embedded CSS and JavaScript. The page uses a three-state language toggle, section-based navigation, bilingual paired cards, and inline SVG charts backed by paper-reported numbers.

**Tech Stack:** HTML, CSS, vanilla JavaScript, git, shell verification commands

---

### Task 1: Create the report shell and page structure

**Files:**
- Create: `reports/mamba-3-improved-sequence-modeling-report.html`
- Modify: `docs/superpowers/specs/2026-03-19-mamba-3-report-design.md`

- [ ] **Step 1: Write the HTML skeleton**

Create a standalone page with:
- document head and metadata
- dark-mode visual theme
- hero section
- sticky language toggle
- seven required sections

- [ ] **Step 2: Add responsive bilingual layout**

Implement:
- `EN + 中文` default view
- `English` only view
- `简体中文` only view
- mobile stacking behavior

- [ ] **Step 3: Add navigation and visual scaffolding**

Include:
- top navigation
- metric cards
- section panels
- source footer

### Task 2: Fill the report with paper-grounded bilingual content

**Files:**
- Modify: `reports/mamba-3-improved-sequence-modeling-report.html`

- [ ] **Step 1: Draft the English analytical content**

Cover:
- executive summary
- motivation and problem framing
- method subsections
- results interpretation
- conclusion and critique

- [ ] **Step 2: Draft the Simplified Chinese counterpart**

Translate faithfully while preserving technical meaning and academic tone.

- [ ] **Step 3: Add equations and precise quantitative references**

Use only paper-supported claims, especially for:
- the exponential-trapezoidal recurrence
- data-dependent RoPE discussion
- 1.5B downstream results
- formal-language and kernel-latency results

### Task 3: Add visualizations and interactions

**Files:**
- Modify: `reports/mamba-3-improved-sequence-modeling-report.html`

- [ ] **Step 1: Add at-a-glance metric cards**

Visualize three headline outcomes from the paper.

- [ ] **Step 2: Add inline SVG charts**

Include compact charts for:
- average downstream accuracy gap
- state-size versus quality frontier
- formal-language state-tracking comparison
- kernel latency comparison

- [ ] **Step 3: Add figure/source links**

Link to the accepted paper PDF and relevant figure discussions.

### Task 4: Verify and publish

**Files:**
- Modify: `reports/mamba-3-improved-sequence-modeling-report.html`

- [ ] **Step 1: Validate HTML syntax**

Run:
`python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
class P(HTMLParser): pass
P().feed(Path("reports/mamba-3-improved-sequence-modeling-report.html").read_text())
print("html-parse-ok")
PY`

Expected: `html-parse-ok`

- [ ] **Step 2: Check repo state**

Run:
`git status --short`

Expected: only the intended report and doc files are added or modified.

- [ ] **Step 3: Commit**

Run:
`git add docs/superpowers/specs/2026-03-19-mamba-3-report-design.md docs/superpowers/plans/2026-03-19-mamba-3-report.md reports/mamba-3-improved-sequence-modeling-report.html`

`git commit -m "Add Mamba-3 bilingual HTML report"`

- [ ] **Step 4: Push**

Run:
`git push`
