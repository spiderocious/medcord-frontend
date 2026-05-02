import { cn } from '@shared/utils/cn';

/**
 * `PermissionsMatrix` — role × action matrix used in admin settings.
 * Reference: 42-cross.html (permissions matrix).
 */
export interface PermissionsMatrixProps {
  /** Action / capability rows. */
  actions: ReadonlyArray<string>;
  /** Role columns. */
  roles: ReadonlyArray<string>;
  /** True at `[actionIndex][roleIndex]` if the role has the action. */
  cells: ReadonlyArray<ReadonlyArray<boolean>>;
  onToggle?: (actionIndex: number, roleIndex: number) => void;
  className?: string;
}

export function PermissionsMatrix({
  actions,
  roles,
  cells,
  onToggle,
  className,
}: PermissionsMatrixProps) {
  return (
    <div className={cn('overflow-hidden rounded-card border border-hair', className)}>
      <div
        className="grid border-b border-hair bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3"
        style={{ gridTemplateColumns: `1fr repeat(${roles.length}, 80px)` }}
      >
        <div>Action</div>
        {roles.map((role) => (
          <div key={role} className="text-center">
            {role}
          </div>
        ))}
      </div>
      {actions.map((action, actionIndex) => {
        const cellsRow = cells[actionIndex] ?? [];
        return (
          <div
            key={action}
            className={cn(
              'grid items-center px-4 py-2.5',
              actionIndex === actions.length - 1 ? '' : 'border-b border-hair-soft',
            )}
            style={{ gridTemplateColumns: `1fr repeat(${roles.length}, 80px)` }}
          >
            <div className="text-[13px] text-ink">{action}</div>
            {roles.map((_, roleIndex) => (
              <div key={roleIndex} className="flex items-center justify-center">
                <button
                  type="button"
                  aria-label={`${cellsRow[roleIndex] ? 'Deny' : 'Grant'} ${action} for role`}
                  onClick={() => onToggle?.(actionIndex, roleIndex)}
                  className={cn(
                    'h-4 w-4 cursor-pointer rounded-paper border-[1.5px]',
                    cellsRow[roleIndex] ? 'border-ink bg-ink' : 'border-ink-3 bg-transparent',
                  )}
                >
                  {cellsRow[roleIndex] ? (
                    <span
                      aria-hidden
                      className="block h-[5px] w-2 -translate-y-px translate-x-px"
                      style={{
                        borderLeft: '1.5px solid var(--paper)',
                        borderBottom: '1.5px solid var(--paper)',
                        transform: 'rotate(-45deg) translate(1px, -1px)',
                      }}
                    />
                  ) : null}
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
