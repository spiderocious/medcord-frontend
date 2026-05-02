import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Overline } from '@ui/typography';

/**
 * Foundation · Motion
 * Reference: Medcord Design System / preview / 04-motion.html.
 */
export function MotionPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="I · 04"
        title="Motion"
        meta="paper turns, ink rises · no bounce, no decoration"
      />

      <p className="mb-7 max-w-[30ch] font-serif text-[22px] italic leading-[1.4] tracking-h text-ink">
        &ldquo;Motion in Medcord describes the page being turned, not a button being amused.&rdquo;
        <small className="mt-2 block font-mono text-[11px] not-italic tracking-mono text-ink-3">
          — design principle, vol. 1
        </small>
      </p>

      <SheetEntryDemo />

      <SectionBreak label="Curves — three, no more" />
      <Timing name="paper-out" detail="— ease-out" desc="entrances · default" puck="ease-out" />
      <Timing name="paper-in" detail="— ease-in" desc="exits · dismissals" puck="ease-in" />
      <Timing name="paper-turn" detail="— ease-in-out" desc="in-place transitions" puck="ease-io" />
      <Timing name="linear" desc="progress, only · drips, infusions" puck="linear" />

      <SectionBreak label="Durations" />
      <Timing name="instant" detail="— 0 ms" desc="no animation" puck={undefined} />
      <Timing
        name="fast"
        detail="— 100 ms"
        desc="hover, focus, micro-feedback"
        puck="ease-io"
        speed="fast"
      />
      <Timing
        name="default"
        detail="— 200 ms"
        desc="drawers, popovers, sheet entry"
        puck="ease-out"
        speed="normal"
      />
      <Timing
        name="deliberate"
        detail="— 350 ms"
        desc="large modal entry · use sparingly"
        puck="ease-io"
        speed="slow"
      />

      <ReducedMotionNotice />

      <style>{`
        @keyframes ds-glide {
          0%   { left: 0; }
          45%  { left: calc(100% - 8px); }
          55%  { left: calc(100% - 8px); }
          100% { left: 0; }
        }
        @keyframes ds-rise {
          0%, 35%   { transform: translateY(8px); opacity: 0; }
          50%, 85%  { transform: translateY(0);   opacity: 1; }
          100%      { transform: translateY(-4px); opacity: 0; }
        }
      `}</style>
    </Page>
  );
}

function SheetEntryDemo() {
  return (
    <div className="relative h-[220px] overflow-hidden rounded-card border border-hair bg-paper-deep">
      <Overline className="absolute bottom-3 left-4 z-10">
        Sheet entry · 200 ms · ease-out · ↑ 8 px
      </Overline>
      <div
        className="absolute inset-x-8 top-8 h-[132px] rounded-card border border-sheet-edge bg-sheet px-4 py-3.5"
        style={{
          animation: 'ds-rise 4s cubic-bezier(0.18,0.8,0.34,1) infinite',
        }}
      >
        <Overline className="mb-1.5 block">Progress note · 14:08</Overline>
        <h4 className="m-0 mb-1.5 font-serif text-[18px] font-medium tracking-h">
          Adebayo, Olumide — repeat troponin negative.
        </h4>
        <p className="m-0 text-[12px] text-ink-3">
          Discharge planning resumed. Spouse en route. Cardiology cleared.
        </p>
      </div>
    </div>
  );
}

interface TimingProps {
  name: string;
  detail?: string;
  desc: string;
  puck: 'ease-out' | 'ease-in' | 'ease-io' | 'linear' | undefined;
  speed?: 'fast' | 'normal' | 'slow';
}

function Timing({ name, detail, desc, puck, speed = 'normal' }: TimingProps) {
  const easing =
    puck === 'ease-out'
      ? 'cubic-bezier(0.18, 0.8, 0.34, 1)'
      : puck === 'ease-in'
        ? 'cubic-bezier(0.6, 0, 0.85, 0.2)'
        : puck === 'ease-io'
          ? 'cubic-bezier(0.6, 0, 0.4, 1)'
          : 'linear';
  const duration = speed === 'fast' ? '1200ms' : speed === 'slow' ? '2800ms' : '1800ms';
  return (
    <div className="grid grid-cols-[140px_1fr_200px] items-center border-b border-hair py-3.5 first-of-type:border-t">
      <div className="font-mono text-[12px] tracking-mono text-ink">
        {name}
        {detail ? <span className="text-ink-3"> {detail}</span> : null}
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-[3px] bg-paper-deep">
        {puck ? (
          <span
            className="absolute -top-px left-0 h-2 w-2 rounded-full bg-ink"
            style={{
              animation: `ds-glide ${duration} ${easing} infinite`,
            }}
          />
        ) : null}
      </div>
      <div className="font-sans text-[12px] text-ink-3">{desc}</div>
    </div>
  );
}

function ReducedMotionNotice() {
  return (
    <div className="mt-7 max-w-[60ch] rounded-card border border-ink p-[18px] text-[13px] leading-[1.55] text-ink">
      <strong>Reduced motion is honoured.</strong> When{' '}
      <code className="font-mono text-[12px] text-ink-2">prefers-reduced-motion: reduce</code> is
      set, all transitions collapse to{' '}
      <code className="font-mono text-[12px] text-ink-2">0 ms</code>. Status changes still fire —
      the entry just appears, no rise, no fade.
    </div>
  );
}
