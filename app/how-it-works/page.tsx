import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Select your challenge",
      description: "Browse through curated topics from the Striver SDE Sheet. Choose a specific technical area like Arrays, Trees, or Dynamic Programming to focus your session.",
      icon: "🎯"
    },
    {
      number: "02",
      title: "Interactive AI Interview",
      description: "Our AI doesn't just give you a question; it acts as a real interviewer. It will guide you through the approach, edge cases, and time complexity analysis before you even write code.",
      icon: "💬"
    },
    {
      number: "03",
      title: "Real-time Coding & Hints",
      description: "Start implementing your solution. If you get stuck, the AI provides subtle hints and nudges rather than full answers, helping you develop true problem-solving intuition.",
      icon: "💻"
    },
    {
      number: "04",
      title: "Feedback & Optimization",
      description: "Receive immediate feedback on your code and logic. The AI helps you identify optimizations for better time and space complexity, just like a real-world interview.",
      icon: "📈"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Navbar />

      <main className="mx-auto max-w-5xl flex-1 px-6 py-16 md:py-24">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            How it <span className="text-indigo-600">Works</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            A simple 4-step process to master your data structures and algorithms interviews.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-indigo-100 md:block" />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center gap-8 md:flex-row ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step content */}
                <div className="w-full md:w-1/2">
                  <div className={`rounded-3xl border border-white bg-white/50 p-8 shadow-sm backdrop-blur-sm transition hover:shadow-lg ${
                    index % 2 !== 0 ? "md:text-right" : ""
                  }`}>
                    <span className="mb-4 inline-block text-4xl">{step.icon}</span>
                    <div className={`mb-2 text-xs font-bold uppercase tracking-widest text-indigo-600 ${
                      index % 2 !== 0 ? "md:justify-end" : ""
                    }`}>
                      Step {step.number}
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-slate-900">{step.title}</h2>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Center circle */}
                <div className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-indigo-50 bg-indigo-600 text-white shadow-xl md:flex">
                  <span className="text-sm font-bold">{step.number}</span>
                </div>

                {/* Empty half for spacing */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="rounded-3xl border border-indigo-100 bg-indigo-50/30 p-12 backdrop-blur-sm">
            <h3 className="mb-6 text-3xl font-bold text-slate-900">Ready to start?</h3>
            <p className="mb-8 text-slate-600">The best way to learn is by doing. Start your first session now.</p>
            <Link
              href="/interview"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-indigo-600 px-10 font-bold text-white transition hover:bg-indigo-700 shadow-xl shadow-indigo-100"
            >
              Go to Interview Coach
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-12 px-6">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <span className="font-bold text-slate-900">DSA Coach</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2024 DSA Interview Coach.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <Link href="/interview" className="hover:text-indigo-600">Practice</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
