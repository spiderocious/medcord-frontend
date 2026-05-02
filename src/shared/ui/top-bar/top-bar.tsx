import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `TopBar` — the printed letterhead at the top of the AppShell.
 * Reference: 29-navigation.html (top-bar block).
 */
export interface TopBarProps {
  hospital: string;
  /** Subtitle / tenant tagline. */
  subtitle?: string;
  /** Right-aligned actions slot (e.g. command-palette trigger, profile). */
  actions?: ReactNode;
  className?: string;
}

export function TopBar({ hospital, subtitle, actions, className }: TopBarProps) {
  return (
    <header
      className={cn(
        'flex items-baseline gap-4 border-b border-ink bg-paper px-6 py-3.5',
        className,
      )}
    >
      <div>
        <div className="font-serif text-[18px] font-medium tracking-display text-ink">
          {hospital}
        </div>
        {subtitle ? (
          <div className="font-mono text-[10px] uppercase tracking-overline text-ink-3">
            {subtitle}
          </div>
        ) : null}
      </div>
      <div className="flex-1" />
      {actions}
    </header>
  );
}
