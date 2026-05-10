import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfe] font-body text-slate-900 selection:bg-indigo-600 selection:text-white">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-32">
        <h1 className="font-display text-5xl font-extrabold tracking-tighter sm:text-7xl mb-8">
          Documentation
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-12">
            Everything you need to know about getting the most out of your mock interviews.
          </p>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">How to Start</h2>
              <div className="space-y-4 text-slate-600">
                <p>1. <strong>Select a Topic:</strong> Choose from Arrays, Strings, Trees, and more from our landing page.</p>
                <p>2. <strong>Initialize the Mock:</strong> Click "Launch Mock Interview" to begin your 45-minute timed session.</p>
                <p>3. <strong>Converse with AI:</strong> Talk through your logic. Don't just paste code; explain your thought process.</p>
              </div>
            </section>

            <section className="p-8 rounded-3xl border border-amber-200 bg-amber-50">
              <h3 className="text-xl font-bold mb-4 text-amber-900">Pro Tip</h3>
              <p className="text-sm text-amber-800">
                Always start with the brute force approach. The AI will monitor your complexity and nudge you towards optimization if you're stuck!
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Features</h2>
              <ul className="grid gap-4 sm:grid-cols-2 list-none p-0">
                <li className="p-4 bg-white rounded-xl border border-slate-100 font-medium">✓ Real-time Timer</li>
                <li className="p-4 bg-white rounded-xl border border-slate-100 font-medium">✓ Auto-Save Session</li>
                <li className="p-4 bg-white rounded-xl border border-slate-100 font-medium">✓ Hint System</li>
                <li className="p-4 bg-white rounded-xl border border-slate-100 font-medium">✓ Interview Feedback</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
