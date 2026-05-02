import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Skeleton` — paper-grain placeholder, calm. Mirrors the shape of the final
 * content; tone is muted because the page will arrive shortly.
 * Reference: 25-skeletons-empty.html (skeleton scenes).
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Width hint (CSS value). */
  w?: string;
  /** Height hint (CSS value). Default 12px. */
  h?: string;
  /** Render as a circle (avatar placeholder). */
  circle?: boolean;
}

export function Skeleton({
  w,
  h = '12px',
  circle = false,
  className,
  style,
  ...rest
}: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block bg-paper-deep',
        circle ? 'rounded-full' : 'rounded-paper',
        className,
      )}
      style={{ width: w, height: h, ...style }}
      {...rest}
    />
  );
}
