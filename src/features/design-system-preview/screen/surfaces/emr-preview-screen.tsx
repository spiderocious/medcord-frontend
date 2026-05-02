import { Avatar } from '@ui/avatar';
import { ActivityLog } from '@ui/cross';
import { Page } from '@ui/page';
import { PatientBanner } from '@ui/patient-banner';
import { Sheet } from '@ui/sheet';
import { Stamp } from '@ui/stamp';
import { DictatedText, Overline, RecordNumber } from '@ui/typography';
import { VitalsReadout } from '@ui/vitals-readout';

const TABS = [
  { label: 'Summary', num: '01' },
  { label: 'Vitals', num: '02' },
  { label: 'Medications', num: '03' },
  { label: 'Labs', num: '04' },
  { label: 'Imaging', num: '05' },
  { label: 'Procedures', num: '06' },
  { label: 'Notes', num: '07' },
  { label: 'Documents', num: '08' },
  { label: 'Audit', num: '09' },
] as const;

export function EmrPreviewScreen() {
  return (
    <Page>
      <Stamp number="IV · 03" title="EMR · chart open" meta="the chart is the chart" />
      <PatientBanner
        name="Adebayo, Olumide"
        identity="64 M · DOB 1962-03-14"
        records="MRN 10458291 · ENC-2026-04-29-1184"
        attending="Patel, R MD"
        bed="3-N · 312A"
        complaint="Pressure is gone now. Walked the unit twice without symptoms. Would like to know when he can go home."
        allergyBands={[{ tone: 'allergy', label: 'Penicillin', reaction: 'anaphylaxis' }]}
        codeStatus="full"
      />
      <div className="mt-6 grid grid-cols-[180px_1fr_240px] gap-6">
        <aside>
          <Overline>Sections</Overline>
          <ul className="m-0 mt-2 flex list-none flex-col p-0">
            {TABS.map((tab, index) => (
              <li
                key={tab.label}
                className={`flex cursor-pointer items-baseline gap-2.5 border-b border-hair-soft py-2 last:border-b-0 ${
                  index === 0 ? 'font-medium text-ink' : 'text-ink-2 hover:text-ink'
                }`}
              >
                <span className="font-mono text-[10px] tracking-mono text-ink-3">{tab.num}</span>
                <span className="text-[13px]">{tab.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <Sheet padding="lg">
          <Overline>Progress note · 14:08</Overline>
          <h3 className="m-0 mt-2 font-serif text-[22px] font-medium tracking-h">
            f/u for chest pressure
          </h3>
          <RecordNumber className="mt-1 block">
            authored by Park, J PGY-2 · co-signed by Patel, R MD
          </RecordNumber>
          <DictatedText className="mt-4">
            &ldquo;Pressure is gone now. Walked the unit twice without symptoms. He&rsquo;d like to
            know when he can go home.&rdquo;
          </DictatedText>
          <p className="m-0 mt-4 leading-[1.55] text-ink-2">
            Vitals stable. Repeat troponin pending. ECG unchanged from prior. Plan to discharge
            after the 6h trop, with follow-up in cardiology clinic.
          </p>
          <div className="mt-5 flex gap-6 border-t border-hair pt-4">
            <Reading label="HR" value="76" unit="bpm" />
            <Reading label="BP" value="128/82" />
            <Reading label="SpO₂" value="98" unit="%" />
            <Reading label="Temp" value="98.6" unit="°F" />
          </div>
        </Sheet>

        <aside>
          <Overline>Audit margin</Overline>
          <div className="mt-3">
            <ActivityLog
              entries={[
                {
                  id: '1',
                  when: '14:42',
                  avatar: <Avatar subject="md" size="sm" initials="RP" />,
                  title: 'Patel, R MD acknowledged note.',
                },
                {
                  id: '2',
                  when: '14:08',
                  avatar: <Avatar subject="rn" size="sm" initials="LK" />,
                  title: 'Kim, S NP placed lab order.',
                },
                {
                  id: '3',
                  when: '13:30',
                  avatar: <Avatar subject="patient" size="sm" initials="OA" />,
                  title: 'Patient moved to 3-N · 312A.',
                },
              ]}
            />
          </div>
        </aside>
      </div>
    </Page>
  );
}

function Reading({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <Overline>{label}</Overline>
      <VitalsReadout size="sm" unit={unit}>
        {value}
      </VitalsReadout>
    </div>
  );
}
