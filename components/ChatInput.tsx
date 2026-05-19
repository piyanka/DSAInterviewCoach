import { useEffect, useRef } from "react";
import { Send } from "lucide-react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (value.trim() && !disabled) onSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSubmit();
  };

  return (
    <div
      className="flex items-end gap-3 rounded-[28px] border border-[var(--surface-border)] 
      bg-[var(--surface-bg)] px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.06)]
      transition-all focus-within:border-[var(--color-primary)] focus-within:shadow-lg"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder="Message DSA Interview Coach..."
        className="max-h-40 w-full resize-none border-0 bg-transparent px-0 py-2 
        text-[0.95rem] text-slate-800 outline-none placeholder:text-slate-400 
        disabled:cursor-not-allowed disabled:opacity-50"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex h-10 w-10 items-center justify-center rounded-full 
        bg-[var(--color-primary)] text-white transition
        hover:bg-[var(--color-primary-hover)]
        disabled:cursor-not-allowed disabled:bg-slate-300
        active:scale-95"
      >
        <Send size={18} />
      </button>
    </div>
  );
}