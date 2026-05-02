import { useState } from 'react';

import { Button } from '@ui/button';
import { Drawer } from '@ui/drawer';
import { Modal } from '@ui/modal';
import { Page } from '@ui/page';
import { PinInput } from '@ui/pin-input';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';

export function ModalsPreviewScreen() {
  const [open, setOpen] = useState<null | 'default' | 'critical' | 'verify' | 'glass' | 'drawer'>(
    null,
  );
  const [pin, setPin] = useState('');

  return (
    <Page>
      <Stamp number="V · 01" title="Modals" meta="sheets fastened to the desk with a paper clip" />

      <SectionBreak label="Triggers" />
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setOpen('default')}>Confirm — default</Button>
        <Button variant="danger" onClick={() => setOpen('critical')}>
          Critical — discharge AMA
        </Button>
        <Button variant="secondary" onClick={() => setOpen('verify')}>
          Two-person verify
        </Button>
        <Button variant="primary" onClick={() => setOpen('glass')}>
          Break-the-glass
        </Button>
        <Button variant="quiet" onClick={() => setOpen('drawer')}>
          Open drawer
        </Button>
      </div>

      <Modal
        open={open === 'default'}
        onClose={() => setOpen(null)}
        title="Discharge patient?"
        eyebrow="Confirm"
        footer={
          <>
            <span className="flex-1" />
            <Button variant="quiet" onClick={() => setOpen(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(null)}>
              Discharge
            </Button>
          </>
        }
      >
        <p className="m-0 text-[14px] leading-[1.55] text-ink-2">
          The patient will be marked as discharged at the current timestamp. The discharge note must
          be signed first; this only marks the chart.
        </p>
      </Modal>

      <Modal
        open={open === 'critical'}
        onClose={() => setOpen(null)}
        variant="critical"
        title="Discharge against medical advice"
        meta="logged to audit"
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(null)}>
              Cancel
            </Button>
            <span className="flex-1" />
            <Button variant="danger" onClick={() => setOpen(null)}>
              Discharge AMA
            </Button>
          </>
        }
      >
        <p className="m-0 text-[14px] leading-[1.55] text-ink-2">
          The patient is leaving against the recommendation of their care team. This action will be
          logged to the audit record with your name, time, and workstation. The patient must sign
          the AMA waiver before leaving.
        </p>
      </Modal>

      <Modal
        open={open === 'verify'}
        onClose={() => setOpen(null)}
        variant="verify"
        title="Two-person verification"
        eyebrow="Override"
        width="640px"
        footer={
          <>
            <span className="flex-1" />
            <Button variant="quiet" onClick={() => setOpen(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(null)}>
              Both verified — sign
            </Button>
          </>
        }
      >
        <div>
          <h4 className="m-0 mb-2 font-serif text-[15px] font-medium tracking-h">Prescriber</h4>
          <p className="m-0 mb-2 text-[12px] text-ink-3">Patel, R MD</p>
          <PinInput length={4} value={pin} onChange={setPin} ariaLabel="Prescriber PIN" />
        </div>
        <div className="border-l border-hair pl-6">
          <h4 className="m-0 mb-2 font-serif text-[15px] font-medium tracking-h">Witness</h4>
          <p className="m-0 mb-2 text-[12px] text-ink-3">Kim, S NP</p>
          <PinInput length={4} value="" onChange={() => undefined} ariaLabel="Witness PIN" />
        </div>
      </Modal>

      <Modal
        open={open === 'glass'}
        onClose={() => setOpen(null)}
        variant="glass"
        title="Break-the-glass access"
        eyebrow="Restricted chart"
        footer={
          <>
            <Button variant="quiet" onClick={() => setOpen(null)}>
              Cancel
            </Button>
            <span className="flex-1" />
            <Button variant="primary" onClick={() => setOpen(null)}>
              Open chart
            </Button>
          </>
        }
      >
        <p className="m-0 text-[14px] leading-[1.55] text-ink-2">
          This chart is restricted (VIP / employee / sensitive). Provide a clinical justification
          for emergency access. The access is flagged for review by compliance.
        </p>
        <textarea
          placeholder="Reason for access…"
          className="mt-3 w-full resize-y rounded-card border border-ink bg-paper px-3 py-2 font-sans text-[13px] outline-none"
          rows={3}
        />
      </Modal>

      <Drawer
        open={open === 'drawer'}
        onClose={() => setOpen(null)}
        title="Order details"
        footer={
          <>
            <span className="flex-1" />
            <Button variant="quiet" onClick={() => setOpen(null)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setOpen(null)}>
              Sign order
            </Button>
          </>
        }
      >
        <p className="m-0 text-[14px] leading-[1.55] text-ink-2">
          Drawer panels live on the right rail. Use them for inspector views: order details, patient
          summary, audit history.
        </p>
      </Drawer>
    </Page>
  );
}
