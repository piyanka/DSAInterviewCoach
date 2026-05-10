import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfe] font-body text-slate-900 selection:bg-indigo-600 selection:text-white">
      <main className="mx-auto max-w-4xl px-6 py-24">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline">
          ← Back to Home
        </Link>
        
        <h1 className="font-display text-5xl font-extrabold tracking-tighter sm:text-7xl mb-8">
          Dev Blog
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-12">
            Insights, strategies, and success stories from the world of algorithmic interviews.
          </p>
          
          <div className="grid gap-12">
            {[
              {
                title: "How to Explain Big O Without Using the Formula",
                date: "May 10, 2026",
                desc: "Learn the intuitive way to discuss time complexity that interviewers actually want to hear."
              },
              {
                title: "Top 5 Graph Patterns You Must Know",
                date: "May 8, 2026",
                desc: "BFS vs DFS is just the beginning. We dive into cycles, topological sorts, and connectivity."
              },
              {
                title: "The Silent Killer: Failing to Listen to Your Interviewer",
                date: "May 5, 2026",
                desc: "Why the hints given by your interviewer are more important than the code itself."
              }
            ].map((post, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">{post.date}</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                <p className="text-slate-500 leading-relaxed">{post.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold border-b-2 border-indigo-600 pb-0.5">
                  Read More
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
