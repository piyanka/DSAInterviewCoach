import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
          <span className="text-2xl">🧠</span>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            DSA Coach
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Features</Link>
          <Link href="/how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">How it Works</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">About</Link>
        </div>
        <Link
          href="/interview"
          className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-indigo-300"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
