# Security Policy

## Supported Versions

The following versions of DSA Interview Coach are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| main (latest) | ✅ Supported |
| Older branches | ❌ Not supported |

We recommend always using the latest code from the `main` branch.

---

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in DSA Interview Coach, please **do not** open a public GitHub issue.

Instead, please report it privately by emailing the maintainer:

📧 **[piyanka's GitHub profile](https://github.com/piyanka)** — use the contact information listed there, or open a [GitHub Security Advisory](https://github.com/piyanka/DSAInterviewCoach/security/advisories/new) (preferred).

### What to include in your report

Please provide as much of the following as possible so we can reproduce and fix the issue quickly:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact (e.g., data exposure, injection, auth bypass)
- Any suggested fix or mitigation (optional but appreciated)

### Response timeline

- **Acknowledgement**: within 48–72 hours of receiving your report
- **Status update**: within 7 days
- **Fix or mitigation**: within 30 days for critical issues, longer for lower-severity ones

---

## Security Considerations for This Project

DSA Interview Coach uses the following external services and APIs. Here's what you should know:

### Gemini API Key (`GEMINI_API_KEY`)
- This key is stored as a **server-side environment variable** and is never exposed to the client.
- Never commit your `.env.local` file to version control — it is listed in `.gitignore`.
- If you suspect your API key has been exposed, rotate it immediately in [Google AI Studio](https://aistudio.google.com/).

### User Input
- All user messages are sent to the Gemini API via a Next.js API route (`/api/chat`).
- No user data is persisted to a database in the current version.

### Deployment
- When deploying to Vercel (or any platform), set `GEMINI_API_KEY` as a **secret environment variable** in your project settings — never hardcode it.

---

## Out of Scope

The following are **not** considered security vulnerabilities for this project:

- Issues in third-party dependencies (please report those to the respective project)
- UI bugs that do not have a security impact
- Rate limiting or abuse of the Gemini API by end users (managed by Google)

---

## Acknowledgements

We appreciate responsible disclosure and will credit reporters in the release notes (with their permission).

Thank you for helping keep DSA Interview Coach safe! 🙏
