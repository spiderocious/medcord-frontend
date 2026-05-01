import { type HTMLAttributes, forwardRef } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Sheet` — a single piece of paper on the canvas. The only "card" idiom.
 * Reference: _foundation.css:179-186 (`.sheet`, `.sheet-tight/md/lg`).
 */
export interface SheetProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'tight' | 'md' | 'lg';
}

const PADDING: Record<NonNullable<SheetProps['padding']>, string> = {
  none: '',
  tight: 'px-[18px] py-[14px]',
  md: 'px-6 py-5',
  lg: 'px-8 py-7',
};

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(function Sheet(
  { padding = 'md', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('rounded-card border border-sheet-edge bg-sheet', PADDING[padding], className)}
      {...rest}
    />
  );
});
