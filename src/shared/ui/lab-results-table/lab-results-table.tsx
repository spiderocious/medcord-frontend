import { LabFlag } from '../lab-flag';
import { cn } from '@shared/utils/cn';

/**
 * `LabResultsTable` — typeset, not tabular. Each row is the lab as a sentence:
 * code · name · big mono number · unit small · reference range · marker on a
 * hairline showing where the value falls within range.
 *
 * Reference: 21-lab.html.
 */
export type LabFlagKind = 'high' | 'low' | 'critical';

export interface LabResultRow {
  id: string;
  /** Mono code, e.g. `NA`, `K`, `TROP-I`. */
  code: string;
  /** Full test name. */
  name: string;
  /** Numeric value, kept as string to preserve trailing zeros. */
  value: string;
  unit: string;
  /** Range bounds. */
  refLow: number;
  refHigh: number;
  /** Position 0..1 of the marker on the hairline. */
  position: number;
  flag?: LabFlagKind;
  comment?: string;
}

export interface LabResultsTableProps {
  rows: ReadonlyArray<LabResultRow>;
  className?: string;
}

export function LabResultsTable({ rows, className }: LabResultsTableProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {rows.map((row, index) => {
        const isCritical = row.flag === 'critical';
        return (
          <div
            key={row.id}
            className={cn(
              'relative grid grid-cols-[80px_1fr_180px] items-center gap-6 py-4',
              index === rows.length - 1 ? '' : 'border-b border-hair-soft',
              isCritical && 'border-l-[3px] border-l-crit pl-3.5',
            )}
          >
            <div className="font-mono text-[12px] tabular-nums tracking-mono text-ink-3">
              {row.code}
            </div>
            <div>
              <div className="flex items-baseline gap-3">
                <div className="font-serif text-[16px] font-medium tracking-h text-ink">
                  {row.name}
                </div>
                {row.flag ? <LabFlag tone={row.flag}>{flagLabel(row.flag)}</LabFlag> : null}
              </div>
              {row.comment ? (
                <div className="mt-1 font-serif text-[13px] italic text-ink-3">{row.comment}</div>
              ) : null}
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-[24px] font-medium tabular-nums tracking-[-0.02em] text-ink">
                  {row.value}
                </span>
                <span className="font-sans text-[11px] tracking-wide text-ink-3">{row.unit}</span>
              </div>
              <RangeMarker
                low={row.refLow}
                high={row.refHigh}
                position={row.position}
                tone={row.flag}
              />
              <div className="font-mono text-[10px] tabular-nums tracking-mono text-ink-3">
                ref · {row.refLow}–{row.refHigh}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RangeMarker({
  low,
  high,
  position,
  tone,
}: {
  low: number;
  high: number;
  position: number;
  tone?: LabFlagKind;
}) {
  void low;
  void high;
  const clamped = Math.max(0, Math.min(1, position));
  const color =
    tone === 'critical' ? 'bg-crit' : tone === 'high' ? 'bg-warn' : tone === 'low' ? 'bg-low' : 'bg-ink';
  return (
    <div className="relative h-[2px] w-[160px] bg-hair">
      <div className="absolute inset-y-0 left-1/4 right-1/4 bg-green-300/60" />
      <span
        className={cn('absolute top-1/2 h-2 w-px -translate-y-1/2', color)}
        style={{ left: `${clamped * 100}%` }}
      />
    </div>
  );
}

function flagLabel(flag: LabFlagKind): string {
  if (flag === 'critical') return '!!!';
  if (flag === 'high') return 'H';
  return 'L';
}
