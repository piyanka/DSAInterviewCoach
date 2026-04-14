import Link from "next/link";

type HeaderProps = {
  onReset: () => void;
  disabled?: boolean;
  timer?: string | null;
  timerWarning?: boolean;
  showReset?: boolean;
};

export function Header({
  onReset,
  disabled = false,
  timer = null,
  timerWarning = false,
  showReset = true
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-[var(--surface-border)] bg-[var(--surface-bg)] px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link href="/" className="transition hover:opacity-70">
          <h1 className="text-[1.02rem] font-medium tracking-[-0.04em] text-slate-900">
            DSA Interview Coach
          </h1>
        </Link>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {timer ? (
            <div
              className={[
                "inline-flex h-9 items-center justify-center rounded-full border px-4 text-[0.82rem] font-medium",
                timerWarning
                  ? "border-amber-300 bg-amber-50 text-amber-900"
                  : "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-text)]"
              ].join(" ")}
            >
              {timer}
            </div>
          ) : null}
          {showReset ? (
            <button
              type="button"
              onClick={onReset}
              disabled={disabled}
              className="inline-flex h-9 items-center justify-center rounded-full border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 text-[0.82rem] font-medium text-[var(--color-primary-text)] transition hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset Chat
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
