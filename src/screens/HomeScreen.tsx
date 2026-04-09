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
      eyebrow={'\u8d5b\u535a\u60c5\u7eea\u4eea\u5f0f'}
      title={'\u4eca\u5929\uff0c\u5148\u8ba9\u4ec0\u4e48\u9000\u6563\uff1f'}
      subtitle={
        '\u628a\u70e6\u4f60\u7684\u4e1c\u897f\u62d6\u8fdb\u6765\u3002\u8fd9\u4e00\u5c40\uff0c\u5148\u5728\u8fd9\u91cc\u8d62\u56de\u6765\u3002'
      }
      topSlot={
        <div className="rounded-full border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-white/38">
          H5 Demo
        </div>
      }
      footer={
        <div className="space-y-4">
          <button
            type="button"
            onClick={onStart}
            className="w-full rounded-[24px] border border-alert/45 bg-alert px-6 py-4 font-display text-base tracking-[0.22em] text-white transition hover:bg-alert/90 active:scale-[0.99]"
          >
            {'\u5f00\u59cb\u9000\u6563'}
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
        <div className="space-y-4 text-center">
          <div className="text-[11px] uppercase tracking-[0.34em] text-alert/80">
            {'\u9000\u6563 Hex'}
          </div>
          <p className="text-sm leading-6 text-white/48">
            {'\u5c06\u70e6\u6270\u9501\u5b9a\uff0c\u65bd\u538b\uff0c\u7136\u540e\u5ba3\u5e03\u5b83\u5148\u9000\u573a\u3002'}
          </p>
        </div>

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
