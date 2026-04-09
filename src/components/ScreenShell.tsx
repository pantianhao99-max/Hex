import type { PropsWithChildren, ReactNode } from 'react';

type ScreenShellProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  eyebrow?: string;
  footer?: ReactNode;
  topSlot?: ReactNode;
}>;

export default function ScreenShell({
  title,
  subtitle,
  eyebrow,
  footer,
  topSlot,
  children,
}: ScreenShellProps) {
  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden px-6 pt-safe pb-safe animate-screenIn">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,35,60,0.18),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.03),_transparent_24%),linear-gradient(180deg,_#090909_0%,_#020202_48%,_#040404_100%)]" />
      <div className="pointer-events-none absolute inset-x-6 top-7 h-px bg-gradient-to-r from-transparent via-alert/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[-26%] top-12 h-64 w-64 rounded-full border border-white/5" />
        <div className="absolute right-[-18%] top-1/3 h-72 w-72 rounded-full border border-alert/15" />
        <div className="absolute bottom-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full border border-white/5" />
      </div>
      <div className="scanlines pointer-events-none absolute inset-0" />

      <div className="relative flex min-h-screen flex-col">
        <header className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-4">
              {eyebrow && (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-alert" />
                  {eyebrow}
                </div>
              )}
              <div className="space-y-3">
                <h1 className="max-w-[12ch] font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                  {title}
                </h1>
                <p className="max-w-[28ch] text-sm leading-6 text-white/64">{subtitle}</p>
              </div>
            </div>
            {topSlot}
          </div>
        </header>

        <div className="relative flex-1">{children}</div>

        {footer && <footer className="relative mt-6">{footer}</footer>}
      </div>
    </section>
  );
}
