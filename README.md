> 🚀 **This project is officially participating in NSoC**

[![NSOC](NSoC.png)](https://nsoc.in/)

# DSA Interview Coach


DSA Interview Coach is a full-stack AI chatbot web application for practicing Data Structures and Algorithms interview questions through a mock interview experience. It uses Next.js App Router, TypeScript, Tailwind CSS, and the Gemini API to create a ChatGPT-style interview workflow around Striver SDE Sheet inspired questions.

## Live Demo

[Try the DSA Interview Coach](https://dsa-interview-coach.vercel.app)

## Why I Picked This Topic

I chose this topic because I personally faced challenges while preparing for DSA interviews. During my preparation, I realized that having someone available to take mock interviews anytime would have been extremely helpful for practicing how to think aloud, explain approaches, and handle follow-up questions. DSA interview preparation is a common challenge for many students and developers. While most platforms provide lists of problems and solutions, they rarely replicate the experience of a real interview. This project aims to bridge that gap by creating a conversational AI experience where users can practice step by step in an interview-like environment.

## What I Built

- This is a web application, DSA Interview Coach, that simulates real DSA technical interviews.
- The AI acts as an interviewer, asking problems and adaptive follow-up questions based on the candidate’s responses.
- Provides progressive hints and guidance to help users think through the problem without directly revealing the solution.
- Conducts a complete mock interview flow, probing the approach and naturally wrapping up the session like a real interviewer.

## Features

- ChatGPT-style friendly chat UI
- Welcome screen with quick-start interview actions
- Gemini-powered mock interview prompts with staged interview behavior
- Mock interview flow that asks for approach first, then time complexity, then space complexity, then optimizations
- Gradual hint system that avoids revealing the full solution too early
- Full solution reveal only when the user explicitly asks for it
- Striver SDE Sheet inspired dataset with 30+ DSA interview questions
- Loading indicator, reset chat action, timer functionality, and API error handling

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Gemini API via `@google/generative-ai`


## Dataset Source

The dataset is inspired by the Striver SDE Sheet and includes interview-style questions across:

- Arrays
- Strings
- Linked Lists
- Binary Trees
- Graphs
- Dynamic Programming

The dataset lives in [/Users/priyanka/Documents/Projects/ThinklyLab/data/striverQuestions.ts](./data/striverQuestions.ts).

## Project Structure

```text
/app
  /api
    /chat
      route.ts
  page.tsx

/components
  ChatMessage.tsx
  ChatInput.tsx
  SuggestionButtons.tsx
  Header.tsx

/data
  striverQuestions.ts

/lib
  gemini.ts
```

## How To Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.local.example .env.local
```

3. Add your Gemini API key in `.env.local`:

```bash
GEMINI_API_KEY=your_actual_key_here
GEMINI_MODEL=gemini-2.5-flash
```

4. Start the development server:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3000
```

## Environment Variables

- `GEMINI_API_KEY`: your Google Generative AI API key
- `GEMINI_MODEL`: optional Gemini model override, defaults to `gemini-2.5-flash`

## Deployment On Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel project settings.
4. Optionally add `GEMINI_MODEL=gemini-2.5-flash`.
5. Deploy.

## Notes

<!-- - The mock interview route is implemented in [/Users/priyanka/Documents/Projects/ThinklyLab/app/api/chat/route.ts](./app/api/chat/route.ts). -->
- Gemini responses are generated with `GEMINI_MODEL` or default to `gemini-2.5-flash`.


## Contributing


Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before contributing.
