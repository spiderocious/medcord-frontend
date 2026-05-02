import { useMemo } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `LineChart` — printed, ink-only chart. Hairline grid, ink lines, mono labels.
 * No fills, no gradients, no decoration — color exists only for state.
 * Reference: 23-charts.html.
 *
 * `series` is an array of independent traces; `xLabels` is the x-axis ticks.
 * `referenceBands` (rendered behind the lines) call out clinical bounds.
 */
export type LineChartTone = 'ink' | 'crit' | 'warn' | 'low' | 'green';

export interface LineChartSeries {
  id: string;
  /** Numeric values, same length as xLabels. */
  values: ReadonlyArray<number>;
  /** Inline series label (e.g. `HR`). */
  label?: string;
  /** Tone of the trace. */
  tone?: LineChartTone;
}

export interface LineChartReferenceBand {
  /** Y-axis lower bound. */
  from: number;
  /** Y-axis upper bound. */
  to: number;
  tone?: 'green' | 'warn' | 'crit';
}

export interface LineChartProps {
  series: ReadonlyArray<LineChartSeries>;
  xLabels: ReadonlyArray<string>;
  /** Y-axis bounds. If omitted, computed from series. */
  yMin?: number;
  yMax?: number;
  /** Optional reference bands rendered behind the lines. */
  referenceBands?: ReadonlyArray<LineChartReferenceBand>;
  width?: number;
  height?: number;
  className?: string;
}

const TONE_STROKE: Record<LineChartTone, string> = {
  ink: 'stroke-ink',
  crit: 'stroke-crit',
  warn: 'stroke-warn',
  low: 'stroke-low',
  green: 'stroke-green-700',
};

const BAND_FILL: Record<NonNullable<LineChartReferenceBand['tone']>, string> = {
  green: 'fill-green-200/40',
  warn: 'fill-warn-bg',
  crit: 'fill-crit-bg',
};

export function LineChart({
  series,
  xLabels,
  yMin,
  yMax,
  referenceBands = [],
  width = 720,
  height = 220,
  className,
}: LineChartProps) {
  const padding = { top: 12, right: 28, bottom: 24, left: 32 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const { min, max } = useMemo(() => bounds(series, yMin, yMax), [series, yMin, yMax]);
  const range = max - min || 1;
  const stepX = innerW / Math.max(1, xLabels.length - 1);

  function xAt(i: number) {
    return padding.left + i * stepX;
  }

  function yAt(value: number) {
    return padding.top + innerH - ((value - min) / range) * innerH;
  }

  const yTicks = niceTicks(min, max, 5);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn('block w-full', className)} role="img">
      {/* hairline grid */}
      <g stroke="var(--hair)" strokeWidth="1">
        {yTicks.map((tick) => (
          <line
            key={`gy-${tick}`}
            x1={padding.left}
            x2={width - padding.right}
            y1={yAt(tick)}
            y2={yAt(tick)}
          />
        ))}
      </g>
      {/* reference bands */}
      <g>
        {referenceBands.map((band, index) => (
          <rect
            key={`band-${index}`}
            x={padding.left}
            y={yAt(band.to)}
            width={innerW}
            height={Math.max(0, yAt(band.from) - yAt(band.to))}
            className={BAND_FILL[band.tone ?? 'green']}
          />
        ))}
      </g>
      {/* axes */}
      <g stroke="var(--ink)" strokeWidth="1">
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + innerH} />
        <line
          x1={padding.left}
          y1={padding.top + innerH}
          x2={width - padding.right}
          y2={padding.top + innerH}
        />
      </g>
      {/* y labels */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-3)">
        {yTicks.map((tick) => (
          <text key={`yl-${tick}`} x={padding.left - 6} y={yAt(tick) + 3} textAnchor="end">
            {tick}
          </text>
        ))}
      </g>
      {/* x labels */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-3)">
        {xLabels.map((label, i) => (
          <text key={`xl-${i}`} x={xAt(i)} y={padding.top + innerH + 14} textAnchor="middle">
            {label}
          </text>
        ))}
      </g>
      {/* series */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
        {series.map((trace) => (
          <path
            key={trace.id}
            className={TONE_STROKE[trace.tone ?? 'ink']}
            d={trace.values
              .map((v, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(2)} ${yAt(v).toFixed(2)}`)
              .join(' ')}
          />
        ))}
      </g>
      {/* series labels at the right edge */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="10">
        {series.map((trace) => {
          const last = trace.values[trace.values.length - 1];
          if (last === undefined || !trace.label) return null;
          const cls =
            trace.tone === 'crit'
              ? 'fill-crit'
              : trace.tone === 'warn'
                ? 'fill-warn'
                : trace.tone === 'low'
                  ? 'fill-low'
                  : trace.tone === 'green'
                    ? 'fill-green-700'
                    : 'fill-ink';
          return (
            <text
              key={`sl-${trace.id}`}
              x={width - padding.right + 6}
              y={yAt(last) + 3}
              className={cls}
            >
              {trace.label}
            </text>
          );
        })}
      </g>
    </svg>
  );
}

function bounds(series: ReadonlyArray<LineChartSeries>, yMin?: number, yMax?: number) {
  const all = series.flatMap((s) => s.values);
  return {
    min: yMin ?? (all.length ? Math.min(...all) : 0),
    max: yMax ?? (all.length ? Math.max(...all) : 1),
  };
}

function niceTicks(min: number, max: number, count: number): number[] {
  if (max <= min) return [min];
  const step = (max - min) / (count - 1);
  const ticks: number[] = [];
  for (let i = 0; i < count; i += 1) ticks.push(Math.round((min + step * i) * 10) / 10);
  return ticks;
}
