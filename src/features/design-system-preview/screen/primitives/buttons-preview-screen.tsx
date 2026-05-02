import { Avatar } from '@ui/avatar';
import { Button } from '@ui/button';
import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { SectionBreak } from '@ui/section-break';
import { SplitButton } from '@ui/split-button';
import { Stamp } from '@ui/stamp';
import { Toolbar } from '@ui/toolbar';
import { RecordNumber } from '@ui/typography';

/**
 * Primitives · Buttons
 * Reference: 10-buttons.html.
 */
export function ButtonsPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="II · 01"
        title="Buttons"
        meta="three weights · one irreversible · the rest is restraint"
      />
      <p className="m-0 mb-9 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        Three weights — primary, secondary, quiet. Plus a confirmed/just-saved skin and a quiet
        loading state. The irreversible &ldquo;hold to discharge&rdquo; button is intentionally
        deferred — its hold-to-confirm interaction will land in a later pass.
      </p>

      <Scene
        legend={{
          title: 'The footer',
          body: 'Quiet on the left for "save draft," secondary for "back," primary for the action that ends the task. Never two primaries.',
        }}
        title="Sign & submit"
        sub="Primary action, end of a chart-open task. Lives at the bottom-right of the sheet."
      >
        <ModalFoot>
          <Button variant="quiet">Save draft</Button>
          <span className="flex-1" />
          <Button variant="secondary">Discard</Button>
          <Button variant="primary">
            Sign &amp; submit
            <Glyph d="M5 12l5 5L20 7" />
          </Button>
        </ModalFoot>
      </Scene>

      <Scene
        legend={{
          title: 'The list-row',
          body: 'One quiet primary at the end. Secondary and below are kebab-revealed. Hover state on the row reveals the action — it is not always visible.',
        }}
        title="In a row"
        sub="Quiet buttons sit alongside content. They never compete with the row's primary content."
      >
        <InlineRow>
          <Avatar subject="patient" initials="OA" />
          <div>
            <div className="text-[14px] text-ink">Adebayo, Olumide</div>
            <RecordNumber>MRN 10458291 · 64 M · 312A</RecordNumber>
          </div>
          <Pill tone="ok">In room</Pill>
          <Button variant="quiet" size="sm">
            Open chart
            <Glyph d="M9 6l6 6-6 6" />
          </Button>
          <Button variant="quiet" size="sm" aria-label="More" className="px-2">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <circle cx="5" cy="12" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="19" cy="12" r="1.5" />
            </svg>
          </Button>
        </InlineRow>
      </Scene>

      <Scene
        legend={{
          title: 'The chart toolbar',
          body: 'Three groups separated by hairline rules: navigate, annotate, write. The active tool is filled. Nothing more.',
        }}
        title="In a toolbar"
        sub="Icon-only buttons on a single sheet. Tooltips carry the names; the icons carry the meaning."
      >
        <Toolbar>
          <Button variant="quiet" size="sm" className="px-2" aria-label="Back">
            <Glyph d="M15 18l-6-6 6-6" />
          </Button>
          <Button variant="quiet" size="sm" className="px-2" aria-label="Forward">
            <Glyph d="M9 18l6-6-6-6" />
          </Button>
          <Toolbar.Divider />
          <Button variant="quiet" size="sm" className="px-2" aria-label="Search">
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4-4" />
            </svg>
          </Button>
          <Button variant="quiet" size="sm" className="px-2" aria-label="Annotate">
            <Glyph d="M14 4l6 6-10 10H4v-6z" />
          </Button>
          <Button
            variant="quiet"
            size="sm"
            className="rounded-paper bg-ink px-2 text-paper hover:bg-ink"
            aria-label="Print"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
          </Button>
          <Toolbar.Divider />
          <Button variant="quiet" size="sm">
            New note
            <Glyph d="M12 5v14M5 12h14" />
          </Button>
          <Button variant="quiet" size="sm">
            Order
            <Glyph d="M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </Button>
        </Toolbar>
      </Scene>

      <Scene
        legend={{
          title: 'Sign & …',
          body: '"Sign & submit" is the default. The chevron offers "Sign & addendum," "Sign with co-signer," "Sign & print AVS."',
        }}
        title="Split — primary with related"
        sub="For an action that has near-twins. The arrow opens a small menu of co-authors of the same intent."
      >
        <SplitButton label="Sign & submit" />
      </Scene>

      <SectionBreak label="The four states, one row each" />
      <States />
    </Page>
  );
}

function Scene({
  legend,
  title,
  sub,
  children,
}: {
  legend: { title: string; body: string };
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-hair pb-8 pt-6 last:border-b-0">
      <div className="mb-4 flex items-baseline gap-4">
        <h3 className="m-0 font-serif text-[22px] font-medium tracking-h">{title}</h3>
        <p className="m-0 flex-1 text-[13px] text-ink-3">{sub}</p>
      </div>
      <div className="grid grid-cols-[220px_1fr] items-start gap-8">
        <div>
          <h4 className="m-0 mb-1.5 font-sans text-[13px] font-semibold tracking-[0.005em]">
            {legend.title}
          </h4>
          <p className="m-0 text-[12px] leading-[1.55] text-ink-3">{legend.body}</p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function ModalFoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-control border border-sheet-edge bg-sheet px-[18px] py-3.5">
      {children}
    </div>
  );
}

function InlineRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-3 rounded-control border border-sheet-edge bg-sheet px-[18px] py-3.5">
      {children}
    </div>
  );
}

function Glyph({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

function States() {
  return (
    <div className="grid grid-cols-[100px_1fr_1fr_1fr] items-center gap-2">
      <Cell head>primary</Cell>
      <Cell>
        <Button variant="primary">Sign</Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">default</span>
      </Cell>
      <Cell>
        <Button variant="primary" loading>
          Signing
        </Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">loading</span>
      </Cell>
      <Cell>
        <Button variant="primary" confirmed size="sm">
          Saved
          <Glyph d="M5 12l5 5L20 7" />
        </Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">just-saved</span>
      </Cell>

      <Cell head>secondary</Cell>
      <Cell>
        <Button variant="secondary">Cancel</Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">default</span>
      </Cell>
      <Cell>
        <Button variant="secondary" disabled>
          Cancel
        </Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">disabled</span>
      </Cell>
      <Cell>
        <Button variant="danger">Delete</Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">danger / quiet</span>
      </Cell>

      <Cell head>quiet</Cell>
      <Cell>
        <Button variant="quiet">Save draft</Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">default</span>
      </Cell>
      <Cell>
        <Button variant="quiet" size="sm">
          Compact
        </Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">sm</span>
      </Cell>
      <Cell>
        <Button variant="quiet" size="lg">
          Spacious
        </Button>
        <span className="ml-2 font-mono text-[10px] text-ink-3">lg</span>
      </Cell>
    </div>
  );
}

function Cell({ head, children }: { head?: boolean; children?: React.ReactNode }) {
  return (
    <div
      className={`py-1.5 font-mono text-[10px] tracking-mono ${
        head ? 'text-ink-3' : 'flex items-center'
      }`}
    >
      {children}
    </div>
  );
}
