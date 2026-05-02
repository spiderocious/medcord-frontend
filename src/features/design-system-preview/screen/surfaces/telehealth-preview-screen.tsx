import { Avatar } from '@ui/avatar';
import { Button } from '@ui/button';
import { Page } from '@ui/page';
import { Pill } from '@ui/pill';
import { PulseDot } from '@ui/pulse-dot';
import { Sheet } from '@ui/sheet';
import { Stamp } from '@ui/stamp';
import { DictatedText, Mark, Overline } from '@ui/typography';

export function TelehealthPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="IV · 04"
        title="Telehealth · video visit"
        meta="the chart sits open beside the video"
      />
      <div className="grid grid-cols-[1fr_320px] gap-5">
        <div className="bg-ink/95 overflow-hidden rounded-card border border-ink text-paper">
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="aspect-[4/3] rounded-paper bg-[radial-gradient(ellipse_at_center,_#3C3833_0%,_#181613_70%)]" />
            <div className="aspect-[4/3] rounded-paper bg-[radial-gradient(ellipse_at_center,_#6E665B_0%,_#181613_70%)]" />
          </div>
          <div className="border-paper/10 text-paper/70 flex items-center gap-3 border-t px-4 py-2 font-mono text-[11px] uppercase tracking-overline">
            <PulseDot />
            <span>Live · 12:42</span>
            <span className="ml-auto">Encrypted</span>
          </div>
          <div className="border-paper/10 text-paper/85 border-t px-4 py-3 font-serif text-[15px] italic leading-[1.5]">
            &ldquo;You said the chest pressure is mostly gone now? Tell me about the walks.&rdquo;
            <br />
            &ldquo;Yeah, twice around the unit. No discomfort. A little tired but otherwise
            OK.&rdquo;
          </div>
          <div className="border-paper/10 flex items-center gap-2 border-t px-4 py-3">
            <Button variant="quiet" size="sm" className="hover:bg-paper/10 text-paper">
              Mute
            </Button>
            <Button variant="quiet" size="sm" className="hover:bg-paper/10 text-paper">
              Camera off
            </Button>
            <Button variant="quiet" size="sm" className="hover:bg-paper/10 text-paper">
              Share screen
            </Button>
            <span className="flex-1" />
            <Button variant="danger" size="sm">
              End visit
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Sheet padding="md">
            <div className="flex items-center gap-3">
              <Avatar subject="patient" size="lg" initials="OA" />
              <div>
                <div className="font-serif text-[18px] font-medium tracking-h text-ink">
                  Adebayo, Olumide
                </div>
                <Mark>MRN 10458291 · 64 M</Mark>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill tone="crit">Penicillin</Pill>
              <Pill tone="ok">Full code</Pill>
            </div>
          </Sheet>

          <Sheet padding="md">
            <Overline>Dictated transcript</Overline>
            <DictatedText className="mt-2">
              Patient reports near-resolution of chest pressure. Tolerating ambulation. Plan to
              continue current regimen and follow up in two weeks.
            </DictatedText>
          </Sheet>
        </div>
      </div>
    </Page>
  );
}
