import { Avatar } from '@ui/avatar';
import { Button } from '@ui/button';
import {
  ActivityLog,
  AiSuggest,
  ApprovalCard,
  AttachmentChip,
  AuditLog,
  BulkActionBar,
  MentionChip,
  PermissionsMatrix,
  PhiRibbon,
  SessionContext,
  SharingDialog,
} from '@ui/cross';
import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';

export function CrossPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="V · 03"
        title="Cross-record patterns"
        meta="patterns that appear identically everywhere"
      />

      <SectionBreak label="PHI ribbon" />
      <PhiRibbon />

      <SectionBreak label="Session context — top-bar slot" />
      <SessionContext
        avatar={<Avatar subject="md" size="md" initials="RP" />}
        who="Patel, Riya MD"
        whoMeta="Cardiology · attending"
        unit="3-N"
        shift="On until 19:00"
      />

      <SectionBreak label="Mention chips" />
      <p className="m-0 text-[14px] leading-[1.55] text-ink-2">
        Spoke with <MentionChip initials="RP" name="Patel" role="MD" /> at 14:08, who advised{' '}
        <MentionChip initials="LK" name="Kim" role="NP" /> to verify the dose before signing.
      </p>

      <SectionBreak label="Approval card" />
      <ApprovalCard
        kind="Resident note"
        title="Progress note · Adebayo, O · 14:08"
        submitter="Park, J PGY-2"
        submittedAt="2026-05-01 14:12"
        reviewer={
          <span className="inline-flex items-center gap-2">
            <Avatar subject="md" size="sm" initials="RP" /> Patel, R MD
          </span>
        }
        state="pending"
        actions={
          <>
            <span className="flex-1" />
            <Button variant="quiet" size="sm">
              Request changes
            </Button>
            <Button variant="secondary" size="sm">
              Reject
            </Button>
            <Button variant="primary" size="sm">
              Co-sign
            </Button>
          </>
        }
      >
        Plan to admit overnight to step-down for serial troponins. Discharge planning resumed after
        6h trop pending.
      </ApprovalCard>

      <SectionBreak label="Sharing dialog" />
      <div className="max-w-[520px] rounded-card border border-hair bg-sheet p-5">
        <SharingDialog
          members={[
            {
              id: '1',
              name: 'Patel, Riya MD',
              detail: 'MD · Cardiology · attending',
              role: 'owner',
            },
            { id: '2', name: 'Kim, S NP', detail: 'NP · Cardiology', role: 'editor' },
            { id: '3', name: 'Park, J PGY-2', detail: 'Resident · Internal Med', role: 'viewer' },
          ]}
          renderRole={(member) => (
            <Pill
              tone={member.role === 'owner' ? 'ink' : member.role === 'editor' ? 'ok' : 'neutral'}
            >
              {member.role}
            </Pill>
          )}
          footer={
            <div className="mt-3 flex gap-2">
              <input
                placeholder="Add by email…"
                className="flex-1 rounded-card border border-hair bg-paper px-3 py-2 text-[13px] outline-none focus:border-ink"
              />
              <Button variant="primary" size="sm">
                Invite
              </Button>
            </div>
          }
        />
      </div>

      <SectionBreak label="Permissions matrix" />
      <PermissionsMatrix
        actions={['View chart', 'Edit chart', 'Sign note', 'Discharge patient', 'Override allergy']}
        roles={['MD', 'RN', 'NP', 'PA', 'Tech']}
        cells={[
          [true, true, true, true, true],
          [true, false, true, true, false],
          [true, false, true, true, false],
          [true, false, false, true, false],
          [true, false, false, false, false],
        ]}
      />

      <SectionBreak label="Audit log" />
      <AuditLog
        events={[
          {
            id: '1',
            when: '2026-05-01 14:42',
            actor: 'Patel, R MD',
            action: 'viewed chart',
            meta: 'from WS-3-2 · 10.0.0.42',
          },
          {
            id: '2',
            when: '2026-05-01 14:08',
            actor: 'Park, J PGY-2',
            action: 'signed progress note',
          },
          {
            id: '3',
            when: '2026-05-01 13:56',
            actor: 'Kim, S NP',
            action: 'placed lab order · TROP-I, BMP',
            meta: 'order #4827',
          },
          {
            id: '4',
            when: '2026-05-01 12:30',
            actor: 'System',
            action: 'restricted-access toggled (off)',
          },
        ]}
      />

      <SectionBreak label="Activity log" />
      <ActivityLog
        entries={[
          {
            id: '1',
            when: '14:42',
            avatar: <Avatar subject="md" size="md" initials="RP" />,
            title: <>Patel, R MD acknowledged critical TROP-I result.</>,
          },
          {
            id: '2',
            when: '14:08',
            avatar: <Avatar subject="rn" size="md" initials="LK" />,
            title: <>Kim, S NP added a progress note to Adebayo, O.</>,
            detail: '"Pressure gone, walked the unit twice without symptoms."',
          },
          {
            id: '3',
            when: '13:30',
            avatar: <Avatar subject="patient" size="md" initials="OA" />,
            title: <>Adebayo, O moved from triage → 3-N · 312A.</>,
          },
        ]}
      />

      <SectionBreak label="Attachment chips" />
      <div className="flex flex-wrap gap-2">
        <AttachmentChip name="ECG-2026-05-01.pdf" meta="142 KB" onRemove={() => undefined} />
        <AttachmentChip name="Discharge-summary.docx" meta="38 KB" onRemove={() => undefined} />
        <AttachmentChip name="ID-front.jpg" meta="124 KB" onRemove={() => undefined} />
      </div>

      <SectionBreak label="Bulk action bar" />
      <BulkActionBar count={4} onClear={() => undefined}>
        <Button variant="quiet" size="sm" className="text-paper hover:bg-ink-2">
          Assign provider
        </Button>
        <Button variant="quiet" size="sm" className="text-paper hover:bg-ink-2">
          Move to bed…
        </Button>
        <Button variant="quiet" size="sm" className="text-paper hover:bg-ink-2">
          Print labels
        </Button>
      </BulkActionBar>

      <SectionBreak label="AI assist (suggestion only)" />
      <AiSuggest
        actions={
          <>
            <Button variant="quiet" size="sm">
              Dismiss
            </Button>
            <Button variant="primary" size="sm">
              Apply suggestion
            </Button>
          </>
        }
      >
        Based on the last three encounters, this patient may benefit from an ACE inhibitor at
        discharge. Lisinopril 10 mg PO daily is on the formulary and renal-adjusted for the current
        eGFR.
      </AiSuggest>
    </Page>
  );
}
