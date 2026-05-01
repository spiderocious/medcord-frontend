import { useState } from 'react';

import { Calendar } from '@ui/calendar';
import { Page } from '@ui/page';
import { RecurrenceBuilder } from '@ui/recurrence-builder';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { TimeInput } from '@ui/time-input';

/**
 * Primitives · Date & time
 * Reference: 13-datetime.html.
 */
export function DatetimePreviewScreen() {
  return (
    <Page>
      <Stamp number="II · 04" title="Date & time" meta="hand-drawn calendar · analog clock · sentence recurrence" />

      <SectionBreak label="Single date" />
      <SingleDate />

      <SectionBreak label="Range" />
      <RangePicker />

      <SectionBreak label="Time — analog face + drum input" />
      <TimeDemo />

      <SectionBreak label="Recurrence — sentence builder" />
      <RecurrenceDemo />
    </Page>
  );
}

function SingleDate() {
  const [value, setValue] = useState<{ start?: Date | null; end?: Date | null }>({
    start: new Date(),
    end: new Date(),
  });
  return (
    <Calendar
      mode="single"
      value={value}
      onChange={setValue}
      hasEvents={[isoToday(0), isoToday(2), isoToday(7)]}
      unavailable={[isoToday(-3)]}
    />
  );
}

function RangePicker() {
  const [value, setValue] = useState<{ start?: Date | null; end?: Date | null }>({
    start: addDays(new Date(), -2),
    end: addDays(new Date(), 5),
  });
  return <Calendar mode="range" value={value} onChange={setValue} />;
}

function TimeDemo() {
  const [time, setTime] = useState({ hours: 8, minutes: 15 });
  return <TimeInput hours={time.hours} minutes={time.minutes} onChange={setTime} />;
}

function RecurrenceDemo() {
  const [value, setValue] = useState({ interval: '8 hours', duration: '7 days' });
  return <RecurrenceBuilder value={value} onChange={setValue} />;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(date.getDate() + days);
  return next;
}

function isoToday(offset: number): string {
  const d = addDays(new Date(), offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
