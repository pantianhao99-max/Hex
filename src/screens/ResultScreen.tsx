import ScreenShell from '../components/ScreenShell';
import TargetOrb from '../components/TargetOrb';
import type { BattleRecord } from '../types';

type ResultScreenProps = {
  battleRecord: BattleRecord;
  onNextTarget: () => void;
  onOpenReport: () => void;
};

export default function ResultScreen({
  battleRecord,
  onNextTarget,
  onOpenReport,
}: ResultScreenProps) {
  return (
    <ScreenShell
      eyebrow={'\u9000\u6563 Hex'}
      title={'\u5b89\u9759\u4e86'}
      subtitle={'\u5b83\u5148\u4e0d\u4f1a\u7ee7\u7eed\u70e6\u4f60\u4e86\u3002'}
      footer={
        <div className="space-y-3">
          <button
            type="button"
            onClick={onOpenReport}
            className="w-full rounded-[24px] border border-alert/45 bg-alert px-6 py-4 font-display text-base tracking-[0.16em] text-white shadow-glow active:scale-[0.99]"
          >
            {'\u751f\u6210\u56de\u6267'}
          </button>
          <button
            type="button"
            onClick={onNextTarget}
            className="w-full rounded-[24px] border border-white/10 bg-transparent px-6 py-4 text-sm tracking-[0.16em] text-white/58"
          >
            {'\u518d\u5904\u7406\u4e00\u4e2a'}
          </button>
        </div>
      }
    >
      <div className="relative flex h-full flex-col justify-center gap-7 py-8">
        <div className="victory-burst pointer-events-none absolute left-1/2 top-[34%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-ritualBreath opacity-80" />

        <div className="animate-verdictRise rounded-[30px] border border-alert/22 bg-[linear-gradient(180deg,_rgba(234,35,60,0.14),_rgba(255,255,255,0.02))] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/38">{'\u7ed3\u679c'}</div>
              <div className="mt-2 font-display text-[34px] leading-none tracking-[-0.05em] text-white">
                {'\u5b89\u9759\u4e86'}
              </div>
            </div>
            <div className="rounded-full border border-alert/35 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-alert">
              {'\u5148\u653e\u8fd9\u513f'}
            </div>
          </div>
          <p className="mt-4 max-w-[24ch] text-sm leading-6 text-white/68">
            {'\u5148\u4e0d\u7528\u7ee7\u7eed\u7406\u5b83\u4e86\u3002'}
          </p>
        </div>

        <div className="relative">
          <TargetOrb
            target={battleRecord.target}
            state="sealed"
            progress={1}
            intensity="high"
            className="animate-ritualBreath"
          />
          <div className="pointer-events-none absolute inset-x-[17%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-alert/60 to-transparent" />
        </div>

        <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.32em] text-white/40">
              {'\u672c\u6b21\u5bf9\u8c61'}
            </div>
            <div className="rounded-full border border-alert/35 px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-alert">
              {'\u6309\u4f4f\u5904\u7406'}
            </div>
          </div>

          <div className="mt-4 font-display text-[36px] tracking-[-0.05em] text-white">
            {battleRecord.target}
          </div>
          <p className="mt-3 text-sm leading-6 text-white/64">
            {'\u5148\u653e\u4e00\u8fb9\u4e86\u3002'}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <VerdictCard
              label={'\u73b0\u5728'}
              value={'\u5148\u505c\u4e00\u4e0b'}
              accent
            />
            <VerdictCard
              label={'\u7559\u7ed9\u4f60'}
              value={'\u5148\u677e\u53e3\u6c14'}
            />
          </div>
        </div>

        <div className="rounded-[26px] border border-white/10 bg-black/25 p-5">
          <div className="text-[10px] uppercase tracking-[0.34em] text-white/38">{'\u5907\u6ce8'}</div>
          <p className="mt-3 font-display text-[24px] leading-8 tracking-[-0.04em] text-white">
            {'\u4e8b\u60c5\u8fd8\u5728\uff0c\u4f46\u5b83\u5148\u6ca1\u54cd\u58f0\u4e86\u3002'}
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}

function VerdictCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-[22px] border px-4 py-4 ${
        accent ? 'border-alert/28 bg-alert/[0.07]' : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.28em] text-white/34">{label}</div>
      <div className={`mt-2 font-display text-lg tracking-[0.04em] ${accent ? 'text-alert' : 'text-white'}`}>
        {value}
      </div>
    </div>
  );
}
