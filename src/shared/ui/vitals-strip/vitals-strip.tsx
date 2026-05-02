import { LineChart, type LineChartReferenceBand, type LineChartSeries } from '../line-chart';

/**
 * `VitalsStrip` — long horizontal multi-trace strip; the time-on-paper
 * specimen for vitals over the last N hours.
 * Reference: 22-vitals.html (vitals 24h section) + 23-charts.html.
 *
 * It's a thin wrapper around `LineChart` with a wider aspect.
 */
export interface VitalsStripProps {
  series: ReadonlyArray<LineChartSeries>;
  hours: ReadonlyArray<string>;
  referenceBands?: ReadonlyArray<LineChartReferenceBand>;
  height?: number;
  className?: string;
}

export function VitalsStrip({
  series,
  hours,
  referenceBands,
  height = 200,
  className,
}: VitalsStripProps) {
  return (
    <LineChart
      series={series}
      xLabels={hours}
      referenceBands={referenceBands}
      height={height}
      width={1200}
      className={className}
    />
  );
}
