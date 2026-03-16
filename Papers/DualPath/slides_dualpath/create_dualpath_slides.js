const path = require('path');
const PptxGenJS = require('pptxgenjs');
const { imageSizingContain } = require('./pptxgenjs_helpers/image');
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require('./pptxgenjs_helpers/layout');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pptx.author = 'Codex';
pptx.company = 'arXiv paper summary';
pptx.subject = 'DualPath paper overview';
pptx.title = 'DualPath: Breaking the Storage Bandwidth Bottleneck in Agentic LLM Inference';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'en-US',
};

const C = {
  navy: '102745',
  blue: '0B63CE',
  slate: '1C2B3C',
  muted: '5A687A',
  soft: 'EAF2FF',
  white: 'FFFFFF',
  line: 'D6E0EE',
  good: '0F6A2B',
};

const assetsDir = path.join(__dirname, '..', 'report_assets', 'dualpath_html');
const fig1 = path.join(assetsDir, 'x1.png');
const fig3 = path.join(assetsDir, 'x3.png');
const fig4a = path.join(assetsDir, 'x4.png');
const fig4b = path.join(assetsDir, 'x5.png');
const fig5 = path.join(assetsDir, 'x6.png');

function finalizeSlide(slide) {
  warnIfSlideHasOverlaps(slide, pptx);
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

function addHeader(slide, title) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 0.72,
    line: { color: C.navy, transparency: 100 },
    fill: { color: C.navy },
  });
  slide.addText(title, {
    x: 0.45,
    y: 0.17,
    w: 12.5,
    h: 0.4,
    fontFace: 'Aptos Display',
    fontSize: 20,
    bold: true,
    color: C.white,
  });
}

function addBullets(slide, items, x = 0.7, y = 1.25, w = 11.9, h = 5.7) {
  const lines = [];
  items.forEach((text) => {
    lines.push({
      text,
      options: {
        bullet: { indentPt: 16 },
        breakLine: true,
      },
    });
  });

  slide.addText(lines, {
    x,
    y,
    w,
    h,
    fontFace: 'Aptos',
    fontSize: 24,
    color: C.slate,
    paraSpaceAfterPt: 10,
    valign: 'top',
    margin: 0.05,
  });
}

// Slide 1: Title
{
  const slide = pptx.addSlide();
  slide.background = { color: 'F4F7FB' };
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.65,
    y: 0.8,
    w: 12.0,
    h: 4.35,
    rectRadius: 0.08,
    line: { color: C.navy, transparency: 100 },
    fill: { color: C.navy },
  });
  slide.addText('DualPath', {
    x: 1.0,
    y: 1.35,
    w: 5.5,
    h: 0.9,
    fontFace: 'Aptos Display',
    fontSize: 54,
    bold: true,
    color: C.white,
  });
  slide.addText('Breaking the Storage Bandwidth Bottleneck in Agentic LLM Inference', {
    x: 1.0,
    y: 2.45,
    w: 10.9,
    h: 1.2,
    fontFace: 'Aptos',
    fontSize: 28,
    color: 'DCE9FF',
    bold: false,
  });
  slide.addText('Paper overview | arXiv:2602.21548 | Generated with slides skill', {
    x: 1.0,
    y: 4.25,
    w: 10.5,
    h: 0.4,
    fontFace: 'Aptos',
    fontSize: 14,
    color: 'C8DAFA',
  });
  finalizeSlide(slide);
}

// Slide 2: Summary
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Executive Summary');
  addBullets(slide, [
    'DualPath targets a systems bottleneck in agentic LLM serving: KV-cache I/O from storage.',
    'Core idea: dual-path loading + dynamic scheduling to aggregate prefill/decode bandwidth.',
    'Reported gains: up to 1.73x throughput and up to 1.61x lower median latency.',
    'Main implication: storage-aware architecture is a first-order optimization in agentic inference.',
  ]);
  finalizeSlide(slide);
}

// Slide 3: Problem statement
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Problem Statement');
  addBullets(slide, [
    'Agentic workloads are multi-turn and tool-driven, producing many short appends over long contexts.',
    'High KV-cache reuse shifts the bottleneck from pure compute to KV-cache movement.',
    'In PD-disaggregated systems, prefill-side storage bandwidth saturates first.',
    'Decode-side storage/network capacity is often left underutilized.',
  ]);
  finalizeSlide(slide);
}

// Slide 4: Key contributions
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Key Contributions');
  addBullets(slide, [
    'Diagnoses prefill-side storage network bandwidth as the dominant throughput limiter.',
    'Introduces DualPath loading to route KV-cache via both prefill and decode paths.',
    'Applies NIC-centric traffic isolation to protect latency-sensitive model communication.',
    'Designs dynamic scheduling that balances NIC load and GPU utilization together.',
  ]);
  finalizeSlide(slide);
}

// Slide 5: Figure 1 architecture
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Method Overview (Figure 1)');
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.55,
    y: 1.0,
    w: 5.2,
    h: 5.8,
    rectRadius: 0.06,
    line: { color: C.line },
    fill: { color: 'F9FBFF' },
  });
  addBullets(
    slide,
    [
      'DualPath adds a second data path for KV-cache loading.',
      'It avoids concentrating all storage reads on prefill engines.',
      'It exploits spare decode-side I/O to break the prefill bottleneck.',
    ],
    0.85,
    1.35,
    4.65,
    4.8,
  );
  slide.addImage({
    path: fig1,
    ...imageSizingContain(fig1, 6.0, 1.35, 6.75, 4.95),
  });
  slide.addText('Figure 1: Existing bottleneck (left) and DualPath (right).', {
    x: 6.0,
    y: 6.4,
    w: 6.8,
    h: 0.3,
    fontFace: 'Aptos',
    fontSize: 12,
    color: C.muted,
  });
  finalizeSlide(slide);
}

// Slide 6: Figure 4a / 4b data paths
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Dual-Path Data Movement (Figure 4a/4b)');
  slide.addImage({
    path: fig4a,
    ...imageSizingContain(fig4a, 0.7, 1.3, 6.1, 4.8),
  });
  slide.addImage({
    path: fig4b,
    ...imageSizingContain(fig4b, 6.9, 1.3, 5.75, 4.8),
  });
  slide.addText('Figure 4(a): PE Read Path', {
    x: 1.6,
    y: 6.05,
    w: 4.4,
    h: 0.3,
    fontFace: 'Aptos',
    fontSize: 12,
    color: C.muted,
    align: 'center',
  });
  slide.addText('Figure 4(b): DE Read Path', {
    x: 7.3,
    y: 6.05,
    w: 4.4,
    h: 0.3,
    fontFace: 'Aptos',
    fontSize: 12,
    color: C.muted,
    align: 'center',
  });
  addBullets(
    slide,
    [
      'PE path serves direct reads; DE path can assist under pressure.',
      'Together they aggregate available storage bandwidth.',
    ],
    0.8,
    6.35,
    12.3,
    0.85,
  );
  finalizeSlide(slide);
}

// Slide 7: Scheduling approach
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Scheduling and Load Balancing (Figure 5)');
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6,
    y: 1.0,
    w: 4.8,
    h: 5.9,
    rectRadius: 0.06,
    line: { color: C.line },
    fill: { color: C.soft },
  });
  addBullets(slide, [
    'Inter-engine scheduling decides where prefill work should run.',
    'Two balancing targets: storage NIC traffic and GPU utilization.',
    'Goal: use spare I/O without harming latency-sensitive collectives.',
  ], 0.82, 1.35, 4.35, 4.9);

  slide.addImage({
    path: fig5,
    ...imageSizingContain(fig5, 5.7, 1.35, 7.0, 5.1),
  });
  slide.addText('Figure 5: Inter-engine PE scheduling illustration.', {
    x: 5.8,
    y: 6.45,
    w: 6.8,
    h: 0.3,
    fontFace: 'Aptos',
    fontSize: 12,
    color: C.muted,
  });
  finalizeSlide(slide);
}

// Slide 8: Results
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Key Results');

  const kpis = [
    ['Up to', '1.73x', 'Throughput gain'],
    ['Up to', '1.61x', 'Lower median latency'],
    ['Up to', '90.9%', 'Less storage bandwidth'],
    ['Around', '77.3%', 'Speculative token acceptance'],
  ];

  let x = 0.7;
  kpis.forEach(([a, b, c]) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 1.4,
      w: 3.0,
      h: 2.25,
      rectRadius: 0.08,
      line: { color: 'BFD6F6' },
      fill: { color: 'EDF6FF' },
    });
    slide.addText(a, {
      x: x + 0.2,
      y: 1.75,
      w: 2.6,
      h: 0.3,
      fontFace: 'Aptos',
      fontSize: 14,
      color: C.muted,
      align: 'center',
    });
    slide.addText(b, {
      x: x + 0.2,
      y: 2.1,
      w: 2.6,
      h: 0.6,
      fontFace: 'Aptos Display',
      fontSize: 34,
      bold: true,
      color: C.good,
      align: 'center',
    });
    slide.addText(c, {
      x: x + 0.15,
      y: 2.85,
      w: 2.7,
      h: 0.45,
      fontFace: 'Aptos',
      fontSize: 13,
      color: C.slate,
      align: 'center',
    });
    x += 3.15;
  });

  slide.addImage({
    path: fig3,
    ...imageSizingContain(fig3, 1.0, 4.0, 11.3, 2.55),
  });
  slide.addText('Figure 3: Hardware trends and relative token throughput vs request batch size.', {
    x: 1.15,
    y: 6.65,
    w: 11.1,
    h: 0.3,
    fontFace: 'Aptos',
    fontSize: 12,
    color: C.muted,
  });
  finalizeSlide(slide);
}

// Slide 9: Risks/limits
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Limitations and Considerations');
  addBullets(slide, [
    'Performance depends on workload shape (turn structure, context length, append size).',
    'Benefits assume compatible cluster/network architecture and KV-cache storage design.',
    'Scheduling complexity increases; careful operational tuning is required.',
    'Reported numbers are from paper-evaluated systems and may vary in different deployments.',
  ]);
  finalizeSlide(slide);
}

// Slide 10: Actionable takeaways
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Actionable Lessons for Production Teams');
  addBullets(slide, [
    'Profile storage-network bottlenecks before scaling compute only.',
    'Coordinate prefill and decode as a single bandwidth orchestration problem.',
    'Isolate KV-cache traffic from latency-critical inference communication.',
    'Evaluate serving designs using realistic agent traces, not single-turn prompts only.',
    'Track NIC utilization, queueing, and cache transfer metrics as first-class SLO indicators.',
  ]);
  finalizeSlide(slide);
}

// Slide 11: Closing
{
  const slide = pptx.addSlide();
  addHeader(slide, 'Closing Summary');
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.9,
    y: 1.35,
    w: 11.6,
    h: 4.4,
    rectRadius: 0.08,
    line: { color: C.line },
    fill: { color: 'F8FBFF' },
  });
  slide.addText('DualPath reframes agentic LLM serving as a storage-centric systems challenge.', {
    x: 1.3,
    y: 2.05,
    w: 10.8,
    h: 0.6,
    fontFace: 'Aptos Display',
    fontSize: 28,
    color: C.navy,
    bold: true,
    align: 'center',
  });
  slide.addText('Its dual-path loading + scheduling strategy unlocks major efficiency gains by using available bandwidth more intelligently.', {
    x: 1.4,
    y: 2.95,
    w: 10.6,
    h: 1.2,
    fontFace: 'Aptos',
    fontSize: 20,
    color: C.slate,
    align: 'center',
    valign: 'mid',
  });
  slide.addText('Source: https://arxiv.org/abs/2602.21548', {
    x: 3.6,
    y: 5.2,
    w: 6.2,
    h: 0.3,
    fontFace: 'Aptos',
    fontSize: 13,
    color: C.blue,
    align: 'center',
  });
  finalizeSlide(slide);
}

const out = path.join(__dirname, 'DualPath_Paper_Overview_SlidesSkill.pptx');
pptx.writeFile({ fileName: out }).then(() => {
  console.log(out);
});
