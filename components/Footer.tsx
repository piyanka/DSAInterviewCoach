import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white px-6 py-20 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-16 md:flex-row md:items-center">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tighter">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-[12px] text-white">🧠</span>
            <span>DSA COACH</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-slate-400">
            The world's first industrial-grade AI interview coach for software engineers.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Platform</h4>
            <ul className="space-y-2 text-sm font-semibold text-slate-500">
              <li><a href="/pricing" className="hover:text-indigo-600">Pricing</a></li>
              <li><a href="/curriculum" className="hover:text-indigo-600">Curriculum</a></li>
              <li><a href="/api-info" className="hover:text-indigo-600">API</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Resources</h4>
            <ul className="space-y-2 text-sm font-semibold text-slate-500">
              <li><a href="/documentation" className="hover:text-indigo-600">Documentation</a></li>
              <li><a href="/sde-sheet" className="hover:text-indigo-600">SDE Sheet</a></li>
              <li><a href="/blog" className="hover:text-indigo-600">Blog</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">Social</h4>
            <ul className="space-y-2 text-sm font-semibold text-slate-500">
              <li><a href="https://twitter.com/Priyank75428296" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">Twitter</a></li>
              <li><a href="https://github.com/piyanka" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/priyanka-yadav-3ab194243/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-20 max-w-7xl border-t border-slate-50 pt-10 text-center text-xs font-bold uppercase tracking-widest text-slate-300">
        © {new Date().getFullYear()} DSA Interview Coach.
      </div>
    </footer>
  );
}
