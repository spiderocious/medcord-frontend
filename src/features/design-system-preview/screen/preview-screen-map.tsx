import { type ComponentType, lazy } from 'react';

import { PREVIEW_LEAVES, type FlatPreviewLeaf } from '../types/preview-toc';

import { ComingSoon } from './parts/coming-soon';

/**
 * Map of preview leaves to their React screen component. Leaves without a
 * dedicated screen yet fall back to `<ComingSoon />` with the leaf's
 * source reference, keeping every TOC link clickable.
 *
 * To add a real preview, drop a file at
 *   `screen/<part-path>/<leaf-path>-preview-screen.tsx`
 * and add an entry below.
 */
type LeafKey = `${FlatPreviewLeaf['partPath']}/${string}` | FlatPreviewLeaf['partPath'];

const realScreens: Partial<Record<LeafKey, ComponentType>> = {
  foundation: registerLazyScreen(() =>
    import('./foundation/foundation-overview-preview-screen').then((module) => ({
      default: module.FoundationOverviewPreviewScreen,
    })),
  ),
  'foundation/palette': registerLazyScreen(() =>
    import('./foundation/palette-preview-screen').then((module) => ({
      default: module.PalettePreviewScreen,
    })),
  ),
  'foundation/type': registerLazyScreen(() =>
    import('./foundation/type-preview-screen').then((module) => ({
      default: module.TypePreviewScreen,
    })),
  ),
  'foundation/geometry': registerLazyScreen(() =>
    import('./foundation/geometry-preview-screen').then((module) => ({
      default: module.GeometryPreviewScreen,
    })),
  ),
  'foundation/motion': registerLazyScreen(() =>
    import('./foundation/motion-preview-screen').then((module) => ({
      default: module.MotionPreviewScreen,
    })),
  ),

  primitives: registerLazyScreen(() =>
    import('./primitives/primitives-overview-preview-screen').then((module) => ({
      default: module.PrimitivesOverviewPreviewScreen,
    })),
  ),
  'primitives/buttons': registerLazyScreen(() =>
    import('./primitives/buttons-preview-screen').then((module) => ({
      default: module.ButtonsPreviewScreen,
    })),
  ),
  'primitives/inputs': registerLazyScreen(() =>
    import('./primitives/inputs-preview-screen').then((module) => ({
      default: module.InputsPreviewScreen,
    })),
  ),
  'primitives/selection': registerLazyScreen(() =>
    import('./primitives/selection-preview-screen').then((module) => ({
      default: module.SelectionPreviewScreen,
    })),
  ),
  'primitives/datetime': registerLazyScreen(() =>
    import('./primitives/datetime-preview-screen').then((module) => ({
      default: module.DatetimePreviewScreen,
    })),
  ),
  'primitives/specialized': registerLazyScreen(() =>
    import('./primitives/specialized-preview-screen').then((module) => ({
      default: module.SpecializedPreviewScreen,
    })),
  ),

  'data-state/avatars-pills': registerLazyScreen(() =>
    import('./data-state/avatars-pills-preview-screen').then((module) => ({
      default: module.AvatarsPillsPreviewScreen,
    })),
  ),
};

function partLandingNumber(leaf: FlatPreviewLeaf): string {
  return `${leaf.partId} · 00`;
}

function leafNumber(leaf: FlatPreviewLeaf): string {
  const indexInPart = PREVIEW_LEAVES.filter((l) => l.partId === leaf.partId).indexOf(leaf);
  return `${leaf.partId} · ${String(indexInPart).padStart(2, '0')}`;
}

export function getScreenForLeaf(leaf: FlatPreviewLeaf): ComponentType {
  const key = (leaf.path ? `${leaf.partPath}/${leaf.path}` : leaf.partPath) as LeafKey;
  const real = realScreens[key];
  if (real) return real;
  const number = leaf.path ? leafNumber(leaf) : partLandingNumber(leaf);
  return function FallbackScreen() {
    return <ComingSoon number={number} title={leaf.name} reference={leaf.reference} />;
  };
}

/**
 * Convenience: register a real screen lazily, used by `realScreens` entries.
 * Keeps the route file diff-clean as more screens come online.
 */
export function registerLazyScreen(loader: () => Promise<{ default: ComponentType }>): ComponentType {
  return lazy(loader);
}
