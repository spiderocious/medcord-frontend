import { LineChart, type LineChartSeries } from '@ui/line-chart';
import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Sparkline } from '@ui/sparkline';
import { Stamp } from '@ui/stamp';
import { VitalsStrip } from '@ui/vitals-strip';

const HOURS24 = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'] as const;

const HR: ReadonlyArray<number> = [70, 72, 71, 68, 74, 78, 82, 84, 80, 76, 74, 72];
const RR: ReadonlyArray<number> = [14, 14, 16, 16, 18, 18, 20, 22, 18, 16, 16, 14];
const SPO2: ReadonlyArray<number> = [98, 98, 97, 97, 96, 96, 95, 94, 96, 97, 98, 98];
const TEMP: ReadonlyArray<number> = [
  98.4, 98.4, 98.6, 98.7, 99.0, 99.4, 100.1, 101.2, 100.4, 99.6, 99.0, 98.8,
];

const SERIES_VITALS: ReadonlyArray<LineChartSeries> = [
  { id: 'hr', values: HR, label: 'HR', tone: 'ink' },
  { id: 'rr', values: RR, label: 'RR', tone: 'low' },
  { id: 'spo2', values: SPO2, label: 'SpO₂', tone: 'green' },
  { id: 'temp', values: TEMP, label: 'Temp', tone: 'crit' },
];

export function ChartsPreviewScreen() {
  return (
    <Page>
      <Stamp number="III · 06" title="Charts" meta="printed, ink-only · no fills, no gradients" />

      <SectionBreak label="Vitals — last 24 hours" />
      <p className="m-0 mb-4 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        A 24h strip with four traces. The reference band marks the normal range for the y-axis (HR /
        SpO₂ / RR / Temp share the same plot for compactness).
      </p>
      <VitalsStrip
        series={SERIES_VITALS}
        hours={HOURS24}
        referenceBands={[{ from: 60, to: 100, tone: 'green' }]}
      />

      <SectionBreak label="Single-trace line chart" />
      <LineChart
        series={[
          { id: 'glu', values: [92, 94, 138, 156, 142, 110, 96, 88], label: 'Glu', tone: 'warn' },
        ]}
        xLabels={['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00']}
        height={180}
        referenceBands={[{ from: 70, to: 99, tone: 'green' }]}
      />

      <SectionBreak label="Sparklines, inline" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-serif text-[14px] tracking-h">Heart rate, last 8h</span>
          <Sparkline values={[72, 74, 76, 80, 82, 78, 76, 74]} caption="76 bpm" />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-serif text-[14px] tracking-h">Temp, last 8h</span>
          <Sparkline
            values={[98.4, 98.6, 99.0, 99.6, 100.4, 101.2, 100.1, 99.4]}
            tone="crit"
            caption="↑ peaked at 14:00"
          />
        </div>
      </div>
    </Page>
  );
}
