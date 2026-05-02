import { cn } from '@shared/utils/cn';

/**
 * `BodyDiagram` — schematic anterior body silhouette with annotation pins.
 * Reference: 14-specialized.html (body-diagram section).
 *
 * Coordinates are normalized 0..1 over the silhouette viewBox (100×220).
 */
export interface BodyDiagramPin {
  id: string;
  x: number;
  y: number;
  label?: string;
  tone?: 'crit' | 'warn' | 'low' | 'ink';
}

export interface BodyDiagramProps {
  pins?: ReadonlyArray<BodyDiagramPin>;
  onPinAdd?: (pin: { x: number; y: number }) => void;
  className?: string;
}

const TONE: Record<NonNullable<BodyDiagramPin['tone']>, string> = {
  crit: 'fill-crit',
  warn: 'fill-warn',
  low: 'fill-low',
  ink: 'fill-ink',
};

export function BodyDiagram({ pins = [], onPinAdd, className }: BodyDiagramProps) {
  function handleClick(event: React.MouseEvent<SVGSVGElement>) {
    if (!onPinAdd) return;
    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    onPinAdd({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  }
  return (
    <svg
      viewBox="0 0 100 220"
      className={cn('h-[280px] w-auto cursor-crosshair', className)}
      onClick={handleClick}
      aria-label="Anatomical body diagram"
    >
      <g
        fill="none"
        stroke="#181613"
        strokeWidth="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="50" cy="22" r="14" />
        <path d="M30 38 Q50 30 70 38 L78 90 Q72 110 65 124 L65 165 L60 215 L52 215 L52 175 L48 175 L48 215 L40 215 L35 165 L35 124 Q28 110 22 90 Z" />
        <path d="M30 42 L8 100 L14 130 L22 132" />
        <path d="M70 42 L92 100 L86 130 L78 132" />
      </g>
      {pins.map((pin) => (
        <g key={pin.id}>
          <circle cx={pin.x * 100} cy={pin.y * 220} r="2.2" className={TONE[pin.tone ?? 'ink']} />
          {pin.label ? (
            <text
              x={pin.x * 100 + 4}
              y={pin.y * 220 + 1}
              fontFamily="JetBrains Mono, ui-monospace, monospace"
              fontSize="3"
              fill="#3C3833"
            >
              {pin.label}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  );
}
