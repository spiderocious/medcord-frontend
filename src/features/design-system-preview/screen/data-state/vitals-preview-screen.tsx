import { MarTable, type MarRow } from '@ui/mar-table';
import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';

const HOURS = ['00', '03', '06', '09', '12', '15', '18', '21'] as const;

const MAR_ROWS: MarRow[] = [
  {
    id: 'amox',
    drug: 'Amoxicillin 500 mg PO',
    cells: ['given', null, 'given', null, 'given', null, 'scheduled', null],
  },
  {
    id: 'lisin',
    drug: 'Lisinopril 10 mg PO',
    cells: [null, null, null, 'given', null, null, null, 'scheduled'],
  },
  {
    id: 'asa',
    drug: 'Aspirin 81 mg PO',
    cells: [null, null, null, 'given', null, null, null, null],
  },
  {
    id: 'morph',
    drug: 'Morphine 2 mg IV PRN',
    cells: [null, null, 'held', null, 'missed', null, 'refused', null],
  },
];

export function VitalsPreviewScreen() {
  return (
    <Page>
      <Stamp number="III · 03" title="Vitals · MAR" meta="time-on-paper specimens" />

      <SectionBreak label="MAR · Medication Administration Record" />
      <p className="m-0 mb-4 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        Drug names in italic serif on the left, hours across the top. Ticks are: filled dot for
        given, hollow dot for held, ink × for missed, warn slash for refused, muted dot for
        scheduled.
      </p>
      <MarTable hours={HOURS} rows={MAR_ROWS} />

      <SectionBreak label="Vitals strip" />
      <p className="m-0 max-w-[62ch] text-[13px] text-ink-3">
        The 24-hour multi-trace strip lives with the chart components in
        <span className="ml-1 font-mono">Part V · Charts</span>.
      </p>
    </Page>
  );
}
