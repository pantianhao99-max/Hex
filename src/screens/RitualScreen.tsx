import { useEffect } from 'react';
import HoldToSealButton from '../components/HoldToSealButton';
import ScreenShell from '../components/ScreenShell';
import TargetOrb from '../components/TargetOrb';

type RitualScreenProps = {
  selectedTarget: string;
  holdProgress: number;
  ritualCompleted: boolean;
  onBack: () => void;
  onProgressChange: (progress: number) => void;
  onSealComplete: () => void;
  onSealSettled: () => void;
};

type RitualPhase = {
  label: string;
  status: string;
  threshold: number;
  note: string;
};

const PHASES: RitualPhase[] = [
  {
    label: '\u5df2\u9501\u5b9a',
    status: '\u5df2\u9501\u5b9a',
    threshold: 0,
    note: '\u5148\u522b\u7ba1\u522b\u7684\uff0c\u5b83\u73b0\u5728\u5728\u8fd9\u91cc\u3002',
  },
  {
    label: '\u6b63\u5728\u6536\u4f4f',
    status: '\u6b63\u5728\u6536\u4f4f',
    threshold: 0.34,
    note: '\u518d\u6309\u4e00\u4f1a\u513f\uff0c\u5b83\u5feb\u6ca1\u90a3\u4e48\u54cd\u4e86\u3002',
  },
  {
    label: '\u9a6c\u4e0a\u5b89\u9759',
    status: '\u9a6c\u4e0a\u5b89\u9759',
    threshold: 0.76,
    note: '\u522b\u677e\u5f00\uff0c\u5c31\u5feb\u7ed3\u675f\u4e86\u3002',
  },
];

const getCurrentPhase = (progress: number, ritualCompleted: boolean) => {
  if (ritualCompleted) {
    return {
      label: '\u9a6c\u4e0a\u5b89\u9759',
      status: '\u9a6c\u4e0a\u5b89\u9759',
      note: '\u597d\u4e86\uff0c\u8ba9\u5b83\u5148\u5728\u8fd9\u513f\u505c\u4e00\u4e0b\u3002',
    };
  }

  if (progress >= PHASES[2].threshold) {
    return PHASES[2];
  }

  if (progress >= PHASES[1].threshold) {
    return PHASES[1];
  }

  return PHASES[0];
};

export default function RitualScreen({
  selectedTarget,
  holdProgress,
  ritualCompleted,
  onBack,
  onProgressChange,
  onSealComplete,
  onSealSettled,
}: RitualScreenProps) {
  useEffect(() => {
    if (!ritualCompleted) {
      return;
    }

    const timer = window.setTimeout(onSealSettled, 1180);
    return () => window.clearTimeout(timer);
  }, [ritualCompleted, onSealSettled]);

  const progressPercent = Math.round(holdProgress * 100);
  const currentPhase = getCurrentPhase(holdProgress, ritualCompleted);

  return (
    <ScreenShell
      eyebrow={'\u9000\u6563 Hex'}
      title={selectedTarget}
      subtitle={'\u5df2\u9501\u5b9a'}
      footer={
        <div className="space-y-3">
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03] p-4">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,_rgba(234,35,60,0.14),_transparent_42%)]" />
            <div className="relative flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/48">
              <span>{currentPhase.status}</span>
              <span>{ritualCompleted ? '100%' : `${progressPercent}%`}</span>
            </div>
            <div className="relative mt-4 h-px w-full bg-white/10">
              <div
                className="absolute left-0 top-0 h-px bg-gradient-to-r from-alert via-alert to-white/80 transition-all duration-150"
                style={{ width: `${Math.max(6, progressPercent)}%` }}
              />
            </div>
          </div>

          <HoldToSealButton
            progress={holdProgress}
            disabled={ritualCompleted}
            onProgressChange={onProgressChange}
            onComplete={onSealComplete}
          />

          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-[24px] border border-white/10 bg-transparent px-6 py-4 text-sm tracking-[0.16em] text-white/50"
          >
            {'\u6362\u4e00\u4e2a'}
          </button>
        </div>
      }
    >
      <div className="relative flex h-full flex-col justify-center gap-8 py-8">
        <div className="ritual-grid pointer-events-none absolute inset-x-0 top-[16%] h-[54%] opacity-25" />
        <div
          className={`seal-flare pointer-events-none absolute left-1/2 top-[42%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            ritualCompleted ? 'animate-ritualBreath opacity-90' : ''
          }`}
          style={{ opacity: 0.16 + holdProgress * 0.6 }}
        />

        <div className="relative flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/34">
          {PHASES.map((phase, index) => {
            const active =
              ritualCompleted ||
              (holdProgress >= phase.threshold &&
                (index === PHASES.length - 1 || holdProgress < PHASES[index + 1].threshold));
            const reached = ritualCompleted || holdProgress >= phase.threshold;

            return (
              <div key={phase.label} className="flex flex-col items-center gap-2 text-center">
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-200 ${
                    reached ? 'bg-alert shadow-[0_0_12px_rgba(234,35,60,0.55)]' : 'bg-white/18'
                  }`}
                />
                <span className={active ? 'text-alert' : reached ? 'text-white/55' : 'text-white/28'}>
                  {phase.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-x-[10%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <TargetOrb
            target={selectedTarget}
            progress={holdProgress}
            state={ritualCompleted ? 'sealed' : 'ritual'}
            intensity="high"
            className={ritualCompleted ? 'animate-ritualBreath' : 'animate-drift'}
          />
        </div>

        <div className="grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.32em] text-white/36">{'\u72b6\u6001'}</div>
            <div className="rounded-full border border-alert/25 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-alert">
              {currentPhase.label}
            </div>
          </div>
          <div className="font-display text-[24px] tracking-[-0.04em] text-white">{currentPhase.status}</div>
          <p className="text-sm leading-6 text-white/62">{currentPhase.note}</p>
        </div>
      </div>
    </ScreenShell>
  );
}
