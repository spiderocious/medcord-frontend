import { type HTMLAttributes } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Avatar` — initials avatar with sober role tints.
 * Reference: _foundation.css:313-331.
 *
 * - `subject='patient'` → round, paper-tinted (`av-pat`).
 * - `subject='md'`      → round, leaf-tinted  (`av-md-md`).
 * - `subject='rn'`      → round, sage-tinted  (`av-rn-rn`).
 * - `subject='neutral'` → round, paper-deep   (default).
 */
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarSubject = 'neutral' | 'patient' | 'md' | 'rn';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  subject?: AvatarSubject;
  /** Initials, max 3 chars. */
  initials: string;
}

const SIZE: Record<AvatarSize, string> = {
  sm: 'h-[22px] w-[22px] text-[9px]',
  md: 'h-8 w-8 text-[11px]',
  lg: 'h-12 w-12 text-[16px]',
  xl: 'h-20 w-20 text-[22px]',
};

const SUBJECT: Record<AvatarSubject, string> = {
  neutral: 'bg-paper-deep text-ink-2 border-sheet-edge',
  patient: 'bg-[#ECE3D6] text-[#5C4B30] border-[#D4C4A6]',
  md: 'bg-[#E1E8DD] text-[#2F4226] border-[#C4D2BC]',
  rn: 'bg-[#DDE3D4] text-[#495939] border-[#C2CCB4]',
};

export function Avatar({
  size = 'md',
  subject = 'neutral',
  initials,
  className,
  ...rest
}: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex flex-shrink-0 select-none items-center justify-center rounded-full border font-sans font-semibold tracking-[0.02em]',
        SIZE[size],
        SUBJECT[subject],
        className,
      )}
      {...rest}
    >
      {initials}
    </span>
  );
}
