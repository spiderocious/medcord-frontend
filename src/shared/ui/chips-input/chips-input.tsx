import { type KeyboardEvent, useState } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `ChipsInput` — multi-chip free-text input (allergy-style).
 * Reference: 12-selection.html:150-170.
 */
export type ChipsInputTone = 'crit' | 'warn' | 'low' | 'neutral';

export interface ChipsInputItem {
  id: string;
  label: string;
  tone?: ChipsInputTone;
}

export interface ChipsInputProps {
  value: ChipsInputItem[];
  onAdd: (label: string) => void;
  onRemove: (id: string) => void;
  placeholder?: string;
  className?: string;
}

const TONE: Record<ChipsInputTone, string> = {
  crit: 'border-crit-edge bg-crit-bg text-crit',
  warn: 'border-warn-edge bg-warn-bg text-warn',
  low: 'border-low-edge bg-low-bg text-low',
  neutral: 'border-hair bg-paper-deep text-ink-2',
};

export function ChipsInput({
  value,
  onAdd,
  onRemove,
  placeholder = 'Add…',
  className,
}: ChipsInputProps) {
  const [draft, setDraft] = useState('');

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && draft.trim()) {
      event.preventDefault();
      onAdd(draft.trim());
      setDraft('');
    } else if (event.key === 'Backspace' && draft === '' && value.length > 0) {
      const last = value[value.length - 1];
      if (last) onRemove(last.id);
    }
  }

  return (
    <div
      className={cn(
        'flex min-h-[44px] flex-wrap items-center gap-1.5 rounded-card border border-ink bg-sheet px-2.5 py-2',
        className,
      )}
    >
      {value.map((item) => {
        const tone = item.tone ?? 'neutral';
        return (
          <span
            key={item.id}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-paper border px-2.5 py-1 text-[12px] font-medium',
              TONE[tone],
            )}
          >
            {item.label}
            <button
              type="button"
              aria-label={`Remove ${item.label}`}
              onClick={() => onRemove(item.id)}
              className="cursor-pointer border-0 bg-transparent p-0 leading-none text-current opacity-60 hover:opacity-100"
            >
              ×
            </button>
          </span>
        );
      })}
      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-w-[100px] flex-1 border-0 bg-transparent py-1 font-sans text-[13px] text-ink outline-none placeholder:text-ink-4"
      />
    </div>
  );
}
