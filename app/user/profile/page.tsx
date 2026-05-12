'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

type UserProfile = {
    _id?: string;
    username?: string;
    email?: string;
    isVerified?: boolean;
    isAdmin?: boolean;
};

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [passwordVisible, setPasswordVisible] = useState({ currentPassword: false, newPassword: false, confirmPassword: false });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUserDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post("/api/user/profile");
            setProfile(response.data.data);
        } catch (err: any) {
            const message = err?.response?.data?.error || err?.message || "Unable to load profile";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void getUserDetails();
    }, []);

    const initials = useMemo(() => {
        const name = profile?.username?.trim() || profile?.email?.trim() || "U";
        return name
            .split(/\s+/)
            .map((part) => part[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }, [profile]);


    const handleChangePassword = async () => {
        if (passwordForm.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("New password and confirm new password does not match");
            return;
        }

        try {
            setPasswordLoading(true);
            const response = await axios.post("/api/user/changepassword", {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            const message = response.data.message;
            if(response.data.success){
                toast.success(message);
                setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            }else{
                toast.error(message);
            }   
        } catch (err: any) {
            const message = "Unable to change password please try again later";
            toast.error(message);
        } finally {
            setPasswordLoading(false);
        }
    };


    return (
        <main className="min-h-screen px-6 py-10 sm:py-14">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="mt-2 text-3xl font-bold tracking-[-0.06em] text-slate-900 sm:text-4xl">
                            Your profile
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                        >
                            Back to coach
                        </Link>
                    </div>
                </div>

                <section className="grid gap-6">
                    <div className="rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] p-6 shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-gradient-to-br from-indigo-500 to-sky-400 text-2xl font-bold text-white shadow-[0_18px_40px_rgba(79,70,229,0.25)]">
                                    {initials}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Signed in as</p>
                                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
                                        {profile?.username || "Loading profile"}
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-600">{profile?.email || "Fetching account details..."}</p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Username</p>
                                <p className="mt-2 text-lg font-semibold text-slate-900">{profile?.username || "—"}</p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Email</p>
                                <p className="mt-2 break-all text-lg font-semibold text-slate-900">{profile?.email || "—"}</p>
                            </div>

                        </div>

                    </div>

                    <div className="rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] p-6 shadow-[0_28px_80px_rgba(99,102,241,0.1)] backdrop-blur-xl sm:p-8">
                        <div className="max-w-2xl">
                            <p className="text-sm font-medium uppercase tracking-[0.22em] text-indigo-600">Security</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">Change password</h2>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-slate-700">
                                    Current password
                                </label>
                                <div className="relative">
                                    <input
                                        id="currentPassword"
                                        type={passwordVisible.currentPassword ? "text" : "password"}
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-20 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        placeholder="Enter current password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible({ ...passwordVisible, currentPassword: !passwordVisible.currentPassword })}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                                    >
                                        {passwordVisible.currentPassword ? "Hide" : "View"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-slate-700">
                                    New password
                                </label>
                                <div className="relative">
                                    <input
                                        id="newPassword"
                                        type={passwordVisible.newPassword ? "text" : "password"}
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-20 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible({ ...passwordVisible, newPassword: !passwordVisible.newPassword })}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                                    >
                                        {passwordVisible.newPassword ? "Hide" : "View"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
                                    Confirm new password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={passwordVisible.confirmPassword ? "text" : "password"}
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-20 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible({ ...passwordVisible, confirmPassword: !passwordVisible.confirmPassword })}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                                    >
                                        {passwordVisible.confirmPassword ? "Hide" : "View"}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="button"
                                    onClick={() => void handleChangePassword()}
                                    disabled={passwordLoading}
                                    className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {passwordLoading ? "Updating..." : "Change password"}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}