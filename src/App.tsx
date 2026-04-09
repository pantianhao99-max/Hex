import { startTransition, useMemo, useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';
import ResultScreen from './screens/ResultScreen';
import RitualScreen from './screens/RitualScreen';
import TargetSelectScreen from './screens/TargetSelectScreen';
import type { BattleRecord, View } from './types';

const QUICK_TARGETS = [
  '\u5468\u4e00',
  '\u5df2\u8bfb\u4e0d\u56de',
  '\u62d6\u5ef6',
  '\u5c0f\u5d29\u6e83',
  '\u622a\u6b62\u65e5\u671f',
] as const;

const RECOMMENDED_TARGETS = [
  '\u5468\u4e00',
  '\u5df2\u8bfb\u4e0d\u56de',
  '\u62d6\u5ef6',
  '\u622a\u6b62\u65e5\u671f',
  '\u5185\u8017',
  '\u5c0f\u5d29\u6e83',
  '\u65e0\u7406\u9700\u6c42',
  '\u6c34\u9006',
  '\u6ca1\u94b1',
  '\u71ac\u591c',
  '\u793e\u6b7b',
  '\u70c2\u60c5\u7eea',
] as const;

const formatBattleTime = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedTarget, setSelectedTarget] = useState('');
  const [holdProgress, setHoldProgress] = useState(0);
  const [ritualCompleted, setRitualCompleted] = useState(false);
  const [battleRecord, setBattleRecord] = useState<BattleRecord | null>(null);

  const canOpenReport = useMemo(() => Boolean(battleRecord?.target), [battleRecord]);

  const navigate = (nextView: View) => {
    startTransition(() => {
      setView(nextView);
    });
  };

  const resetRitualState = () => {
    setHoldProgress(0);
    setRitualCompleted(false);
  };

  const beginRitual = (target: string) => {
    setSelectedTarget(target);
    resetRitualState();
    navigate('ritual');
  };

  const handleRitualCompleted = () => {
    setRitualCompleted(true);
    setBattleRecord({
      target: selectedTarget,
      ritualName: '\u9759\u9ed8\u5c01\u5370',
      verdict: '\u672c\u56de\u5408\u4f60\u8d62\u4e86',
      timestamp: formatBattleTime(new Date()),
    });
  };

  const handleRetry = () => {
    setSelectedTarget('');
    resetRitualState();
    navigate('home');
  };

  return (
    <main className="min-h-screen bg-ink text-white">
      {view === 'home' && (
        <HomeScreen
          quickTargets={QUICK_TARGETS}
          onStart={() => navigate('select')}
          onQuickStart={beginRitual}
        />
      )}

      {view === 'select' && (
        <TargetSelectScreen
          recommendedTargets={RECOMMENDED_TARGETS}
          selectedTarget={selectedTarget}
          onBack={() => navigate('home')}
          onConfirm={beginRitual}
        />
      )}

      {view === 'ritual' && selectedTarget && (
        <RitualScreen
          holdProgress={holdProgress}
          ritualCompleted={ritualCompleted}
          selectedTarget={selectedTarget}
          onBack={() => navigate('select')}
          onProgressChange={setHoldProgress}
          onSealComplete={handleRitualCompleted}
          onSealSettled={() => navigate('result')}
        />
      )}

      {view === 'result' && battleRecord && (
        <ResultScreen
          battleRecord={battleRecord}
          onNextTarget={handleRetry}
          onOpenReport={() => canOpenReport && navigate('report')}
        />
      )}

      {view === 'report' && battleRecord && (
        <ReportScreen battleRecord={battleRecord} onBackHome={handleRetry} />
      )}
    </main>
  );
}
