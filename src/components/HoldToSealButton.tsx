import { useEffect, useRef, useState } from 'react';

type HoldToSealButtonProps = {
  durationMs?: number;
  progress: number;
  disabled?: boolean;
  onProgressChange: (progress: number) => void;
  onComplete: () => void;
};

export default function HoldToSealButton({
  durationMs = 2600,
  progress,
  disabled,
  onProgressChange,
  onComplete,
}: HoldToSealButtonProps) {
  const animationFrameRef = useRef<number | null>(null);
  const holdStartRef = useRef<number | null>(null);
  const holdStartProgressRef = useRef(0);
  const progressRef = useRef(progress);
  const completedRef = useRef(false);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const animateProgress = (target: number, duration: number) => {
    const startValue = progressRef.current;
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const elapsed = Math.min(1, (timestamp - startTime) / duration);
      const eased = 1 - (1 - elapsed) * (1 - elapsed);
      onProgressChange(startValue + (target - startValue) * eased);

      if (elapsed < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      }
    };

    animationFrameRef.current = requestAnimationFrame(step);
  };

  const stopHolding = () => {
    if (disabled || completedRef.current) {
      return;
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsHolding(false);
    holdStartRef.current = null;
    animateProgress(0, 240);
  };

  const updateHold = (timestamp: number) => {
    if (holdStartRef.current === null) {
      return;
    }

    const elapsed = timestamp - holdStartRef.current;
    const nextProgress = Math.min(1, holdStartProgressRef.current + elapsed / durationMs);
    onProgressChange(nextProgress);

    if (nextProgress >= 1) {
      completedRef.current = true;
      setIsHolding(false);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(40);
      }
      onComplete();
      return;
    }

    animationFrameRef.current = requestAnimationFrame(updateHold);
  };

  const startHolding = () => {
    if (disabled || completedRef.current) {
      return;
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    setIsHolding(true);
    holdStartRef.current = performance.now();
    holdStartProgressRef.current = progressRef.current;
    animationFrameRef.current = requestAnimationFrame(updateHold);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={startHolding}
      onPointerUp={stopHolding}
      onPointerLeave={stopHolding}
      onPointerCancel={stopHolding}
      className={`relative flex w-full select-none items-center justify-center overflow-hidden rounded-[24px] border px-6 py-5 text-center transition duration-200 ${
        disabled
          ? 'cursor-default border-white/10 bg-white/[0.02] text-white/40'
          : 'border-alert/40 bg-white/[0.03] text-white shadow-glow active:scale-[0.99]'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,35,60,0.32),_transparent_58%)] transition-opacity duration-150"
        style={{ opacity: disabled ? 0.08 : 0.18 + progress * 0.5 }}
      />
      <div
        className="pointer-events-none absolute inset-0 border border-alert/50 transition-transform duration-150"
        style={{
          opacity: 0.16 + progress * 0.75,
          transform: `scale(${1 - progress * 0.04})`,
        }}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-alert/70 via-alert/25 to-transparent transition-all duration-75 ${
          isHolding ? 'opacity-100' : 'opacity-70'
        }`}
        style={{ width: `${Math.max(14, progress * 100)}%` }}
      />
      <div className="relative space-y-1">
        <div className="text-[11px] uppercase tracking-[0.42em] text-white/55">
          {isHolding ? '\u65bd\u538b\u4e2d' : '\u957f\u6309\u89e6\u53d1'}
        </div>
        <div className="font-display text-lg tracking-[0.2em] text-white">
          {disabled
            ? '\u5224\u51b3\u751f\u6548\u4e2d'
            : progress > 0.45
              ? '\u7ee7\u7eed\u538b\u5236'
              : '\u957f\u6309\u5c01\u5370'}
        </div>
      </div>
    </button>
  );
}
