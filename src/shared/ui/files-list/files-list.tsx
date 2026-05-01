import { cn } from '@shared/utils/cn';

/**
 * `FilesList` — paper-clip glyph + name + meta + progress per file.
 * Reference: 14-specialized.html:36-50 (`.files`, `.file`).
 */
export type FileRowState = 'idle' | 'uploading' | 'ok' | 'error';

export interface FileRow {
  id: string;
  name: string;
  meta?: string;
  /** 0-100. */
  progress?: number;
  state?: FileRowState;
}

export interface FilesListProps {
  files: ReadonlyArray<FileRow>;
  className?: string;
}

const NAME_TONE: Record<FileRowState, string> = {
  idle: 'text-ink',
  uploading: 'text-ink',
  ok: 'text-green-800',
  error: 'text-crit',
};

export function FilesList({ files, className }: FilesListProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {files.map((file) => {
        const state = file.state ?? 'idle';
        return (
          <div
            key={file.id}
            className="grid grid-cols-[18px_1fr_auto_auto] items-center gap-3 border-b border-dashed border-hair-soft py-3 last:border-b-0"
          >
            <span aria-hidden className="font-serif text-[18px] leading-[1] text-ink-3">
              ※
            </span>
            <span className={cn('text-[14px]', NAME_TONE[state])}>{file.name}</span>
            {file.meta ? (
              <span className="font-mono text-[11px] tracking-mono text-ink-3">{file.meta}</span>
            ) : (
              <span />
            )}
            {file.progress !== undefined ? (
              <span className="block h-1 w-[120px] bg-paper-deep">
                <span className="block h-full bg-ink" style={{ width: `${file.progress}%` }} />
              </span>
            ) : (
              <span />
            )}
          </div>
        );
      })}
    </div>
  );
}
