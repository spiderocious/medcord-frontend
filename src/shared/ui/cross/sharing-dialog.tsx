import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `SharingDialog` — modal/popover content listing who has access to a record
 * and at what permission. Designed to live inside `<Modal>` or `<Drawer>`.
 *
 * Reference: 42-cross.html (sharing dialog).
 *
 * Visual-only: consumer wires the actual mutation handlers.
 */
export type SharingRole = 'owner' | 'editor' | 'viewer';

export interface SharingMember {
  id: string;
  name: string;
  /** Mono description, e.g. `MD · Cardiology`. */
  detail: string;
  role: SharingRole;
}

export interface SharingDialogProps {
  members: ReadonlyArray<SharingMember>;
  /** Render the role for a row. Default uses a small pill. */
  renderRole?: (member: SharingMember) => ReactNode;
  /** Trailing slot under the list (e.g. invite-by-email field). */
  footer?: ReactNode;
  className?: string;
}

const ROLE_LABEL: Record<SharingRole, string> = {
  owner: 'Owner',
  editor: 'Editor',
  viewer: 'Viewer',
};

export function SharingDialog({ members, renderRole, footer, className }: SharingDialogProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <ul className="m-0 flex list-none flex-col p-0">
        {members.map((member, index) => (
          <li
            key={member.id}
            className={cn(
              'flex items-center justify-between gap-3 py-2.5',
              index === members.length - 1 ? '' : 'border-b border-hair-soft',
            )}
          >
            <div>
              <div className="font-serif text-[15px] tracking-h text-ink">{member.name}</div>
              <div className="font-mono text-[11px] tracking-mono text-ink-3">{member.detail}</div>
            </div>
            <div>
              {renderRole ? (
                renderRole(member)
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-overline text-ink-2">
                  {ROLE_LABEL[member.role]}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      {footer}
    </div>
  );
}
