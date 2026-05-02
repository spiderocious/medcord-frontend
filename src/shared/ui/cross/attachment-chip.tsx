import { cn } from '@shared/utils/cn';

/**
 * `AttachmentChip` — paper-clip + name + size, removable.
 * Reference: 42-cross.html (attachment chips section).
 */
export interface AttachmentChipProps {
  name: string;
  /** Size or kind, mono. */
  meta?: string;
  onRemove?: () => void;
  onOpen?: () => void;
  className?: string;
}

export function AttachmentChip({ name, meta, onRemove, onOpen, className }: AttachmentChipProps) {
  return (
    <span
      className={cn(
        'bg-paper-deep/40 inline-flex max-w-[280px] items-center gap-2 rounded-card border border-hair px-2 py-1 font-sans text-[12px] text-ink',
        className,
      )}
    >
      <span aria-hidden className="font-serif text-[14px] leading-[1] text-ink-3">
        ※
      </span>
      <button
        type="button"
        onClick={onOpen}
        className="font-inherit cursor-pointer truncate border-0 bg-transparent p-0 text-left text-inherit hover:underline"
      >
        {name}
      </button>
      {meta ? <span className="font-mono text-[10px] tracking-mono text-ink-3">{meta}</span> : null}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${name}`}
          onClick={onRemove}
          className="cursor-pointer border-0 bg-transparent p-0 leading-none text-ink-3 hover:text-ink"
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
