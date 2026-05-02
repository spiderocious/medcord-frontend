import { Avatar } from '@ui/avatar';
import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { Stamp } from '@ui/stamp';
import { Mark } from '@ui/typography';

/**
 * Surfaces · Bed board
 * Reference: 31-bed-board.html.
 */

interface Cell {
  code: string;
  state: 'occupied' | 'empty' | 'cleaning' | 'iso' | 'offline';
  name?: string;
  acuity?: 'STAT' | 'WATCH' | 'STABLE';
  needs?: string;
}

const ROOMS: ReadonlyArray<Cell> = [
  { code: '311 A', state: 'occupied', name: 'Adebayo, O', acuity: 'WATCH', needs: 'meds' },
  { code: '311 B', state: 'empty' },
  { code: '312 A', state: 'occupied', name: 'Chen, W', acuity: 'STABLE', needs: 'discharge' },
  { code: '312 B', state: 'cleaning' },
  { code: '313 A', state: 'iso', name: 'Reyes, M', acuity: 'STAT', needs: 'cards' },
  { code: '313 B', state: 'occupied', name: 'Singh, R', acuity: 'STABLE' },
  { code: '314 A', state: 'occupied', name: 'Park, J', acuity: 'STABLE', needs: 'rounds' },
  { code: '314 B', state: 'empty' },
  { code: '315 A', state: 'offline' },
  { code: '315 B', state: 'occupied', name: 'Lee, K', acuity: 'WATCH' },
  { code: '316 A', state: 'occupied', name: 'Ngo, T', acuity: 'STABLE', needs: 'lab' },
  { code: '316 B', state: 'cleaning' },
];

const ACUITY_TONE: Record<NonNullable<Cell['acuity']>, 'crit' | 'warn' | 'ok'> = {
  STAT: 'crit',
  WATCH: 'warn',
  STABLE: 'ok',
};

export function BedBoardPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="IV · 02"
        title="Bed board"
        meta="charge nurse at the station, looking at the floor map"
      />
      <div className="grid grid-cols-6 border border-ink bg-sheet">
        {ROOMS.map((cell, index) => (
          <div
            key={cell.code}
            className={`relative flex min-h-[112px] flex-col gap-1.5 border-r border-hair p-3 ${
              cell.state === 'cleaning'
                ? 'bg-warn-bg'
                : cell.state === 'empty'
                  ? 'bg-paper italic'
                  : cell.state === 'offline'
                    ? 'bg-[repeating-linear-gradient(135deg,_var(--paper)_0_6px,_var(--paper-deep)_6px_12px)] italic'
                    : 'bg-sheet'
            } ${index >= 6 ? 'border-t border-hair' : ''}`}
          >
            {cell.state === 'iso' ? (
              <span className="absolute right-0 top-0 rounded-bl-paper bg-low px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-overline text-white">
                ISO
              </span>
            ) : null}
            <Mark>{cell.code}</Mark>
            {cell.name ? (
              <div className="flex items-center gap-2">
                <Avatar subject="patient" size="sm" initials={initials(cell.name)} />
                <span className="font-serif text-[15px] tracking-h text-ink">{cell.name}</span>
              </div>
            ) : (
              <span className="font-serif text-[14px] italic text-ink-3">
                {cell.state === 'cleaning'
                  ? 'cleaning'
                  : cell.state === 'offline'
                    ? 'offline'
                    : 'available'}
              </span>
            )}
            {cell.acuity ? (
              <Pill tone={ACUITY_TONE[cell.acuity]} dot={false}>
                {cell.acuity}
              </Pill>
            ) : null}
            {cell.needs ? (
              <span className="font-mono text-[11px] tracking-mono text-ink-3">
                next · {cell.needs}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </Page>
  );
}

function initials(name: string): string {
  return name
    .split(/[,\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}
