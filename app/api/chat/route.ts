import { NextResponse } from "next/server";
import { striverQuestions, type StriverQuestion } from "@/data/striverQuestions";
import { getGeminiModel } from "@/lib/gemini";

export const runtime = "nodejs";

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

type InterviewDecision = {
  reply: string;
  stageVerdict: "stay" | "advance" | "solution";
  hintApplied?: boolean;
};

type ChatRequestBody = {
  message: string;
  mode: "mockInterview" | "normalChat";
  selectedTopic?: string;
  currentQuestion?: StriverQuestion | null;
  interviewState?: InterviewState | null;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
};

const DEFAULT_INTERVIEW_STATE: InterviewState = {
  stage: "approach",
  hintsUsed: 0
};

function getQuestionsByTopic(selectedTopic?: string) {
  if (!selectedTopic) {
    return striverQuestions;
  }

  return striverQuestions.filter((question) => question.topic === selectedTopic);
}

function pickRandomQuestion(selectedTopic?: string) {
  const questions = getQuestionsByTopic(selectedTopic);
  const pool = questions.length > 0 ? questions : striverQuestions;
  return pool[Math.floor(Math.random() * pool.length)];
}

function buildMockInterviewPrompt(
  question: StriverQuestion,
  message: string,
  history: Array<{ role: "user" | "assistant"; content: string }>,
  interviewState: InterviewState,
  intent: "start" | "hint" | "solution" | "continue"
) {
  const conversation = history
    .map((entry) => `${entry.role.toUpperCase()}: ${entry.content}`)
    .join("\n");

  const stageInstructions: Record<InterviewStage, string> = {
    approach:
      "The candidate is still explaining the high-level approach. Evaluate whether their approach is actually sufficient before moving on.",
    timeComplexity:
      "The candidate has already explained the approach. Ask specifically about time complexity and react to their answer.",
    spaceComplexity:
      "The candidate has already discussed time complexity. Ask specifically about space complexity and react to their answer.",
    optimization:
      "The candidate has already discussed time and space complexity. Ask about possible optimizations or edge cases and react to their answer.",
    complete:
      "The interview round is almost complete. Give concise feedback and mention they can ask for the full solution if they want it.",
    solution:
      "The candidate explicitly asked for the solution. You may now explain the full solution clearly with intuition, algorithm, and complexity."
  };

  return `
You are a FAANG-level DSA interviewer.

Question Title: ${question.title}
Topic: ${question.topic}
Difficulty: ${question.difficulty}
Problem:
${question.description}

Question Link:
${question.link}

Rules:
- Ask the user how they would approach the problem.
- Do NOT give the solution immediately.
- Give hints gradually if they struggle.
- Ask follow-up questions.
- Behave like a real interviewer.
- Base your feedback on the user's actual response.
- Decide stage progression from the quality of the user's latest answer, not from the intent label.
- Keep the reply concise and interview-focused.
- Do not skip directly to the solution unless the user explicitly asks for it.
- Sound like a human interviewer speaking naturally in a live conversation.
- Do not sound like documentation, lecture notes, or a generated report.
- Do not use markdown formatting like **bold**, bullet lists, separators, or section headings.
- Do not paste the full problem statement unless the user explicitly asks for it again.
- When starting, summarize the problem in 2 to 4 natural sentences, then ask one clear question.
- Use contractions naturally when appropriate.
- Keep most replies under 5 sentences.
- Ask only one follow-up question at a time.
- Do not mention the official problem title unless the user explicitly asks for it.
- Present the problem like a real interviewer would, without saying things like "The question is..." or "The problem title is...".
- If the user asks for an example, give one small concrete example.
- For examples involving arrays, linked lists, trees, graphs, or grids, format the sample input in a fenced code block.
- Keep the example brief and explain it in plain English right after the code block.
- When giving an example, use this structure exactly when possible:
  Input:
  \`\`\`txt
  ...
  \`\`\`
  Output:
  \`\`\`txt
  ...
  \`\`\`
  Then add one short plain-English explanation.

Return valid JSON only with this shape:
{
  "reply": string,
  "stageVerdict": "stay" | "advance" | "solution",
  "hintApplied": boolean
}

Stage rules:
- Set stageVerdict to "advance" only if the user's latest answer truly satisfies the current stage.
- If the answer is incomplete, incorrect, or insufficient, set stageVerdict to "stay" even if the message sounds like a normal continuation.
- Set stageVerdict to "solution" only when the user explicitly asks for the solution.
- Set hintApplied to true only when you actually provide a hint.
- Keep reply natural and interview-like, and make sure reply does not mention the JSON format.

Conversation so far:
${conversation || "No previous conversation."}

Latest user message:
${message}

Interview stage: ${interviewState.stage}
Hints already used: ${interviewState.hintsUsed}
Intent: ${intent}

Stage guidance:
${stageInstructions[interviewState.stage]}

Specific behavior:
- If intent is "start", introduce the problem naturally, briefly summarize it in plain English without naming the problem, and ask how the candidate would approach it.
- If intent is "hint", do not give the full solution. Give only the next small hint based on hint count.
- If stage is "approach" and the candidate gave a meaningful approach, ask about time complexity next.
- If stage is "timeComplexity", ask about space complexity after reacting to the answer.
- If stage is "spaceComplexity", ask about optimizations after reacting to the answer.
- If stage is "optimization", give final feedback and mention they can ask for the full solution.
- If intent is "solution", provide the full solution now.
- If the latest user message asks for an example, do not give the full solution. Give a short sample input or shape of the data structure first.
`;
}

function buildNormalChatPrompt(
  message: string,
  selectedTopic: string | undefined,
  history: Array<{ role: "user" | "assistant"; content: string }>
) {
  const conversation = history
    .map((entry) => `${entry.role.toUpperCase()}: ${entry.content}`)
    .join("\n");

  return `
You are DSA Interview Coach, a chatbot trained around Striver SDE Sheet style interview preparation.

Topic preference: ${selectedTopic || "General DSA"}

Rules:
- Answer as a purpose-built DSA interview coach.
- Keep the response focused on problem solving, hints, patterns, and interview readiness.
- If asked for solutions, prefer giving guidance or structured hints first.
- Sound natural and human, not like a generated article.
- Avoid markdown headings, bullet lists, and overly polished report-style writing unless the user asks for it.
- If the user asks for an example, give one concise example and use a fenced code block for structured input when helpful.
- Prefer labeling examples as Input and Output, each followed by a fenced code block.

Conversation so far:
${conversation || "No previous conversation."}

Latest user message:
${message}
`;
}

function sanitizeAiReply(reply: string) {
  return reply
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/^---+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractInterviewDecision(rawResponse: string): InterviewDecision | null {
  const trimmedResponse = rawResponse.trim();
  const fencedJsonMatch = trimmedResponse.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonCandidate = (fencedJsonMatch?.[1] ?? trimmedResponse).trim();
  const startIndex = jsonCandidate.indexOf("{");
  const endIndex = jsonCandidate.lastIndexOf("}");
  const payload =
    startIndex >= 0 && endIndex >= startIndex
      ? jsonCandidate.slice(startIndex, endIndex + 1)
      : jsonCandidate;

  try {
    const parsed = JSON.parse(payload) as Partial<InterviewDecision>;
    if (
      typeof parsed.reply === "string" &&
      (parsed.stageVerdict === "stay" ||
        parsed.stageVerdict === "advance" ||
        parsed.stageVerdict === "solution")
    ) {
      return {
        reply: parsed.reply,
        stageVerdict: parsed.stageVerdict,
        hintApplied: parsed.hintApplied === true
      };
    }
  } catch {
    return null;
  }

  return null;
}

function isHintRequest(message: string) {
  return /\b(hint|stuck|help|clue|nudge|struggling|dont know|don't know)\b/i.test(message);
}

function isSolutionRequest(message: string) {
  return /\b(solution|answer|solve it|full solution|show code|give code|tell me the solution)\b/i.test(
    message
  );
}

function getNextStage(stage: InterviewStage, verdict: InterviewDecision["stageVerdict"]) {
  if (verdict === "solution") {
    return "solution" as const;
  }

  if (verdict !== "advance") {
    return stage;
  }

  if (stage === "approach") {
    return "timeComplexity" as const;
  }

  if (stage === "timeComplexity") {
    return "spaceComplexity" as const;
  }

  if (stage === "spaceComplexity") {
    return "optimization" as const;
  }

  if (stage === "optimization") {
    return "complete" as const;
  }

  return stage;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const {
      message,
      mode,
      selectedTopic,
      currentQuestion,
      interviewState,
      history = []
    } = body;

    const normalizedHistory = (() => {
      const lastEntry = history.at(-1);
      if (
        lastEntry &&
        lastEntry.role === "user" &&
        lastEntry.content.trim() === message.trim()
      ) {
        return history.slice(0, -1);
      }

      return history;
    })();

    if (!message || !mode) {
      return NextResponse.json(
        { error: "Message and mode are required." },
        { status: 400 }
      );
    }

    const model = getGeminiModel();
    const selectedQuestion =
      mode === "mockInterview"
        ? currentQuestion ?? pickRandomQuestion(selectedTopic)
        : null;
    const activeInterviewState = interviewState ?? DEFAULT_INTERVIEW_STATE;
    const intent =
      mode === "mockInterview" && !currentQuestion
        ? "start"
        : isSolutionRequest(message)
          ? "solution"
          : isHintRequest(message)
            ? "hint"
            : "continue";

    const prompt =
      mode === "mockInterview" && selectedQuestion
        ? buildMockInterviewPrompt(
            selectedQuestion,
            message,
            normalizedHistory,
            activeInterviewState,
            intent
          )
        : buildNormalChatPrompt(message, selectedTopic, normalizedHistory);

    const result = await model.generateContent(prompt);
    const rawAiText = result.response.text();
    const decision = mode === "mockInterview" ? extractInterviewDecision(rawAiText) : null;
    const aiText = sanitizeAiReply(decision?.reply ?? rawAiText);
    const nextInterviewState =
      mode === "mockInterview"
        ? {
            stage:
              intent === "start"
                ? activeInterviewState.stage
                : getNextStage(activeInterviewState.stage, decision?.stageVerdict ?? "stay"),
            hintsUsed:
              decision?.hintApplied
                ? activeInterviewState.hintsUsed + 1
                : activeInterviewState.hintsUsed
          }
        : null;

    return NextResponse.json({
      reply: aiText,
      question: selectedQuestion,
      interviewState: nextInterviewState
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong. Please try again.";

    console.error("[api/chat] request failed:", error);

    return NextResponse.json(
      {
        error: message || "Something went wrong. Please try again."
      },
      { status: 500 }
    );
  }
}
