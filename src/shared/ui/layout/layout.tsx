import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * Layout primitives — the scaffolding used by every preview.
 *
 * - `Row`   · horizontal, gap, wrap by default        · _foundation.css:349.
 * - `Stack` · vertical, gap                            · _foundation.css:350.
 * - `Col`   · alias for Stack (named after `.col`).
 * - `Grid`  · 2 / 3 / 4 columns                        · _foundation.css:351-355.
 */

type DivProps = HTMLAttributes<HTMLDivElement>;

const GAP: Record<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'gutter', string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
  gutter: 'gap-gutter',
};

export interface RowProps extends DivProps {
  gap?: keyof typeof GAP;
  align?: 'start' | 'center' | 'baseline' | 'end' | 'stretch';
  wrap?: boolean;
}

const ALIGN: Record<NonNullable<RowProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  baseline: 'items-baseline',
  end: 'items-end',
  stretch: 'items-stretch',
};

export function Row({ gap = 'md', align = 'center', wrap = true, className, ...rest }: RowProps) {
  return (
    <div
      className={cn('flex', GAP[gap], ALIGN[align], wrap ? 'flex-wrap' : 'flex-nowrap', className)}
      {...rest}
    />
  );
}

export interface StackProps extends DivProps {
  gap?: keyof typeof GAP;
}

export function Stack({ gap = 'md', className, ...rest }: StackProps) {
  return <div className={cn('flex flex-col', GAP[gap], className)} {...rest} />;
}

export const Col = Stack;

export interface GridProps extends DivProps {
  cols?: 2 | 3 | 4 | 5 | 6 | 12;
  gap?: keyof typeof GAP;
}

const COLS: Record<NonNullable<GridProps['cols']>, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

export function Grid({ cols = 2, gap = 'lg', className, ...rest }: GridProps) {
  return <div className={cn('grid', COLS[cols], GAP[gap], className)} {...rest} />;
}
