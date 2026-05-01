import { Page } from '@ui/page';
import { Stamp } from '@ui/stamp';
import { Sheet } from '@ui/sheet';
import { Stack } from '@ui/layout';
import { DictatedText, Mark, Overline, RecordNumber } from '@ui/typography';

/**
 * Welcome — the landing page of the playground. A short specimen that
 * proves the tokens, fonts, and Foundation primitives are wired correctly.
 */
export function WelcomePreviewScreen() {
  return (
    <Page>
      <Stamp number="—" title="Welcome" meta="surgical-paper · vol. 1" />

      <p className="mb-9 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        The design system is a single piece of paper on the desk. Use the rail
        on the left to walk through the parts. Each entry mirrors a specimen
        in the source <span className="font-mono">Medcord Design System</span> repo and
        is composed from the React primitives in <span className="font-mono">@shared/ui</span>.
      </p>

      <Sheet padding="md" className="max-w-[680px]">
        <Stack gap="md">
          <Overline>Progress note · 14:08</Overline>
          <h3 className="m-0 font-serif text-[22px] font-medium tracking-h">
            Adebayo, Olumide{' '}
            <span className="font-normal text-ink-3">— f/u for chest pressure</span>
          </h3>
          <RecordNumber>
            MRN 10458291 · ENC-2026-04-29-1184 · 64 M · DOB 1962-03-14
          </RecordNumber>
          <DictatedText>
            &ldquo;Pressure is gone now. Walked the unit twice without symptoms. He&rsquo;d
            like to know when he can go home.&rdquo;
          </DictatedText>
          <p className="m-0 leading-[1.55] text-ink-2">
            Vitals stable. Repeat troponin pending. ECG unchanged from prior. Plan to
            discharge after the 6h trop, with follow-up in cardiology clinic.
          </p>
          <div className="mt-2 flex gap-5 border-t border-hair pt-3.5">
            <div>
              <Overline>HR</Overline>
              <div className="font-mono text-[20px] font-medium leading-[0.95] tabular-nums tracking-[-0.02em] text-ink">
                76<span className="ml-1 font-sans text-[8px] tracking-wide text-ink-3">bpm</span>
              </div>
            </div>
            <div>
              <Overline>BP</Overline>
              <div className="font-mono text-[20px] font-medium leading-[0.95] tabular-nums tracking-[-0.02em] text-ink">
                128/82
              </div>
            </div>
            <div>
              <Overline>SpO₂</Overline>
              <div className="font-mono text-[20px] font-medium leading-[0.95] tabular-nums tracking-[-0.02em] text-ink">
                98<span className="ml-1 font-sans text-[8px] tracking-wide text-ink-3">%</span>
              </div>
            </div>
            <div>
              <Overline>Temp</Overline>
              <div className="font-mono text-[20px] font-medium leading-[0.95] tabular-nums tracking-[-0.02em] text-ink">
                98.6<span className="ml-1 font-sans text-[8px] tracking-wide text-ink-3">°F</span>
              </div>
            </div>
          </div>
          <Mark>MRN · ENC · ICD-10</Mark>
        </Stack>
      </Sheet>
    </Page>
  );
}
