import { type KeyboardEvent, type ReactNode, useState } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Combobox` — search field that opens a list of typeset rows.
 *
 * The chart-book idiom: monospace prefix, large input, mono shortcut hint.
 * Each result row is rendered by the consumer via `renderRow` so we don't
 * over-prescribe the result schema.
 *
 * Reference:
 *  - 11-inputs.html:235-289 (ICD-10 / Rx chart-book)
 *  - 12-selection.html:172-205 (provider picker)
 */
export interface ComboboxProps<T> {
  /** Mono uppercase tag at the leading edge of the input row. */
  prefix?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Right-aligned mono hint, e.g. `↑ ↓ to step · ↵ to add`. */
  hint?: string;
  results: ReadonlyArray<T>;
  /** Identifier the active state matches against. */
  getKey: (item: T) => string;
  /** Index of the row that should be highlighted (`on` state in source). */
  activeKey?: string;
  onActivate?: (item: T) => void;
  /** How a row is drawn. Surrounded by the picker chrome here. */
  renderRow: (item: T, isActive: boolean) => ReactNode;
  className?: string;
}

export function Combobox<T>({
  prefix,
  value,
  onChange,
  placeholder,
  hint,
  results,
  getKey,
  activeKey,
  onActivate,
  renderRow,
  className,
}: ComboboxProps<T>) {
  const [internalActive, setInternalActive] = useState<string | undefined>(activeKey);
  const currentActive = activeKey ?? internalActive;

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    const idx = results.findIndex((item) => getKey(item) === currentActive);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = results[Math.min(idx + 1, results.length - 1)];
      if (next) setInternalActive(getKey(next));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = results[Math.max(idx - 1, 0)];
      if (prev) setInternalActive(getKey(prev));
    } else if (event.key === 'Enter') {
      const target = results.find((item) => getKey(item) === currentActive);
      if (target) onActivate?.(target);
    }
  }

  return (
    <div className={cn('border border-ink bg-sheet', className)}>
      <div className="flex items-baseline gap-3 border-b border-ink px-[18px] py-3.5">
        {prefix ? (
          <span className="font-mono text-[11px] uppercase tracking-overline text-ink-3">
            {prefix}
          </span>
        ) : null}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-0 bg-transparent p-0 font-sans text-[16px] tracking-body text-ink outline-none placeholder:text-ink-4"
        />
        {hint ? (
          <span className="font-mono text-[10px] uppercase tracking-overline text-ink-3">
            {hint}
          </span>
        ) : null}
      </div>
      <div>
        {results.map((item) => {
          const key = getKey(item);
          const isActive = key === currentActive;
          return (
            <div
              key={key}
              onMouseEnter={() => setInternalActive(key)}
              onClick={() => onActivate?.(item)}
              className={cn(
                'cursor-pointer border-b border-dashed border-hair-soft last:border-b-0',
                isActive ? 'bg-paper' : 'hover:bg-paper-deep',
              )}
            >
              {renderRow(item, isActive)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
