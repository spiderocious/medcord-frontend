/**
 * Icon proxy. Always import icons via `@icons` (or `@ui/icons`) so we can swap
 * the underlying icon library in one place.
 *
 * Use `MedcordIcon` as the wrapper that enforces the surgical-paper stroke
 * discipline — Lucide's own `Icon` (a low-level builder that takes an
 * `iconNode`) passes through unchanged for the rare case it's needed.
 *
 * Usage:
 *   import { Activity, MedcordIcon } from '@icons';
 *   <MedcordIcon as={Activity} size="md" />
 */
export * from 'lucide-react';
export * from './clinical-glyphs';
export { MedcordIcon, type IconProps, type IconSize } from './icon';
