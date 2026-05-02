import { Page } from '@ui/page';
import { PatientBanner } from '@ui/patient-banner';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Overline } from '@ui/typography';
import { VitalsReadout } from '@ui/vitals-readout';

function VitalsCluster() {
  return (
    <>
      <div>
        <Overline>HR</Overline>
        <VitalsReadout size="md" unit="bpm">
          76
        </VitalsReadout>
      </div>
      <div>
        <Overline>BP</Overline>
        <VitalsReadout size="md">128/82</VitalsReadout>
      </div>
      <div>
        <Overline>SpO₂</Overline>
        <VitalsReadout size="md" unit="%">
          98
        </VitalsReadout>
      </div>
      <div>
        <Overline>Temp</Overline>
        <VitalsReadout size="md" unit="°F">
          98.6
        </VitalsReadout>
      </div>
    </>
  );
}

export function BannerPreviewScreen() {
  return (
    <Page>
      <Stamp number="IV · 01" title="Patient banner" meta="the page-header of every chart" />
      <p className="m-0 mb-6 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        Allergies are a band. Code status is etched into the bottom rule, mono and bold. Vitals
        appear inline, mono, large, with a single pill-bar showing trend.
      </p>

      <SectionBreak label="Admitted · with allergies" />
      <PatientBanner
        name="Adebayo, Olumide"
        identity="64 M · DOB 1962-03-14"
        records="MRN 10458291 · ENC-2026-04-29-1184"
        attending="Patel, R MD"
        bed="3-N · 312A"
        complaint="Crushing chest pressure × 30 min, sweating, nausea. Last meal at four in the morning."
        vitals={<VitalsCluster />}
        allergyBands={[
          { tone: 'allergy', label: 'Penicillin', reaction: 'anaphylaxis' },
          { tone: 'warn', label: 'Sulfa', reaction: 'rash' },
        ]}
        codeStatus="full"
      />

      <SectionBreak label="DNR · admitted, no allergies" />
      <PatientBanner
        name="Reyes, Maritza"
        identity="78 F · DOB 1947-11-02"
        records="MRN 10112237 · ENC-2026-05-01-0902"
        attending="Ozawa, K MD"
        bed="4-N · 411A"
        codeStatus="dnr"
      />

      <SectionBreak label="Comfort measures" />
      <PatientBanner
        name="Singh, Ravi"
        identity="84 M · DOB 1941-06-18"
        records="MRN 10097842 · ENC-2026-05-01-0817"
        attending="Ozawa, K MD"
        bed="Hospice · 511C"
        codeStatus="comfort"
      />
    </Page>
  );
}
