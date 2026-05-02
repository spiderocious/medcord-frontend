import { type ComponentType, type SVGProps } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Icon` — wrapper that enforces the surgical-paper stroke discipline:
 * 1.5px stroke, currentColor, rounded line caps. Sizes pinned to the
 * design system: 16 (dense), 20 (standard), 24 (section), 32 (hero).
 *
 * Reference: 43-icons.html.
 *
 * Usage:
 *   import { Activity, Icon } from '@icons';
 *   <Icon as={Activity} size="md" />
 */
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconGlyphComponent = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }
>;

export interface IconProps {
  /** Lucide icon component or one of our clinical glyphs. */
  as: IconGlyphComponent;
  size?: IconSize;
  /** Override the stroke width. Defaults to 1.5. */
  strokeWidth?: number;
  className?: string;
  /** Optional aria-label for non-decorative use. */
  'aria-label'?: string;
}

const SIZE: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export function MedcordIcon({
  as: Component,
  size = 'md',
  strokeWidth = 1.5,
  className,
  ...rest
}: IconProps) {
  return (
    <Component
      size={SIZE[size]}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('inline-block flex-shrink-0', className)}
      {...rest}
    />
  );
}

export { MedcordIcon as Icon };
