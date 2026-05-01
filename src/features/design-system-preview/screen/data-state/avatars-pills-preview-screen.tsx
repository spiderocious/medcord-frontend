import { Avatar } from '@ui/avatar';
import { LabFlag } from '@ui/lab-flag';
import { Page } from '@ui/page';
import { Pill, type PillTone } from '@ui/pill';
import { PulseDot } from '@ui/pulse-dot';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { VitalsReadout } from '@ui/vitals-readout';
import { Mark } from '@ui/typography';

/**
 * Data & state · Avatars · pills · status taxonomy
 * Reference: 26-avatars-pills.html.
 */
export function AvatarsPillsPreviewScreen() {
  return (
    <Page>
      <Stamp number="III · 07" title="Avatars · pills · status" meta="the small marks that sit on every page" />

      <SectionBreak label="Avatars" />
      <AvatarRow />

      <SectionBreak label="Status pills — the full tone taxonomy" />
      <PillRow />

      <SectionBreak label="Status pills — workflow taxonomy" />
      <WorkflowRow />

      <SectionBreak label="Lab flags" />
      <FlagRow />

      <SectionBreak label="PulseDot — live now" />
      <PulseRow />

      <SectionBreak label="VitalsReadout — three sizes" />
      <VitalsRow />
    </Page>
  );
}

function AvatarRow() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <Cell label="Patient · sm">
        <Avatar subject="patient" size="sm" initials="OA" />
      </Cell>
      <Cell label="Patient · md">
        <Avatar subject="patient" size="md" initials="OA" />
      </Cell>
      <Cell label="MD · md">
        <Avatar subject="md" size="md" initials="RP" />
      </Cell>
      <Cell label="RN · md">
        <Avatar subject="rn" size="md" initials="LK" />
      </Cell>
      <Cell label="Patient · lg">
        <Avatar subject="patient" size="lg" initials="OA" />
      </Cell>
      <Cell label="Patient · xl">
        <Avatar subject="patient" size="xl" initials="OA" />
      </Cell>
    </div>
  );
}

function PillRow() {
  const tones: ReadonlyArray<{ tone: PillTone; label: string }> = [
    { tone: 'neutral', label: 'Neutral' },
    { tone: 'ok', label: 'In room' },
    { tone: 'warn', label: 'Awaiting labs' },
    { tone: 'crit', label: 'Critical' },
    { tone: 'low', label: 'Awaiting discharge' },
    { tone: 'ink', label: 'Signed' },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {tones.map(({ tone, label }) => (
        <Pill key={tone} tone={tone}>
          {label}
        </Pill>
      ))}
    </div>
  );
}

function WorkflowRow() {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-3">
      {[
        { label: 'Scheduled', tone: 'low' },
        { label: 'Checked in', tone: 'ok' },
        { label: 'In triage', tone: 'warn' },
        { label: 'In room', tone: 'ok' },
        { label: 'With provider', tone: 'low' },
        { label: 'Awaiting labs', tone: 'warn' },
        { label: 'Awaiting discharge', tone: 'low' },
        { label: 'Discharged', tone: 'neutral' },
        { label: 'No show', tone: 'crit' },
        { label: 'Cancelled', tone: 'crit' },
        { label: 'Admitted', tone: 'ok' },
        { label: 'Transferred', tone: 'low' },
      ].map((status) => (
        <Pill key={status.label} tone={status.tone as PillTone}>
          {status.label}
        </Pill>
      ))}
    </div>
  );
}

function FlagRow() {
  return (
    <div className="flex flex-wrap gap-3">
      <LabFlag tone="high">H</LabFlag>
      <LabFlag tone="high">HH</LabFlag>
      <LabFlag tone="low">L</LabFlag>
      <LabFlag tone="low">LL</LabFlag>
      <LabFlag tone="critical">!!!</LabFlag>
    </div>
  );
}

function PulseRow() {
  return (
    <div className="inline-flex items-center gap-3 rounded-card border border-hair bg-sheet px-3 py-2">
      <PulseDot />
      <span className="font-mono text-[12px] tracking-mono text-ink-3">on now · until 19:00</span>
    </div>
  );
}

function VitalsRow() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <VitalsReadout size="sm" unit="bpm">
        76
      </VitalsReadout>
      <VitalsReadout size="md" unit="bpm">
        76
      </VitalsReadout>
      <VitalsReadout size="lg" unit="mmHg">
        128<span className="text-ink-3">/</span>82
      </VitalsReadout>
    </div>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <Mark>{label}</Mark>
    </div>
  );
}
