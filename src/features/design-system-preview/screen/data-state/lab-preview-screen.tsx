import { LabResultsTable, type LabResultRow } from '@ui/lab-results-table';
import { Page } from '@ui/page';
import { Stamp } from '@ui/stamp';

const ROWS: LabResultRow[] = [
  { id: 'na', code: 'NA', name: 'Sodium', value: '138', unit: 'mEq/L', refLow: 135, refHigh: 145, position: 0.4 },
  { id: 'k', code: 'K', name: 'Potassium', value: '4.1', unit: 'mEq/L', refLow: 3.5, refHigh: 5.0, position: 0.5 },
  {
    id: 'glu',
    code: 'GLU',
    name: 'Glucose, fasting',
    value: '92',
    unit: 'mg/dL',
    refLow: 70,
    refHigh: 99,
    position: 0.6,
  },
  {
    id: 'trop',
    code: 'TROP-I',
    name: 'Troponin I',
    value: '2.10',
    unit: 'ng/mL',
    refLow: 0,
    refHigh: 0.04,
    position: 0.96,
    flag: 'critical',
    comment: 'Three-fold above prior. Cardiology paged at 14:42.',
  },
  {
    id: 'wbc',
    code: 'WBC',
    name: 'White blood cells',
    value: '11.4',
    unit: 'k/µL',
    refLow: 4.5,
    refHigh: 11,
    position: 0.84,
    flag: 'high',
  },
  {
    id: 'hgb',
    code: 'HGB',
    name: 'Hemoglobin',
    value: '11.8',
    unit: 'g/dL',
    refLow: 13.5,
    refHigh: 17.5,
    position: 0.18,
    flag: 'low',
  },
];

export function LabPreviewScreen() {
  return (
    <Page>
      <Stamp number="III · 02" title="Lab specimen" meta="each row treated as typeset, not tabular" />
      <LabResultsTable rows={ROWS} />
    </Page>
  );
}
