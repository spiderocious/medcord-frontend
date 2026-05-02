import { useState } from 'react';

import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Table, type SortDirection, type TableColumn } from '@ui/table';

interface PatientRow {
  mrn: string;
  name: string;
  bed: string;
  attending: string;
  status: 'in-room' | 'awaiting-labs' | 'critical' | 'discharged';
}

const ROWS: PatientRow[] = [
  {
    mrn: '10458291',
    name: 'Adebayo, Olumide',
    bed: '3-N · 312A',
    attending: 'Patel, R MD',
    status: 'in-room',
  },
  {
    mrn: '10293874',
    name: 'Chen, Wei-Lin',
    bed: '3-N · 312B',
    attending: 'Patel, R MD',
    status: 'awaiting-labs',
  },
  {
    mrn: '10112237',
    name: 'Reyes, Maritza',
    bed: '4-N · 411A',
    attending: 'Ozawa, K MD',
    status: 'critical',
  },
  {
    mrn: '10097842',
    name: 'Singh, Ravi',
    bed: '4-N · 408B',
    attending: 'Ozawa, K MD',
    status: 'discharged',
  },
];

export function TablesPreviewScreen() {
  const [sort, setSort] = useState<{ key: string; direction: SortDirection } | undefined>(
    undefined,
  );
  const [selected, setSelected] = useState<string>('10458291');

  const columns: TableColumn<PatientRow>[] = [
    {
      key: 'name',
      header: 'Patient',
      sortable: true,
      cell: (row) => <span className="font-medium text-ink">{row.name}</span>,
    },
    {
      key: 'mrn',
      header: 'MRN',
      mono: true,
      sortable: true,
      cell: (row) => row.mrn,
      width: '120px',
    },
    { key: 'bed', header: 'Bed', mono: true, cell: (row) => row.bed, width: '160px' },
    { key: 'md', header: 'Attending', cell: (row) => row.attending, width: '180px' },
    {
      key: 'status',
      header: 'Status',
      width: '180px',
      cell: (row) => {
        const tone =
          row.status === 'critical'
            ? 'crit'
            : row.status === 'awaiting-labs'
              ? 'warn'
              : row.status === 'discharged'
                ? 'neutral'
                : 'ok';
        const label =
          row.status === 'critical'
            ? 'Critical'
            : row.status === 'awaiting-labs'
              ? 'Awaiting labs'
              : row.status === 'discharged'
                ? 'Discharged'
                : 'In room';
        return <Pill tone={tone}>{label}</Pill>;
      },
    },
  ];

  return (
    <Page>
      <Stamp
        number="III · 01"
        title="Tables"
        meta="typeset like a printed roster, not a spreadsheet"
      />
      <p className="m-0 mb-7 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        Header is a single line of mono-caps. Rows are hairline-separated. Sort indicator is a small
        triangle in mono. Selected rows are left-marked with a 2px ink rule, never a blue tinted
        fill. Critical rows show an arterial-red bleed at the leading edge.
      </p>

      <Table
        columns={columns}
        rows={ROWS}
        getRowKey={(row) => row.mrn}
        selectedKey={selected}
        onRowClick={(row) => setSelected(row.mrn)}
        isCritical={(row) => row.status === 'critical'}
        sort={sort}
        onSort={(key) =>
          setSort((prev) =>
            prev?.key === key
              ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
              : { key, direction: 'asc' },
          )
        }
      />

      <SectionBreak label="Compact density" />
      <Table columns={columns} rows={ROWS} getRowKey={(row) => row.mrn} density="compact" />

      <SectionBreak label="Comfortable density" />
      <Table columns={columns} rows={ROWS} getRowKey={(row) => row.mrn} density="comfortable" />
    </Page>
  );
}
