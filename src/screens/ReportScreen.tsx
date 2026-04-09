import { useEffect, useState } from 'react';
import ReportCard from '../components/ReportCard';
import ScreenShell from '../components/ScreenShell';
import type { BattleRecord } from '../types';

type ReportScreenProps = {
  battleRecord: BattleRecord;
  onBackHome: () => void;
};

export default function ReportScreen({ battleRecord, onBackHome }: ReportScreenProps) {
  const [hint, setHint] = useState('');

  useEffect(() => {
    if (!hint) {
      return;
    }

    const timer = window.setTimeout(() => setHint(''), 2200);
    return () => window.clearTimeout(timer);
  }, [hint]);

  return (
    <ScreenShell
      eyebrow={'\u5206\u4eab\u6218\u62a5'}
      title={'\u9000\u6563\u56de\u6267'}
      subtitle={
        '\u505a\u6210\u4e86\u4e00\u5f20\u53ef\u622a\u56fe\u7684 H5 \u6218\u62a5\u3002\u5206\u4eab\u4e0e\u5426\u4e0d\u91cd\u8981\uff0c\u91cd\u8981\u7684\u662f\u4f60\u521a\u521a\u5df2\u7ecf\u8d62\u8fc7\u4e00\u5c40\u3002'
      }
      footer={
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setHint('\u76f4\u63a5\u622a\u56fe\u4fdd\u5b58\u8fd9\u5f20\u56de\u6267')}
            className="w-full rounded-[24px] border border-alert/45 bg-alert px-6 py-4 font-display text-base tracking-[0.16em] text-white active:scale-[0.99]"
          >
            {'\u4fdd\u5b58\u56fe\u7247'}
          </button>
          <button
            type="button"
            onClick={onBackHome}
            className="w-full rounded-[24px] border border-white/10 bg-transparent px-6 py-4 text-sm tracking-[0.16em] text-white/58"
          >
            {'\u8fd4\u56de\u9996\u9875'}
          </button>
          <div className="h-5 text-center text-xs tracking-[0.16em] text-white/44">{hint}</div>
        </div>
      }
    >
      <div className="flex h-full flex-col justify-center py-8">
        <div className="animate-screenIn">
          <ReportCard battleRecord={battleRecord} />
        </div>
      </div>
    </ScreenShell>
  );
}
