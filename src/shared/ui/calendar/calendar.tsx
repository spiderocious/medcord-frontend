import { useMemo, useState } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Calendar` — single-date or range, hand-drawn ink grid.
 * Reference: 13-datetime.html:24-77.
 */
export type CalendarMode = 'single' | 'range';

export interface CalendarValue {
  start?: Date | null;
  end?: Date | null;
}

export interface CalendarProps {
  mode?: CalendarMode;
  value?: CalendarValue;
  onChange?: (value: CalendarValue) => void;
  /** ISO `YYYY-MM-DD` strings of dates that should show a green dot. */
  hasEvents?: ReadonlyArray<string>;
  /** ISO dates that are not selectable. */
  unavailable?: ReadonlyArray<string>;
  /** Optional initial cursor month. Defaults to value.start or today. */
  initialMonth?: Date;
  className?: string;
}

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

function formatIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function Calendar({
  mode = 'single',
  value,
  onChange,
  hasEvents = [],
  unavailable = [],
  initialMonth,
  className,
}: CalendarProps) {
  const [cursor, setCursor] = useState<Date>(initialMonth ?? value?.start ?? new Date());

  const cells = useMemo(() => buildCells(cursor), [cursor]);
  const today = new Date();
  const eventSet = new Set(hasEvents);
  const unavailableSet = new Set(unavailable);

  function pickDay(day: Date) {
    const iso = formatIso(day);
    if (unavailableSet.has(iso)) return;
    if (mode === 'single') {
      onChange?.({ start: day, end: day });
      return;
    }
    if (!value?.start || (value.start && value.end)) {
      onChange?.({ start: day, end: null });
    } else {
      const start = value.start;
      const end = day;
      onChange?.(end < start ? { start: end, end: start } : { start, end });
    }
  }

  function inRange(day: Date): boolean {
    if (mode !== 'range' || !value?.start || !value.end) return false;
    return day > value.start && day < value.end;
  }

  function isStart(day: Date): boolean {
    return value?.start ? isSameDay(day, value.start) : false;
  }

  function isEnd(day: Date): boolean {
    return value?.end ? isSameDay(day, value.end) : false;
  }

  return (
    <div className={cn('w-[280px] border border-ink bg-sheet px-5 py-[18px]', className)}>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="font-serif text-[18px] font-medium tracking-h">
          {cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </span>
        <span className="flex">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="cursor-pointer border-0 bg-transparent px-1.5 font-mono text-[13px] text-ink-3 hover:text-ink"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="cursor-pointer border-0 bg-transparent px-1.5 font-mono text-[13px] text-ink-3 hover:text-ink"
          >
            ›
          </button>
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DOW.map((d, index) => (
          <div
            key={`${d}-${index}`}
            className="flex aspect-square items-center justify-center font-mono text-[10px] uppercase tracking-overline text-ink-3"
          >
            {d}
          </div>
        ))}
        {cells.map((day) => {
          const inMonth = day.getMonth() === cursor.getMonth();
          const iso = formatIso(day);
          const isToday = isSameDay(day, today);
          const isSel = isStart(day) || isEnd(day);
          const isInRange = inRange(day);
          const isUnavailable = unavailableSet.has(iso);
          const hasEvent = eventSet.has(iso);
          return (
            <button
              type="button"
              key={iso}
              onClick={() => pickDay(day)}
              disabled={isUnavailable}
              className={cn(
                'relative flex aspect-square cursor-pointer items-center justify-center rounded-paper border-0 bg-transparent font-mono text-[13px] tabular-nums text-ink hover:bg-paper-deep',
                !inMonth && 'text-ink-4',
                isToday && !isSel && 'border border-ink font-semibold',
                isInRange && 'rounded-none bg-paper-deep',
                isStart(day) && 'rounded-l-paper rounded-r-none bg-ink text-paper hover:bg-ink',
                isEnd(day) && 'rounded-l-none rounded-r-paper bg-ink text-paper hover:bg-ink',
                isStart(day) && isEnd(day) && 'rounded-paper',
                isUnavailable && 'cursor-not-allowed text-ink-4 line-through',
              )}
            >
              {day.getDate()}
              {hasEvent ? (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green-700" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildCells(cursor: Date): Date[] {
  const start = startOfMonth(cursor);
  const startDow = start.getDay();
  const first = new Date(start);
  first.setDate(start.getDate() - startDow);
  const cells: Date[] = [];
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(first);
    d.setDate(first.getDate() + i);
    cells.push(d);
  }
  return cells;
}
