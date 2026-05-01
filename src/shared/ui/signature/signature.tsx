import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@shared/utils/cn';

/**
 * `Signature` — canvas signature capture (consent forms, AMA, etc.).
 * Reference: 14-specialized.html (signature section).
 */
export interface SignatureProps {
  width?: number;
  height?: number;
  /** Called with the signed image as a PNG data URL. */
  onSign?: (dataUrl: string) => void;
  className?: string;
}

export function Signature({ width = 480, height = 140, onSign, className }: SignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const [hasInk, setHasInk] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#181613';
  }, [width, height]);

  function onPointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(event.pointerId);
    const { x, y } = pointerXY(canvas, event);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    drawingRef.current = true;
  }

  function onPointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = pointerXY(canvas, event);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasInk(true);
  }

  const finish = useCallback(() => {
    drawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (hasInk && onSign) {
      onSign(canvas.toDataURL('image/png'));
    }
  }, [hasInk, onSign]);

  function clear() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  }

  return (
    <div className={cn('inline-flex flex-col gap-2', className)}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerLeave={finish}
        className="touch-none border-b border-ink bg-sheet"
      />
      <div className="flex items-center justify-between font-mono text-[11px] tracking-mono text-ink-3">
        <span>Sign above the line</span>
        <button
          type="button"
          onClick={clear}
          className="cursor-pointer border-0 bg-transparent p-0 text-inherit underline-offset-2 hover:text-ink hover:underline"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function pointerXY(canvas: HTMLCanvasElement, event: ReactPointerEvent<HTMLCanvasElement>) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}
