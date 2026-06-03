# 🌐 PromptCraft

> Streamline your AI interactions with PromptCraft, an intelligent generator that crafts optimized, platform-specific prompts for diverse generative AI models.

[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![@google/generative-ai](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemini-api)
[![Next](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)

## 📖 Table of Contents

- [🎯 About](#-about)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [⚙️ Installation](#️-installation)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 Usage](#-usage)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 About

Crafting effective prompts for generative AI models can be a complex and iterative process, often leading to inconsistent or suboptimal outputs. Users frequently struggle with understanding the nuances of different AI platforms and tailoring their prompts to achieve desired results, wasting time and computational resources on trial-and-error. This friction hinders productivity and limits the creative potential of AI tools.

PromptCraft addresses this challenge by providing an intuitive AI prompt generator that leverages the Google Gemini API. It empowers users to effortlessly create optimized, platform-specific prompts across categories like Chat Assistant, Image Creation, and Code Assistant. By streamlining prompt engineering and offering tailored suggestions for tools like ChatGPT, Midjourney, and GitHub Copilot, PromptCraft significantly enhances user interaction and output quality, making AI more accessible and efficient.

---

## ✨ Features

- 🤖 **AI Prompt Generation** — Dynamically crafts optimized prompts using the Google Gemini API for various AI models and use cases.
- 🗂️ **Categorized Templates** — Organizes prompt generation into distinct categories such as Chat Assistant, Image Creation, Code Assistant, and Content Creator.
- 📊 **Confidence Scoring** — Displays a dynamic confidence score, providing real-time feedback on the estimated effectiveness of the generated prompt.
- 🎨 **Intuitive User Interface** — Built with Next.js and shadcn/ui, offering a modern, interactive, and responsive experience for prompt creation.
- ⚙️ **Platform Optimization** — Generates platform-specific prompts tailored for tools like ChatGPT, Midjourney, GitHub Copilot, and Jasper, ensuring maximum compatibility and effectiveness.
- 📚 **Prompt History & Favorites** — Tracks previously generated prompts and allows users to save their most effective prompts for quick access and reuse.

---

## 🛠️ Tech Stack

**🎨 Frontend**
| Technology | Version | Purpose |
|---|---|---|
| Next.js | - | React framework for production web applications |
| Next-Themes | - | Manages theme switching (light/dark mode) |
| Radix UI | - | Provides unstyled, accessible component primitives |
| React Hook Form | - | Handles form state, validation, and submission |
| Recharts | - | Composable charting library for data visualization |
| shadcn/ui | - | Collection of reusable components built with Radix UI & Tailwind CSS |
| Sonner | - | Opinionated toast component for notifications |
| Tailwind CSS | - | Utility-first CSS framework for rapid UI development |
| TypeScript | - | Strongly typed JavaScript for enhanced code quality and developer experience |
| Zod | - | TypeScript-first schema declaration and validation library |

---

## 📋 Prerequisites

> ⚠️ Make sure you have all of these installed before starting.

1.  **Node.js 18+** — [Download](https://nodejs.org) · Check: `node --version`
2.  **npm** — Comes with Node.js · Check: `npm --version`
3.  **Google Gemini API Key** — [Get Key](https://ai.google.dev/gemini-api/docs/get-started/node) · Required for AI prompt generation.

---

## ⚙️ Installation

### Step 1 — Clone the repository

```bash
git clone https://github.com/het2576/PromptCraft.git
cd PromptCraft
```

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Configure environment

```bash
cp .env.example .env.local
```

> 💡 Open `.env.local` and fill in your values. See [Environment Variables](#-environment-variables) below.

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
# ✅ Required: Gemini API Key - Make sure this is a valid API key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GEMINI_API_KEY` | ✅ Yes | Gemini API Key - Make sure this is a valid API key |

> 🔒 **Never commit your `.env.local` file.** It's already in `.gitignore`.

---

## 🚀 Usage

### Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### Quick Start Example

Once the development server is running and you've opened PromptCraft in your browser, you can start generating prompts:

1.  **Select a Category**: Choose from options like "Chat Assistant," "Image Creation," or "Code Assistant" using the intuitive UI.
2.  **Provide Context**: Fill in the input fields with details about your desired output, such as the topic, style, or specific requirements.
3.  **Generate Prompt**: Click the "Generate Prompt" button. PromptCraft will use your configured `NEXT_PUBLIC_GEMINI_API_KEY` to interact with the Google Gemini API and craft an optimized prompt.
4.  **Review & Refine**: Observe the dynamic confidence score and review the generated prompt. You can then copy it for use in your chosen AI platform (e.g., ChatGPT, Midjourney) or refine your input for a new generation.

```typescript
// Example of how the generated prompt might be used in a client-side application
// (PromptCraft provides the prompt for you to copy and use elsewhere)

import { GoogleGenerativeAI } from "@google/generative-ai";

// The NEXT_PUBLIC_GEMINI_API_KEY is used internally by PromptCraft's backend
// to generate the prompt. The generated prompt is then presented to the user.
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

async function sendPromptToGemini(promptText: string) {
  if (!API_KEY) {
    console.error("Gemini API Key is not configured for PromptCraft's internal use.");
    return;
  }
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(promptText);
    const response = await result.response;
    const text = response.text();
    console.log("AI Response from generated prompt:", text);
  } catch (error) {
    console.error("Error generating content with prompt:", error);
  }
}

// After PromptCraft generates a prompt like this:
const generatedPrompt = "Create a hyperrealistic image of a cyberpunk city at sunset, featuring flying cars, towering skyscrapers with neon signs, and a bustling street market. Midjourney v5.2 style.";

// You would copy this `generatedPrompt` from PromptCraft's UI and paste it
// into your preferred AI tool (e.g., Midjourney, ChatGPT, etc.) to get the final AI output.
```

---

## 📁 Project Structure

```
PromptCraft/
├── app/                  # Next.js App Router root for pages and API routes
│   ├── api/              # Serverless API routes (e.g., for Gemini API interaction)
│   ├── (auth)/           # Group for authentication-related routes/components
│   ├── (dashboard)/      # Group for main application dashboard layout and pages
│   └── page.tsx          # Entry point for the application's root page
├── components/           # Reusable UI components, including shadcn/ui integrations
│   ├── ui/               # shadcn/ui components (e.g., Button, Card, Input)
│   └── ...               # Custom components specific to PromptCraft
├── lib/                  # Utility functions, helpers, and configurations
│   ├── hooks/            # Custom React hooks for shared logic
│   └── utils.ts          # General utility functions
├── public/               # Static assets (images, fonts, favicons)
├── styles/               # Global styles and Tailwind CSS base imports
├── types/                # TypeScript type definitions and interfaces
├── .env.example          # Template for environment variables
├── .gitignore            # Specifies intentionally untracked files to ignore
├── next.config.mjs       # Next.js configuration file
├── package.json          # Project dependencies and npm scripts
├── postcss.config.js     # PostCSS configuration (used by Tailwind CSS)
├── README.md             # This documentation file
├── tailwind.config.ts    # Tailwind CSS configuration file
├── tsconfig.json         # TypeScript compiler configuration
└── package-lock.json     # Records the exact dependency tree
```

This project follows the Next.js App Router structure, organizing routes and UI components logically within the `app/` directory. Reusable UI elements are centralized in `components/`, with `lib/` housing essential utilities and hooks, promoting modularity and maintainability across the application.

---

## 🤝 Contributing

Contributions make this project better. Here's how to get involved:

### 🐛 Reporting Bugs

Before creating a bug report:
- ✅ Check the [existing issues](https://github.com/het2576/PromptCraft/issues)
- ✅ Collect your environment details (OS, Node version, browser)
- ✅ Reproduce the bug consistently

**[Create a bug report →](https://github.com/het2576/PromptCraft/issues/new?labels=bug&template=bug_report.md)**

### 💡 Suggesting Features

Feature suggestions are tracked as GitHub issues.

**[Suggest a feature →](https://github.com/het2576/PromptCraft/issues/new?labels=enhancement&template=feature_request.md)**

### 🔧 Pull Requests

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch: `git checkout -b feat/amazing-feature`
3. 💾 **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. 📤 **Push** to the branch: `git push origin feat/amazing-feature`
5. 🔁 **Open** a Pull Request

**Commit convention:** We use [Conventional Commits](https://conventionalcommits.org)
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `refactor:` — code change, no feature or fix
- `test:` — add or update tests

---

## 📄 License

This project is licensed under the **MIT License**.

You're free to use, modify, and distribute this project for any purpose.
See the [LICENSE](LICENSE) file for full details.

---

<div align="center">

### Built with ❤️ by [het2576](https://github.com/het2576)

If this project helped you, consider giving it a ⭐

[⭐ Star this repo](https://github.com/het2576/PromptCraft) · [🐛 Report a Bug](https://github.com/het2576/PromptCraft/issues) · [💡 Request a Feature](https://github.com/het2576/PromptCraft/issues)

</div>