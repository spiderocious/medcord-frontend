import { Card } from '@ui/card';
import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { Stamp } from '@ui/stamp';
import { Table, type TableColumn } from '@ui/table';
import { Mark, Overline, RecordNumber } from '@ui/typography';

interface AssetRow {
  id: string;
  name: string;
  serial: string;
  location: string;
  cal: string;
  state: 'ready' | 'cal-due' | 'down';
}

const ROWS: AssetRow[] = [
  {
    id: '1',
    name: 'IntelliVue MX450',
    serial: 'BIO-2389',
    location: '3-N · 312A',
    cal: '2026-09',
    state: 'ready',
  },
  {
    id: '2',
    name: 'Alaris pump',
    serial: 'BIO-2491',
    location: '3-N · 312B',
    cal: '2026-06',
    state: 'cal-due',
  },
  {
    id: '3',
    name: 'GE B40 monitor',
    serial: 'BIO-1734',
    location: 'Bay · OR-2',
    cal: '2027-02',
    state: 'ready',
  },
  {
    id: '4',
    name: 'Defib · LIFEPAK 15',
    serial: 'BIO-2612',
    location: 'Code cart · 3-N',
    cal: '2026-08',
    state: 'ready',
  },
  {
    id: '5',
    name: 'Vent · Hamilton C6',
    serial: 'BIO-2701',
    location: '4-N · 411A',
    cal: '—',
    state: 'down',
  },
];

export function EquipmentPreviewScreen() {
  const columns: TableColumn<AssetRow>[] = [
    { key: 'name', header: 'Asset', cell: (row) => <span className="text-ink">{row.name}</span> },
    { key: 'serial', header: 'Serial', mono: true, cell: (row) => row.serial, width: '120px' },
    {
      key: 'location',
      header: 'Location',
      mono: true,
      cell: (row) => row.location,
      width: '180px',
    },
    { key: 'cal', header: 'Cal due', mono: true, cell: (row) => row.cal, width: '120px' },
    {
      key: 'state',
      header: 'Status',
      width: '140px',
      cell: (row) => {
        if (row.state === 'down') return <Pill tone="crit">Down</Pill>;
        if (row.state === 'cal-due') return <Pill tone="warn">Cal due</Pill>;
        return <Pill tone="ok">Ready</Pill>;
      },
    },
  ];

  return (
    <Page>
      <Stamp number="IV · 05" title="Equipment · biomed log" meta="the property book" />
      <div className="grid grid-cols-[1fr_280px] gap-6">
        <Table columns={columns} rows={ROWS} getRowKey={(row) => row.id} />
        <Card
          eyebrow={<Mark>Asset · monitor</Mark>}
          title="IntelliVue MX450"
          subtitle="Philips · 312A · 3-N"
        >
          <RecordNumber>SER BIO-2389 · purchased 2024-01-12</RecordNumber>
          <div className="mt-2 grid grid-cols-2 gap-3 text-[12px]">
            <div>
              <Overline>Last cal</Overline>
              <div className="mt-0.5 font-mono text-[12px] tabular-nums text-ink">2026-03-12</div>
            </div>
            <div>
              <Overline>Next cal</Overline>
              <div className="mt-0.5 font-mono text-[12px] tabular-nums text-ink">2026-09</div>
            </div>
            <div>
              <Overline>PM cycle</Overline>
              <div className="mt-0.5 font-mono text-[12px] tabular-nums text-ink">12 mo</div>
            </div>
            <div>
              <Overline>Recall</Overline>
              <div className="mt-0.5 font-mono text-[12px] tabular-nums text-ink">none</div>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
}
