import { type ReactNode, useEffect, useState } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `CommandPalette` — the search slip you pull out of the file. ⌘K opens it.
 * Reference: 29-navigation.html (command palette block).
 *
 * Visual-only / lightweight: the consumer owns the data and renders rows via
 * `renderRow`. We provide the keyboard model and the chrome.
 */
export interface CommandPaletteItem {
  id: string;
  /** Mono group label shown above the row group. */
  group?: string;
  label: string;
  /** Right-aligned mono shortcut hint. */
  shortcut?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: ReadonlyArray<CommandPaletteItem>;
  /** Optional placeholder. */
  placeholder?: string;
  /** Optional empty state. */
  empty?: ReactNode;
  /** ⌘K, /, Esc, ↑↓, ↵ are wired internally. */
}

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = 'Search patients, staff, orders, rooms…',
  empty = 'Nothing matches.',
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => Math.min(filtered.length - 1, prev + 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const target = filtered[activeIndex];
        if (target) {
          target.onSelect?.();
          onClose();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, filtered, activeIndex, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      className="z-modal bg-ink/40 fixed inset-0 flex items-start justify-center px-4 pt-[12vh]"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[640px] rounded-modal border border-ink bg-sheet shadow-[0_24px_64px_rgba(24,22,19,0.18)]">
        <div className="flex items-baseline gap-3 border-b border-ink px-5 py-4">
          <span className="font-mono text-[11px] uppercase tracking-overline text-ink-3">
            Command
          </span>
          <input
            value={query}
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent p-0 font-sans text-[16px] tracking-body text-ink outline-none placeholder:text-ink-4"
          />
          <span className="font-mono text-[10px] uppercase tracking-overline text-ink-3">
            Esc to close
          </span>
        </div>
        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center font-serif text-[16px] italic text-ink-3">
            {empty}
          </div>
        ) : (
          <ul className="m-0 max-h-[60vh] list-none overflow-auto p-0">
            {filtered.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      item.onSelect?.();
                      onClose();
                    }}
                    className={cn(
                      'flex w-full cursor-pointer items-baseline gap-3 border-0 bg-transparent px-5 py-2.5 text-left',
                      isActive && 'bg-paper-deep',
                    )}
                  >
                    {item.group ? (
                      <span className="w-20 font-mono text-[10px] uppercase tracking-overline text-ink-3">
                        {item.group}
                      </span>
                    ) : null}
                    <span className="flex-1 font-serif text-[15px] text-ink">{item.label}</span>
                    {item.shortcut ? (
                      <span className="font-mono text-[10px] uppercase tracking-overline text-ink-3">
                        {item.shortcut}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
