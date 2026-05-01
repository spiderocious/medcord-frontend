import { Suspense } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Hair } from '@ui/hair';

import { PREVIEW_LEAVES, type FlatPreviewLeaf } from '../../types/preview-toc';

/**
 * `PreviewStage` — the right-hand pane: a chart-stamp crumb bar followed by
 * the active preview screen. Mirrors the `.stage` block in
 * `Medcord Design System / projects / medcord / index.html` (lines 103-142).
 */
export function PreviewStage() {
  const location = useLocation();
  const leaf = findLeaf(location.pathname);

  return (
    <main className="flex min-h-screen min-w-0 flex-1 flex-col bg-paper">
      <div className="flex flex-shrink-0 items-baseline gap-4 border-b border-ink bg-paper px-7 py-[18px]">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
          {leaf ? (
            <>
              <span>
                Part {leaf.partId} · {leaf.partTitle}
              </span>
              <span className="mx-2 text-ink-4">/</span>
              <span className="text-ink">{leaf.name}</span>
            </>
          ) : (
            <>
              <span>Design system</span>
              <span className="mx-2 text-ink-4">/</span>
              <span className="text-ink">Welcome</span>
            </>
          )}
        </div>
        <div className="flex-1" />
        <Link
          to="/"
          className="border-b border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3 no-underline hover:border-ink hover:text-ink"
        >
          ← Home
        </Link>
      </div>
      <Hair />
      <div className="flex-1 overflow-auto bg-paper-deep">
        <Suspense fallback={<StageFallback />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
}

function StageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center font-mono text-[11px] tracking-mono text-ink-3">
      Loading…
    </div>
  );
}

function findLeaf(pathname: string): FlatPreviewLeaf | undefined {
  return PREVIEW_LEAVES.find((leaf) => leaf.absPath === pathname);
}
