import type { CSSProperties } from 'react';

type TargetOrbProps = {
  target: string;
  progress?: number;
  state?: 'ambient' | 'ritual' | 'sealed';
  className?: string;
  intensity?: 'normal' | 'high';
};

const sealLines = [18, 36, 58, 76];

export default function TargetOrb({
  target,
  progress = 0,
  state = 'ambient',
  className = '',
  intensity = 'normal',
}: TargetOrbProps) {
  const normalizedProgress = Math.max(0, Math.min(progress, 1));
  const isSealed = state === 'sealed';
  const isRitual = state === 'ritual';
  const isHighIntensity = intensity === 'high';
  const lockOpacity = state === 'ambient' ? 0.22 : Math.max(0.18, normalizedProgress);
  const shellTransform = isSealed
    ? 'translate3d(0,0,0) scale(0.18) rotate(-12deg)'
    : `translate3d(0, ${normalizedProgress * 10}px, 0) scaleX(${1 - normalizedProgress * 0.52}) scaleY(${1 -
        normalizedProgress * 0.2}) rotate(${normalizedProgress * 12}deg)`;

  const shellStyle: CSSProperties = {
    transform: shellTransform,
    filter: isSealed
      ? 'blur(0.6px) saturate(1.35) contrast(1.1)'
      : `blur(${normalizedProgress * 2.4}px) saturate(${1 + normalizedProgress * 0.8}) contrast(${1 +
          normalizedProgress * 0.22})`,
  };

  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[290px] ${className}`}>
      <div className="absolute inset-[2%] rounded-full border border-white/6" />
      <div
        className={`absolute inset-[6%] rounded-full border transition-all duration-300 ${
          isRitual ? 'border-alert/35' : 'border-white/8'
        }`}
        style={{
          opacity: isSealed ? 0.2 : 0.22 + normalizedProgress * 0.44,
          transform: `scale(${1 - normalizedProgress * 0.03})`,
        }}
      />
      {isHighIntensity && !isSealed && (
        <div
          className="absolute inset-[6%] rounded-full border border-alert/18 animate-ritualSpin"
          style={{ opacity: 0.18 + normalizedProgress * 0.22 }}
        />
      )}
      <div
        className="absolute inset-[11%] rounded-full border border-white/8 transition-all duration-300"
        style={{
          opacity: isSealed ? 0.1 : 0.12 + normalizedProgress * 0.28,
          transform: `scale(${1 - normalizedProgress * 0.08}) rotate(${normalizedProgress * 16}deg)`,
        }}
      />
      {isRitual && (
        <div
          className="absolute inset-[4%] rounded-full border border-alert/25 blur-[1px] transition-all duration-200"
          style={{
            opacity: 0.1 + normalizedProgress * 0.65,
            transform: `scale(${1 + normalizedProgress * 0.04})`,
          }}
        />
      )}

      <div
        className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(234,35,60,0.18),_transparent_56%)] transition-all duration-300"
        style={{
          opacity: isSealed ? 0.22 : 0.1 + normalizedProgress * 0.45,
          transform: `translate(-50%, -50%) scale(${1 - normalizedProgress * 0.22})`,
        }}
      />

      <div
        className="absolute inset-[13%] rounded-[38%_62%_60%_40%/42%_38%_62%_58%] border border-white/20 bg-[radial-gradient(circle_at_35%_32%,_rgba(255,255,255,0.18),_transparent_36%),radial-gradient(circle_at_70%_68%,_rgba(234,35,60,0.18),_transparent_28%),linear-gradient(145deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0.01))] shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] transition-transform duration-300"
        style={shellStyle}
      />

      <div
        className={`absolute inset-[8%] rounded-[24px] border transition-all duration-300 ${
          isSealed ? 'border-alert/70 shadow-glow' : 'border-alert/20'
        }`}
        style={{
          opacity: isSealed ? 0.72 : lockOpacity,
          transform: `scale(${1 - normalizedProgress * 0.06}) rotate(${normalizedProgress * -8}deg)`,
        }}
      />

      {sealLines.map((line) => (
        <div
          key={line}
          className="absolute left-1/2 h-px w-[76%] -translate-x-1/2 bg-gradient-to-r from-transparent via-alert to-transparent transition-all duration-200"
          style={{
            top: `${line}%`,
            opacity: state === 'ambient' ? 0.16 : 0.14 + normalizedProgress * 0.65,
            transform: `translateX(-50%) scaleX(${state === 'ambient' ? 0.86 : 1 - normalizedProgress * 0.58})`,
          }}
        />
      ))}

      <div
        className="absolute inset-[18%] rounded-full border border-white/10 transition-all duration-300"
        style={{
          opacity: isSealed ? 0.4 : 0.16 + normalizedProgress * 0.38,
          transform: `scale(${1 - normalizedProgress * 0.34})`,
        }}
      />

      {isRitual && (
        <>
          <div
            className="absolute inset-x-[17%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-alert to-transparent transition-all duration-200"
            style={{
              opacity: 0.18 + normalizedProgress * 0.72,
              transform: `translateY(-50%) scaleX(${1 - normalizedProgress * 0.28})`,
            }}
          />
          <div
            className="absolute left-1/2 top-[17%] w-px h-[66%] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent transition-all duration-200"
            style={{
              opacity: 0.14 + normalizedProgress * 0.56,
              transform: `translateX(-50%) scaleY(${1 - normalizedProgress * 0.18})`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-alert/25 blur-[1px] transition-all duration-200"
            style={{
              opacity: normalizedProgress * 0.7,
              transform: `translate(-50%, -50%) scale(${1 + normalizedProgress * 0.5})`,
            }}
          />
        </>
      )}

      <div
        className={`absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border ${
          isSealed ? 'border-alert/70 bg-alert/15 text-alert' : 'border-white/10 bg-black/35 text-white/92'
        } px-3 text-center font-display text-[13px] tracking-[0.25em] backdrop-blur-sm transition-all duration-300 ${
          isSealed ? 'animate-stampIn' : ''
        }`}
        style={{
          transform: `translate(-50%, -50%) scale(${isSealed ? 0.72 : 1 - normalizedProgress * 0.22})`,
          boxShadow: isSealed ? '0 0 24px rgba(234,35,60,0.22)' : 'none',
        }}
      >
        <span className="max-w-[5ch] whitespace-pre-wrap break-all leading-5">
          {isSealed ? '\u6b8b\u7559' : target}
        </span>
      </div>

      {!isSealed && (
        <>
          <div
            className="absolute inset-x-[24%] top-[18%] h-px bg-gradient-to-r from-transparent via-white/75 to-transparent transition-opacity duration-200"
            style={{ opacity: 0.18 + normalizedProgress * 0.62 }}
          />
          <div
            className="absolute inset-x-[24%] bottom-[18%] h-px bg-gradient-to-r from-transparent via-alert to-transparent transition-opacity duration-200"
            style={{ opacity: 0.24 + normalizedProgress * 0.74 }}
          />
          <div
            className="absolute left-[20%] top-1/2 h-[34%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent"
            style={{ opacity: 0.14 + normalizedProgress * 0.42 }}
          />
          <div
            className="absolute right-[20%] top-1/2 h-[34%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-alert to-transparent"
            style={{ opacity: 0.14 + normalizedProgress * 0.64 }}
          />
        </>
      )}
    </div>
  );
}
