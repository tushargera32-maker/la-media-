import Link from "next/link";

/** Brand-consistent 404. The default Next page would break the spell. */
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-navy px-gutter py-20">
      <div className="max-w-[46ch] text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="h-display mt-7 uppercase text-bone">
          This room is empty.
        </h1>
        <p className="mt-7 text-[17px] leading-relaxed text-mist">
          The page you were looking for either moved or never existed.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-fill justify-center">Back to home</Link>
          <Link href="/what-we-do" className="btn btn-line justify-center">See our work</Link>
        </div>
      </div>
    </main>
  );
}
