"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import { signIn } from 'next-auth/react';
import type { SignInResponse } from 'next-auth/react';
import googleIcon from "@/assets/google.svg";
import githubIcon from "@/assets/github.svg";

type UserInput = {
    email: string;
    password: string;
};

type CredentialsSignInResponse = {
  error?: string | null;
  status?: number;
  ok?: boolean;
  url?: string | null;
};

export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading, refreshAuth } = useAuth();
    const [user, setUser] = React.useState<UserInput>({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const onLogin = async () => {
        if (!validateEmail(user.email)) {
            toast.error("Please enter a valid email address");
            return;
        }
        if (user.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            const res = (await signIn('credentials', { redirect: false, email: user.email, password: user.password })) as CredentialsSignInResponse | undefined
            if (res && !res.error && res.ok) {
                toast.success('Logged in successfully');
                await refreshAuth();
                router.push('/');
            } else {
                const message = res?.error || 'Login failed';
                toast.error(message);
            }
        } catch (err: any) {
            const message = err?.message || 'Login failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const onOAuthLogin = async (provider: 'google' | 'github') => {
        try {
            setLoading(true);
            const result = (await signIn(provider, { callbackUrl: '/' })) as SignInResponse | undefined
            if (result?.error) {
                toast.error(result.error);
            }
        } catch (err: any) {
            toast.error(err?.message || 'OAuth sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const enabled = user.email.trim().length > 0 && user.password.length > 0;
        setButtonDisabled(!enabled);
    }, [user]);

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.push("/");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <main className="min-h-[calc(100svh-var(--navbar-height))] flex items-center justify-center px-6">
                <p className="text-sm text-slate-500">Checking your session...</p>
            </main>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <main className="min-h-[calc(100svh-var(--navbar-height))] flex flex-col">
            <div className="flex-1 flex items-center justify-center overflow-hidden px-6 py-6 sm:py-8 relative">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-[140%] -translate-y-[58%] rounded-full bg-indigo-200/35 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] translate-x-[85%] -translate-y-[12%] rounded-full bg-sky-200/45 blur-3xl" />

                <div className="relative w-full max-w-md rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] px-8 py-12 shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl">
                    <div className="text-center mb-8">
                        <div className="text-4xl leading-none mb-4">🧠</div>
                        <h1 className="text-3xl font-bold tracking-[-0.06em] text-slate-900">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to continue your interview prep
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!buttonDisabled) onLogin();
                        }}
                        className="space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    value={user.password}
                                    onChange={(e) =>
                                        setUser({ ...user, password: e.target.value })
                                    }
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                                >
                                    {passwordVisible ? "Hide" : "View"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={buttonDisabled || loading}
                            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all duration-200 mt-7"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 space-y-3">
                        <button
                            type="button"
                            onClick={() => onOAuthLogin('google')}
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                        >
                            <Image src={googleIcon} alt="Google" className="h-5 w-5" width={20} height={20} />
                            Continue with Google
                        </button>
                        <button
                            type="button"
                            onClick={() => onOAuthLogin('github')}
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                        >
                            <Image src={githubIcon} alt="GitHub" className="h-5 w-5" width={20} height={20} />
                            Continue with GitHub
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="space-y-3 text-center text-sm text-slate-600">
                            <p>
                                <Link
                                    href="/user/forgotpassword"
                                    className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </p>
                            <p>
                                Don't have an account?{" "}
                                <Link
                                    href="/user/signup"
                                    className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
