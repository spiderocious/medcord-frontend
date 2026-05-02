import {
  Activity,
  AlarmClock,
  Bell,
  Calendar as CalendarIcon,
  ChartGlyph,
  ClipboardList,
  CrutchGlyph,
  DripGlyph,
  FileText,
  HeartPulseGlyph,
  MedcordIcon,
  IvBagGlyph,
  PillGlyph,
  Printer,
  RibbonGlyph,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  StethoscopeGlyph,
  StretcherGlyph,
  SyringeGlyph,
  User,
  VialGlyph,
} from '@icons';
import { Page } from '@ui/page';
import { SectionBreak } from '@ui/section-break';
import { Stamp } from '@ui/stamp';
import { Mark } from '@ui/typography';

export function IconsPreviewScreen() {
  return (
    <Page>
      <Stamp
        number="V · 04"
        title="Iconography"
        meta="lucide line icons + clinical glyphs · 1.5 px stroke"
      />
      <p className="m-0 mb-7 max-w-[62ch] text-[14px] leading-[1.6] text-ink-2">
        Use the <code className="font-mono text-[12px] text-ink">{'<MedcordIcon as={…} />'}</code>{' '}
        wrapper for everything. It enforces the system stroke width, rounded caps and{' '}
        <code className="font-mono text-[12px] text-ink">currentColor</code>. Healthcare-specific
        glyphs that aren&rsquo;t in Lucide are hand-drawn into the same proxy and exported
        alongside.
      </p>

      <SectionBreak label="Sizes" />
      <div className="flex items-end gap-8">
        <Cell label="sm · 16">
          <MedcordIcon as={Stethoscope} size="sm" />
        </Cell>
        <Cell label="md · 20">
          <MedcordIcon as={Stethoscope} size="md" />
        </Cell>
        <Cell label="lg · 24">
          <MedcordIcon as={Stethoscope} size="lg" />
        </Cell>
        <Cell label="xl · 32">
          <MedcordIcon as={Stethoscope} size="xl" />
        </Cell>
      </div>

      <SectionBreak label="Lucide — UI / chrome" />
      <Grid>
        <IconCell name="Activity">
          <MedcordIcon as={Activity} />
        </IconCell>
        <IconCell name="AlarmClock">
          <MedcordIcon as={AlarmClock} />
        </IconCell>
        <IconCell name="Bell">
          <MedcordIcon as={Bell} />
        </IconCell>
        <IconCell name="Calendar">
          <MedcordIcon as={CalendarIcon} />
        </IconCell>
        <IconCell name="ClipboardList">
          <MedcordIcon as={ClipboardList} />
        </IconCell>
        <IconCell name="FileText">
          <MedcordIcon as={FileText} />
        </IconCell>
        <IconCell name="Printer">
          <MedcordIcon as={Printer} />
        </IconCell>
        <IconCell name="Search">
          <MedcordIcon as={Search} />
        </IconCell>
        <IconCell name="Settings">
          <MedcordIcon as={Settings} />
        </IconCell>
        <IconCell name="ShieldCheck">
          <MedcordIcon as={ShieldCheck} />
        </IconCell>
        <IconCell name="Stethoscope">
          <MedcordIcon as={Stethoscope} />
        </IconCell>
        <IconCell name="User">
          <MedcordIcon as={User} />
        </IconCell>
      </Grid>

      <SectionBreak label="Clinical glyphs (custom)" />
      <Grid>
        <IconCell name="StethoscopeGlyph">
          <MedcordIcon as={StethoscopeGlyph} />
        </IconCell>
        <IconCell name="SyringeGlyph">
          <MedcordIcon as={SyringeGlyph} />
        </IconCell>
        <IconCell name="PillGlyph">
          <MedcordIcon as={PillGlyph} />
        </IconCell>
        <IconCell name="IvBagGlyph">
          <MedcordIcon as={IvBagGlyph} />
        </IconCell>
        <IconCell name="DripGlyph">
          <MedcordIcon as={DripGlyph} />
        </IconCell>
        <IconCell name="HeartPulseGlyph">
          <MedcordIcon as={HeartPulseGlyph} />
        </IconCell>
        <IconCell name="StretcherGlyph">
          <MedcordIcon as={StretcherGlyph} />
        </IconCell>
        <IconCell name="CrutchGlyph">
          <MedcordIcon as={CrutchGlyph} />
        </IconCell>
        <IconCell name="ChartGlyph">
          <MedcordIcon as={ChartGlyph} />
        </IconCell>
        <IconCell name="VialGlyph">
          <MedcordIcon as={VialGlyph} />
        </IconCell>
        <IconCell name="RibbonGlyph">
          <MedcordIcon as={RibbonGlyph} />
        </IconCell>
      </Grid>

      <SectionBreak label="Tones — color carries meaning" />
      <div className="flex items-center gap-6">
        <Cell label="ink">
          <MedcordIcon as={HeartPulseGlyph} className="text-ink" size="lg" />
        </Cell>
        <Cell label="warn">
          <MedcordIcon as={HeartPulseGlyph} className="text-warn" size="lg" />
        </Cell>
        <Cell label="crit">
          <MedcordIcon as={HeartPulseGlyph} className="text-crit" size="lg" />
        </Cell>
        <Cell label="low">
          <MedcordIcon as={HeartPulseGlyph} className="text-low" size="lg" />
        </Cell>
        <Cell label="green-700">
          <MedcordIcon as={HeartPulseGlyph} className="text-green-700" size="lg" />
        </Cell>
      </div>
    </Page>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 text-ink">
      {children}
      <Mark>{label}</Mark>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-6 gap-x-4 gap-y-6">{children}</div>;
}

function IconCell({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 text-ink">
      <div className="flex h-10 w-10 items-center justify-center rounded-card border border-hair bg-sheet">
        {children}
      </div>
      <Mark>{name}</Mark>
    </div>
  );
}
