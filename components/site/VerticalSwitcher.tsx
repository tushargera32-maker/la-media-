"use client";

import { useRouter } from "next/navigation";

export function VerticalSwitcher() {
  const router = useRouter();

  return (
    <>
      {/* Desktop Vertical Switcher */}
      <div className="fixed right-6 top-1/2 z-40 -translate-y-1/2 hidden lg:block">
        <div className="panel flex flex-col gap-0 overflow-hidden p-0 shadow-lg">
          {/* Design Dialects */}
          <button
            onClick={() => router.push('/design-dialects')}
            className="group relative flex flex-col items-center gap-2 border-b border-hairline px-4 py-5 transition-all duration-300 hover:bg-copper/10"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-copper">
              DD
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-mist group-hover:text-bone">
              Design<br />Dialects
            </span>
          </button>

          {/* Build Right */}
          <button
            onClick={() => router.push('/build-right')}
            className="group relative flex flex-col items-center gap-2 px-4 py-5 transition-all duration-300 hover:bg-cobalt/5"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cobalt-soft">
              BR
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-slate group-hover:text-bone">
              Build<br />Right
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Floating Switcher */}
      <div className="fixed bottom-6 right-4 z-40 flex gap-3 lg:hidden">
        <button
          onClick={() => router.push('/design-dialects')}
          className="panel flex h-14 w-14 flex-col items-center justify-center gap-1 shadow-lg transition-all duration-300 active:scale-95 active:bg-copper/10"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-copper">
            DD
          </span>
          <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-mist">
            Events
          </span>
        </button>

        <button
          onClick={() => router.push('/build-right')}
          className="panel flex h-14 w-14 flex-col items-center justify-center gap-1 shadow-lg transition-all duration-300 active:scale-95 active:bg-cobalt/10"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cobalt-soft">
            BR
          </span>
          <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-slate">
            Advisory
          </span>
        </button>
      </div>
    </>
  );
}


