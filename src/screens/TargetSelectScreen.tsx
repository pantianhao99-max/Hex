import { useEffect, useState } from 'react';
import ScreenShell from '../components/ScreenShell';

type TargetSelectScreenProps = {
  recommendedTargets: readonly string[];
  selectedTarget: string;
  onBack: () => void;
  onConfirm: (target: string) => void;
};

export default function TargetSelectScreen({
  recommendedTargets,
  selectedTarget,
  onBack,
  onConfirm,
}: TargetSelectScreenProps) {
  const [draft, setDraft] = useState(selectedTarget);

  useEffect(() => {
    setDraft(selectedTarget);
  }, [selectedTarget]);

  const trimmedTarget = draft.trim();

  return (
    <ScreenShell
      eyebrow={'\u9000\u6563 Hex'}
      title={'\u9009\u4e00\u4e2a\u5bf9\u8c61'}
      subtitle={'\u4e5f\u53ef\u4ee5\u81ea\u5df1\u8f93\u5165\u3002'}
      footer={
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onConfirm(trimmedTarget)}
            disabled={!trimmedTarget}
            className={`w-full rounded-[24px] border px-6 py-4 font-display text-base tracking-[0.16em] transition ${
              trimmedTarget
                ? 'border-alert/45 bg-alert text-white active:scale-[0.99]'
                : 'cursor-not-allowed border-white/10 bg-white/[0.03] text-white/35'
            }`}
          >
            {'\u6309\u4f4f\u5904\u7406'}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-[24px] border border-white/10 bg-transparent px-6 py-4 text-sm tracking-[0.16em] text-white/58"
          >
            {'\u8fd4\u56de'}
          </button>
        </div>
      }
    >
      <div className="space-y-6 py-8">
        <div className="grid grid-cols-3 gap-3">
          {recommendedTargets.map((target) => {
            const active = trimmedTarget === target;

            return (
              <button
                key={target}
                type="button"
                onClick={() => setDraft(target)}
                className={`rounded-2xl border px-3 py-3 text-sm transition ${
                  active
                    ? 'border-alert/55 bg-alert/10 text-white shadow-glow'
                    : 'border-white/10 bg-white/[0.03] text-white/72'
                }`}
              >
                {target}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 rounded-[28px] border border-white/10 bg-white/[0.03] p-4">
          <label htmlFor="custom-target" className="text-[11px] uppercase tracking-[0.34em] text-white/42">
            {'\u81ea\u5b9a\u4e49\u5bf9\u8c61'}
          </label>
          <input
            id="custom-target"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={'\u8f93\u5165\u4e00\u4e2a\u540d\u5b57\u6216\u4e00\u4ef6\u4e8b'}
            className="w-full border-0 bg-transparent px-0 py-3 font-display text-2xl tracking-[-0.03em] text-white outline-none placeholder:text-white/24"
            maxLength={12}
          />
          <p className="text-xs leading-5 text-white/42">
            {'\u5c3d\u91cf\u522b\u5199\u5177\u4f53\u8eab\u4efd\u4fe1\u606f'}
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}
