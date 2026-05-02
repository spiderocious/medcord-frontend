import { cn } from '@shared/utils/cn';

/**
 * `PainScale` — Wong-Baker 0-10 pain picker. Faces are serif italic glyphs,
 * not emoji. Reference: 12-selection.html:89-112.
 */
export interface PainScaleProps {
  value: 0 | 2 | 4 | 6 | 8 | 10 | null;
  onChange?: (value: PainScaleProps['value']) => void;
  className?: string;
}

const FACES: ReadonlyArray<{
  num: 0 | 2 | 4 | 6 | 8 | 10;
  word: string;
  glyph: string;
}> = [
  { num: 0, word: 'no hurt', glyph: ':)' },
  { num: 2, word: 'a little', glyph: ':-)' },
  { num: 4, word: 'a bit more', glyph: ':|' },
  { num: 6, word: 'much', glyph: ':(' },
  { num: 8, word: 'a lot', glyph: ':((' },
  { num: 10, word: 'worst', glyph: ':_(' },
];

export function PainScale({ value, onChange, className }: PainScaleProps) {
  return (
    <div className={cn('grid grid-cols-6 border border-ink', className)}>
      {FACES.map((face, index) => {
        const isOn = value === face.num;
        return (
          <button
            key={face.num}
            type="button"
            onClick={() => onChange?.(face.num)}
            className={cn(
              'font-inherit cursor-pointer border-0 px-4 pb-3.5 pt-[18px] text-center',
              index === FACES.length - 1 ? '' : 'border-r border-hair',
              isOn ? 'bg-paper shadow-[inset_0_-3px_0_var(--ink)]' : 'bg-sheet',
            )}
          >
            <div
              className={cn(
                'font-serif text-[28px] italic leading-[1] text-ink',
                isOn && 'scale-105',
              )}
            >
              {face.glyph}
            </div>
            <div className="my-1 font-mono text-[22px] font-medium tracking-mono text-ink">
              {face.num}
            </div>
            <div className={cn('font-serif text-[13px] italic', isOn ? 'text-ink' : 'text-ink-3')}>
              {face.word}
            </div>
          </button>
        );
      })}
    </div>
  );
}
