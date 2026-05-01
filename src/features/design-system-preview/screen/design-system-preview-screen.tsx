import { PreviewStage } from './parts/preview-stage';
import { PreviewToc } from './parts/preview-toc';

/**
 * The shell of the design-system playground. Mirrors the two-column layout
 * defined at `Medcord Design System / projects / medcord / index.html`
 * (`.shell` block, lines 12-17).
 */
export function DesignSystemPreviewScreen() {
  return (
    <div className="grid h-screen grid-cols-[280px_1fr] overflow-hidden bg-paper">
      <PreviewToc />
      <PreviewStage />
    </div>
  );
}
