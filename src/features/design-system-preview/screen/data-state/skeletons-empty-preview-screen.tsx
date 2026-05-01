import { Button } from '@ui/button';
import { EmptyState } from '@ui/empty-state';
import { ErrorState } from '@ui/error-state';
import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Skeleton } from '@ui/skeleton';
import { Stamp } from '@ui/stamp';

export function SkeletonsEmptyPreviewScreen() {
  return (
    <Page>
      <Stamp number="III · 05" title="Skeletons & empty" meta="three states of any async surface" />

      <SectionBreak label="Skeleton — paper grain" />
      <div className="flex flex-col gap-3 rounded-card border border-hair bg-sheet p-5">
        <Skeleton w="40%" h="14px" />
        <Skeleton w="80%" h="10px" />
        <Skeleton w="64%" h="10px" />
        <div className="mt-2 flex items-center gap-3">
          <Skeleton circle h="32px" w="32px" />
          <Skeleton w="120px" h="10px" />
        </div>
      </div>

      <SectionBreak label="Empty" />
      <EmptyState
        title={`"No labs returned for this encounter yet. The pulled-up roster is empty by intention."`}
        detail="Check back after 14:30 when the morning batch posts."
        action={
          <Button variant="quiet" size="sm">
            Refresh
          </Button>
        }
      />

      <SectionBreak label="Error" />
      <ErrorState
        title={`"Could not reach the lab interface. The chart is shown without today's results."`}
        detail="Last successful sync at 12:08. Retry, or hand the page to biomed."
        action={
          <Button variant="secondary" size="sm">
            Retry
          </Button>
        }
      />
    </Page>
  );
}
