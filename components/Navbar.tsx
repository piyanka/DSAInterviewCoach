import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-6">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/20 bg-white/60 px-4 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <Link href="/" className="flex items-center gap-3 pl-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
            <span className="text-sm">🧠</span>
          </div>
          <span className="font-display text-sm font-black uppercase tracking-widest text-slate-900">DSA Coach</span>
        </Link>
        
        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-2 px-6 text-[11px] font-black uppercase tracking-widest text-slate-400 md:flex">
            <Link href="/#challenge" className="px-3 py-2 transition hover:text-indigo-600 hover:bg-slate-50 rounded-lg">Problem</Link>
            <Link href="/#curriculum" className="px-3 py-2 transition hover:text-indigo-600 hover:bg-slate-50 rounded-lg">Curriculum</Link>
            <Link href="/#specs" className="px-3 py-2 transition hover:text-indigo-600 hover:bg-slate-50 rounded-lg">Specs</Link>
          </div>
          <Link 
            href="/"
            className="group flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-[12px] font-bold text-white transition hover:bg-indigo-600 active:scale-95"
          >
            Go Back
          </Link>
        </div>
      </nav>
    </header>
  );
}
