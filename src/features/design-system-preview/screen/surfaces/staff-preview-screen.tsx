import { Avatar } from '@ui/avatar';
import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { PulseDot } from '@ui/pulse-dot';
import { Sheet } from '@ui/sheet';
import { Stamp } from '@ui/stamp';
import { Mark, Overline } from '@ui/typography';

const HOURS = ['07', '09', '11', '13', '15', '17', '19', '21'] as const;

interface Shift {
  id: string;
  name: string;
  initials: string;
  role: 'md' | 'rn' | 'np';
  /** Inclusive start/end indices into HOURS. */
  start: number;
  end: number;
  pulse?: boolean;
}

const SHIFTS: Shift[] = [
  { id: '1', name: 'Patel, R', initials: 'RP', role: 'md', start: 0, end: 6, pulse: true },
  { id: '2', name: 'Ozawa, K', initials: 'KO', role: 'md', start: 4, end: 7 },
  { id: '3', name: 'Kim, S', initials: 'SK', role: 'np', start: 0, end: 4 },
  { id: '4', name: 'Lee, J', initials: 'JL', role: 'rn', start: 1, end: 6 },
  { id: '5', name: 'Park, M', initials: 'MP', role: 'rn', start: 0, end: 5 },
  { id: '6', name: 'Ngo, T', initials: 'TN', role: 'rn', start: 4, end: 7 },
];

const ROLE_TONE: Record<Shift['role'], 'ink' | 'warn' | 'ok'> = {
  md: 'ink',
  np: 'warn',
  rn: 'ok',
};

export function StaffPreviewScreen() {
  return (
    <Page>
      <Stamp number="IV · 06" title="Staff & schedule" meta="a hospital wall calendar, today" />
      <div className="grid grid-cols-[1fr_300px] gap-6">
        <ScheduleGrid />
        <RosterSheet />
      </div>
    </Page>
  );
}

function ScheduleGrid() {
  return (
    <div className="overflow-hidden border border-ink bg-sheet">
      <div
        className="grid border-b border-ink bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-overline text-ink-3"
        style={{ gridTemplateColumns: `180px repeat(${HOURS.length}, 1fr)` }}
      >
        <div>Provider</div>
        {HOURS.map((hour) => (
          <div key={hour} className="text-center">
            {hour}:00
          </div>
        ))}
      </div>
      {SHIFTS.map((shift, index) => (
        <div
          key={shift.id}
          className={`grid items-center px-4 py-2.5 ${index === SHIFTS.length - 1 ? '' : 'border-b border-hair'}`}
          style={{ gridTemplateColumns: `180px repeat(${HOURS.length}, 1fr)` }}
        >
          <div className="flex items-center gap-2">
            <Avatar
              subject={shift.role === 'md' ? 'md' : shift.role === 'rn' ? 'rn' : 'neutral'}
              size="sm"
              initials={shift.initials}
            />
            <div className="flex flex-col">
              <span className="text-[13px] text-ink">{shift.name}</span>
              <Mark>{shift.role.toUpperCase()}</Mark>
            </div>
          </div>
          {HOURS.map((_, hourIndex) => {
            const filled = hourIndex >= shift.start && hourIndex <= shift.end;
            return (
              <div key={hourIndex} className="flex items-center justify-center">
                {filled ? (
                  <span
                    className={`block h-2 w-full max-w-[40px] rounded-paper ${
                      shift.role === 'md'
                        ? 'bg-ink'
                        : shift.role === 'rn'
                          ? 'bg-green-700'
                          : 'bg-warn'
                    }`}
                  />
                ) : (
                  <span className="block h-px w-2/3 bg-hair" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function RosterSheet() {
  return (
    <Sheet padding="md">
      <Overline>On now</Overline>
      <ul className="m-0 mt-3 flex list-none flex-col gap-3 p-0">
        {SHIFTS.filter((s) => s.pulse).map((shift) => (
          <li key={shift.id} className="flex items-center gap-3">
            <Avatar subject="md" size="md" initials={shift.initials} />
            <div className="flex-1">
              <div className="font-serif text-[15px] tracking-h text-ink">{shift.name} MD</div>
              <Mark>Cardiology · 3-N</Mark>
            </div>
            <Pill tone={ROLE_TONE[shift.role]}>
              <PulseDot />
              On
            </Pill>
          </li>
        ))}
      </ul>
      <Overline className="mt-6 block">PTO · upcoming</Overline>
      <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0 font-mono text-[12px] tabular-nums tracking-mono text-ink-3">
        <li className="flex justify-between">
          <span className="text-ink">Lee, J</span> 2026-05-04 → 2026-05-09
        </li>
        <li className="flex justify-between">
          <span className="text-ink">Ngo, T</span> 2026-05-15 → 2026-05-17
        </li>
      </ul>
      <Overline className="mt-6 block">Credentials due</Overline>
      <ul className="m-0 mt-2 flex list-none flex-col gap-2 p-0 text-[12px]">
        <li>
          <span className="text-ink">BLS</span> · Park, M · expires{' '}
          <span className="font-mono tabular-nums text-warn">2026-06-12</span>
        </li>
        <li>
          <span className="text-ink">ACLS</span> · Kim, S · expires{' '}
          <span className="font-mono tabular-nums text-ink-3">2027-02-04</span>
        </li>
      </ul>
    </Sheet>
  );
}
