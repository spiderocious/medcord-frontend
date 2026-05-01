import { Select } from '../select';

/**
 * `RecurrenceBuilder` — sentence-style interval picker (e.g. "every 8 hours
 * × 7 days"). Composed from `Select`s; not a calendar.
 * Reference: 13-datetime.html (recurrence section).
 */
export interface RecurrenceBuilderValue {
  interval: string;
  duration: string;
}

export interface RecurrenceBuilderProps {
  value: RecurrenceBuilderValue;
  onChange: (next: RecurrenceBuilderValue) => void;
  /** Choices for the interval ("every …"). */
  intervalOptions?: ReadonlyArray<string>;
  /** Choices for the duration ("× …"). */
  durationOptions?: ReadonlyArray<string>;
  className?: string;
}

const DEFAULT_INTERVALS = ['6 hours', '8 hours', '12 hours', '24 hours'] as const;
const DEFAULT_DURATIONS = ['7 days', '10 days', '14 days', '30 days'] as const;

export function RecurrenceBuilder({
  value,
  onChange,
  intervalOptions = DEFAULT_INTERVALS,
  durationOptions = DEFAULT_DURATIONS,
  className,
}: RecurrenceBuilderProps) {
  return (
    <div className={`flex items-baseline gap-3 ${className ?? ''}`}>
      <span className="font-serif text-[16px] italic text-ink-3">every</span>
      <Select
        value={value.interval}
        onChange={(event) => onChange({ ...value, interval: event.target.value })}
        mono
      >
        {intervalOptions.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </Select>
      <span className="font-serif text-[16px] italic text-ink-3">×</span>
      <Select
        value={value.duration}
        onChange={(event) => onChange({ ...value, duration: event.target.value })}
        mono
      >
        {durationOptions.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </Select>
    </div>
  );
}
