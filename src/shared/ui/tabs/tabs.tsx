import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Tabs` — printed tab row, hairline rule beneath. Active tab is ink-bold
 * with a 2px ink underline.
 * Reference: 29-navigation.html (tabs block).
 */
export interface TabItem {
  id: string;
  label: ReactNode;
  /** Right-aligned counter or marker. */
  meta?: ReactNode;
}

export interface TabsProps {
  items: ReadonlyArray<TabItem>;
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeId, onChange, className }: TabsProps) {
  return (
    <div role="tablist" className={cn('flex items-end gap-6 border-b border-hair', className)}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative -mb-px flex cursor-pointer items-baseline gap-2 border-0 bg-transparent px-0 pb-2.5 pt-2 font-sans text-[13px] text-ink-2 hover:text-ink',
              isActive && 'font-medium text-ink',
            )}
          >
            {item.label}
            {item.meta ? (
              <span className="font-mono text-[10px] tracking-mono text-ink-3">{item.meta}</span>
            ) : null}
            {isActive ? (
              <span aria-hidden className="absolute bottom-0 left-0 right-0 h-[2px] bg-ink" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
