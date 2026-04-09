import type { BattleRecord } from '../types';

type ReportCardProps = {
  battleRecord: BattleRecord;
};

export default function ReportCard({ battleRecord }: ReportCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,35,60,0.22),_transparent_36%),linear-gradient(135deg,_rgba(255,255,255,0.05),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-x-6 top-16 h-px bg-gradient-to-r from-transparent via-alert to-transparent" />
        <div className="absolute inset-x-6 bottom-20 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      <div className="relative space-y-8">
        <div className="space-y-3">
          <div className="text-[11px] uppercase tracking-[0.36em] text-white/45">
            {'\u56de\u6267'}
          </div>
          <h2 className="font-display text-[34px] font-semibold tracking-[-0.04em] text-white">
            {'\u5b89\u9759\u4e86'}
          </h2>
          <p className="max-w-[24ch] text-sm leading-6 text-white/58">
            {'\u5148\u653e\u5728\u8fd9\u513f\uff0c\u522b\u8ba9\u5b83\u7ee7\u7eed\u5435\u3002'}
          </p>
        </div>

        <div className="grid gap-4 rounded-[24px] border border-white/10 bg-black/30 p-4">
          <Row label={'\u65f6\u95f4'} value={battleRecord.timestamp} />
          <Row label={'\u672c\u6b21\u5bf9\u8c61'} value={battleRecord.target} emphasis />
          <Row label={'\u5904\u7406\u65b9\u5f0f'} value={battleRecord.ritualName} />
          <Row label={'\u73b0\u5728'} value={battleRecord.verdict} emphasis />
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-[0.34em] text-white/40">{'\u7559\u75d5'}</div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-alert/45 bg-alert/12 font-display text-xs tracking-[0.28em] text-alert">
              {'\u5b89\u9759'}
            </div>
          </div>
          <div className="text-right text-[11px] uppercase tracking-[0.32em] text-white/34">
            {'Hex'}
          </div>
        </div>
      </div>
    </article>
  );
}

function Row({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-3 last:border-b-0 last:pb-0">
      <div className="text-xs uppercase tracking-[0.32em] text-white/38">{label}</div>
      <div
        className={`text-right text-sm tracking-[0.08em] ${
          emphasis ? 'font-display text-white' : 'text-white/74'
        }`}
      >
        {value}
      </div>
    </div>
  );
}
