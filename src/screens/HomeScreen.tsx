import ScreenShell from '../components/ScreenShell';
import TargetOrb from '../components/TargetOrb';

type HomeScreenProps = {
  quickTargets: readonly string[];
  onStart: () => void;
  onQuickStart: (target: string) => void;
};

export default function HomeScreen({ quickTargets, onStart, onQuickStart }: HomeScreenProps) {
  return (
    <ScreenShell
      eyebrow={'\u9000\u6563 Hex'}
      title={'\u9009\u4e00\u4e2a\uff0c\u5148\u8ba9\u5b83\u5b89\u9759\u4e00\u4e0b'}
      subtitle={'\u4e0d\u7528\u89e3\u91ca\uff0c\u5148\u5904\u7406\u4e00\u4e0b\u3002'}
      footer={
        <div className="space-y-4">
          <button
            type="button"
            onClick={onStart}
            className="w-full rounded-[24px] border border-alert/45 bg-alert px-6 py-4 font-display text-base tracking-[0.22em] text-white transition hover:bg-alert/90 active:scale-[0.99]"
          >
            {'\u6309\u4f4f\u5904\u7406'}
          </button>
          <div className="grid grid-cols-3 gap-3">
            {quickTargets.map((target) => (
              <button
                key={target}
                type="button"
                onClick={() => onQuickStart(target)}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white/78 transition hover:border-alert/40 hover:text-white"
              >
                {target}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex h-full flex-col items-center justify-center gap-10 py-10">
        <TargetOrb target={'\u76ee\u6807\u4f53'} className="animate-drift" />

        <div className="flex w-full flex-wrap justify-center gap-2">
          {quickTargets.map((target) => (
            <div
              key={target}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs tracking-[0.16em] text-white/42"
            >
              {target}
            </div>
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
