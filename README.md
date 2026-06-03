# 🌐 PromptCraft

PromptCraft is an AI-powered web application that generates and optimizes prompts for various AI platforms, enhancing user interaction with AI tools by providing tailored and effective prompts through an intuitive user interface.

[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![@google/generative-ai](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
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

Crafting effective prompts for AI platforms like ChatGPT, Midjourney, or GitHub Copilot can be a significant challenge. Users often struggle to articulate their needs precisely, leading to generic or suboptimal AI responses that require extensive trial and error. This friction hinders productivity and limits the true potential of AI tools, making it difficult for both novices and experienced users to achieve desired outcomes efficiently.

PromptCraft addresses this by providing a dedicated web application designed to streamline prompt generation and optimization. Leveraging the Google Gemini API, it offers an intuitive user interface where users can specify their goals, select target AI platforms, and receive tailored, effective prompts. With features like prompt history and optimization, PromptCraft empowers users to interact with AI tools more effectively, saving time and improving the quality of AI-generated content.

---

## ✨ Features

- 🤖 **AI-Powered Prompt Generation** — Dynamically creates and refines prompts leveraging the Google Gemini API for various AI platforms.
- 🎨 **Dark Mode Toggle** — Provides a comfortable viewing experience with a user-selectable dark mode interface.
- 🎨 **Dynamic UI for AI Selection** — Offers an intuitive interface for choosing and configuring different AI platforms (e.g., ChatGPT, Midjourney, GitHub Copilot).
- 🎨 **Shadcn/ui Component Integration** — Utilizes a modern, accessible component library for a consistent and polished user experience.
- 🔄 **Prompt History & Favorites** — Saves generated prompts and allows users to mark and retrieve their most effective prompts for future use.
- 🤖 **Multi-Platform Prompt Optimization** — Tailors and refines prompts specifically for platforms like ChatGPT, Midjourney, and GitHub Copilot.

---

## 🛠️ Tech Stack

**🎨 Frontend**
| Technology | Purpose |
|---|---|
| **Next.js** | React framework for server-side rendering and static site generation |
| **React** | UI library for building interactive user interfaces |
| **TypeScript** | Statically typed superset of JavaScript for enhanced code quality |
| **Radix UI** | Unstyled, accessible component primitives for building UI components |
| **shadcn/ui** | Reusable UI components built on Radix UI and Tailwind CSS |
| **Tailwind CSS** | Utility-first CSS framework for rapid UI development |

**⚙️ Backend & Infrastructure**
| Technology | Purpose |
|---|---|
| **Google Gemini API** | AI model for prompt generation and optimization |

---

## 📋 Prerequisites

> ⚠️ Make sure you have all of these installed before starting.

1.  **Node.js 18+** — [Download](https://nodejs.org) · Check: `node --version`
2.  **npm** — Comes with Node.js · Check: `npm --version`
3.  **Google Gemini API Key** — [Get a key](https://ai.google.dev/gemini-api/docs/get-started/node)

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
# ✅ Required: API key for authenticating with the Google Gemini AI model
NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key_here
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GEMINI_API_KEY` | ✅ Yes | API key for authenticating with the Google Gemini AI model |

> 🔒 **Never commit your `.env.local` file.** It's already in `.gitignore`.

---

## 🚀 Usage

### Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

### Quick Start Example

Once the development server is running and you've configured your `NEXT_PUBLIC_GEMINI_API_KEY`, navigate to `http://localhost:3000` in your web browser.

1.  **Input your prompt idea**: In the main input area, describe what you want the AI to do (e.g., "Write a short story about a robot chef").
2.  **Select AI Platform**: Choose your target AI platform from the available options (e.g., "ChatGPT", "Midjourney").
3.  **Generate Prompt**: Click the "Generate Prompt" button. PromptCraft will then use the Google Gemini API to craft an optimized prompt based on your input and selected platform.
4.  **Review and Refine**: The generated prompt will appear, ready for you to copy, save to your history, or mark as a favorite. You can then use this optimized prompt directly in your chosen AI tool.

---

## 📁 Project Structure

```
PromptCraft/
├── app/                # Next.js App Router pages and API routes
│   ├── api/            # (Optional) Backend API routes for server-side logic
│   └── page.tsx        # Main application entry point and root page
├── components/         # Reusable UI components (e.g., Shadcn/ui, custom elements)
├── lib/                # Utility functions and AI service integrations (e.g., Gemini client)
├── public/             # Static assets like images, icons, and fonts
├── styles/             # Global CSS and Tailwind CSS configuration
├── .env.example      # Template for environment variables
├── package.json      # Project dependencies and npm scripts
├── tailwind.config.ts  # Tailwind CSS configuration file
├── tsconfig.json       # TypeScript configuration for the project
└── README.md         # This documentation file
```

The project follows a standard Next.js App Router structure, organizing code logically into `app/` for pages and routes, `components/` for UI elements, and `lib/` for core utilities and external service integrations. This modular approach promotes maintainability and scalability.

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