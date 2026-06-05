import { useEffect, useRef, useState } from 'react';
import './stack-cube.css';

export interface CubeFace {
  layer: string;
  tech: string;
  detail: string;
}

interface StackCubeProps {
  size?: number;
  variant?: 'roxo' | 'cream';
  faces: CubeFace[];
  hint?: string;
}

export function StackCube({ size = 280, variant = 'roxo', faces, hint }: StackCubeProps) {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const dragState = useRef({ active: false, lastX: 0, lastY: 0, rx: -22, ry: -32 });

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.style.setProperty('--rx', `${dragState.current.rx}deg`);
    cube.style.setProperty('--ry', `${dragState.current.ry}deg`);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current.active = true;
    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
    setPaused(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.active || !cubeRef.current) return;
    const dx = e.clientX - dragState.current.lastX;
    const dy = e.clientY - dragState.current.lastY;
    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
    dragState.current.ry += dx * 0.4;
    dragState.current.rx -= dy * 0.4;
    cubeRef.current.style.setProperty('--rx', `${dragState.current.rx}deg`);
    cubeRef.current.style.setProperty('--ry', `${dragState.current.ry}deg`);
  };

  const onPointerUp = () => {
    dragState.current.active = false;
  };

  return (
    <div
      className={`stack-cube stack-cube--${variant} ${paused ? 'stack-cube--paused' : ''}`}
      style={{ width: size, height: size }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Stack layers cube — drag to rotate"
      role="img"
    >
      <div className="stack-cube__scene" style={{ '--cube-size': `${size}px` } as React.CSSProperties}>
        <div className="stack-cube__cube" ref={cubeRef}>
          {faces.map((face, idx) => (
            <div className={`stack-cube__face stack-cube__face--${idx}`} key={`${face.layer}-${idx}`}>
              <span className="stack-cube__layer">{face.layer}</span>
              <span className="stack-cube__tech">{face.tech}</span>
              <span className="stack-cube__detail">{face.detail}</span>
              <span className="stack-cube__corner" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="stack-cube__shadow" aria-hidden="true" />
      {hint ? <p className="stack-cube__hint" aria-hidden="true">{hint}</p> : null}
    </div>
  );
}
