"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";


export default function VerifyEmail() {
    return (
        <Suspense fallback={<VerifyEmailFallback />}>
            <VerifyEmailContent />
        </Suspense>
    );
}

function VerifyEmailFallback() {
    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-hidden px-6 py-16 relative">
                <div className="relative w-full max-w-md rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] px-8 py-12 shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <div className="text-4xl leading-none mb-4">✉️</div>
                        <h1 className="text-3xl font-bold tracking-[-0.06em] text-slate-900">Verify Email</h1>
                        <p className="mt-2 text-sm text-slate-500">Loading verification status...</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const verifyUserEmail = async (t: string) => {
        try {
            setLoading(true);
            const res = await axios.post("/api/user/verifyemail", { token: t });
            console.log("verify response", res.data);
            setVerified(true);
            toast.success("Email verified. You can now log in.");
            setTimeout(() => router.push("/user/login"), 500);
        } catch (err: any) {
            console.error("verify failed", err?.response || err);
            const msg = err?.response?.data?.error || err?.message || "Verification failed";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const t = searchParams?.get("token") || "";
        setToken(t);
    }, [searchParams]);

    useEffect(() => {
        if (token && token.length > 0) verifyUserEmail(token);
    }, [token]);

    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-hidden px-6 py-16 relative">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-[140%] -translate-y-[58%] rounded-full bg-indigo-200/35 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] translate-x-[85%] -translate-y-[12%] rounded-full bg-sky-200/45 blur-3xl" />

                <div className="relative w-full max-w-md rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] px-8 py-12 shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <div className="text-4xl leading-none mb-4">✉️</div>
                        <h1 className="text-3xl font-bold tracking-[-0.06em] text-slate-900">Verify Email</h1>
                        <p className="mt-2 text-sm text-slate-500">Confirming your email address</p>
                    </div>

                    {loading && (
                        <div className="text-center py-6">
                            <div className="inline-block">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            </div>
                            <p className="mt-4 text-sm text-slate-600">Verifying your email...</p>
                        </div>
                    )}

                    {!loading && verified && (
                        <div className="text-center py-6">
                            <div className="text-5xl mb-4">✅</div>
                            <p className="text-lg font-semibold text-green-600 mb-2">Email Verified!</p>
                            <p className="text-sm text-slate-600 mb-6">Your email has been successfully verified.</p>
                            <Link href="/user/login" className="inline-block w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200">
                                Proceed to Login
                            </Link>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="text-center py-6">
                            <div className="text-5xl mb-4">❌</div>
                            <p className="text-lg font-semibold text-red-600 mb-2">Verification Failed</p>
                            <p className="text-sm text-slate-600 mb-6">{error}</p>
                            <Link href="/user/signup" className="inline-block w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200">
                                Create New Account
                            </Link>
                        </div>
                    )}

                    {!loading && !verified && !error && (
                        <div className="text-center py-6">
                            <p className="text-sm text-slate-600 mb-4">
                                {token ? "Waiting to verify..." : "No verification token provided."}
                            </p>
                            {!token && (
                                <Link href="/user/signup" className="inline-block w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-3 rounded-lg transition-all duration-200">
                                    Sign Up
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}