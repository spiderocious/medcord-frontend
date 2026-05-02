import { cn } from '@shared/utils/cn';

/**
 * `RoomBedPicker` — small 6-column floor map of beds.
 * Reference: 12-selection.html:207-242.
 */
export type RoomBedState = 'occupied' | 'empty' | 'cleaning' | 'iso' | 'offline';

export interface RoomBedCell {
  id: string;
  /** Mono room/bed code, e.g. `312A`. */
  code: string;
  /** Patient or status label. */
  label: string;
  state: RoomBedState;
}

export interface RoomBedPickerProps {
  cells: ReadonlyArray<RoomBedCell>;
  selectedId?: string;
  onSelect?: (cell: RoomBedCell) => void;
  className?: string;
}

const STATE: Record<RoomBedState, string> = {
  occupied: 'bg-sheet',
  empty: 'bg-paper italic text-ink-3',
  cleaning: 'bg-warn-bg italic',
  iso: 'bg-sheet',
  offline:
    'bg-[repeating-linear-gradient(135deg,_var(--paper)_0_6px,_var(--paper-deep)_6px_12px)] italic line-through text-ink-3',
};

export function RoomBedPicker({ cells, selectedId, onSelect, className }: RoomBedPickerProps) {
  return (
    <div className={cn('grid grid-cols-6 border border-ink bg-sheet', className)}>
      {cells.map((cell) => {
        const isSelected = cell.id === selectedId;
        return (
          <button
            type="button"
            key={cell.id}
            onClick={() => onSelect?.(cell)}
            className={cn(
              'relative flex min-h-[84px] cursor-pointer flex-col gap-1 border-b border-r border-hair p-3 text-left',
              STATE[cell.state],
              isSelected && 'bg-ink text-paper',
            )}
          >
            {cell.state === 'iso' ? (
              <span className="absolute right-0 top-0 rounded-bl-paper bg-low px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-overline text-white">
                ISO
              </span>
            ) : null}
            <span
              className={cn(
                'font-mono text-[11px] uppercase tracking-overline',
                isSelected ? 'text-paper/70' : 'text-ink-3',
              )}
            >
              {cell.code}
            </span>
            <span
              className={cn(
                'font-serif text-[15px] font-medium tracking-h',
                isSelected && 'text-paper',
                cell.state === 'cleaning' && 'font-normal italic text-warn',
                cell.state === 'empty' && 'font-normal',
              )}
            >
              {cell.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
