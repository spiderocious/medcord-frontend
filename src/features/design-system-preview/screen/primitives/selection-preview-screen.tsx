import { useState } from 'react';

import { Checkbox } from '@ui/checkbox';
import { Chip } from '@ui/chip';
import { ChipsInput, type ChipsInputItem } from '@ui/chips-input';
import { Combobox } from '@ui/combobox';
import { Page } from '@ui/page';
import { PainScale } from '@ui/pain-scale';
import { Radio } from '@ui/radio';
import { RoomBedPicker } from '@ui/room-bed-picker';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Switch } from '@ui/switch';
import { Mark } from '@ui/typography';

/**
 * Primitives · Selection
 * Reference: 12-selection.html.
 */
export function SelectionPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="II · 03"
        title="Selection"
        meta="ticks · circles · switches · pills · pickers"
      />

      <SectionBreak label="Discharge checklist" />
      <ChecklistDemo />

      <SectionBreak label="Sex picker — radios in a row" />
      <SexRow />

      <SectionBreak label="Wong-Baker pain scale" />
      <PainScaleDemo />

      <SectionBreak label="Switches — feature toggles" />
      <SwitchRow />

      <SectionBreak label="Filter chips" />
      <ChipRow />

      <SectionBreak label="Allergy chips input" />
      <ChipsInputDemo />

      <SectionBreak label="Combobox — provider picker" />
      <ProviderPicker />

      <SectionBreak label="Floor map — bed picker" />
      <BedPickerDemo />
    </Page>
  );
}

function ChecklistDemo() {
  const [items, setItems] = useState({
    notes: true,
    rx: true,
    followup: false,
    avs: false,
  });
  return (
    <div className="max-w-[480px] border border-ink bg-sheet px-[22px] py-[18px]">
      <h3 className="m-0 mb-3 flex items-baseline gap-2.5 font-serif text-[18px] font-medium tracking-h">
        Discharge checklist
        <span className="ml-auto font-mono text-[11px] font-medium tracking-mono text-ink-3">
          2 / 4
        </span>
      </h3>
      <Checkbox
        checked={items.notes}
        onChange={(checked) => setItems({ ...items, notes: checked })}
      >
        Discharge note signed
      </Checkbox>
      <Checkbox checked={items.rx} onChange={(checked) => setItems({ ...items, rx: checked })}>
        Prescriptions sent to pharmacy
      </Checkbox>
      <Checkbox
        checked={items.followup}
        onChange={(checked) => setItems({ ...items, followup: checked })}
      >
        Follow-up appointment booked
      </Checkbox>
      <Checkbox
        checked={items.avs}
        onChange={(checked) => setItems({ ...items, avs: checked })}
        meta="optional"
      >
        After-visit summary printed
      </Checkbox>
    </div>
  );
}

function SexRow() {
  const [value, setValue] = useState('male');
  return (
    <div className="flex flex-wrap items-center gap-6">
      {[
        { v: 'male', label: 'Male' },
        { v: 'female', label: 'Female' },
        { v: 'intersex', label: 'Intersex' },
        { v: 'pnts', label: 'Prefer not to say' },
      ].map((opt) => (
        <Radio key={opt.v} name="sex" value={opt.v} checked={value === opt.v} onChange={setValue}>
          {opt.label}
        </Radio>
      ))}
    </div>
  );
}

function PainScaleDemo() {
  const [value, setValue] = useState<2 | 0 | 4 | 6 | 8 | 10 | null>(2);
  return <PainScale value={value} onChange={setValue} />;
}

function SwitchRow() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const [c, setC] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      <SwitchRowItem label="Receive critical lab pages" checked={a} onChange={setA} />
      <SwitchRowItem label="Receive routine result pages" checked={b} onChange={setB} />
      <SwitchRowItem label="Auto-sign verified results" checked={c} onChange={setC} />
    </div>
  );
}

function SwitchRowItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex w-[420px] cursor-pointer items-center justify-between gap-4 border-b border-hair pb-3 text-[14px] text-ink last:border-b-0">
      <span>{label}</span>
      <Switch checked={checked} onChange={onChange} label={label} />
    </label>
  );
}

function ChipRow() {
  const [active, setActive] = useState<string[]>(['stat']);
  function toggle(id: string) {
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }
  return (
    <div className="flex flex-wrap gap-2">
      {[
        { id: 'stat', label: 'STAT' },
        { id: 'awaiting', label: 'Awaiting labs' },
        { id: 'admitted', label: 'Admitted' },
        { id: 'iso', label: 'Isolation' },
      ].map((chip) => (
        <Chip key={chip.id} selected={active.includes(chip.id)} onClick={() => toggle(chip.id)}>
          {chip.label}
        </Chip>
      ))}
      <Chip tone="crit" onRemove={() => undefined}>
        Penicillin
      </Chip>
    </div>
  );
}

function ChipsInputDemo() {
  const [items, setItems] = useState<ChipsInputItem[]>([
    { id: 'pen', label: 'Penicillin · anaphylaxis', tone: 'crit' },
    { id: 'sulfa', label: 'Sulfa · rash', tone: 'warn' },
  ]);
  return (
    <ChipsInput
      value={items}
      onAdd={(label) =>
        setItems((prev) => [...prev, { id: String(Date.now()), label, tone: 'warn' }])
      }
      onRemove={(id) => setItems((prev) => prev.filter((x) => x.id !== id))}
      placeholder="Add allergy…"
    />
  );
}

interface Provider {
  id: string;
  name: string;
  meta: string;
  when: string;
  online?: boolean;
}

function ProviderPicker() {
  const [query, setQuery] = useState('p');
  const [active, setActive] = useState<string | undefined>('patel');

  const allProviders: Provider[] = [
    {
      id: 'patel',
      name: 'Patel, R MD',
      meta: 'Cardiology · attending · 3-N',
      when: 'on now',
      online: true,
    },
    { id: 'kim', name: 'Kim, S NP', meta: 'Cardiology · NP · 3-N', when: 'on at 19:00' },
    { id: 'oz', name: 'Ozawa, K MD', meta: 'Hospitalist · 4-N', when: 'on at 07:00 tomorrow' },
  ];
  const results = allProviders.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || query === '',
  );

  return (
    <Combobox<Provider>
      prefix="MD / NP"
      value={query}
      onChange={setQuery}
      placeholder="Search staff…"
      hint="↑ ↓ to step · ↵ to assign"
      results={results}
      activeKey={active}
      getKey={(item) => item.id}
      onActivate={(item) => setActive(item.id)}
      renderRow={(item) => (
        <div className="grid grid-cols-[32px_1fr_auto] items-center gap-3 px-4 py-2.5">
          <Mark>{item.online ? '●' : '○'}</Mark>
          <div>
            <div className="font-serif text-[16px] font-medium tracking-h">{item.name}</div>
            <div className="text-[11px] text-ink-3">{item.meta}</div>
          </div>
          <span className="font-mono text-[11px] tracking-mono text-ink-3">{item.when}</span>
        </div>
      )}
    />
  );
}

function BedPickerDemo() {
  const [selected, setSelected] = useState('312A');
  return (
    <RoomBedPicker
      selectedId={selected}
      onSelect={(cell) => setSelected(cell.id)}
      cells={[
        { id: '311A', code: '311 A', label: 'Adebayo, O', state: 'occupied' },
        { id: '311B', code: '311 B', label: 'available', state: 'empty' },
        { id: '312A', code: '312 A', label: 'Chen, W', state: 'occupied' },
        { id: '312B', code: '312 B', label: 'cleaning', state: 'cleaning' },
        { id: '313A', code: '313 A', label: 'Reyes, M', state: 'iso' },
        { id: '313B', code: '313 B', label: 'offline', state: 'offline' },
      ]}
    />
  );
}
