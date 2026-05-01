import { cn } from '@shared/utils/cn';

/**
 * `MarTable` — Medication Administration Record (drug × hour grid).
 * Reference: 22-vitals.html (MAR section).
 *
 * Each cell is one of:
 *  - `given`     filled ink dot
 *  - `held`      hollow circle
 *  - `missed`    crit X
 *  - `refused`   warn slash
 *  - `scheduled` muted dot
 *  - `null`      empty
 */
export type MarCellState = 'given' | 'held' | 'missed' | 'refused' | 'scheduled' | null;

export interface MarRow {
  id: string;
  /** Italic serif drug name + dose, free-form. */
  drug: string;
  /** Cells aligned with `hours`. */
  cells: ReadonlyArray<MarCellState>;
}

export interface MarTableProps {
  /** Header column; e.g. `['00','03','06','09','12','15','18','21']`. */
  hours: ReadonlyArray<string>;
  rows: ReadonlyArray<MarRow>;
  className?: string;
}

export function MarTable({ hours, rows, className }: MarTableProps) {
  return (
    <div className={cn('overflow-hidden border border-ink bg-sheet', className)}>
      <div
        className="grid border-b border-ink bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3"
        style={{ gridTemplateColumns: `260px repeat(${hours.length}, 1fr)` }}
      >
        <div>Medication</div>
        {hours.map((hour) => (
          <div key={hour} className="text-center">
            {hour}
          </div>
        ))}
      </div>
      {rows.map((row, index) => (
        <div
          key={row.id}
          className={cn(
            'grid items-center px-4 py-2.5',
            index === rows.length - 1 ? '' : 'border-b border-hair',
          )}
          style={{ gridTemplateColumns: `260px repeat(${hours.length}, 1fr)` }}
        >
          <div className="font-serif text-[15px] italic text-ink">{row.drug}</div>
          {row.cells.map((cell, cellIndex) => (
            <div key={cellIndex} className="flex items-center justify-center">
              <Glyph state={cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Glyph({ state }: { state: MarCellState }) {
  if (state === null) return <span className="block h-2 w-2" aria-hidden />;
  if (state === 'given') return <span className="block h-2 w-2 rounded-full bg-ink" />;
  if (state === 'held') return <span className="block h-2 w-2 rounded-full border border-ink" />;
  if (state === 'scheduled') return <span className="block h-2 w-2 rounded-full bg-ink-4" />;
  if (state === 'missed')
    return <span className="font-mono text-[12px] font-semibold leading-[1] text-crit">×</span>;
  return <span className="font-mono text-[12px] font-semibold leading-[1] text-warn">/</span>;
}
