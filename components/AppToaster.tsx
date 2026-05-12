'use client';

import { toast, Toaster, ToastBar } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster position="top-right">
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex w-full items-center gap-3">
              <div className="shrink-0">{icon}</div>
              <div className="min-w-0 flex-1 text-sm">{message}</div>
              <button
                type="button"
                onClick={() => toast.dismiss(t.id)}
                aria-label="Dismiss toast"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                ×
              </button>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}