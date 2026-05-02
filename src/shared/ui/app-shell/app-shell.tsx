import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `AppShell` — the binder + letterhead arrangement. Top bar above, side rail
 * on the left, stage on the right.
 * Reference: 29-navigation.html (the whole shell composition).
 */
export interface AppShellProps {
  topBar: ReactNode;
  sideNav: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AppShell({ topBar, sideNav, children, className }: AppShellProps) {
  return (
    <div className={cn('flex h-screen flex-col bg-paper', className)}>
      {topBar}
      <div className="grid min-h-0 flex-1 grid-cols-[240px_1fr]">
        {sideNav}
        <main className="min-w-0 overflow-auto bg-paper-deep">{children}</main>
      </div>
    </div>
  );
}
