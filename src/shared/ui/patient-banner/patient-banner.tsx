import { type ReactNode } from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `PatientBanner` — the most important object in Medcord.
 *
 * Reference: 30-banner.html.
 *
 * Stance: full-bleed sheet, ink rules top + bottom (chart-stamp). Name in
 * serif, large; everything else quiets. Allergies are a band, not a pill —
 * they cannot be missed. Code status is etched into the rule.
 */
export type CodeStatus = 'full' | 'dnr' | 'dnr-dni' | 'comfort';

export interface PatientBannerAllergyBand {
  /** What the patient is allergic to. */
  label: string;
  /** Severity. */
  tone: 'allergy' | 'warn' | 'watch';
  /** Reaction descriptor. */
  reaction?: string;
}

export interface PatientBannerProps {
  name: string;
  /** "64 M · DOB 1962-03-14" etc. */
  identity: string;
  /** Mono record string (MRN, ENC). */
  records: ReactNode;
  /** Mono attending pill. */
  attending?: string;
  /** Bed / unit. */
  bed?: string;
  /** Chief complaint, italic dictation-style. */
  complaint?: ReactNode;
  /** Inline vitals slot — typically a row of `<VitalsReadout>`. */
  vitals?: ReactNode;
  /** Allergy ribbons that wrap the banner. */
  allergyBands?: ReadonlyArray<PatientBannerAllergyBand>;
  codeStatus?: CodeStatus;
  className?: string;
}

const CODE_LABEL: Record<CodeStatus, string> = {
  full: 'FULL CODE',
  dnr: 'DNR',
  'dnr-dni': 'DNR / DNI',
  comfort: 'COMFORT MEASURES',
};

const BAND_TONE: Record<PatientBannerAllergyBand['tone'], string> = {
  allergy: 'bg-ribbon-allergy text-white',
  warn: 'bg-ribbon-warn text-white',
  watch: 'bg-ribbon-watch text-white',
};

export function PatientBanner({
  name,
  identity,
  records,
  attending,
  bed,
  complaint,
  vitals,
  allergyBands = [],
  codeStatus = 'full',
  className,
}: PatientBannerProps) {
  return (
    <div className={cn('border-y-2 border-ink bg-sheet', className)}>
      {allergyBands.map((band, index) => (
        <div
          key={`${band.label}-${index}`}
          className={cn(
            'flex items-center gap-3 px-6 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-overline',
            BAND_TONE[band.tone],
          )}
        >
          <span className="font-bold">
            {band.tone === 'allergy' ? 'ALLERGY' : band.tone === 'warn' ? 'PRECAUTION' : 'ADVISORY'}
          </span>
          <span>{band.label}</span>
          {band.reaction ? <span className="opacity-80">· {band.reaction}</span> : null}
        </div>
      ))}
      <div className="grid grid-cols-[1fr_auto] items-end gap-6 px-6 py-5">
        <div>
          <h2 className="m-0 font-serif text-[36px] font-medium leading-[1.05] tracking-display text-ink">
            {name}
          </h2>
          <div className="mt-2 font-mono text-[12px] tabular-nums tracking-mono text-ink-3">
            {identity}
          </div>
          <div className="mt-1 font-mono text-[11px] tabular-nums tracking-mono text-ink-3">
            {records}
          </div>
          {complaint ? (
            <p className="m-0 mt-3 max-w-[60ch] font-serif text-[15px] italic leading-[1.45] text-ink-2">
              &ldquo;{complaint}&rdquo;
            </p>
          ) : null}
        </div>
        {vitals ? <div className="flex items-end gap-6">{vitals}</div> : null}
      </div>
      <div className="flex items-center gap-4 border-t border-ink px-6 py-2 font-mono text-[10px] uppercase tracking-overline text-ink">
        <span className="font-bold">{CODE_LABEL[codeStatus]}</span>
        {bed ? <span className="text-ink-3">· {bed}</span> : null}
        {attending ? <span className="text-ink-3">· attending {attending}</span> : null}
      </div>
    </div>
  );
}
