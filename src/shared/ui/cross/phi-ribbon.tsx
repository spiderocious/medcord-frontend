import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `PhiRibbon` — persistent strip warning that the surface contains protected
 * health information. Quiet but always present.
 * Reference: 42-cross.html (PHI / HIPAA ribbon).
 */
export interface PhiRibbonProps {
  /** Right-aligned actions slot. */
  actions?: ReactNode;
  /** Override the message. */
  message?: ReactNode;
  className?: string;
}

export function PhiRibbon({
  message = 'Protected health information — access is logged.',
  actions,
  className,
}: PhiRibbonProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-center gap-3 border-y border-low-edge bg-low-bg px-4 py-1.5 font-mono text-[10px] uppercase tracking-overline text-low',
        className,
      )}
    >
      <span className="font-semibold">PHI</span>
      <span className="flex-1">{message}</span>
      {actions}
    </div>
  );
}
