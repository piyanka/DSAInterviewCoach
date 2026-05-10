# Contributing to DSA Interview Coach

Thank you for your interest in contributing! This project aims to help developers prepare for technical interviews using AI. Your contributions make this tool stronger and more helpful for everyone.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [GitHub Flow (The Recommended Way)](#github-flow-the-recommended-way)
- [Coding Standards](#coding-standards)

## Code of Conduct
Please read our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) to understand the expectations for participation in our community.

## How Can I Contribute?
- **Reporting Bugs**: Use the GitHub Issue Tracker.
- **Suggesting Features**: Open an issue with the [Feature Request] tag.
- **Improving Documentation**: Fix typos, clarify instructions, or add examples.
- **Code Contributions**: Fix bugs or implement new features.

## Development Workflow

1. **Fork the Repository**: Create a personal copy of the project on GitHub.
2. **Clone Locally**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/DSAInterviewCoach.git
   cd DSAInterviewCoach
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Set Up Environment**: Create a `.env.local` file with your Gemini API key.
5. **Run the App**:
   ```bash
   npm run dev
   ```

## GitHub Flow (The Recommended Way)

To ensure a smooth contribution process, follow these steps:

1. **Create a Feature Branch**: Always work on a separate branch.
   ```bash
   git checkout -b your-feature-name
   ```
2. **Commit Your Changes**: Write clear, descriptive commit messages.
   ```bash
   git add .
   git commit -m "feat: add search functionality to landing page"
   ```
3. **Push to GitHub**:
   ```bash
   git push origin your-feature-name
   ```
4. **Open a Pull Request (PR)**:
   - Go to the original repository on GitHub.
   - Click "Compare & pull request".
   - Provide a clear description of your changes in the PR template.
   - Wait for review and feedback!

## Coding Standards
- Use **TypeScript** for all logic.
- Use **Tailwind CSS** for styling.
- Follow the existing folder structure (`app/`, `components/`, `data/`, `lib/`).
- Ensure all components are responsive and accessible.
- Add comments to complex logic.

---
*This version of the project has been enhanced and optimized to provide a more robust and professional interview experience.*
