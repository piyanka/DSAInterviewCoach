import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-24 text-center md:py-32">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-sm font-medium text-indigo-700">
            <span className="mr-2">✨</span> AI-Powered Interview Prep
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
            Crack your <span className="text-indigo-600">DSA Interview</span> with Confidence
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Interactive AI coaching trained on the Striver SDE Sheet. Practice real scenarios, get instant feedback, and master the toughest problems.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/interview"
              className="group relative flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-indigo-600 px-8 font-bold text-white transition-all hover:bg-indigo-700"
            >
              Start Free Mock Interview
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#features"
              className="flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Abstract shapes for premium look */}
        <div className="pointer-events-none absolute -left-20 top-40 h-96 w-96 rounded-full bg-indigo-400/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-blue-400/10 blur-[100px]" />
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50/50 py-24 px-6 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to succeed</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "AI Interviewer",
                desc: "Get grilled by an AI that understands edge cases, time complexity, and optimization.",
                icon: "🤖"
              },
              {
                title: "Striver SDE Sheet",
                desc: "Built-in support for the most popular DSA roadmap. Practice curriculum-based questions.",
                icon: "📜"
              },
              {
                title: "Real-time Feedback",
                desc: "Don't just solve—learn. Get hints and explanations as you navigate through the interview.",
                icon: "⚡"
              }
            ].map((feature, i) => (
              <div key={i} className="group rounded-3xl border border-white bg-white/50 p-8 shadow-sm transition hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <span className="font-bold text-slate-900">DSA Coach</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2024 DSA Interview Coach. Build with ❤️ for developers.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
