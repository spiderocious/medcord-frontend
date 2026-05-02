import { type Key, type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Table` — typeset roster.
 *
 * Reference: 20-tables.html (header rules, sort caret, hairline rows, 2px
 * ink-rule for selected, leading red bleed for critical).
 *
 * Generic over the row shape; `columns` define cell renderers.
 */
export type SortDirection = 'asc' | 'desc';

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  /** Render a single cell. */
  cell: (row: T) => ReactNode;
  /** Tailwind alignment class. */
  align?: 'left' | 'right';
  /** Hint that this column is mono/tabular. */
  mono?: boolean;
  /** Show the column as sortable; consumer toggles via `sort`. */
  sortable?: boolean;
  /** Width hint, e.g. `'120px'`. */
  width?: string;
}

export interface TableProps<T> {
  columns: ReadonlyArray<TableColumn<T>>;
  rows: ReadonlyArray<T>;
  getRowKey: (row: T) => Key;
  selectedKey?: Key;
  /** Mark a row as critical (red leading bleed). */
  isCritical?: (row: T) => boolean;
  onRowClick?: (row: T) => void;
  /** Active sort, if any. */
  sort?: { key: string; direction: SortDirection };
  onSort?: (key: string) => void;
  density?: 'compact' | 'regular' | 'comfortable';
  className?: string;
  /** Render under the table when `rows.length === 0`. */
  empty?: ReactNode;
}

const DENSITY: Record<NonNullable<TableProps<unknown>['density']>, string> = {
  compact: 'py-[5px] text-[12px]',
  regular: 'py-[10px] text-[13px]',
  comfortable: 'py-[14px] text-[14px]',
};

export function Table<T>({
  columns,
  rows,
  getRowKey,
  selectedKey,
  isCritical,
  onRowClick,
  sort,
  onSort,
  density = 'regular',
  className,
  empty,
}: TableProps<T>) {
  const gridTemplate = columns.map((col) => col.width ?? 'minmax(0, 1fr)').join(' ');

  return (
    <div className={cn('overflow-hidden rounded-card border border-hair', className)}>
      <div
        className="grid gap-4 border-b border-hair bg-paper px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        {columns.map((col) => (
          <button
            key={col.key}
            type="button"
            onClick={() => col.sortable && onSort?.(col.key)}
            className={cn(
              'font-inherit flex items-center gap-1 border-0 bg-transparent p-0 text-left text-inherit',
              col.sortable && 'cursor-pointer hover:text-ink',
              col.align === 'right' && 'justify-end',
            )}
          >
            {col.header}
            {col.sortable && sort?.key === col.key ? (
              <span className="text-ink">{sort.direction === 'asc' ? '▲' : '▼'}</span>
            ) : null}
          </button>
        ))}
      </div>
      {rows.length === 0 ? (
        <div className="px-3.5 py-8 text-center font-serif text-[16px] italic text-ink-3">
          {empty ?? 'No rows.'}
        </div>
      ) : (
        rows.map((row, index) => {
          const key = getRowKey(row);
          const selected = key === selectedKey;
          const critical = isCritical?.(row) ?? false;
          return (
            <div
              key={key}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'group relative grid items-center gap-4 bg-sheet px-3.5',
                DENSITY[density],
                index === rows.length - 1 ? '' : 'border-b border-hair',
                onRowClick && 'cursor-pointer',
                selected && 'border-l-[2px] border-l-ink pl-[12px]',
                critical && 'bg-crit-bg/40 border-l-[2px] border-l-crit pl-[12px]',
              )}
              style={{ gridTemplateColumns: gridTemplate }}
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={cn(
                    col.align === 'right' && 'text-right',
                    col.mono && 'font-mono tabular-nums tracking-mono text-ink-3',
                  )}
                >
                  {col.cell(row)}
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
