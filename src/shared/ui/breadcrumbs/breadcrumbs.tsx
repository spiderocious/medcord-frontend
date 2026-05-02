import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Breadcrumbs` — chart-stamp crumb trail. Mono caps, slash separator.
 * Reference: 29-navigation.html (top crumb).
 */
export interface BreadcrumbItem {
  label: ReactNode;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: ReadonlyArray<BreadcrumbItem>;
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        'flex items-baseline font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3',
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-baseline">
            <button
              type="button"
              onClick={item.onClick}
              disabled={!item.onClick || isLast}
              className={cn(
                'font-inherit cursor-pointer border-0 bg-transparent p-0 text-inherit',
                isLast ? 'text-ink' : 'hover:text-ink',
                !item.onClick && 'cursor-default',
              )}
            >
              {item.label}
            </button>
            {!isLast ? <span className="mx-2 text-ink-4">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
