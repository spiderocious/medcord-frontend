import { Alert } from '@ui/alert';
import { Banner } from '@ui/banner';
import { Button } from '@ui/button';
import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { useToast } from '@ui/toast';

export function FeedbackPreviewScreen() {
  const toast = useToast();

  return (
    <Page>
      <Stamp
        number="V · 02"
        title="Toasts · banners · alerts"
        meta="non-blocking feedback surfaces"
      />

      <SectionBreak label="Banners — typeset rules across the page" />
      <div className="flex flex-col gap-2">
        <Banner eyebrow="PHI" tone="low">
          You are viewing protected health information. Access is logged.
        </Banner>
        <Banner
          eyebrow="System"
          tone="warn"
          action={
            <Button variant="quiet" size="sm">
              View status
            </Button>
          }
        >
          Lab interface is intermittent. Last sync 14:08.
        </Banner>
        <Banner eyebrow="Critical" tone="crit">
          Code blue — 4-N · room 411A. All available providers respond.
        </Banner>
      </div>

      <SectionBreak label="Alerts — indented callouts" />
      <div className="flex flex-col gap-3">
        <Alert title={`"Repeat troponin pending — discharge cannot complete."`} tone="warn">
          The order was placed at 14:08 and is expected to result by 16:30.
        </Alert>
        <Alert title={`"Penicillin allergy on file — anaphylaxis."`} tone="crit">
          Override requires reason and is logged.
        </Alert>
        <Alert title={`"Note signed by Patel, R MD at 14:12."`} tone="ok" />
      </div>

      <SectionBreak label="Toasts — slips on the desk" />
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => toast.push({ title: 'Saved draft.', tone: 'neutral' })}>
          Push neutral toast
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            toast.push({ title: 'Order signed.', body: 'Sent to pharmacy.', tone: 'ok' })
          }
        >
          Push ok toast
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.push({ title: 'Lab interface unreachable.', tone: 'warn' })}
        >
          Push warn toast
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            toast.push({
              title: 'Critical — Troponin 2.10 ng/mL.',
              body: 'Cardiology paged.',
              tone: 'crit',
            })
          }
        >
          Push critical toast
        </Button>
      </div>
    </Page>
  );
}
