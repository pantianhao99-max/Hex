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
      eyebrow={'\u5bf9\u8c61\u9009\u62e9'}
      title={'\u9009\u62e9\u672c\u6b21\u9000\u6563\u5bf9\u8c61'}
      subtitle={
        '\u53ef\u4ee5\u662f\u4e00\u4ef6\u4e8b\u3001\u4e00\u79cd\u72b6\u6001\uff0c\u6216\u8005\u4e00\u4e2a\u4f60\u6682\u65f6\u4e0d\u60f3\u518d\u88ab\u5b83\u5f71\u54cd\u7684\u540d\u5b57\u3002'
      }
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
            {'\u4e0b\u4e00\u6b65\uff1a\u5f00\u59cb\u4eea\u5f0f'}
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
            placeholder={'\u8f93\u5165\u4e00\u4e2a\u60f3\u9000\u6563\u7684\u5bf9\u8c61'}
            className="w-full border-0 bg-transparent px-0 py-3 font-display text-2xl tracking-[-0.03em] text-white outline-none placeholder:text-white/24"
            maxLength={12}
          />
          <p className="text-xs leading-5 text-white/42">
            {
              '\u5efa\u8bae\u8f93\u5165\u72b6\u6001\u3001\u4e8b\u4ef6\u6216\u60c5\u7eea\uff0c\u800c\u4e0d\u662f\u5177\u4f53\u8eab\u4efd\u4fe1\u606f'
            }
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}
