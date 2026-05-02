import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Page` — the paper-with-margins wrapper used by every preview.
 * Reference: _foundation.css:170-174 (`.page`).
 */
export type PageProps = HTMLAttributes<HTMLDivElement>;

export function Page({ className, ...rest }: PageProps) {
  return <div className={cn('mx-auto max-w-[1180px] px-16 pb-24 pt-14', className)} {...rest} />;
}
