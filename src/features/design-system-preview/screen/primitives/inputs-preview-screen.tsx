import { useState } from 'react';

import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Select } from '@ui/select';
import { Stamp } from '@ui/stamp';
import { TextField } from '@ui/text-field';
import { Mark } from '@ui/typography';

/**
 * Primitives · Inputs (vitals & dosage)
 * Reference: 11-inputs.html.
 */
export function InputsPreviewScreen() {
  return (
    <Page>
      <Stamp number="II · 02" title="Inputs · vitals & dosage" meta="designed for the fields used 200 times a shift" />
      <p className="m-0 mb-4 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        The default input is a line, not a box — chart paper. The label sits above in mono caps;
        the value below in sans, or in mono if the value is a number on the record. Specialized
        fields are designed first; the trivial text field is the simplest case of them.
      </p>

      <SectionBreak label="Vitals — six readings, one block" />
      <VitalsBlock />

      <SectionBreak label="Dosage — number, unit, route" />
      <DosageLine />

      <SectionBreak label="Structured — paired fields" />
      <StructuredPair />

      <SectionBreak label="States, briefly" />
      <StatesGrid />
    </Page>
  );
}

function VitalsBlock() {
  return (
    <div className="grid grid-cols-6 border border-ink bg-sheet">
      <Vital label="Heart rate" value="76" unit="bpm" help="range 60–100" />
      <Vital label="Resp rate" value="16" unit="/min" help="range 12–20" />
      <Vital label="SpO₂" value="98" unit="%" help="on room air" />
      <Vital label="Temp" value="98.6" unit="°F" help="37.0 °C · oral" />
      <Vital label="Pain" value="2" unit="/10" help="Wong-Baker" />
      <Vital label="Weight" value="178" unit="lb" help="80.7 kg · BMI 26.3" />
    </div>
  );
}

function Vital({
  label,
  value,
  unit,
  help,
}: {
  label: string;
  value: string;
  unit: string;
  help: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 border-r border-hair px-5 py-4 last:border-r-0">
      <Mark className="text-[10px] tracking-[0.16em]">{label}</Mark>
      <div className="flex items-baseline gap-1">
        <input
          defaultValue={value}
          inputMode="decimal"
          className="w-[70px] border-0 border-b-[1.5px] border-ink-3 bg-transparent p-0 font-mono text-[28px] font-medium tabular-nums tracking-[-0.02em] text-ink outline-none focus:border-ink"
        />
        <span className="font-sans text-[11px] font-medium tracking-wide text-ink-3">{unit}</span>
      </div>
      <div className="font-mono text-[10px] tracking-mono text-ink-3">{help}</div>
    </div>
  );
}

function DosageLine() {
  const [amount, setAmount] = useState('500');
  return (
    <div>
      <Mark className="mb-2 block">Order — Amoxicillin 500 mg PO TID</Mark>
      <div className="flex items-baseline gap-3.5 border-b border-ink py-3.5">
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="w-[110px] border-0 border-b-[1.5px] border-ink bg-transparent p-1 text-right font-mono text-[36px] font-medium tabular-nums tracking-[-0.02em] text-ink outline-none"
        />
        <Select className="w-auto" mono defaultValue="mg">
          <option>mg</option>
          <option>mcg</option>
          <option>g</option>
          <option>mL</option>
        </Select>
        <span className="font-serif text-[16px] italic text-ink-3">by</span>
        <Select className="w-auto" mono defaultValue="mouth">
          <option>mouth</option>
          <option>IV</option>
          <option>IM</option>
        </Select>
        <span className="font-serif text-[16px] italic text-ink-3">every</span>
        <Select className="w-auto" mono defaultValue="8 hours">
          <option>8 hours</option>
          <option>6 hours</option>
          <option>12 hours</option>
        </Select>
      </div>
      <div className="mt-2 flex gap-3.5 font-mono text-[11px] tracking-mono text-ink-3">
        <span>renal-adjusted dose: <span className="text-ink">500 mg</span></span>
        <span className="text-warn">max 2,000 mg / day</span>
        <span>est. cost / day · $1.40</span>
      </div>
      <div className="mt-3 flex items-center gap-3 border border-crit-edge border-l-[3px] border-l-crit bg-crit-bg px-3.5 py-2.5 font-serif text-[14px] italic leading-[1.45] text-crit">
        <span className="bg-crit px-1.5 py-0.5 font-mono text-[10px] font-semibold not-italic uppercase tracking-overline text-white">
          ALLERGY
        </span>
        The patient is allergic to penicillin (anaphylaxis). Amoxicillin is the same class.
        Override requires reason and is logged.
      </div>
    </div>
  );
}

function StructuredPair() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <TextField label="Family name" defaultValue="Adebayo" />
      <TextField label="Given name" defaultValue="Olumide" />
      <TextField label="Date of birth" mono defaultValue="1962-03-14" help="= 64 years" />
      <Select label="Sex assigned at birth" defaultValue="Male">
        <option>Male</option>
        <option>Female</option>
        <option>Intersex</option>
      </Select>
      <TextField label="Mobile" mono defaultValue="+1 (312) 555-0148" />
      <TextField label="Email" defaultValue="m.adebayo@example.com" />
      <div className="col-span-2">
        <TextField label="Address" defaultValue="142 W Lakeside Dr · Chicago, IL 60615" />
      </div>
    </div>
  );
}

function StatesGrid() {
  return (
    <div className="grid grid-cols-3 gap-x-7 gap-y-4">
      <TextField label="Default" placeholder="Search MRN, name, DOB" help="searchable from anywhere with /" />
      <TextField label="Focus" defaultValue="Adebayo, O" />
      <TextField label="Disabled" defaultValue="signed by R. Patel · cannot edit" disabled />
      <TextField label="Read-only" defaultValue="ICD-10 I10" readOnly help="signed records are read-only by default" />
      <TextField label="Error" defaultValue="abc" status="error" help="pulse must be numeric, between 30 and 220" />
      <TextField label="Verified" defaultValue="m.adebayo@example.com" status="ok" help="verified · primary contact" />
    </div>
  );
}
