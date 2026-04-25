# Contributing to DSA Interview Coach

Thank you for your interest in contributing to DSA Interview Coach. This guide explains how to get the project running locally, how to submit changes, and what to include in a pull request.

## Getting Started

### 1. Fork and clone the repository

Fork the repository on GitHub, then clone your fork locally:

```bash
git clone https://github.com/your-username/DSAInterviewCoach.git
cd DSAInterviewCoach
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.local.example .env.local
```

Add your Gemini configuration to `.env.local`:

```bash
GEMINI_API_KEY=your_actual_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Contribution Workflow

### 1. Create a branch

Create a feature or fix branch from `main`:

```bash
git checkout -b feature/your-feature-name
```

### 2. Make your changes

Keep changes focused and aligned with the existing project structure and style.

### 3. Review your work

Before opening a pull request, make sure the app still runs locally and verify the behavior you changed.

### 4. Commit your changes

Stage and commit with a clear message:

```bash
git add .
git commit -m "feat: short description"
```

### 5. Push your branch

```bash
git push origin feature/your-feature-name
```

### 6. Open a pull request

When opening a PR, please include:

- A clear title
- A short summary of what changed
- Why the change was needed
- Screenshots or recordings for UI updates, when relevant
- Related issue references, such as `Closes #123`

## Coding Guidelines

- Use TypeScript where applicable.
- Follow the existing folder structure and naming conventions.
- Keep components small, readable, and reusable.
- Prefer clear, maintainable code over clever shortcuts.
- Add comments only when they help explain non-obvious logic.
- Keep Tailwind usage consistent with the rest of the project.

## Commit Message Guidelines

Use concise commit messages in this format:

```bash
type: short description
```

Common types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation updates
- `refactor`: code improvements
- `style`: formatting or styling changes

Examples:

```text
feat: add interview timer
fix: handle API error state
docs: improve setup instructions
```

## Reporting Issues

When reporting a bug, please include:

- A clear description of the problem
- Steps to reproduce it
- Expected behavior
- Actual behavior
- Screenshots, logs, or recordings if they help explain the issue

## Suggesting Features

When suggesting a feature, please include:

- A short description of the idea
- Why it would be useful
- Any examples, references, or rough UX notes

## Final Notes

Contributions are appreciated. If you're unsure about a change, feel free to open an issue or submit a draft pull request to start the discussion.
