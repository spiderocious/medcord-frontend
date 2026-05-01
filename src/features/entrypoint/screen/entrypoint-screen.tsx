import { Link } from 'react-router-dom';

import { ROUTES } from '@shared/constants/routes';
import { ArrowRight } from '@icons';

export function EntrypointScreen() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <div className="inline-flex items-center gap-3 rounded-pill border border-hair bg-sheet px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
        Medcord · scaffold online
      </div>
      <h1 className="m-0 font-serif text-[64px] font-medium leading-[1] tracking-display text-ink">
        Caelum
      </h1>
      <p className="max-w-xl text-[15px] leading-[1.6] text-ink-2">
        The hospital management workspace. The design system is the working draft of every
        component before it ships into a feature.
      </p>
      <Link
        to={ROUTES.DESIGN_SYSTEM.absPath}
        className="inline-flex h-10 items-center gap-2 rounded-control border border-ink bg-ink px-5 font-sans text-[13px] font-medium tracking-[0.005em] text-paper transition-colors duration-fast ease-paper-out hover:bg-ink-2 hover:border-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700/40"
      >
        Open the design system
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </main>
  );
}
