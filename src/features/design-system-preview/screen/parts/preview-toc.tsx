import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@shared/utils/cn';

import { PREVIEW_LEAVES, PREVIEW_PARTS, type FlatPreviewLeaf } from '../../types/preview-toc';

/**
 * `PreviewToc` — left-rail table of contents.
 *
 * Mirrors the source navigator at
 * `Medcord Design System / projects / medcord / index.html` (PARTS array,
 * lines 192-234, plus the search/keyboard handlers around lines 246-302).
 *
 * Behaviour:
 *  - Filter input narrows items by name (case-insensitive substring).
 *  - `/` from anywhere focuses the filter.
 *  - ↑ / ↓ inside the filter navigates between leaves; Enter activates.
 *  - Esc clears the filter.
 */
export function PreviewToc() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => filterLeaves(query), [query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function onFilterKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const items = filtered.flatMap((p) => p.items);
    const currentIndex = items.findIndex((leaf) => leaf.absPath === location.pathname);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = items[Math.min(currentIndex + 1, items.length - 1)];
      if (next) window.location.hash = '';
      if (next) navigateTo(next.absPath);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = items[Math.max(currentIndex - 1, 0)];
      if (prev) navigateTo(prev.absPath);
    } else if (event.key === 'Escape') {
      setQuery('');
    }
  }

  function navigateTo(path: string) {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  return (
    <aside className="flex h-screen w-[280px] flex-shrink-0 flex-col overflow-auto border-r border-ink bg-paper px-7 pb-5 pt-8">
      <div>
        <Link to="/design-system" className="block">
          <h1 className="m-0 font-serif text-[22px] font-medium leading-none tracking-display text-ink">
            Medcord
          </h1>
        </Link>
        <div className="mt-1.5 font-mono text-[11px] text-ink-3">
          A clinical record system · vol. 1 · surgical-paper
        </div>
      </div>

      <div className="mb-2 mt-[22px]">
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onFilterKeyDown}
          placeholder="SEARCH…"
          autoComplete="off"
          className="h-7 w-full border-0 border-b border-ink-3 bg-transparent px-0 pb-1 font-mono text-[12px] tracking-mono text-ink outline-none placeholder:text-[10px] placeholder:uppercase placeholder:tracking-[0.12em] placeholder:text-ink-4 focus:border-ink"
        />
      </div>

      <nav className="mt-2 flex-1 list-none p-0">
        {filtered.map((part) => (
          <div key={part.id} className={cn('mt-[22px]', part.id === 'I' && 'mt-2')}>
            <div className="mb-1 flex items-baseline gap-2 pb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
              <span className="text-ink">{part.id}</span>
              <span>{part.title}</span>
              <span className="ml-1 h-px flex-1 bg-hair" />
            </div>
            {part.items.map((leaf) => {
              const active = leaf.absPath === location.pathname;
              return (
                <Link
                  key={leaf.absPath}
                  to={leaf.absPath}
                  className={cn(
                    'flex items-baseline gap-2.5 py-1 font-sans text-[13px] leading-[1.45] text-ink-2 no-underline transition-colors duration-fast hover:text-ink',
                    active && 'font-medium text-ink',
                  )}
                >
                  <span
                    className={cn(
                      'block h-1 w-1 flex-shrink-0 -translate-y-[3px] rounded-full border border-ink-4 bg-transparent',
                      active && 'border-ink bg-ink',
                    )}
                  />
                  <span>{leaf.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="mt-6 border-t border-ink pt-[18px] font-mono text-[10px] uppercase leading-[1.7] tracking-[0.16em] text-ink-3">
        St. Catherine&rsquo;s General
        <br />
        Multi-tenant · v 0.2
      </div>
    </aside>
  );
}

interface FilteredPart {
  id: (typeof PREVIEW_PARTS)[number]['id'];
  title: (typeof PREVIEW_PARTS)[number]['title'];
  items: FlatPreviewLeaf[];
}

function filterLeaves(query: string): FilteredPart[] {
  const q = query.trim().toLowerCase();
  return PREVIEW_PARTS.map<FilteredPart>((part) => {
    const items = PREVIEW_LEAVES.filter(
      (leaf) => leaf.partId === part.id && (q === '' || leaf.name.toLowerCase().includes(q)),
    );
    return { id: part.id, title: part.title, items };
  }).filter((part) => part.items.length > 0);
}
