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
  // Foundation, primitives, etc. land here as they ship.
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
