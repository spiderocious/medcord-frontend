import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * Progress family — printed gauges. Hairline-and-ink stance.
 * Reference: 24-progress.html.
 *
 * - `ProgressBar` · linear, with optional caption above
 * - `ProgressRing` · circular percentage
 * - `ProgressStepper` · numbered steps
 * - `ProgressDrip` · a glass-bottle IV indicator
 */

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: ReactNode;
  meta?: ReactNode;
  /** Critical → arterial-red bar. */
  tone?: 'ink' | 'crit' | 'warn';
  className?: string;
}

const BAR_TONE = { ink: 'bg-ink', crit: 'bg-crit', warn: 'bg-warn' } as const;

export function ProgressBar({
  value,
  max = 100,
  label,
  meta,
  tone = 'ink',
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {(label || meta) && (
        <div className="flex items-baseline justify-between gap-3">
          {label ? <span className="text-[13px] text-ink">{label}</span> : <span />}
          {meta ? (
            <span className="font-mono text-[11px] tracking-mono text-ink-3">{meta}</span>
          ) : null}
        </div>
      )}
      <div className="h-1 w-full bg-paper-deep">
        <div className={cn('h-full', BAR_TONE[tone])} style={{ width: `${pct * 100}%` }} />
      </div>
    </div>
  );
}

export interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  /** Drawn line width. */
  thickness?: number;
  label?: ReactNode;
  className?: string;
}

export function ProgressRing({
  value,
  max = 100,
  size = 64,
  thickness = 2,
  label,
  className,
}: ProgressRingProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--paper-deep)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--ink)"
          strokeWidth={thickness}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {label ? (
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[12px] tabular-nums tracking-mono text-ink">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export interface ProgressStepperProps {
  steps: ReadonlyArray<string>;
  current: number;
  className?: string;
}

export function ProgressStepper({ steps, current, className }: ProgressStepperProps) {
  return (
    <ol
      className={cn('m-0 flex list-none items-center gap-3 p-0 font-mono text-[11px] tracking-mono', className)}
    >
      {steps.map((step, index) => {
        const isDone = index < current;
        const isCurrent = index === current;
        return (
          <li key={step} className="flex items-center gap-3">
            <span
              className={cn(
                'inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px]',
                isDone
                  ? 'border-ink bg-ink text-paper'
                  : isCurrent
                    ? 'border-ink text-ink'
                    : 'border-ink-4 text-ink-4',
              )}
            >
              {index + 1}
            </span>
            <span className={cn(isCurrent ? 'text-ink' : 'text-ink-3')}>{step}</span>
            {index < steps.length - 1 ? (
              <span className="block h-px w-6 bg-hair" aria-hidden />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export interface ProgressDripProps {
  /** Remaining volume (mL). */
  remaining: number;
  /** Total volume (mL). */
  total: number;
  /** ml/h rate, optional caption. */
  rate?: number;
  className?: string;
}

export function ProgressDrip({ remaining, total, rate, className }: ProgressDripProps) {
  const pct = Math.max(0, Math.min(1, remaining / total));
  return (
    <div className={cn('flex items-end gap-3', className)}>
      <div className="relative h-[120px] w-12 overflow-hidden rounded-b-soft border border-ink bg-sheet">
        <div
          className="absolute bottom-0 left-0 right-0 bg-ink/80"
          style={{ height: `${pct * 100}%` }}
        />
      </div>
      <div className="font-mono text-[11px] tracking-mono text-ink-3">
        <div className="text-ink">
          {remaining}
          <span className="ml-1 font-sans text-[10px] text-ink-3">mL</span>
        </div>
        <div>of {total} mL</div>
        {rate !== undefined ? <div>{rate} mL/h</div> : null}
      </div>
    </div>
  );
}
