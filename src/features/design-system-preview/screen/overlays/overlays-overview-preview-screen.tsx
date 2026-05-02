import { Link } from 'react-router-dom';

import { Page } from '@ui/page';
import { Sheet } from '@ui/sheet';
import { Stamp } from '@ui/stamp';

import { PREVIEW_PARTS } from '../../types/preview-toc';

export function OverlaysOverviewPreviewScreen() {
  const part = PREVIEW_PARTS.find((p) => p.id === 'V');
  if (!part) return null;
  return (
    <Page>
      <Stamp number="V" title="Overlays & system" meta="modals · feedback · cross · icons" />
      <Sheet padding="md" className="max-w-[640px]">
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {part.items.map((item) => (
            <li key={item.path}>
              <Link
                to={`/design-system/overlays/${item.path}`}
                className="flex items-baseline gap-3 border-b border-hair pb-3 no-underline last:border-b-0"
              >
                <span className="font-serif text-[20px] font-medium tracking-h text-ink">
                  {item.name}
                </span>
                <span className="ml-auto font-mono text-[11px] text-ink-3">{item.reference}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Sheet>
    </Page>
  );
}
