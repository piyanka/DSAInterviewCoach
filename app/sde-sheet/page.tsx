import Link from "next/link";

export default function SdeSheetPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfe] font-body text-slate-900 selection:bg-indigo-600 selection:text-white">
      <main className="mx-auto max-w-4xl px-6 py-24">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline">
          ← Back to Home
        </Link>
        
        <h1 className="font-display text-5xl font-extrabold tracking-tighter sm:text-7xl mb-8">
          Striver SDE Sheet
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-12">
            The Striver SDE Sheet is the gold standard for software engineering interview preparation. 
            We have integrated the best problems from the sheet into our AI coach.
          </p>
          
          <div className="rounded-3xl bg-slate-900 p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6 italic">"Preparation is the key to confidence."</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Follow the roadmap that has helped thousands of developers land jobs at FAANG and top product-based companies.
            </p>
            <a 
              href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 font-bold text-slate-900 hover:bg-indigo-50 transition-colors"
            >
              View Full Sheet on TakeUForward
            </a>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            <div className="p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold mb-2">180+ Problems</h4>
              <p className="text-sm text-slate-500">Carefully curated to cover all patterns.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold mb-2">Pattern-Based Learning</h4>
              <p className="text-sm text-slate-500">Grouped by common interview themes.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
