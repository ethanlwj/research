# Mamba-3 Bilingual HTML Report Design

## Goal

Create a visually polished dark-mode HTML technical report in `reports/` for the paper "Mamba-3: Improved Sequence Modeling using State Space Principles". The report must be bilingual in English and Simplified Chinese, default to a side-by-side bilingual view, support language toggling, and cover the seven sections requested by the user with an academic, analysis-forward tone.

## Deliverable

- One standalone HTML file in `reports/`
- Bilingual content for all required sections
- Dark-mode visual design with responsive layout
- Inline visualizations for headline quantitative results
- Source links to the paper and venue page
- No temporary files left behind
- Git commit and push to remote

## Content Requirements

The report will include:

1. TL;DR with executive summary and at-a-glance results
2. Introduction with background, problem statement, and motivation
3. Key methods, with separate subsections for:
   - Exponential-trapezoidal discretization
   - Complex-valued SSM / data-dependent RoPE
   - MIMO state update
   - Architectural refinements and why short convolution can be removed
4. Key results with experimental setup and major findings
5. Conclusion
6. Insights and critical analysis
7. Critique with 3 strengths and 3 weaknesses

## Design Decisions

- Default view is bilingual side-by-side.
- The page includes a sticky toggle with three states: `EN + 中文`, `English`, `简体中文`.
- Quantitative visuals will use inline SVG instead of downloaded assets to keep the report self-contained and stable.
- The page will cite the OpenReview / ICLR 2026 camera-ready PDF because it exposes the accepted paper text and tables clearly.

## Evidence Base

Primary source:

- OpenReview / ICLR 2026 accepted version of the paper:
  `https://openreview.net/pdf/302a1e7dbb2a1c68b7f89c4076ab02c06cbd1ac7.pdf`

Key claims to reflect:

- At 1.5B scale, Mamba-3 SISO improves average downstream accuracy by 0.6 points over GDN; MIMO adds another 1.2 points, totaling +1.8 over GDN.
- Mamba-3 MIMO with state size 64 matches Mamba-2 with state size 128 on perplexity, supporting a speed-quality Pareto improvement.
- Data-dependent RoPE enables strong state tracking: Mamba-3 reaches 100.00 on parity and 98.51 on modular arithmetic without brackets, while Mamba-2 and standard-RoPE variants fail badly.
- Kernel latency remains competitive: Mamba-3 SISO is faster than Mamba-2 in the common BF16, dstate=128 setting, and MIMO adds little latency overhead.

## Implementation Notes

- No separate assets directory is required unless a small helper script becomes necessary.
- The file should be valid standalone HTML with embedded CSS and JavaScript only.
- The report should remain readable on both desktop and mobile, with bilingual cards stacking cleanly on small screens.
