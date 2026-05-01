import { Page } from '@ui/page';
import { Sheet } from '@ui/sheet';
import { Stamp } from '@ui/stamp';

interface ComingSoonProps {
  number: string;
  title: string;
  reference: string;
}

/**
 * Placeholder for preview screens that haven't been ported yet. Renders a
 * stamp with the eventual title plus the source reference path so the gap
 * is honest and traceable.
 */
export function ComingSoon({ number, title, reference }: ComingSoonProps) {
  return (
    <Page>
      <Stamp number={number} title={title} meta="not yet drawn" />
      <Sheet padding="md" className="max-w-[640px]">
        <p className="m-0 mb-2 font-serif text-[18px] italic leading-[1.45] text-ink-2">
          This specimen is still on the drafting table.
        </p>
        <p className="m-0 font-mono text-[11px] tracking-mono text-ink-3">
          Reference · <span className="text-ink">{reference}</span>
        </p>
      </Sheet>
    </Page>
  );
}
