import { Fragment } from 'react';

import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Mark, Overline } from '@ui/typography';

/**
 * Foundation · Spacing & geometry
 * Reference: Medcord Design System / preview / 03-geometry.html.
 */
export function GeometryPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="I · 03"
        title="Spacing & geometry"
        meta="a 4-pixel grid · sharp corners · hairline edges"
      />

      <p className="m-0 mb-[22px] max-w-[60ch] text-[13px] leading-[1.55] text-ink-2">
        Spacing is on a 4-pixel grid. Internal padding sits between 8 and 24 pixels; section gaps
        stretch to 48 or 64. Margins between list items are 1 pixel — a hairline, not a gap.
      </p>

      <Ruler />

      <SectionBreak label="Corner radii — sharp by default" />
      <p className="m-0 mb-[22px] max-w-[60ch] text-[13px] leading-[1.55] text-ink-2">
        Paper has corners. Buttons get 6 px so they look pressable; cards get 4 px so they look like
        sheets, not bubbles. Pills and avatars are full. Nothing else uses radius — not banners, not
        section headers, not images.
      </p>
      <RadiiRow />

      <SectionBreak label="Edges — hairlines, not shadows" />
      <p className="m-0 mb-[18px] max-w-[60ch] text-[13px] leading-[1.55] text-ink-2">
        Elevation is not depth — it is contrast. A sheet on the canvas takes a one-pixel sheet-edge.
        A heavier separation takes a one-pixel ink rule. Drop shadows are reserved for popovers and
        modals only, and even there they stay shallow.
      </p>
      <EdgesRow />

      <SectionBreak label="Grid · 12 columns, 24 px gutter" />
      <GridFig />

      <SectionBreak label="Density — three readings of the same row" />
      <p className="m-0 mb-[18px] max-w-[60ch] text-[13px] leading-[1.55] text-ink-2">
        Three densities. Compact for the night-shift worklist where each row is glanced at once.
        Regular for the day chart. Comfortable for review and audit, where reading accuracy beats
        throughput.
      </p>
      <Density variant="compact" />
      <Density variant="regular" />
      <Density variant="comfortable" />
    </Page>
  );
}

function Ruler() {
  const steps = [
    { px: 2, use: 'fine — between adjacent stamps' },
    { px: 4, use: 'tightest — inside a chip' },
    { px: 8, use: 'label to value' },
    { px: 12, use: 'between siblings' },
    { px: 16, use: 'card padding' },
    { px: 24, use: 'stage gutter' },
    { px: 32, use: 'section gap' },
    { px: 48, use: 'major break' },
    { px: 64, use: 'page indent' },
    { px: 96, use: 'frontispiece margin' },
  ];
  return (
    <div className="grid grid-cols-[64px_1fr_80px] border-t border-hair">
      {steps.map((step) => (
        <Fragment key={step.px}>
          <div className="flex items-center border-b border-hair py-[9px] pr-3 font-mono text-[11px] text-ink">
            {step.px}
          </div>
          <div className="flex items-center border-b border-hair py-[9px] pr-3">
            <div className="rounded-paper bg-ink" style={{ width: step.px, height: 8 }} />
          </div>
          <div className="flex items-center justify-end border-b border-hair py-[9px] font-mono text-[11px] text-ink-3">
            {step.use}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function RadiiRow() {
  const items = [
    { name: 'sharp', radius: '0px' },
    { name: 'paper', radius: '2px' },
    { name: 'card', radius: '4px' },
    { name: 'control', radius: '6px' },
    { name: 'soft', radius: '8px' },
    { name: 'modal', radius: '12px' },
    { name: 'full', radius: '9999px' },
  ];
  return (
    <div className="grid grid-cols-7 items-end gap-4">
      {items.map((item) => (
        <div key={item.name} className="flex flex-col items-center gap-2">
          <div
            className="h-16 w-16 border border-ink bg-paper-deep"
            style={{ borderRadius: item.radius }}
          />
          <div className="font-mono text-[11px] text-ink-3">{item.name}</div>
          <div className="font-mono text-[10px] text-ink-4">
            {item.radius === '9999px' ? '∞' : item.radius.replace('px', '')}
          </div>
        </div>
      ))}
    </div>
  );
}

function EdgesRow() {
  return (
    <div className="grid grid-cols-4 gap-3.5">
      <div className="rounded-card border border-hair-soft bg-sheet p-[18px]">
        <div className="mb-1.5 font-mono text-[11px] text-ink-3">soft hair</div>
        <div className="text-[13px]">Between rows in a list</div>
      </div>
      <div className="rounded-card border border-sheet-edge bg-sheet p-[18px]">
        <div className="mb-1.5 font-mono text-[11px] text-ink-3">hair</div>
        <div className="text-[13px]">Around a sheet</div>
      </div>
      <div className="rounded-card border border-ink bg-sheet p-[18px]">
        <div className="mb-1.5 font-mono text-[11px] text-ink-3">rule</div>
        <div className="text-[13px]">Around a record</div>
      </div>
      <div
        className="rounded-card border border-hair bg-sheet p-[18px]"
        style={{ boxShadow: '0 8px 24px rgba(24,22,19,0.12)' }}
      >
        <div className="mb-1.5 font-mono text-[11px] text-ink-3">overlay</div>
        <div className="text-[13px]">Popovers &amp; modals only</div>
      </div>
    </div>
  );
}

function GridFig() {
  return (
    <div className="relative h-[220px] border border-ink bg-paper p-6">
      <Overline className="absolute left-6 top-3">Stage</Overline>
      <div
        className="absolute bottom-3 left-6 right-6 top-12 grid gap-2"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
      >
        <div className="col-span-8 h-[120px] border border-ink bg-paper" />
        <div className="col-span-4 h-[120px] border border-hair bg-sheet" />
      </div>
      <Mark className="absolute bottom-2.5 left-6">
        8 + 4 layout — primary record &amp; sidebar
      </Mark>
    </div>
  );
}

function Density({ variant }: { variant: 'compact' | 'regular' | 'comfortable' }) {
  const cls =
    variant === 'compact'
      ? { row: 'py-[5px] text-[12px]', mrn: 'text-[11px]' }
      : variant === 'regular'
        ? { row: 'py-[10px] text-[13px]', mrn: 'text-[12px]' }
        : { row: 'py-[14px] text-[14px]', mrn: 'text-[13px]' };

  const rows = [
    {
      name: 'Adebayo, Olumide',
      mrn: '10458291',
      bed: '3-N · 312A',
      md: 'Patel, R MD',
      status: 'In room',
      tone: 'ok' as const,
    },
    {
      name: 'Chen, Wei-Lin',
      mrn: '10293874',
      bed: '3-N · 312B',
      md: 'Patel, R MD',
      status: 'Awaiting labs',
      tone: 'warn' as const,
    },
  ];

  return (
    <div className="mb-3.5 overflow-hidden rounded-card border border-hair">
      <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-hair bg-paper px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">
        <div>Patient</div>
        <div>MRN</div>
        <div>Bed</div>
        <div>Attending</div>
        <div>Status</div>
      </div>
      {rows.map((row, index) => (
        <div
          key={row.name}
          className={`grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 bg-sheet px-3.5 ${cls.row} ${
            index === rows.length - 1 ? '' : 'border-b border-hair'
          }`}
        >
          <div className="font-medium text-ink">{row.name}</div>
          <div className={`font-mono text-ink-3 ${cls.mrn}`}>{row.mrn}</div>
          <div className={`font-mono text-ink-3 ${cls.mrn}`}>{row.bed}</div>
          <div>{row.md}</div>
          <PillStatus tone={row.tone} label={row.status} />
        </div>
      ))}
    </div>
  );
}

function PillStatus({ tone, label }: { tone: 'ok' | 'warn'; label: string }) {
  const cls =
    tone === 'ok'
      ? 'text-green-800 border-green-300 bg-green-50'
      : 'text-warn border-warn-edge bg-warn-bg';
  return (
    <span
      className={`inline-flex h-5 items-center gap-1.5 whitespace-nowrap rounded-pill border bg-transparent px-2 font-sans text-[11px] font-medium tracking-label ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}
