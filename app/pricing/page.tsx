import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfe] font-body text-slate-900 selection:bg-indigo-600 selection:text-white">
      <main className="mx-auto max-w-4xl px-6 py-24">
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline">
          ← Back to Home
        </Link>
        
        <h1 className="font-display text-5xl font-extrabold tracking-tighter sm:text-7xl mb-8">
          Pricing
        </h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 mb-12">
            We believe that technical interview preparation should be accessible to everyone. 
            That's why DSA Interview Coach is currently open and free to use.
          </p>
          
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Free Tier</h3>
              <p className="text-slate-500 mb-6">Perfect for students and early-career developers.</p>
              <div className="text-4xl font-black mb-8">$0<span className="text-sm font-medium text-slate-400">/forever</span></div>
              <ul className="space-y-3 text-sm font-medium text-slate-600">
                <li className="flex items-center gap-2">✓ Unlimited Mock Interviews</li>
                <li className="flex items-center gap-2">✓ Access to Striver SDE Sheet</li>
                <li className="flex items-center gap-2">✓ Real-time Complexity Analysis</li>
                <li className="flex items-center gap-2">✓ AI-powered Hints</li>
              </ul>
            </div>
            
            <div className="rounded-3xl border-2 border-indigo-600 bg-indigo-50/30 p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-bl-xl">
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro Tier</h3>
              <p className="text-slate-500 mb-6">Advanced analytics for serious candidates.</p>
              <div className="text-4xl font-black mb-8">TBD</div>
              <ul className="space-y-3 text-sm font-medium text-slate-600">
                <li className="flex items-center gap-2">✓ Personalized Learning Path</li>
                <li className="flex items-center gap-2">✓ Behavioral Interview Prep</li>
                <li className="flex items-center gap-2">✓ Resume Review AI</li>
                <li className="flex items-center gap-2">✓ Detailed Progress Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
