import { Avatar } from '@ui/avatar';
import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Mark, Overline, RecordNumber } from '@ui/typography';
import { VitalsReadout } from '@ui/vitals-readout';

export function CardsPreviewScreen() {
  return (
    <Page>
      <Stamp number="III · 08" title="Cards" meta="patient summary · staff profile · equipment" />

      <SectionBreak label="Patient summary" />
      <Card
        eyebrow={<Overline>Patient · admitted</Overline>}
        meta={<Mark>Bed 312A · 3-N</Mark>}
        title="Adebayo, Olumide"
        subtitle="64 M · DOB 1962-03-14 · attending Patel, R MD"
        footer={
          <div className="flex items-center justify-between py-3">
            <Pill tone="ok">In room</Pill>
            <Button variant="quiet" size="sm">
              Open chart
            </Button>
          </div>
        }
      >
        <RecordNumber>MRN 10458291 · ENC-2026-04-29-1184</RecordNumber>
        <div className="mt-3 flex gap-5">
          <div>
            <Overline>HR</Overline>
            <VitalsReadout size="sm" unit="bpm">
              76
            </VitalsReadout>
          </div>
          <div>
            <Overline>BP</Overline>
            <VitalsReadout size="sm">128/82</VitalsReadout>
          </div>
          <div>
            <Overline>SpO₂</Overline>
            <VitalsReadout size="sm" unit="%">
              98
            </VitalsReadout>
          </div>
        </div>
      </Card>

      <SectionBreak label="Staff profile" />
      <Card
        eyebrow={<Overline>Staff · on shift</Overline>}
        title="Patel, Riya MD"
        subtitle="Cardiology · attending · 3-N"
      >
        <div className="flex items-center gap-3">
          <Avatar subject="md" size="lg" initials="RP" />
          <div>
            <div className="text-[13px] text-ink">License IL-128492 · valid through 2027-08</div>
            <div className="text-[12px] text-ink-3">On call until 19:00 · pager 7281</div>
          </div>
        </div>
      </Card>

      <SectionBreak label="Equipment" />
      <Card
        eyebrow={<Overline>Asset · monitor</Overline>}
        meta={<Mark>BIO-2389</Mark>}
        title="Philips IntelliVue MX450"
        subtitle="3-N · room 312A · last cal 2026-03-12"
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="ok">Ready</Pill>
          <Pill tone="warn">Cal due 2026-09</Pill>
        </div>
      </Card>
    </Page>
  );
}
