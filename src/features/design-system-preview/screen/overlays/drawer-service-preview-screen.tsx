import { Button } from '@ui/button';
import { Card } from '@ui/card';
import { DrawerService } from '@ui/drawer-service';
import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Stack } from '@ui/layout';
import { Stamp } from '@ui/stamp';
import { TextField } from '@ui/text-field';
import { Mark, Overline } from '@ui/typography';

/**
 * Overlays · DrawerService — launcher.
 *
 * Mirrors the launcher matrix from
 * `ohlify/backend/apps/customer-web/src/features/component-preview/screen/component-preview-screen.tsx`
 * (the five `DrawerService — *` sections).
 *
 * Every button below imperatively calls a method on `DrawerService`. The
 * actual rendering happens inside `<ModalHost />` and `<ToastHost />`
 * mounted in `app.provider.tsx`.
 */
export function DrawerServicePreviewScreen() {
  return (
    <Page>
      <Stamp
        number="V · 05"
        title="DrawerService · launcher"
        meta="imperative modals + toasts, mounted once at the app root"
      />
      <p className="m-0 mb-9 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        <code className="font-mono text-[12px] text-ink">DrawerService</code> is the singleton used
        to fire modals and toasts from anywhere in the app — no provider context to wire up, no
        per-call mount/unmount. Every method returns a{' '}
        <code className="font-mono text-[12px] text-ink">DrawerHandle</code> with{' '}
        <code className="font-mono text-[12px] text-ink">dismiss()</code> and{' '}
        <code className="font-mono text-[12px] text-ink">onDismissed</code> (a promise that resolves
        when the panel finishes its dismiss animation).
      </p>

      <SectionBreak label="Feedback modal" />
      <Note>
        <code className="font-mono text-[12px] text-ink">position</code> anchors the panel:{' '}
        <code className="font-mono text-[12px] text-ink">center</code> dialog ·{' '}
        <code className="font-mono text-[12px] text-ink">top</code> banner ·{' '}
        <code className="font-mono text-[12px] text-ink">bottom</code> sheet (right drawer ≥lg) ·{' '}
        <code className="font-mono text-[12px] text-ink">fullscreen</code> takeover.
      </Note>
      <Row>
        <Button
          onClick={() =>
            DrawerService.showFeedbackModal(
              'Discharge complete',
              'Adebayo, O has been marked as discharged. The chart is now read-only.',
              { kind: 'success', position: 'center' },
            )
          }
        >
          Center · success
        </Button>
        <Button
          onClick={() =>
            DrawerService.showFeedbackModal('Could not save note', 'Please try again later.', {
              kind: 'error',
              position: 'center',
            })
          }
        >
          Center · error
        </Button>
        <Button
          onClick={() =>
            DrawerService.showFeedbackModal(
              'Heads up',
              'You have one unsigned note in this chart.',
              {
                kind: 'warning',
                position: 'top',
              },
            )
          }
        >
          Top · warning
        </Button>
        <Button
          onClick={() =>
            DrawerService.showFeedbackModal(
              'Did you know?',
              'You can favorite a patient with the star icon at the top of the chart.',
              { kind: 'info', position: 'bottom' },
            )
          }
        >
          Bottom · info
        </Button>
        <Button
          onClick={() =>
            DrawerService.showFeedbackModal(
              'Patient registered',
              'Adebayo, O is now in the system with patient code CAE-3F8K-2P9X. Print or send the ID card next.',
              {
                kind: 'success',
                position: 'fullscreen',
                showCloseButton: false,
                confirmButtonText: 'Print ID card',
                actionLabel: 'Send via email',
              },
            )
          }
        >
          Fullscreen · success
        </Button>
        <Button
          onClick={() =>
            DrawerService.showFeedbackModal('Auto-dismiss', 'This will dismiss itself in 2s.', {
              kind: 'info',
              autoDismiss: true,
              autoDismissDuration: 2000,
            })
          }
        >
          Auto-dismiss · 2s
        </Button>
      </Row>

      <SectionBreak label="Confirmation modal" />
      <Row>
        <Button
          onClick={() =>
            DrawerService.showConfirmationModal(
              'Continue with the discharge?',
              'You can come back to the chart later if needed.',
              { kind: 'neutral', confirmButtonText: 'Yes, continue' },
            )
          }
        >
          Center · neutral
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            DrawerService.showConfirmationModal(
              'Discharge against medical advice?',
              'This action will be logged to the audit record with your name, time, and workstation. The patient must sign the AMA waiver before leaving.',
              {
                kind: 'error',
                destructive: true,
                confirmButtonText: 'Discharge AMA',
                cancelButtonText: 'Cancel',
              },
            )
          }
        >
          Center · destructive
        </Button>
        <Button
          onClick={() =>
            DrawerService.showConfirmationModal(
              'Discard changes?',
              'Your edits to this note will be lost.',
              { kind: 'warning', position: 'top', confirmButtonText: 'Discard' },
            )
          }
        >
          Top · warning
        </Button>
        <Button
          onClick={() =>
            DrawerService.showConfirmationModal(
              'Switch unit',
              'Pick a unit to filter the worklist.',
              { kind: 'info', position: 'bottom', confirmButtonText: 'Switch' },
            )
          }
        >
          Bottom · info
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            DrawerService.showConfirmationModal(
              'Permanently delete this patient record?',
              'This cannot be undone. All chart data will be removed.',
              {
                kind: 'error',
                destructive: true,
                position: 'fullscreen',
                confirmButtonText: 'Yes, delete',
                cancelButtonText: 'Keep record',
              },
            )
          }
        >
          Fullscreen · destructive
        </Button>
      </Row>

      <SectionBreak label="Input modal" />
      <Row>
        <Button
          onClick={() =>
            DrawerService.showInputModal(
              'Edit display name',
              'This is what staff see on your profile.',
              {
                placeholder: 'Patel, Riya MD',
                confirmButtonText: 'Save',
                onConfirm: (value) =>
                  DrawerService.toast(`Saved as "${value}".`, { type: 'success' }),
              },
            )
          }
        >
          Center · text
        </Button>
        <Button
          onClick={() =>
            DrawerService.showInputModal(
              'New email address',
              'We will send a one-time code to verify.',
              { inputType: 'email', placeholder: 'you@example.com', position: 'top' },
            )
          }
        >
          Top · email
        </Button>
        <Button
          onClick={() =>
            DrawerService.showInputModal('Note', 'Add an addendum to the signed progress note.', {
              multiline: true,
              placeholder: 'Addendum…',
              position: 'bottom',
              confirmButtonText: 'Add addendum',
            })
          }
        >
          Bottom · multiline
        </Button>
        <Button
          onClick={() =>
            DrawerService.showInputModal(
              'Override PIN',
              'Enter your prescriber PIN to override the allergy warning.',
              {
                inputType: 'password',
                placeholder: '••••',
                position: 'fullscreen',
                stepLabel: 'Step 1 / 2',
                pattern: /^\d{4}$/,
                errorMessage: 'PIN must be 4 digits.',
              },
            )
          }
        >
          Fullscreen · password (validated)
        </Button>
      </Row>

      <SectionBreak label="Custom modal" />
      <Row>
        <Button
          onClick={() =>
            DrawerService.showCustomModal(
              'Add allergy',
              (close) => (
                <Stack gap="md">
                  <TextField label="Substance" placeholder="Penicillin" autoFocus />
                  <TextField label="Reaction" placeholder="Anaphylaxis" />
                  <Button
                    variant="primary"
                    className="w-full justify-center"
                    onClick={() => {
                      close();
                      DrawerService.toast('Allergy added to chart.', { type: 'success' });
                    }}
                  >
                    Add to chart
                  </Button>
                </Stack>
              ),
              { position: 'center' },
            )
          }
        >
          Center
        </Button>
        <Button
          onClick={() =>
            DrawerService.showCustomModal(
              'Filter worklist',
              () => (
                <Stack gap="md">
                  <TextField label="MRN" mono placeholder="10458291" />
                  <TextField label="Attending" placeholder="Patel, R MD" />
                  <Button variant="primary" className="w-full justify-center">
                    Apply
                  </Button>
                </Stack>
              ),
              { position: 'top' },
            )
          }
        >
          Top
        </Button>
        <Button
          onClick={() =>
            DrawerService.showCustomModal(
              'Order details',
              (close) => (
                <Stack gap="md">
                  <div>
                    <Overline>Drug</Overline>
                    <p className="m-0 mt-1 font-serif text-[18px] tracking-h">
                      Lisinopril 10 mg PO daily
                    </p>
                  </div>
                  <div>
                    <Overline>Indication</Overline>
                    <p className="m-0 mt-1 text-[13px] text-ink-2">
                      Hypertension. Renal-adjusted for current eGFR.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    className="w-full justify-center"
                    onClick={() => {
                      close();
                      DrawerService.toast('Order signed.', { type: 'success' });
                    }}
                  >
                    Sign order
                  </Button>
                </Stack>
              ),
              { position: 'bottom' },
            )
          }
        >
          Bottom (sheet · drawer ≥lg)
        </Button>
        <Button
          onClick={() =>
            DrawerService.showCustomModal(
              'Two-person verification',
              (close) => (
                <Stack gap="md">
                  <p className="m-0 text-[13px] leading-[1.55] text-ink-2">
                    Both prescriber and witness must enter their PINs to override the allergy
                    warning.
                  </p>
                  <TextField label="Prescriber PIN" type="password" placeholder="••••" mono />
                  <TextField label="Witness PIN" type="password" placeholder="••••" mono />
                  <Button
                    variant="primary"
                    className="w-full justify-center"
                    onClick={() => {
                      close();
                      DrawerService.toast('Override accepted. Logged to audit.', {
                        type: 'success',
                      });
                    }}
                  >
                    Verify and override
                  </Button>
                </Stack>
              ),
              { position: 'fullscreen' },
            )
          }
        >
          Fullscreen
        </Button>
      </Row>

      <SectionBreak label="Toasts" />
      <Row>
        <Button onClick={() => DrawerService.toast('Note signed.', { type: 'success' })}>
          Toast · success
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            DrawerService.toast('Could not reach the lab interface.', { type: 'error' })
          }
        >
          Toast · error
        </Button>
        <Button onClick={() => DrawerService.toast('Critical TROP-I result.', { type: 'warning' })}>
          Toast · warning
        </Button>
        <Button
          onClick={() =>
            DrawerService.toast('Saved as draft.', { type: 'info', position: 'bottom' })
          }
        >
          Toast · info (bottom)
        </Button>
        <Button
          onClick={() =>
            DrawerService.toast('Network is offline.', { type: 'warning', sticky: true })
          }
        >
          Toast · sticky
        </Button>
        <Button
          onClick={() =>
            DrawerService.toast('Code blue — 4-N · room 411A.', {
              type: 'error',
              fullWidth: true,
              position: 'top',
              sticky: true,
            })
          }
        >
          Toast · full-bleed top
        </Button>
        <Button variant="quiet" onClick={() => DrawerService.dismissAllToasts()}>
          Dismiss all toasts
        </Button>
      </Row>

      <SectionBreak label="Promise-style flow" />
      <Card eyebrow={<Mark>Pattern</Mark>} title="onDismissed → next step">
        <p className="m-0 text-[13px] leading-[1.6] text-ink-2">
          Every <code className="font-mono text-[12px] text-ink">DrawerService.show*</code> method
          returns a handle whose <code className="font-mono text-[12px] text-ink">onDismissed</code>{' '}
          resolves when the modal closes. Chain it to fire a follow-up toast or open the next step
          in a flow.
        </p>
        <div className="mt-3">
          <Button
            onClick={async () => {
              await DrawerService.showFeedbackModal(
                'Step 1 done',
                'Click the action below to chain into a toast.',
                {
                  kind: 'success',
                  confirmButtonText: 'Continue',
                  actionLabel: 'Skip for now',
                },
              ).onDismissed;
              DrawerService.toast('Followed up after the modal closed.', { type: 'info' });
            }}
          >
            Open then chain
          </Button>
        </div>
      </Card>

      <SectionBreak label="Bulk dismiss" />
      <Row>
        <Button variant="quiet" onClick={() => DrawerService.dismissAllModals()}>
          Dismiss all modals
        </Button>
        <Button variant="quiet" onClick={() => DrawerService.dismissAll()}>
          Dismiss all (modals + toasts)
        </Button>
      </Row>
    </Page>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="m-0 mb-3 text-[13px] text-ink-3">{children}</p>;
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}
