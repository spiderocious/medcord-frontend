/**
 * The TOC structure mirrors `Medcord Design System / projects / medcord / index.html`
 * lines 192-234 (the `PARTS` array). Each entry maps to a nested route under
 * `/design-system`. Volume number + name match the source so the rail reads the same.
 */

export interface PreviewItem {
  name: string;
  /** Path segment relative to `/design-system`. Empty string = part landing. */
  path: string;
  /** Source HTML the React preview is faithful to. */
  reference: string;
}

export interface PreviewPart {
  id: 'I' | 'II' | 'III' | 'IV' | 'V';
  title: string;
  /** Path segment for the part landing route under `/design-system`. */
  path: string;
  items: PreviewItem[];
}

export const PREVIEW_PARTS: readonly PreviewPart[] = [
  {
    id: 'I',
    title: 'Foundation',
    path: 'foundation',
    items: [
      { name: 'Welcome', path: '', reference: 'index.html' },
      { name: 'Palette', path: 'palette', reference: 'preview/01-palette.html' },
      { name: 'Type', path: 'type', reference: 'preview/02-type.html' },
      { name: 'Spacing & geometry', path: 'geometry', reference: 'preview/03-geometry.html' },
      { name: 'Motion', path: 'motion', reference: 'preview/04-motion.html' },
    ],
  },
  {
    id: 'II',
    title: 'Primitives',
    path: 'primitives',
    items: [
      { name: 'Buttons', path: 'buttons', reference: 'preview/10-buttons.html' },
      {
        name: 'Inputs · vitals & dosage',
        path: 'inputs',
        reference: 'preview/11-inputs.html',
      },
      { name: 'Selection', path: 'selection', reference: 'preview/12-selection.html' },
      { name: 'Date & time', path: 'datetime', reference: 'preview/13-datetime.html' },
      {
        name: 'Specialized inputs',
        path: 'specialized',
        reference: 'preview/14-specialized.html',
      },
    ],
  },
  {
    id: 'III',
    title: 'Data & state',
    path: 'data-state',
    items: [
      { name: 'Tables', path: 'tables', reference: 'preview/20-tables.html' },
      { name: 'Lab specimen', path: 'lab', reference: 'preview/21-lab.html' },
      { name: 'Vitals · MAR', path: 'vitals', reference: 'preview/22-vitals.html' },
      { name: 'Charts', path: 'charts', reference: 'preview/23-charts.html' },
      { name: 'Progress', path: 'progress', reference: 'preview/24-progress.html' },
      {
        name: 'Skeletons & empty',
        path: 'skeletons-empty',
        reference: 'preview/25-skeletons-empty.html',
      },
      {
        name: 'Avatars · pills · status',
        path: 'avatars-pills',
        reference: 'preview/26-avatars-pills.html',
      },
      { name: 'Cards', path: 'cards', reference: 'preview/27-cards.html' },
      {
        name: 'Tooltips · hovercards',
        path: 'tooltips',
        reference: 'preview/28-tooltips.html',
      },
      {
        name: 'Navigation · shell · ⌘K',
        path: 'navigation',
        reference: 'preview/29-navigation.html',
      },
    ],
  },
  {
    id: 'IV',
    title: 'Surfaces',
    path: 'surfaces',
    items: [
      { name: 'Patient banner', path: 'banner', reference: 'preview/30-banner.html' },
      { name: 'Bed board', path: 'bed-board', reference: 'preview/31-bed-board.html' },
      { name: 'EMR · chart open', path: 'emr', reference: 'preview/32-emr.html' },
      {
        name: 'Telehealth · video visit',
        path: 'telehealth',
        reference: 'preview/33-telehealth.html',
      },
      {
        name: 'Equipment · biomed log',
        path: 'equipment',
        reference: 'preview/34-equipment.html',
      },
      { name: 'Staff & schedule', path: 'staff', reference: 'preview/35-staff.html' },
      {
        name: 'Patient registration',
        path: 'registration',
        reference: 'preview/36-registration.html',
      },
    ],
  },
  {
    id: 'V',
    title: 'Overlays & system',
    path: 'overlays',
    items: [
      { name: 'Modals', path: 'modals', reference: 'preview/40-modals.html' },
      {
        name: 'Toasts · banners · alerts',
        path: 'feedback',
        reference: 'preview/41-feedback.html',
      },
      {
        name: 'Cross-record patterns',
        path: 'cross',
        reference: 'preview/42-cross.html',
      },
      { name: 'Iconography', path: 'icons', reference: 'preview/43-icons.html' },
    ],
  },
] as const;

export interface FlatPreviewLeaf extends PreviewItem {
  partId: PreviewPart['id'];
  partTitle: PreviewPart['title'];
  partPath: PreviewPart['path'];
  /** Full path under `/design-system`. */
  absPath: string;
}

export const PREVIEW_LEAVES: readonly FlatPreviewLeaf[] = PREVIEW_PARTS.flatMap((part) =>
  part.items.map<FlatPreviewLeaf>((item) => ({
    ...item,
    partId: part.id,
    partTitle: part.title,
    partPath: part.path,
    absPath: item.path ? `/design-system/${part.path}/${item.path}` : `/design-system/${part.path}`,
  })),
);
