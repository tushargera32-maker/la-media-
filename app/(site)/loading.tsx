export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy">
      <div className="flex flex-col items-center gap-8">
        {/* Animated Logo or Brand */}
        <div className="relative">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-copper/20 border-t-copper" />
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">
            LA Media & Communications
          </p>
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-copper" style={{ animationDelay: '0ms' }} />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-copper" style={{ animationDelay: '150ms' }} />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-copper" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
