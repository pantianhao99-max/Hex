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
    label: '\u9501\u5b9a',
    status: '\u6b63\u5728\u5c01\u5370\u2026',
    threshold: 0,
    note: '\u7ea2\u8272\u8fb9\u754c\u5df2\u9501\u5b9a\uff0c\u76ee\u6807\u4f53\u6b63\u88ab\u7eb3\u5165\u9759\u9ed8\u573a\u3002',
  },
  {
    label: '\u65bd\u538b',
    status: '\u5e72\u6270\u6b63\u5728\u51cf\u5f31\u2026',
    threshold: 0.34,
    note: '\u5c01\u5370\u7ebf\u5f00\u59cb\u6536\u7d27\uff0c\u5b83\u7684\u58f0\u91cf\u548c\u4f53\u79ef\u90fd\u5728\u88ab\u538b\u4f4e\u3002',
  },
  {
    label: '\u751f\u6548',
    status: '\u5224\u51b3\u5373\u5c06\u751f\u6548\u2026',
    threshold: 0.76,
    note: '\u518d\u575a\u6301\u4e00\u4e0b\uff0c\u5b83\u5c31\u4f1a\u5865\u7f29\u6210\u4e00\u4e2a\u53ef\u4ee5\u5ffd\u7565\u7684\u6b8b\u7559\u3002',
  },
];

const getCurrentPhase = (progress: number, ritualCompleted: boolean) => {
  if (ritualCompleted) {
    return {
      label: '\u751f\u6548',
      status: '\u5224\u51b3\u5373\u5c06\u751f\u6548\u2026',
      note: '\u5c01\u5370\u5df2\u6210\u3002\u522b\u9000\uff0c\u8ba9\u5224\u51b3\u843d\u4e0b\u6765\u3002',
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
      eyebrow={'\u9759\u9ed8\u5c01\u5370'}
      title={selectedTarget}
      subtitle={'\u76ee\u6807\u5df2\u9501\u5b9a'}
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
            {'\u91cd\u65b0\u9009\u62e9\u5bf9\u8c61'}
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
            <div className="text-xs uppercase tracking-[0.32em] text-white/36">
              {'\u5f53\u524d\u9636\u6bb5'}
            </div>
            <div className="rounded-full border border-alert/25 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-alert">
              {currentPhase.label}
            </div>
          </div>
          <div className="font-display text-[24px] tracking-[-0.04em] text-white">{currentPhase.status}</div>
          <p className="text-sm leading-6 text-white/62">{currentPhase.note}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <SignalCard
            label={'\u5c01\u5370\u5f3a\u5ea6'}
            value={`${progressPercent}%`}
            active
          />
          <SignalCard
            label={'\u5f71\u54cd\u566a\u58f0'}
            value={ritualCompleted ? '\u5df2\u9759\u97f3' : holdProgress > 0.55 ? '\u6b63\u5728\u574d\u7f29' : '\u4ecd\u5728\u5e72\u6270'}
            active={holdProgress > 0.2}
          />
          <SignalCard
            label={'\u5224\u51b3\u72b6\u6001'}
            value={ritualCompleted ? '\u5373\u5c06\u516c\u5e03' : '\u5f85\u843d\u69cc'}
            active={holdProgress > 0.72 || ritualCompleted}
          />
        </div>
      </div>
    </ScreenShell>
  );
}

function SignalCard({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-[22px] border px-3 py-4 transition-all duration-200 ${
        active ? 'border-alert/25 bg-alert/[0.06]' : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.28em] text-white/34">{label}</div>
      <div className={`mt-2 font-display text-sm tracking-[0.06em] ${active ? 'text-white' : 'text-white/48'}`}>
        {value}
      </div>
    </div>
  );
}
