import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Hair` — a 1px hairline rule.
 * `HairSoft` — even quieter divider.
 * Reference: _foundation.css:189-190 (`hr.hair`, `hr.hair-soft`).
 */
export type HairProps = HTMLAttributes<HTMLHRElement>;

export function Hair({ className, ...rest }: HairProps) {
  return <hr className={cn('m-0 border-0 border-t border-hair', className)} {...rest} />;
}

export function HairSoft({ className, ...rest }: HairProps) {
  return <hr className={cn('m-0 border-0 border-t border-hair-soft', className)} {...rest} />;
}
