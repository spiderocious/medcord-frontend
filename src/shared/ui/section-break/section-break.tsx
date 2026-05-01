import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `SectionBreak` — a subdued mid-page rule with a mono caption inline.
 * Reference: _foundation.css:157-167 (`.break`, `.break .lbl`).
 */
export interface SectionBreakProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

export function SectionBreak({ label, className, ...rest }: SectionBreakProps) {
  return (
    <div className={cn('my-14 mb-6 flex items-center gap-4', className)} {...rest}>
      <span className="block h-px w-6 flex-shrink-0 bg-hair" />
      <span className="font-mono text-[11px] text-ink-3">{label}</span>
      <span className="block h-px flex-1 bg-hair" />
    </div>
  );
}
