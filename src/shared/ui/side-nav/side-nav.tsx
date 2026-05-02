import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `SideNav` — the spine of the binder, with mono-numbered tabs.
 * Reference: 29-navigation.html (left rail block).
 */
export interface SideNavItem {
  id: string;
  /** Mono prefix, e.g. `01`. */
  number?: string;
  label: string;
  /** href / route the consumer's `<Link>` will receive (rendered as a button here). */
  onClick?: () => void;
  meta?: ReactNode;
}

export interface SideNavGroup {
  id: string;
  /** Group heading, mono caps. */
  title: string;
  items: ReadonlyArray<SideNavItem>;
}

export interface SideNavProps {
  groups: ReadonlyArray<SideNavGroup>;
  activeId?: string;
  className?: string;
}

export function SideNav({ groups, activeId, className }: SideNavProps) {
  return (
    <nav
      className={cn(
        'flex h-full w-[240px] flex-shrink-0 flex-col gap-6 border-r border-ink bg-paper px-5 py-6',
        className,
      )}
    >
      {groups.map((group) => (
        <div key={group.id}>
          <div className="mb-1.5 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-overline text-ink-3">
            <span>{group.title}</span>
            <span className="ml-auto h-px flex-1 bg-hair" />
          </div>
          <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
            {group.items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={cn(
                      'flex w-full items-baseline gap-2.5 border-0 bg-transparent px-0 py-1 text-left font-sans text-[13px] text-ink-2 hover:text-ink',
                      isActive && 'font-medium text-ink',
                    )}
                  >
                    {item.number ? (
                      <span className="font-mono text-[10px] tracking-mono text-ink-3">
                        {item.number}
                      </span>
                    ) : null}
                    <span className="flex-1">{item.label}</span>
                    {item.meta ? (
                      <span className="font-mono text-[10px] tracking-mono text-ink-3">
                        {item.meta}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
