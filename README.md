# 🌐 PromptCraft

PromptCraft is an intelligent generator that crafts optimized, platform-specific prompts for diverse generative AI models, enhancing user interaction and improving AI-generated content quality by leveraging the Google Gemini API.

[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/gemini)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
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

Users often struggle to formulate precise and effective instructions for various generative AI tools, leading to suboptimal or irrelevant outputs. This common challenge wastes time and diminishes the perceived value of powerful AI models, as the quality of AI-generated content is directly tied to the clarity and specificity of the input prompt. Without a structured approach, crafting prompts becomes a trial-and-error process, frustrating users and hindering productivity.

PromptCraft solves this by acting as an intelligent generator that crafts optimized, platform-specific prompts for diverse generative AI models. By leveraging the Google Gemini API, it transforms vague user intentions into precise, actionable prompts. This enhances interaction with AI tools, significantly improving the quality and relevance of AI-generated content, and ultimately making generative AI more accessible and productive for everyone.

---

## ✨ Features

- 🤖 **AI Prompt Generation** — Dynamically generates optimized prompts using the Google Gemini API, ensuring high-quality AI outputs.
- 📝 **Categorized Prompt Templates** — Offers structured templates for various use cases (e.g., Chat, Image Generation), streamlining prompt creation.
- 📈 **Dynamic Confidence Scoring** — Provides real-time feedback on prompt effectiveness, helping users refine their inputs for better results.
- 🎨 **Intuitive UI with shadcn/ui** — Delivers a clean, modern, and highly responsive user interface built with `shadcn/ui` and `Radix UI` components.
- ⚙️ **Platform-specific Prompt Optimization** — Tailors prompts for different generative AI models, ensuring compatibility and maximizing performance across platforms.
- 💾 **Prompt History and Favorites** — Allows users to review past prompts and save frequently used ones for quick access and reuse.

---

## 🛠️ Tech Stack

**🎨 Frontend**
| Technology | Purpose |
|---|---|
| Next.js | React framework for server-side rendering and static site generation |
| Next-Themes | Theme switching (light/dark mode) for Next.js applications |
| Radix UI | Unstyled, accessible components for building design systems |
| React Hook Form | Performant, flexible, and extensible forms with easy validation |
| Recharts | Composable charting library built with React and D3 |
| shadcn/ui | Reusable UI components built on Radix UI and Tailwind CSS |
| Sonner | An opinionated toast component for React |
| Tailwind CSS | Utility-first CSS framework for rapid UI development |
| TypeScript | Strongly typed superset of JavaScript for enhanced code quality |
| Zod | TypeScript-first schema declaration and validation library |

---

## 📋 Prerequisites

> ⚠️ Make sure you have all of these installed before starting.

1.  **Node.js 18+** — [Download](https://nodejs.org) · Check: `node --version`
2.  **npm** — Comes with Node.js · Check: `npm --version`
3.  **Google Gemini API Key** — [Get your API Key](https://ai.google.dev/gemini/get_started)

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
| `NEXT_PUBLIC_GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API Key. This key is crucial for interacting with the Gemini AI model. |

> 🔒 **Never commit your `.env.local` file.** It's already in `.gitignore`.

---

## 🚀 Usage

### Development Server

To start the development server:

```bash
npm run dev
```

Open **http://localhost:3000** in your browser to access PromptCraft.

### Quick Start Example

Once the development server is running, open your browser to `http://localhost:3000`.

1.  **Input Task**: On the main interface, enter a high-level task or desired outcome for your AI model into the input field (e.g., "Write a short story about a space explorer discovering a new planet").
2.  **Select Platform (Optional)**: If available, choose a target AI platform or model from the options provided.
3.  **Generate Prompt**: Click the "Generate Prompt" button.

PromptCraft will then use your configured `NEXT_PUBLIC_GEMINI_API_KEY` to interact with the Google Gemini API, processing your input and generating an optimized, platform-specific prompt tailored for generative AI models. The generated prompt will appear on the screen, ready for you to copy and use.

---

## 📁 Project Structure

```
PromptCraft/
├── app/                  # Next.js App Router root, containing pages, layouts, and API routes
│   ├── api/              # (Optional) Next.js API routes for server-side logic
│   └── page.tsx          # Main entry point for the application
├── components/           # Reusable UI components (e.g., shadcn/ui, custom components)
│   ├── ui/               # shadcn/ui components
│   └── ...
├── lib/                  # Utility functions, API clients (e.g., Gemini API client setup)
├── public/               # Static assets like images, favicons
├── types/                # TypeScript type definitions
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

The project follows a modular, feature-based structure typical for Next.js applications using the App Router. Core application logic and UI are organized within the `app/` directory, while reusable components reside in `components/` and utility functions in `lib/`, promoting maintainability and scalability.

---

## 🤝 Contributing

Contributions make this project better. Here's how to get involved:

### 🐛 Reporting Bugs

Before creating a bug report:
- ✅ Check the [existing issues](https://github.com/het2576/PromptCraft/issues)
- ✅ Collect your environment details (OS, Node version, browser)
- ✅ Reproduce the bug consistently

**[Create a bug report →](https://github.com/het2576/PromptCraft/issues/new)**

### 💡 Suggesting Features

Feature suggestions are tracked as GitHub issues.

**[Suggest a feature →](https://github.com/het2576/PromptCraft/issues/new)**

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