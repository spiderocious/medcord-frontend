import { useMemo } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Sparkline` — tiny ink line, no axes. Used inline next to a number to show trend.
 * Reference: 23-charts.html (sparkline section).
 */
export interface SparklineProps {
  values: ReadonlyArray<number>;
  width?: number;
  height?: number;
  /** Stroke width in svg user units. */
  strokeWidth?: number;
  /** Tone of the line (defaults to ink). */
  tone?: 'ink' | 'crit' | 'warn' | 'low' | 'green';
  className?: string;
  /** Optional caption rendered to the right. */
  caption?: string;
}

const TONE: Record<NonNullable<SparklineProps['tone']>, string> = {
  ink: 'stroke-ink',
  crit: 'stroke-crit',
  warn: 'stroke-warn',
  low: 'stroke-low',
  green: 'stroke-green-700',
};

export function Sparkline({
  values,
  width = 80,
  height = 22,
  strokeWidth = 1.4,
  tone = 'ink',
  className,
  caption,
}: SparklineProps) {
  const path = useMemo(() => buildPath(values, width, height), [values, width, height]);
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
        <path
          d={path}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={TONE[tone]}
          strokeWidth={strokeWidth}
        />
      </svg>
      {caption ? (
        <span className="font-mono text-[11px] tracking-mono text-ink-3">{caption}</span>
      ) : null}
    </span>
  );
}

function buildPath(values: ReadonlyArray<number>, width: number, height: number): string {
  if (values.length === 0) return '';
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / Math.max(1, values.length - 1);
  return values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}
