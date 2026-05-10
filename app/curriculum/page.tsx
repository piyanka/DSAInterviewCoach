import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfe] font-body text-slate-900 selection:bg-indigo-600 selection:text-white">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-32">
        <h1 className="font-display text-5xl font-extrabold tracking-tighter sm:text-7xl mb-8">
          Curriculum
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-12">
            Our curriculum is laser-focused on the most frequently asked questions in FAANG interviews, 
            heavily inspired by the legendary Striver SDE Sheet.
          </p>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">Core Foundations</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h4 className="font-bold mb-2">Arrays & Hashing</h4>
                  <p className="text-sm text-slate-500">Mastering two-pointers, sliding window, and prefix sums.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h4 className="font-bold mb-2">Linked Lists</h4>
                  <p className="text-sm text-slate-500">Cycle detection, reversing, and merging complex nodes.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Advanced Algorithms</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h4 className="font-bold mb-2">Trees & Graphs</h4>
                  <p className="text-sm text-slate-500">DFS, BFS, and shortest path algorithms in complex structures.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-100">
                  <h4 className="font-bold mb-2">Dynamic Programming</h4>
                  <p className="text-sm text-slate-500">From recursion to memoization and bottom-up optimization.</p>
                </div>
              </div>
            </section>
            
            <section className="rounded-3xl bg-slate-900 p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Industrial Edge</h3>
              <p className="text-slate-400 mb-6">We don't just teach syntax. We teach you how to think like an engineer at scale.</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Real-time Complexity Analysis</li>
                <li>• Edge Case Synthesis</li>
                <li>• Scalable Solution Architectures</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
