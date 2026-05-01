import { Link } from 'react-router-dom';

import { Page } from '@ui/page';
import { Sheet } from '@ui/sheet';
import { Stamp } from '@ui/stamp';

import { PREVIEW_PARTS } from '../../types/preview-toc';

export function PrimitivesOverviewPreviewScreen() {
  const part = PREVIEW_PARTS.find((p) => p.id === 'II');
  if (!part) return null;
  return (
    <Page>
      <Stamp number="II" title="Primitives" meta="buttons · inputs · selection · datetime · specialized" />
      <Sheet padding="md" className="max-w-[640px]">
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {part.items.map((item) => (
            <li key={item.path}>
              <Link
                to={`/design-system/primitives/${item.path}`}
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
