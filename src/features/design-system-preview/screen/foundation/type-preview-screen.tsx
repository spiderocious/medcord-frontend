import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Sheet } from '@ui/sheet';
import { Stamp } from '@ui/stamp';
import { DictatedText, Mark, Overline, RecordNumber } from '@ui/typography';

import { Fragment } from 'react';

/**
 * Foundation · Type
 * Reference: Medcord Design System / preview / 02-type.html.
 */
export function TypePreviewScreen() {
  return (
    <Page>
      <Stamp
        number="I · 02"
        title="Type"
        meta="three families · one for thinking, one for chrome, one for record"
      />

      <Families />

      <Specimen
        label="Display"
        meta="Newsreader 500 · 48 / 1.0\ntracking −0.025em"
        sample={
          <span className="font-serif text-[48px] font-medium leading-[1] tracking-[-0.025em]">
            Adebayo, Olumide
          </span>
        }
      />
      <Specimen
        label="Section"
        meta="Newsreader 500 · 28 / 1.05\ntracking −0.022em"
        sample={
          <span className="font-serif text-[28px] font-medium leading-[1.05] tracking-[-0.022em]">
            Active problems &amp; current medications
          </span>
        }
      />
      <Specimen
        label="Subhead"
        meta="Newsreader 500 · 19 / 1.2\ntracking −0.012em"
        sample={
          <span className="font-serif text-[19px] font-medium leading-[1.2] tracking-h">
            Cardiology consult · 14:08, May 1, 2026
          </span>
        }
      />
      <Specimen
        label="Dictated"
        meta="Newsreader 400 italic · 16 / 1.45\ntracking 0"
        sample={
          <span className="font-serif text-[16px] font-normal italic leading-[1.45]">
            &ldquo;Crushing chest pressure × 30 min, sweating, nausea. Last meal at four in the
            morning. Patient is anxious but cooperative.&rdquo;
          </span>
        }
      />
      <Specimen
        label="Body"
        meta="Inter 400 · 14 / 1.55\ntracking 0"
        sample={
          <span className="block max-w-[60ch] text-[14px] leading-[1.55]">
            Plan to admit overnight to step-down for serial troponins and cardiology evaluation.
            NPO until cath team has cleared the patient. Spouse has been notified and will arrive
            within the hour.
          </span>
        }
      />
      <Specimen
        label="Body — small"
        meta="Inter 400 · 13 / 1.5\ntracking 0"
        sample={
          <span className="block max-w-[60ch] text-[13px] leading-[1.5] text-ink-2">
            Adjust filters to widen the view, or add patients to your team&rsquo;s worklist from
            the floor map.
          </span>
        }
      />
      <Specimen
        label="Label"
        meta="Inter 600 · 13\ntracking +0.01em"
        sample={
          <span className="text-[13px] font-semibold tracking-label">Date of birth</span>
        }
      />
      <Specimen label="Overline" meta="Inter 600 · 11 · uppercase\ntracking +0.18em" sample={<Overline>Vitals · last 24 hours</Overline>} />
      <Specimen label="Mark" meta="Mono 500 · 10 · uppercase\ntracking +0.14em" sample={<Mark>MRN · ENC · ICD-10</Mark>} />
      <Specimen
        label="Record"
        meta="Mono 500 · 12\ntabular nums on"
        sample={<RecordNumber>MRN 10458291 · ENC-2026-04-29-1184 · 04/30 14:08</RecordNumber>}
      />
      <Specimen
        label="Reading — large"
        meta="Mono 500 · 40 / 0.95\ntracking −0.02em · for vitals"
        sample={
          <span className="font-mono text-[40px] font-medium leading-[0.95] tabular-nums tracking-[-0.02em]">
            128<span className="text-ink-3">/</span>82
            <span className="ml-1 font-sans text-[16px] tracking-wide text-ink-3">mmHg</span>
          </span>
        }
      />
      <Specimen
        label="Reading — medium"
        meta="Mono 500 · 28"
        sample={
          <span className="font-mono text-[28px] font-medium leading-[0.95] tabular-nums tracking-[-0.02em]">
            76<span className="ml-1 font-sans text-[12px] text-ink-3">bpm</span>
          </span>
        }
      />

      <SectionBreak label="Tracking, applied" />
      <Tracking />

      <SectionBreak label="All three, in one paragraph" />
      <ComposedSheet />
    </Page>
  );
}

function Families() {
  return (
    <div className="mb-12 grid grid-cols-3 border-y border-ink">
      {[
        {
          face: 'serif' as const,
          name: 'Newsreader',
          role: 'Serif · for thinking',
          sub: 'display, dictation, chief complaint',
        },
        {
          face: 'sans' as const,
          name: 'Inter',
          role: 'Sans · for chrome',
          sub: 'labels, body, navigation',
        },
        {
          face: 'mono' as const,
          name: 'JetBrains Mono',
          role: 'Mono · for record',
          sub: 'MRN, lab values, timestamps',
        },
      ].map((family, index, all) => (
        <div
          key={family.name}
          className={`px-6 py-7 ${index === all.length - 1 ? '' : 'border-r border-hair'}`}
        >
          <div
            className={`mb-3 text-[88px] font-medium leading-[1] tracking-[-0.04em] text-ink ${
              family.face === 'serif'
                ? 'font-serif'
                : family.face === 'sans'
                  ? 'font-sans'
                  : 'font-mono'
            }`}
          >
            Aa
          </div>
          <div className="mb-1 font-sans text-[13px] font-semibold">{family.name}</div>
          <div className="font-mono text-[11px] tracking-mono text-ink-3">
            {family.role}
            <br />
            {family.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

function Specimen({
  label,
  meta,
  sample,
}: {
  label: string;
  meta: string;
  sample: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[220px_1fr] items-baseline gap-8 border-b border-hair py-[22px] last:border-b-0">
      <div className="font-mono text-[11px] leading-[1.6] text-ink-3">
        <span className="mb-0.5 block font-medium tracking-mono text-ink">{label}</span>
        <span className="whitespace-pre-line">{meta}</span>
      </div>
      <div className="text-ink">{sample}</div>
    </div>
  );
}

function Tracking() {
  const samples = [
    {
      track: '−0.030em',
      sample: 'Newsreader at display sizes — tighten so words read as objects',
      style: 'font-serif text-[22px] font-medium tracking-[-0.030em]',
    },
    {
      track: '−0.012em',
      sample: 'Newsreader at heading sizes — slight tighten for cohesion',
      style: 'font-serif text-[22px] font-medium tracking-[-0.012em]',
    },
    {
      track: '0.000em',
      sample: 'Newsreader at body — leave alone, the face is balanced as drawn',
      style: 'font-serif text-[22px] font-medium tracking-[0]',
    },
    {
      track: '+0.010em',
      sample: 'Inter at label sizes — open up by a hair so labels read flat-footed',
      style: 'font-sans text-[14px] font-semibold tracking-label',
    },
    {
      track: '+0.180em',
      sample: 'Inter overline — generous, like a chart label',
      style: 'font-sans text-[11px] font-semibold uppercase tracking-overline',
    },
  ];
  return (
    <div className="grid grid-cols-[100px_1fr] border-t border-hair">
      {samples.map((row) => (
        <Fragment key={row.track}>
          <div className="border-b border-hair py-3.5 pr-4 font-mono text-[11px] text-ink-3">
            {row.track}
          </div>
          <div className={`border-b border-hair py-3.5 text-ink ${row.style}`}>{row.sample}</div>
        </Fragment>
      ))}
    </div>
  );
}

function ComposedSheet() {
  return (
    <Sheet padding="md" className="max-w-[680px]">
      <Overline className="mb-2.5 block">Progress note · 14:08</Overline>
      <h3 className="mb-2 mt-0 font-serif text-[22px] font-medium tracking-h">
        Adebayo, Olumide{' '}
        <span className="font-normal text-ink-3">— f/u for chest pressure</span>
      </h3>
      <RecordNumber className="mb-3.5 block">
        MRN 10458291 · ENC-2026-04-29-1184 · 64 M · DOB 1962-03-14
      </RecordNumber>
      <DictatedText className="m-0 mb-3.5">
        &ldquo;Pressure is gone now. Walked the unit twice without symptoms. He&rsquo;d like to
        know when he can go home.&rdquo;
      </DictatedText>
      <p className="m-0 mb-3 leading-[1.55] text-ink-2">
        Vitals stable. Repeat troponin pending. ECG unchanged from prior. Plan to discharge after
        the 6h trop, with follow-up in cardiology clinic.
      </p>
      <div className="mt-3.5 flex gap-[18px] border-t border-hair pt-3.5">
        <Reading label="HR" value="76" unit="bpm" />
        <Reading label="BP" value="128/82" />
        <Reading label="SpO₂" value="98" unit="%" />
        <Reading label="Temp" value="98.6" unit="°F" />
      </div>
    </Sheet>
  );
}

function Reading({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <Overline>{label}</Overline>
      <div className="font-mono text-[20px] font-medium leading-[0.95] tabular-nums tracking-[-0.02em] text-ink">
        {value}
        {unit ? <span className="ml-1 font-sans text-[8px] tracking-wide text-ink-3">{unit}</span> : null}
      </div>
    </div>
  );
}
