import { useEffect, useRef } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatAreaProps = {
  messages: Message[];
  isTyping?: boolean;
};

export default function ChatArea({ messages, isTyping }: ChatAreaProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-4">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={[
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                  msg.role === "user"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white border border-slate-200 text-slate-800"
                ].join(" ")}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm">
                <span className="animate-pulse">Typing...</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Box */}
      <div className="sticky bottom-0 border-t bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <input
            type="text"
            placeholder="Ask a DSA question..."
            className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-[var(--color-primary)]"
          />
          <button className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm text-white hover:bg-[var(--color-primary-hover)]">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}