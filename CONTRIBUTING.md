# 🤝 Contributing to DSA Interview Coach

Thank you for your interest in contributing! 🎉  
This project aims to make DSA interview practice more interactive and accessible. We welcome contributions from everyone.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Fork the Repository
Click the **Fork** button on GitHub.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/dsa-interview-coach.git
cd dsa-interview-coach

### 3. Install Dependencies
```bash
npm install

### 4. Setup Environment Variables

Create a `.env.local` file:

```bash
cp .env.local.example .env.local

Add your Gemini API key:
GEMINI_API_KEY=your_actual_key_here
GEMINI_MODEL=gemini-2.5-flash

### 5. Run the Project
```bash
npm run dev

## 🌿 Contribution Workflow

### 1. Create a new branch:(this will also switch you to the new branch):
```bash
git checkout -b feature/your-feature-name

### 2. Make your changes

### 3. Stage your changes:
```bash
git add .

### 4. Commit your changes:
```bash
git commit -m "feat: short description"

### 5. Push to your branch:
```bash
git push origin feature/your-feature-name


### 6. Open a Pull Request (PR)
Steps to Open a Pull Request

- Go to your forked repository on GitHub  
- Click **"Compare & pull request"** button  
  *(or go to the Pull Requests tab → New Pull Request)*  

- Select:
  - **Base repository:** original project repository  
  - **Base branch:** `main`  
  - **Head repository:** your fork  
  - **Compare branch:** your feature branch  

- Add a clear title and description:
  - What changes you made  
  - Why they are needed  
  - Screenshots

Closes: #issue-number

## After Submitting
- Wait for review
- Make changes if requested
- Once approved, your PR will be merged 🎉


## 🧑‍💻 Coding Standards & Best Practices

- Use TypeScript where applicable  
- Follow existing folder structure  
- Write clean, readable, and modular code  
- Keep components small and reusable  
- Use consistent Tailwind CSS styling  
- Add comments only where necessary  

---

## 📝 Commit Message Guidelines

Use this format:
```bash
git commit -m "feat: short description"


### Common Types:

- `feat:` → New feature  
- `fix:` → Bug fix  
- `docs:` → Documentation updates  
- `refactor:` → Code improvements  
- `style:` → Formatting changes  

### Example:

feat: add interview timer
fix: handle API error state

---

## 🐛 Reporting Issues

When reporting a bug, please include:

- Clear description  
- Steps to reproduce  
- Expected vs actual behavior  
- Screenshots (if applicable)  

---



## 💡 Feature Requests

To request a feature, include:

- Feature description  
- Why it is useful  
- Optional examples or references  

---

## 🙌 Final Note

We welcome beginners and experienced developers alike.  
Feel free to ask questions, suggest improvements, and collaborate.

Happy Coding 🚀