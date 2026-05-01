import { cn } from '@shared/utils/cn';

/**
 * `TimeInput` — analog face + side drum-roll input. The clock is decorative;
 * the inputs are the source of truth.
 * Reference: 13-datetime.html:79-119.
 */
export interface TimeInputProps {
  hours: number;
  minutes: number;
  onChange?: (next: { hours: number; minutes: number }) => void;
  className?: string;
}

export function TimeInput({ hours, minutes, onChange, className }: TimeInputProps) {
  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = minutes * 6;

  return (
    <div className={cn('flex items-center gap-7', className)}>
      <div
        aria-hidden
        className="relative h-[200px] w-[200px] rounded-full border border-ink bg-sheet"
      >
        {Array.from({ length: 12 }, (_, i) => i).map((tick) => (
          <span
            key={tick}
            className="absolute left-1/2 top-1 block h-2.5 w-px bg-ink"
            style={{
              transformOrigin: '50% 96px',
              transform: `translateX(-50%) rotate(${tick * 30}deg)`,
            }}
          />
        ))}
        <span
          className="absolute left-1/2 top-1/2 block w-0.5 origin-bottom bg-ink"
          style={{
            height: 56,
            transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
          }}
        />
        <span
          className="absolute left-1/2 top-1/2 block w-px origin-bottom bg-ink-2"
          style={{
            height: 78,
            transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
          }}
        />
        <span className="absolute left-1/2 top-1/2 block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      </div>
      <div className="flex items-center gap-2 font-mono text-[36px] font-medium tabular-nums tracking-[-0.02em] text-ink">
        <input
          type="number"
          min={0}
          max={23}
          value={hours}
          onChange={(event) => onChange?.({ hours: clamp(Number(event.target.value), 0, 23), minutes })}
          className="w-[80px] border-0 border-b-[1.5px] border-ink bg-transparent text-right outline-none"
        />
        <span className="text-ink-3">:</span>
        <input
          type="number"
          min={0}
          max={59}
          value={String(minutes).padStart(2, '0')}
          onChange={(event) => onChange?.({ hours, minutes: clamp(Number(event.target.value), 0, 59) })}
          className="w-[80px] border-0 border-b-[1.5px] border-ink bg-transparent text-left outline-none"
        />
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}
