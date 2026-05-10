import { Bot } from "lucide-react";

type ChatMessageProps = {
  role: "user" | "assistant" | "system";
  content: string;
  loading?: boolean;
};

type ContentSegment =
  | { type: "text"; value: string }
  | { type: "code"; value: string };

function parseContent(content: string): ContentSegment[] {
  const parts = content.split(/```(?:\w+)?\n?/);

  return parts
    .map((part, index) => ({
      type: index % 2 === 0 ? "text" : "code",
      value: part.trim()
    }))
    .filter((part) => part.value.length > 0) as ContentSegment[];
}

export function ChatMessage({
  role,
  content,
  loading = false
}: ChatMessageProps) {
  const isUser = role === "user";
  const isSystem = role === "system";
  const segments = parseContent(content);

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "rounded-[24px] px-4 py-3 transition-colors",
          isUser
            ? "max-w-[280px] rounded-br-md bg-white/80 text-slate-900 sm:max-w-[320px]"
            : isSystem
              ? "max-w-[82%] rounded-bl-md border border-amber-200 bg-amber-50 text-amber-900 sm:max-w-[72%]"
              : "max-w-[82%] rounded-bl-md bg-white/80 text-slate-900 sm:max-w-[72%]"
        ].join(" ")}
      >
        <div className="mb-2 flex items-center gap-2">
          {!isUser && !isSystem && <Bot className="h-3 w-3 opacity-50" />}
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-50">
            {isUser ? "You" : isSystem ? "System" : "Coach"}
          </p>
        </div>
        {loading ? (
          <div className="flex items-center gap-3 text-[0.95rem]">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-current" />
            </div>
            <span>Interviewer is thinking...</span>
          </div>
        ) : (
          <div className="space-y-3">
            {segments.map((segment, index) =>
              segment.type === "code" ? (
                <pre
                  key={`${segment.type}-${index}`}
                  className="overflow-x-auto rounded-2xl bg-[var(--code-bg)] px-4 py-3 text-[0.88rem] leading-6 text-[var(--code-text)]"
                >
                  <code>{segment.value}</code>
                </pre>
              ) : (
                <p
                  key={`${segment.type}-${index}`}
                  className="whitespace-pre-wrap text-[0.95rem] leading-7"
                >
                  {segment.value}
                </p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
