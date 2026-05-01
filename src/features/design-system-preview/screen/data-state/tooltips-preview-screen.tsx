import { Avatar } from '@ui/avatar';
import { Button } from '@ui/button';
import { HoverCard } from '@ui/hover-card';
import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { Popover } from '@ui/popover';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Tooltip } from '@ui/tooltip';
import { Mark, Overline, RecordNumber } from '@ui/typography';

export function TooltipsPreviewScreen() {
  return (
    <Page>
      <Stamp number="III · 09" title="Tooltips · hovercards" meta="small surfaces that float above the page" />

      <SectionBreak label="Tooltip" />
      <div className="flex items-center gap-6">
        <Tooltip label="Print · ⌘P">
          <Button variant="quiet">Print</Button>
        </Tooltip>
        <Tooltip label="Sign · ⌘↵">
          <Button variant="primary">Sign</Button>
        </Tooltip>
      </div>

      <SectionBreak label="Popover" />
      <Popover
        trigger={({ toggle }) => (
          <Button variant="secondary" onClick={toggle}>
            Filters
          </Button>
        )}
      >
        <div className="flex flex-col gap-2">
          <Overline>Filters</Overline>
          <label className="flex items-center justify-between gap-3 text-[13px]">
            STAT only <input type="checkbox" />
          </label>
          <label className="flex items-center justify-between gap-3 text-[13px]">
            My patients only <input type="checkbox" />
          </label>
        </div>
      </Popover>

      <SectionBreak label="HoverCard — patient" />
      <HoverCard
        trigger={
          <a className="cursor-pointer underline-offset-2 hover:underline" href="#">
            Adebayo, Olumide
          </a>
        }
      >
        <div className="flex items-center gap-3">
          <Avatar subject="patient" size="md" initials="OA" />
          <div>
            <div className="font-serif text-[16px] font-medium tracking-h">Adebayo, Olumide</div>
            <RecordNumber>MRN 10458291 · 64 M</RecordNumber>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill tone="crit">Penicillin</Pill>
          <Pill tone="ok">Full code</Pill>
          <Pill tone="warn">Falls risk</Pill>
        </div>
        <Mark className="mt-3 block">Last seen 14:08 by Patel, R MD</Mark>
      </HoverCard>
    </Page>
  );
}
