"use client";

import React from "react";
import { Footer } from "./Footer";

type LandingPageProps = {
  onSelectSuggestion: (label: string) => void;
  isLoading: boolean;
};

export function LandingPage({ onSelectSuggestion, isLoading }: LandingPageProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#fcfcfe] font-body text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* GRID OVERLAY - THE DEBUG GRID */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* HEADER */}
      <header className="fixed top-6 left-0 right-0 z-50 px-6">
        <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/20 bg-white/60 px-4 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 pl-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
              <span className="text-sm">🧠</span>
            </div>
            <span className="font-display text-sm font-black uppercase tracking-widest text-slate-900">DSA Coach</span>
          </div>
          
          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-2 px-6 text-[11px] font-black uppercase tracking-widest text-slate-400 md:flex">
              <a href="#challenge" className="px-3 py-2 transition hover:text-indigo-600 hover:bg-slate-50 rounded-lg">Problem</a>
              <a href="#curriculum" className="px-3 py-2 transition hover:text-indigo-600 hover:bg-slate-50 rounded-lg">Curriculum</a>
              <a href="#specs" className="px-3 py-2 transition hover:text-indigo-600 hover:bg-slate-50 rounded-lg">Specs</a>
            </div>
            <button 
              onClick={() => onSelectSuggestion("Start Interview")}
              className="group flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-[12px] font-bold text-white transition hover:bg-indigo-600 active:scale-95"
            >
              Start Now
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 flex-1">
        {/* HERO SECTION - INDUSTRIAL MINIMAL */}
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-12 md:pt-32">
          <div className="relative">
            <h1 className="max-w-4xl font-display text-[4.5rem] font-extrabold leading-[0.85] tracking-tighter text-slate-900 sm:text-[7rem]">
              Stop guessing. <br />
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Start solving.</span>
            </h1>
            <div className="mt-12 flex flex-col items-start gap-12 lg:flex-row lg:items-end">
              <p className="max-w-md text-xl leading-relaxed text-slate-500">
                The first AI interviewer built for the Striver SDE Sheet. We don't care about your syntax; we care about your brain.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onSelectSuggestion("Let's start a mock interview")}
                  disabled={isLoading}
                  className="group relative flex h-20 items-center justify-center overflow-hidden rounded-[24px] bg-slate-950 px-12 font-display text-xl font-bold text-white transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-0 animate-pulse bg-white/10 opacity-0 group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center gap-3">
                    Launch Mock Interview
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </span>
                  <div className="absolute -inset-1 rounded-[28px] border-2 border-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* THE CHALLENGE SECTION - HIGH CONTRAST */}
        <section id="challenge" className="bg-slate-900 px-6 py-32 text-white md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-5xl font-extrabold tracking-tighter sm:text-6xl">
                  The DSA gap is <br />
                  <span className="text-slate-500">where careers stall.</span>
                </h2>
              </div>
              <div className="space-y-10 text-lg leading-relaxed text-slate-400">
                <p>
                  Most platforms focus on passing test cases. But interviewers focus on your **process**. If you can't explain why a Hash Map is better than a balanced BST for your specific problem, you've already lost.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="border-l-2 border-indigo-500 pl-6">
                    <div className="text-3xl font-black text-white">85%</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Fail at optimization</div>
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-6">
                    <div className="text-3xl font-black text-white">45m</div>
                    <div className="text-sm font-bold uppercase tracking-widest text-slate-500">To prove your worth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE CURRICULUM SECTION - THE STRIVER SHEET */}
        <section id="curriculum" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
          <div className="mb-20">
            <h2 className="font-display text-4xl font-extrabold tracking-tighter text-slate-900 sm:text-5xl">The SDE Roadmap</h2>
            <p className="mt-4 text-xl text-slate-500">Curated from the Striver SDE Sheet. Ranked by interview frequency.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <TopicCard title="Arrays & Hashing" count="24 Problems" level="Core" />
            <TopicCard title="Linked Lists" count="12 Problems" level="Essential" />
            <TopicCard title="Binary Trees" count="18 Problems" level="Advanced" />
            <TopicCard title="Dynamic Programming" count="32 Problems" level="Expert" />
            <TopicCard title="Graph Algorithms" count="15 Problems" level="Expert" />
            <TopicCard title="Greedy & Backtracking" count="10 Problems" level="Advanced" />
          </div>
        </section>

        {/* KINETIC MARQUEE - REFINED */}
        <div className="relative w-full overflow-hidden border-y border-slate-100 bg-white py-10">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="mx-12 flex items-center gap-8 font-display text-2xl font-bold tracking-tighter text-slate-300">
                <span>RECURSION</span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                <span>MEMOIZATION</span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                <span>SLIDING WINDOW</span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                <span>TWO POINTERS</span>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              </div>
            ))}
          </div>
        </div>

        {/* TECH SPECS SECTION - INDUSTRIAL LAYOUT */}
        <section id="specs" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
          <div className="rounded-[3rem] border border-slate-200 bg-white p-12 shadow-2xl shadow-slate-200/50 md:p-20">
            <div className="flex flex-col justify-between gap-16 lg:flex-row">
              <div className="max-w-md">
                <h2 className="font-display text-4xl font-extrabold tracking-tighter sm:text-5xl">Engine Specs</h2>
                <p className="mt-6 text-lg text-slate-500">How our AI actually coach you through the noise.</p>
                <div className="mt-12 space-y-8">
                  <SpecItem title="Proactive Complexity Monitoring" desc="Calculates Big O notation in real-time as you explain your logic." />
                  <SpecItem title="Edge-Case Synthesis" desc="Generates counter-examples on the fly to test your logic's robustness." />
                  <SpecItem title="Adaptive Hint System" desc="Detects where you're stuck and provides high-level nudges, not spoilers." />
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <div className="relative aspect-square w-full max-w-md animate-float">
                  <div className="absolute inset-0 rounded-full border-[20px] border-indigo-50" />
                  <div className="absolute inset-10 rounded-full border-[10px] border-indigo-100/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-40 w-40 rounded-full bg-indigo-600 shadow-[0_0_80px_rgba(79,70,229,0.4)] flex items-center justify-center text-5xl">🤖</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-6 py-32 text-center">
          <h2 className="font-display text-5xl font-extrabold tracking-tighter sm:text-7xl">Ready for FAANG?</h2>
          <p className="mt-6 text-xl text-slate-500">Your first interview is waiting. No credit card, no sign-up.</p>
          <button 
            onClick={() => onSelectSuggestion("Start Interview")}
            className="mt-12 inline-flex h-20 items-center justify-center rounded-3xl bg-indigo-600 px-16 font-display text-2xl font-bold text-white shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-100"
          >
            Enter the Interview Room
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TopicCard({ title, count, level }: { title: string, count: string, level: string }) {
  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 transition-all hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5">
      <div>
        <div className="mb-4 inline-flex rounded-lg bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600">
          {level}
        </div>
        <h3 className="font-display text-2xl font-bold text-slate-900">{title}</h3>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-400">{count}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-2">
      <h4 className="flex items-center gap-3 font-display text-xl font-bold text-slate-900">
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
        {title}
      </h4>
      <p className="pl-4.5 text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
