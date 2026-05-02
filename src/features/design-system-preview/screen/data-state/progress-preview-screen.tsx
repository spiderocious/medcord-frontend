import { Page } from '@ui/page';
import { ProgressBar, ProgressDrip, ProgressRing, ProgressStepper } from '@ui/progress';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';

export function ProgressPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="III · 04"
        title="Progress"
        meta="printed gauges · linear · ring · drip · stepper"
      />

      <SectionBreak label="Linear bars" />
      <div className="grid grid-cols-2 gap-6">
        <ProgressBar value={45} label="Discharge tasks" meta="2 / 4" />
        <ProgressBar value={92} label="Bed cleaning" meta="92%" tone="warn" />
        <ProgressBar value={100} label="Antibiotics infused" meta="complete" />
        <ProgressBar value={12} label="STAT — turnaround" meta="12 / 30 min" tone="crit" />
      </div>

      <SectionBreak label="Rings" />
      <div className="flex items-end gap-8">
        <ProgressRing value={62} label="62%" />
        <ProgressRing value={86} label="86%" size={84} />
        <ProgressRing value={32} label="32%" size={48} thickness={1.5} />
      </div>

      <SectionBreak label="Stepper" />
      <ProgressStepper
        steps={['Identity', 'Demographics', 'Insurance', 'Consent', 'Done']}
        current={2}
      />

      <SectionBreak label="IV drip" />
      <ProgressDrip remaining={420} total={1000} rate={120} />
    </Page>
  );
}
