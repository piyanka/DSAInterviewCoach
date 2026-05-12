"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            await axios.post("/api/user/forgotpassword", { email });
            toast.success("Reset link sent. Check your email.");
        } catch (err: any) {
            const message = err?.response?.data?.error || err?.message || "Unable to send reset link";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100svh-var(--navbar-height))] flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-hidden px-6 py-6 sm:py-8 relative">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-[140%] -translate-y-[58%] rounded-full bg-indigo-200/35 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] translate-x-[85%] -translate-y-[12%] rounded-full bg-sky-200/45 blur-3xl" />

                <div className="relative w-full max-w-md rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] px-8 py-12 shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <div className="text-4xl leading-none mb-4">🔐</div>
                        <h1 className="text-3xl font-bold tracking-[-0.06em] text-slate-900">Forgot password</h1>
                        <p className="mt-2 text-sm text-slate-500">We’ll send a reset link to your email address</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || email.trim().length === 0}
                            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-200 mt-7"
                        >
                            {loading ? "Sending link..." : "Send reset link"}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
                        <Link href="/user/login" className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}