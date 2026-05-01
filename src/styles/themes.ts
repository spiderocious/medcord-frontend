/**
 * Theme palettes — surgical-paper, vol. 1.
 * Source of truth: Medcord Design System / preview / _foundation.css : 16-93.
 *
 * To switch themes at runtime, set `document.documentElement.dataset.theme`.
 * Add a new palette here and a matching `[data-theme='name']` block in
 * `globals.css` (or generate it from this map at build time).
 */

export interface ThemePalette {
  // Paper & ink
  paper: string;
  paperDeep: string;
  sheet: string;
  sheetEdge: string;
  ink: string;
  ink2: string;
  ink3: string;
  ink4: string;
  hair: string;
  hairSoft: string;
  rule: string;

  // Apothecary green ramp (single accent)
  green50: string;
  green100: string;
  green200: string;
  green300: string;
  green400: string;
  green500: string;
  green600: string;
  green700: string;
  green800: string;
  green900: string;

  // Clinical state
  crit: string;
  critBg: string;
  critEdge: string;
  warn: string;
  warnBg: string;
  warnEdge: string;
  low: string;
  lowBg: string;
  lowEdge: string;

  // Allergy ribbons
  ribbonAllergy: string;
  ribbonWarn: string;
  ribbonWatch: string;
}

export const themes = {
  default: {
    paper: '#F4EFE6',
    paperDeep: '#ECE5D6',
    sheet: '#FBF7EF',
    sheetEdge: '#D9D0BB',
    ink: '#181613',
    ink2: '#3C3833',
    ink3: '#6E665B',
    ink4: '#A39A8A',
    hair: '#D9D0BB',
    hairSoft: '#E6DFCF',
    rule: '#181613',

    green50: '#F0FDF4',
    green100: '#DCFCE7',
    green200: '#BBF7D0',
    green300: '#86EFAC',
    green400: '#4ADE80',
    green500: '#22C55E',
    green600: '#16A34A',
    green700: '#15803D',
    green800: '#166534',
    green900: '#14532D',

    crit: '#B42318',
    critBg: '#FEF3F2',
    critEdge: '#F2B5AF',
    warn: '#B25E09',
    warnBg: '#FDF6E3',
    warnEdge: '#E8D9A1',
    low: '#5B21B6',
    lowBg: '#F7F2FE',
    lowEdge: '#D8C7F0',

    ribbonAllergy: '#B42318',
    ribbonWarn: '#B25E09',
    ribbonWatch: '#8C6E1D',
  },
} satisfies Record<string, ThemePalette>;

export type ThemeName = keyof typeof themes;
