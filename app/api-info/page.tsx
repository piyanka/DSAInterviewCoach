import Link from "next/link";

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfe] font-body text-slate-900 selection:bg-indigo-600 selection:text-white">
      <main className="mx-auto max-w-4xl px-6 py-24">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline">
          ← Back to Home
        </Link>
        
        <h1 className="font-display text-5xl font-extrabold tracking-tighter sm:text-7xl mb-8">
          API & Engine
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-12">
            The DSA Interview Coach is powered by advanced generative AI models, specifically fine-tuned for algorithmic reasoning and interview pedagogy.
          </p>
          
          <div className="space-y-8">
            <div className="rounded-3xl bg-white border border-slate-200 p-8">
              <h3 className="text-2xl font-bold mb-4">Gemini AI Integration</h3>
              <p className="text-slate-600 mb-6">
                We leverage the Google Gemini API to provide low-latency, high-context interview simulations. 
                Our system uses custom prompt engineering to ensure the AI behaves like a professional technical interviewer.
              </p>
              <pre className="bg-slate-50 p-4 rounded-xl text-xs overflow-x-auto">
                <code>{`// Core AI Configuration
{
  "model": "gemini-1.5-flash",
  "temperature": 0.7,
  "system_instruction": "Act as a senior software engineer at a top-tier tech company..."
}`}</code>
              </pre>
            </div>

            <div className="grid gap-6 sm:grid-cols-3 text-center">
              <div className="p-6">
                <div className="text-indigo-600 font-black text-2xl mb-2">99.9%</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Uptime</div>
              </div>
              <div className="p-6">
                <div className="text-indigo-600 font-black text-2xl mb-2">&lt; 2s</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Response Time</div>
              </div>
              <div className="p-6">
                <div className="text-indigo-600 font-black text-2xl mb-2">Secure</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Data Privacy</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
