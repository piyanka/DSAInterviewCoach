 'use client';

import { signOut } from 'next-auth/react';
import axios from 'axios';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/AuthProvider";

type NavItem = {
  href: string;
  label: string;
};

const publicNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/user/login", label: "Login" },
  { href: "/user/signup", label: "Sign Up" },
];

const privateNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/user/profile", label: "Profile" }
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, isLoading, clearAuth } = useAuth();
  const isLandingPage = pathname === '/';

  const handleStartNow = () => {
    window.dispatchEvent(new CustomEvent('landingpage:start-interview'));
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout');
      await signOut({ redirect: false });
      toast.success('Logged out successfully');
      setMenuOpen(false);
      clearAuth();
      router.push('/user/login');
    } catch (err: any) {
      const message = err?.response?.data?.error || err?.message || 'Unable to log out';
      toast.error(message);
    }
  };

  const navItems = isAuthenticated ? privateNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--surface-border)] bg-[var(--surface-bg)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3 self-start">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-400 text-lg font-bold text-white shadow-[0_16px_30px_rgba(79,70,229,0.22)]">
            🧠
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[-0.03em] text-slate-900">DSA Interview Coach</p>
            <p className="text-xs text-slate-500">Practice. Improve. Repeat.</p>
          </div>
        </Link>

        {/* LANDING PAGE SECTION LINKS */}
        {isLandingPage && (
          <nav className="hidden flex-1 items-center justify-end gap-2 md:flex">
            <a href="#challenge" className="px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600">Problem</a>
            <a href="#curriculum" className="px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600">Curriculum</a>
            <a href="#specs" className="px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600">Specs</a>
          </nav>
        )}

        {/* START NOW BUTTON */}
        {isLandingPage && (
          <button 
              onClick={handleStartNow}
              className="group flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-[12px] font-bold text-white transition hover:bg-indigo-600 active:scale-95"
            >
              Start Now
              <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
        )}

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-expanded={menuOpen}
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>

          {menuOpen ? (
            <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Menu</p>
              </div>

              <nav className="p-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <button
                      key={item.href}
                      type="button"
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => {
                        setMenuOpen(false);
                        router.push(item.href);
                      }}
                      className={[
                        "flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition",
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  );
                })}

                {isLoading ? (
                  <div className="mt-1 rounded-xl px-4 py-3 text-sm text-slate-500">Loading...</div>
                ) : isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => void handleLogout()}
                    className="mt-1 flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
                  >
                    Logout
                  </button>
                ) : null}
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}