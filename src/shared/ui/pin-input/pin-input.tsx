import { type ChangeEvent, type ClipboardEvent, type KeyboardEvent, useRef } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `PinInput` — fixed-length numeric PIN (e.g. medication override, two-person verify).
 * Reference: 14-specialized.html (pin-input section).
 */
export interface PinInputProps {
  length?: number;
  value: string;
  onChange: (next: string) => void;
  className?: string;
  ariaLabel?: string;
}

export function PinInput({
  length = 4,
  value,
  onChange,
  className,
  ariaLabel = 'PIN',
}: PinInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function setChar(index: number, char: string) {
    const cleaned = char.replace(/\D/g, '').slice(-1);
    const chars = value.padEnd(length, ' ').split('');
    chars[index] = cleaned || ' ';
    const next = chars.join('').replace(/\s/g, '');
    onChange(next);
  }

  function focusIndex(index: number) {
    const el = refs.current[index];
    el?.focus();
    el?.select();
  }

  function onCellChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const ch = event.target.value;
    if (!ch) return;
    setChar(index, ch);
    if (index < length - 1) focusIndex(index + 1);
  }

  function onCellKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      event.preventDefault();
      focusIndex(index - 1);
      setChar(index - 1, '');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusIndex(Math.max(0, index - 1));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusIndex(Math.min(length - 1, index + 1));
    }
  }

  function onPaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const text = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length - index);
    if (!text) return;
    const merged = value.slice(0, index) + text + value.slice(index + text.length);
    onChange(merged.slice(0, length));
    focusIndex(Math.min(length - 1, index + text.length));
  }

  return (
    <div className={cn('inline-flex gap-2', className)} role="group" aria-label={ariaLabel}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          inputMode="numeric"
          maxLength={1}
          value={value[index] ?? ''}
          onChange={(event) => onCellChange(index, event)}
          onKeyDown={(event) => onCellKeyDown(index, event)}
          onPaste={(event) => onPaste(index, event)}
          className="h-12 w-10 border-0 border-b-[1.5px] border-ink bg-transparent text-center font-mono text-[28px] font-medium tabular-nums text-ink outline-none focus:border-ink"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
