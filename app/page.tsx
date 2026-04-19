"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { ChatMessage } from "@/components/ChatMessage";
import { Header } from "@/components/Header";
import { SuggestionButtons } from "@/components/SuggestionButtons";
import { type StriverQuestion } from "@/data/striverQuestions";

type ChatRole = "user" | "assistant" | "system";

type UiMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ChatMode = "mockInterview" | "normalChat";
type InterviewStage =
  | "approach"
  | "timeComplexity"
  | "spaceComplexity"
  | "optimization"
  | "complete"
  | "solution";

type InterviewState = {
  stage: InterviewStage;
  hintsUsed: number;
};

function inferTopicFromSuggestion(label: string): string | undefined {
  if (label.includes("Array")) {
    return "Arrays";
  }

  if (label.includes("Tree")) {
    return "Binary Trees";
  }

  if (label.includes("Dynamic Programming")) {
    return "Dynamic Programming";
  }

  return undefined;
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const MOCK_INTERVIEW_DURATION_SECONDS = 45 * 60;
const MOCK_INTERVIEW_WARNING_SECONDS = 5 * 60;

function formatRemainingTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function HomePage() {
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>("normalChat");
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState<StriverQuestion | null>(null);
  const [interviewState, setInterviewState] = useState<InterviewState | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [interviewExpired, setInterviewExpired] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const expiryAnnouncedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (mode !== "mockInterview" || timeRemaining === null || interviewExpired) {
      // Clean up interval if interview is not active
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeRemaining((previous) => {
        if (previous === null) {
          return previous;
        }

        if (previous <= 1) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [mode, interviewExpired]);

  useEffect(() => {
    if (mode !== "mockInterview" || timeRemaining !== 0 || expiryAnnouncedRef.current) {
      return;
    }

    expiryAnnouncedRef.current = true;
    setInterviewExpired(true);
    setMessages((prev) => [
      ...prev,
      {
        id: makeId(),
        role: "system",
        content:
          "Your 45-minute mock interview has ended. Reset chat to start a fresh interview."
      }
    ]);
  }, [mode, timeRemaining]);

  const chatHistory = useMemo(
    () =>
      messages
        .filter((message) => message.role !== "system")
        .map((message) => ({
          role: message.role === "user" ? "user" : "assistant",
          content: message.content
        })),
    [messages]
  );

  async function sendMessage(message: string, nextMode = mode, nextTopic = selectedTopic) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || (nextMode === "mockInterview" && interviewExpired)) {
      return;
    }

    const userMessage: UiMessage = {
      id: makeId(),
      role: "user",
      content: trimmedMessage
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmedMessage,
          mode: nextMode,
          selectedTopic: nextTopic,
          currentQuestion,
          interviewState,
          history: [...chatHistory, { role: "user", content: trimmedMessage }]
        })
      });

      const contentType = response.headers.get("content-type") || "";
      const payloadText = await response.text();

      if (!contentType.includes("application/json")) {
        throw new Error("The server returned an unexpected response. Please restart the app and try again.");
      }

      const data = JSON.parse(payloadText) as {
        reply?: string;
        error?: string;
        question?: StriverQuestion | null;
        interviewState?: InterviewState | null;
      };

      const replyText = data.reply;

      if (!response.ok || !replyText) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setCurrentQuestion(data.question ?? null);
      setInterviewState(data.interviewState ?? null);
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "assistant",
          content: replyText
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "system",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestion(label: string) {
    const nextMode: ChatMode = "mockInterview";
    const nextTopic = inferTopicFromSuggestion(label);

    expiryAnnouncedRef.current = false;
    setMode(nextMode);
    setSelectedTopic(nextTopic);
    setCurrentQuestion(null);
    setInterviewExpired(false);
    setTimeRemaining(MOCK_INTERVIEW_DURATION_SECONDS);
    setInterviewState({
      stage: "approach",
      hintsUsed: 0
    });

    void sendMessage(label, nextMode, nextTopic);
  }

  function handleReset() {
    expiryAnnouncedRef.current = false;
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setMode("normalChat");
    setSelectedTopic(undefined);
    setCurrentQuestion(null);
    setInterviewState(null);
    setTimeRemaining(null);
    setInterviewExpired(false);
  }

  const emptyState = (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-[140%] -translate-y-[58%] rounded-full bg-indigo-200/35 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[18rem] w-[18rem] translate-x-[85%] -translate-y-[12%] rounded-full bg-sky-200/45 blur-3xl" />

      <div className="relative flex w-full max-w-3xl flex-col items-center gap-7 rounded-[32px] border border-[var(--shell-border)] bg-[var(--shell-bg)] px-8 py-12 text-center shadow-[0_28px_80px_rgba(99,102,241,0.14)] backdrop-blur-xl sm:px-12 sm:py-14">
        <div className="text-4xl leading-none">🧠</div>
        <h2 className="text-[3rem] font-bold tracking-[-0.06em] text-slate-900 sm:text-[3.2rem]">
          DSA Interview Coach
        </h2>
        <p className="max-w-2xl text-[1rem] leading-8 text-slate-500">
          Practice Data Structures and Algorithms interviews with an AI interviewer
          trained on Striver SDE Sheet questions.
        </p>
        <SuggestionButtons onSelect={handleSuggestion} disabled={isLoading} />
      </div>
    </section>
  );

  const chatView = (
    <section className="flex flex-1 flex-col overflow-hidden bg-transparent">
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 scroll-smooth sm:px-6"
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}

          {isLoading ? (
            <ChatMessage role="assistant" content="" loading />
          ) : null}
        </div>
      </div>
    </section>
  );

  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <div className="flex min-h-screen flex-col">
          {messages.length > 0 ? (
            <Header
              onReset={handleReset}
              disabled={isLoading}
              timer={mode === "mockInterview" && timeRemaining !== null ? formatRemainingTime(timeRemaining) : null}
              timerWarning={timeRemaining !== null && timeRemaining <= MOCK_INTERVIEW_WARNING_SECONDS}
              showReset={messages.length > 0}
            />
          ) : null}

          {messages.length === 0 ? emptyState : chatView}

          {messages.length > 0 ? (
            <div className="sticky bottom-0 border-t border-[var(--surface-border)] bg-[var(--surface-bg)] px-4 py-4 backdrop-blur sm:px-6">
              <div className="mx-auto max-w-2xl">
                <ChatInput
                  value={input}
                  onChange={setInput}
                  onSubmit={() => void sendMessage(input)}
                  disabled={isLoading || interviewExpired}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
