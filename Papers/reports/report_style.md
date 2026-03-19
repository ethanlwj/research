# Preferred Report Style

This document captures the preferred style for future HTML technical reports in this repository, based on the approved design used in:

- [mamba-3-improved-sequence-modeling-report.html](/Users/ethanlau/Workspace/Codex/research/Papers/reports/mamba-3-improved-sequence-modeling-report.html)

## Overall Direction

- Format: standalone HTML report
- Visual mode: dark mode by default
- Tone: academic, analytical, and polished
- Reading experience: visually rich but still easy to scan
- Output type: bilingual English + Simplified Chinese

The report should feel like a polished conference-style technical brief rather than a plain exported note or a generic dashboard.

## Language Behavior

- Default view should be bilingual side-by-side.
- Include a sticky three-state language toggle:
  - `EN + 中文`
  - `English`
  - `简体中文`
- All bilingual text must be tagged so each view mode can hide the non-selected language cleanly.
- This applies to:
  - section cards
  - labels
  - pills / badges
  - critique / insight blocks
  - any other mixed-language elements

## Layout Preferences

- Use a strong hero section with:
  - paper title
  - short subtitle
  - key metadata cards
- Add a sticky toolbar below the hero with:
  - section navigation links
  - language toggle controls
- Use card-based content blocks with rounded corners and subtle borders.
- Keep sections separated as stacked panels with generous spacing.
- Use a responsive layout:
  - desktop: side-by-side bilingual cards and multi-column visuals
  - mobile: stacked cards with clean spacing and preserved readability

## Visual Style

- Background: layered dark gradients with subtle radial highlights
- Accent colors: cool cyan / teal / mint with a warm highlight color for callouts
- Typography:
  - serif body text for report prose
  - clean sans-serif for UI labels, metadata, and controls
- Styling cues:
  - soft glass-like panels
  - muted borders
  - restrained shadows
  - no overly bright neon effects

The design should feel intentional, modern, and technical, not flashy or overly decorative.

## Content Structure

Use this report structure by default unless the user asks otherwise:

1. TL;DR
2. Introduction
3. Key Methods
4. Key Results
5. Conclusion
6. Insights and Critical Analysis
7. Critique
8. Sources

## Writing Style

- Maintain an academic tone similar to conference papers.
- Prefer reasoned analysis over surface summary.
- Explain why a method works, not only what it is.
- Keep paragraphs substantive and avoid bullet-only sections unless the content truly benefits from list form.
- Use technical language appropriate to systems, ML systems, networking, or architecture papers when relevant.
- Avoid hype language.
- Avoid sounding like a generic LLM summary.

## Bilingual Content Style

- English and Chinese sections should be parallel in meaning, not necessarily word-for-word literal.
- The Chinese should read naturally in Simplified Chinese and preserve technical precision.
- Do not leave major sections partially translated.
- If a section is bilingual, every user-visible explanatory block in that section should have both languages unless intentionally exempted.

## Preferred Components

- Metadata card grid in hero
- At-a-glance metric cards in TL;DR
- Bilingual paired cards for prose-heavy sections
- Inline SVG charts for important quantitative claims
- Insight / critique cards with colored category pills
- Source cards at the end with direct links

## Chart and Figure Preferences

- Prefer inline SVG charts over external image dependencies when possible.
- Charts should be compact, readable, and directly tied to claims from the paper.
- Use visuals to support interpretation, not merely decoration.
- If embedding paper figures, prefer stable remote links and only when they clearly improve understanding.

## Interaction Rules

- Language toggles must work consistently across the whole page.
- Do not mix English and Chinese in the same visible block when in single-language mode.
- Navigation should remain lightweight and non-intrusive.
- No heavy JavaScript frameworks are needed for these reports.

## Quality Bar

A future report should match this style if it is:

- dark-mode and polished
- bilingual with correct toggle behavior
- visually structured with cards and charts
- analytical rather than descriptive
- readable on both desktop and mobile
- self-contained as a single HTML file unless the task clearly needs additional assets

## Implementation Reference

When asked to produce future reports in this style, use the Mamba-3 report as the canonical reference for:

- color palette
- spacing and panel structure
- hero and toolbar layout
- bilingual toggle behavior
- card-based section design
- critique and insight presentation
