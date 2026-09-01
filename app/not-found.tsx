import Link from "next/link";

/** Brand-consistent 404. The default Next page would break the spell. */
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-gutter py-20">
      <div className="max-w-[46ch] text-center">
        <p className="eyebrow text-wine">Error 404</p>
        <h1 className="t-h1 mt-7 uppercase">
          This room is empty.
        </h1>
        <p className="mt-7 t-lead">
          The page you were looking for either moved or never existed.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-solid justify-center">Back to home</Link>
          <Link href="/what-we-do" className="btn btn-outline justify-center">See our work</Link>
        </div>
      </div>
    </main>
  );
}
