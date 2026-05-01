import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Toolbar` — a row of icon-only buttons separated by hairline dividers.
 * Reference: 10-buttons.html:99-106, 240-268.
 *
 * Use `<Toolbar.Divider />` between groups.
 */
export type ToolbarProps = HTMLAttributes<HTMLDivElement>;

export function Toolbar({ className, ...rest }: ToolbarProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-soft border border-sheet-edge bg-sheet p-1.5',
        className,
      )}
      {...rest}
    />
  );
}

function ToolbarDivider() {
  return <span aria-hidden className="mx-1.5 block h-[18px] w-px bg-hair" />;
}

Toolbar.Divider = ToolbarDivider;
