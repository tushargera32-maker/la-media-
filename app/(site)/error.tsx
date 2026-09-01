"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary for the public site.
 * Logs the real error for us, shows the visitor something calm and a way out.
 */
export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public route error:", error);
  }, [error]);

  return (
    <div className="grid min-h-[70vh] place-items-center px-gutter py-20">
      <div className="max-w-[46ch] text-center">
        <p className="eyebrow text-wine">Something went wrong</p>
        <h1 className="t-h2 mt-7 uppercase">
          We couldn&rsquo;t load this page.
        </h1>
        <p className="mt-6 t-body">
          The issue has been logged. Try again, or head back and take another route.
        </p>
        <button type="button" onClick={reset} className="btn btn-solid mt-9">
          Try again
        </button>
      </div>
    </div>
  );
}
