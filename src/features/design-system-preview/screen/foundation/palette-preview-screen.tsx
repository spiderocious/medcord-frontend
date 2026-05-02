import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Overline } from '@ui/typography';

/**
 * Foundation · Palette
 * Reference: Medcord Design System / preview / 01-palette.html.
 */
export function PalettePreviewScreen() {
  return (
    <Page>
      <Stamp number="I · 01" title="Palette" meta="surgical-paper · v 0.2" />

      <Frontispiece />

      <PaperRow />
      <InkRow />
      <GreenRow />
      <ClinicalStateRow />

      <SectionBreak label="Rule, applied" />
      <PairedExamples />

      <SectionBreak label="Module tints — demoted" />
      <ModulesGrid />
    </Page>
  );
}

function Frontispiece() {
  return (
    <div className="mb-12 grid grid-cols-2 border border-ink bg-paper">
      <div className="border-r border-ink px-8 pb-8 pt-9">
        <h2 className="mb-[18px] mt-0 font-serif text-[30px] font-medium leading-[1] tracking-display">
          Ink on warm paper.
        </h2>
        <p className="m-0 max-w-[36ch] text-[13px] leading-[1.55] text-ink-2">
          The canvas is a faintly warm bone — closer to old chart paper than to a cool grey screen.
          Type sits on it as ink: a warm near-black with a hint of the same paper undertone, so the
          page reads as one material rather than two.
        </p>
        <SwatchRow colors={['#F4EFE6', '#ECE5D6', '#FBF7EF', '#D9D0BB']} label="paper · sheet" />
      </div>
      <div className="bg-ink px-8 pb-8 pt-9 text-paper">
        <h2 className="mb-[18px] mt-0 font-serif text-[30px] font-medium leading-[1] tracking-display text-paper">
          And the same, after dark.
        </h2>
        <p className="m-0 max-w-[36ch] text-[13px] leading-[1.55] text-[rgba(244,239,230,0.78)]">
          Inverted, the paper becomes ink. Screens at the night-shift station should not glow — they
          should recede. The accent green stays the same hue; the paper just gets out of the way so
          vitals can shout.
        </p>
        <SwatchRow
          colors={['#181613', '#3C3833', '#6E665B', '#A39A8A']}
          label="ink · grades"
          dark
        />
      </div>
    </div>
  );
}

function SwatchRow({
  colors,
  label,
  dark = false,
}: {
  colors: string[];
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`mt-[22px] flex items-center gap-0 border-t pt-3.5 ${
        dark ? 'border-paper text-paper' : 'border-ink text-ink'
      }`}
    >
      {colors.map((color) => (
        <div key={color} className="h-3.5 flex-1" style={{ background: color }} />
      ))}
      <span
        className={`w-16 text-right font-mono text-[10px] ${
          dark ? 'text-[rgba(244,239,230,0.55)]' : 'text-ink-3'
        } opacity-60`}
      >
        {label}
      </span>
    </div>
  );
}

interface RampStep {
  hex: string;
  label?: string;
  dark?: boolean;
}

function PaletteRow({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: RampStep[];
}) {
  return (
    <div className="grid grid-cols-[200px_1fr] border-t border-ink first-of-type:border-t-0">
      <div className="border-b border-r border-hair pb-[22px] pr-6 pt-[22px]">
        <h3 className="mb-1 mt-0 font-serif text-[19px] font-medium leading-snug tracking-h">
          {name}
        </h3>
        <p className="m-0 max-w-[18ch] text-[12px] leading-[1.5] text-ink-3">{description}</p>
      </div>
      <div className="min-w-0 border-b border-hair pb-[22px] pl-6 pt-[22px]">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((step) => (
            <div
              key={step.hex}
              style={{ background: step.hex }}
              className={`flex h-14 items-end border-r border-[rgba(255,255,255,0.5)] px-2 pb-1.5 font-mono text-[9px] last:border-r-0 ${
                step.dark ? 'text-[rgba(255,255,255,0.7)]' : 'text-ink-3'
              }`}
            >
              {step.label}
            </div>
          ))}
        </div>
        <div
          className="mt-1.5 grid font-mono text-[9px] text-ink-4"
          style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
        >
          {steps.map((step) => (
            <span key={step.hex} className="px-0.5">
              {step.hex}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaperRow() {
  return (
    <PaletteRow
      name="Paper"
      description="Four grades. Canvas stays warm; surfaces stack by lightening or recessing."
      steps={[
        { hex: '#FBF7EF', label: 'sheet' },
        { hex: '#F4EFE6', label: 'canvas' },
        { hex: '#ECE5D6', label: 'recessed' },
        { hex: '#D9D0BB', label: 'edge' },
      ]}
    />
  );
}

function InkRow() {
  return (
    <PaletteRow
      name="Ink"
      description="Five grades. Warm-leaning so it sits with paper instead of fighting it."
      steps={[
        { hex: '#181613', label: 'ink', dark: true },
        { hex: '#3C3833', label: 'body', dark: true },
        { hex: '#6E665B', label: 'secondary', dark: true },
        { hex: '#A39A8A', label: 'tertiary' },
        { hex: '#D9D0BB', label: 'hairline' },
      ]}
    />
  );
}

function GreenRow() {
  return (
    <PaletteRow
      name="Apothecary green"
      description="The single accent. Used for primary action, signed state, and within range. Nothing else."
      steps={[
        { hex: '#F0FDF4', label: '50' },
        { hex: '#DCFCE7', label: '100' },
        { hex: '#BBF7D0', label: '200' },
        { hex: '#86EFAC', label: '300' },
        { hex: '#4ADE80', label: '400', dark: true },
        { hex: '#22C55E', label: '500', dark: true },
        { hex: '#16A34A', label: '600', dark: true },
        { hex: '#15803D', label: '700', dark: true },
        { hex: '#166534', label: '800', dark: true },
        { hex: '#14532D', label: '900', dark: true },
      ]}
    />
  );
}

function ClinicalStateRow() {
  return (
    <div className="grid grid-cols-[200px_1fr] border-t border-ink">
      <div className="border-b border-r border-hair pb-[22px] pr-6 pt-[22px]">
        <h3 className="mb-1 mt-0 font-serif text-[19px] font-medium tracking-h">Clinical state</h3>
        <p className="m-0 max-w-[18ch] text-[12px] leading-[1.5] text-ink-3">
          Critical-red is reserved for life-threatening only. Amber covers all other warnings.
          Violet is abnormal-low.
        </p>
      </div>
      <div className="min-w-0 border-b border-hair pb-[22px] pl-6 pt-[22px]">
        <div className="grid grid-cols-3 gap-3.5">
          {[
            { name: 'Critical', main: '#B42318', bg: '#FEF3F2', edge: '#F2B5AF' },
            { name: 'Warn', main: '#B25E09', bg: '#FDF6E3', edge: '#E8D9A1' },
            { name: 'Low', main: '#5B21B6', bg: '#F7F2FE', edge: '#D8C7F0' },
          ].map((tone) => (
            <div key={tone.name}>
              <div className="h-9 rounded-paper" style={{ background: tone.main }} />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-ink-3">
                <span>{tone.name}</span>
                <span>{tone.main}</span>
              </div>
              <div
                className="mt-1 h-2 rounded-paper border"
                style={{ background: tone.bg, borderColor: tone.edge }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PairedExamples() {
  return (
    <div className="mt-2 grid grid-cols-2 gap-4">
      <div className="rounded-card border border-green-200 bg-green-50 px-4 py-3.5 text-green-800">
        <div className="mb-2 flex items-center gap-2">
          <Overline className="text-green-800">Within range</Overline>
          <span className="ml-auto font-mono text-[11px] opacity-70">06:38</span>
        </div>
        <p className="m-0 font-serif text-[14px] italic leading-[1.45] text-ink">
          &ldquo;Sodium 138 mEq/L. Potassium 4.1 mEq/L. Glucose 92 mg/dL fasting.&rdquo;
        </p>
        <p className="m-0 mt-2.5 font-mono text-[10px] text-ink-3">
          colour paired with text. Never used alone.
        </p>
      </div>
      <div className="rounded-card border border-crit-edge bg-crit-bg px-4 py-3.5 text-crit">
        <div className="mb-2 flex items-center gap-2">
          <Overline className="text-crit">Critical</Overline>
          <span className="ml-auto font-mono text-[11px] opacity-70">14:42</span>
        </div>
        <p className="m-0 font-serif text-[14px] italic leading-[1.45] text-ink">
          &ldquo;Troponin I 2.10 ng/mL. Three-fold above prior. Cardiology paged.&rdquo;
        </p>
        <p className="m-0 mt-2.5 font-mono text-[10px] opacity-70">
          red is reserved. Read the words; the colour confirms.
        </p>
      </div>
    </div>
  );
}

function ModulesGrid() {
  const modules = [
    { name: 'Patients', tint: '#3F5B8A', use: 'Paper-blue.\nNav tint only.' },
    { name: 'Staff', tint: '#6E5A8A', use: 'Bruised violet.\nNav tint only.' },
    { name: 'Consults', tint: '#3F7A6E', use: 'Slate-teal.\nNav tint only.' },
    { name: 'Records', tint: '#4F6C3A', use: 'Olive.\nNav tint only.' },
    { name: 'Equipment', tint: '#8A6435', use: 'Bronze.\nNav tint only.' },
  ];
  return (
    <>
      <p className="m-0 mb-3.5 max-w-[62ch] text-[13px] text-ink-2">
        Five verticals each carry a quiet desaturated tint. These are <em>only</em> used for nav
        active state and the empty-state line drawing. They never appear as card borders, section
        headers, gradients, or charts.
      </p>
      <div className="grid grid-cols-5 border-t border-hair">
        {modules.map((module, index) => (
          <div
            key={module.name}
            className={`pb-3.5 pr-4 pt-3.5 ${
              index === modules.length - 1 ? '' : 'border-r border-hair'
            }`}
          >
            <div
              className="mb-2.5 h-9 w-9 rounded-card border border-black/5"
              style={{ background: module.tint }}
            />
            <div className="mb-0.5 font-sans text-[12px] font-semibold">{module.name}</div>
            <div className="whitespace-pre-line text-[11px] leading-[1.45] text-ink-3">
              {module.use}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
