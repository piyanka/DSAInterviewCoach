"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<ResetPasswordFallback />}>
            <ResetPasswordForm />
        </Suspense>
    );
}

function ResetPasswordFallback() {
    return (
        <main className="min-h-[calc(100svh-var(--navbar-height))] flex flex-col">
            <div className="flex-1 flex items-center justify-center px-6 py-6 sm:py-8">
                <div className="w-full max-w-md rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] px-8 py-12 shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl">
                    <div className="text-center">
                        <div className="text-4xl leading-none mb-4">🛡️</div>
                        <h1 className="text-3xl font-bold tracking-[-0.06em] text-slate-900">Set a new password</h1>
                        <p className="mt-2 text-sm text-slate-500">Loading reset link...</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ newPassword: "", confirmPassword: "" });
    const [passwordVisible, setPasswordVisible] = useState({ newPassword: false, confirmPassword: false });

    useEffect(() => {
        setToken(searchParams?.get("token") || "");
    }, [searchParams]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (passwordForm.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/user/resetpassword", { token, password : passwordForm.newPassword });
            if(response.data.success){
                toast.success(response.data.message);
                router.push("/user/login");
            }else{
                toast.error(response.data.message);
            }
        } catch (err: any) {
            const message = err?.response?.data?.error || err?.message || "Unable to reset password";
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
                        <div className="text-4xl leading-none mb-4">🛡️</div>
                        <h1 className="text-3xl font-bold tracking-[-0.06em] text-slate-900">Set a new password</h1>
                        <p className="mt-2 text-sm text-slate-500">Choose a new password for your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                New password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({...passwordForm, newPassword : e.target.value})}
                                    type={passwordVisible.newPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible({...passwordVisible, newPassword : !passwordVisible.newPassword})}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                                >
                                    {passwordVisible.newPassword ? "Hide" : "View"}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword : e.target.value})}
                                    type={passwordVisible.confirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible({...passwordVisible, confirmPassword : !passwordVisible.confirmPassword})}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                                >
                                    {passwordVisible.confirmPassword ? "Hide" : "View"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !token}
                            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-200 mt-7"
                        >
                            {loading ? "Updating..." : "Reset password"}
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