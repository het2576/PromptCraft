# 🌐 PromptCraft

> Streamline your AI prompt engineering with PromptCraft, an intelligent generator that crafts optimized, platform-specific prompts for diverse generative AI models.

[![React Hook Form](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://google.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://google.com)
[![@google/generative-ai](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://google.com)
[![Next](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://google.com)
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

Crafting effective prompts for generative AI models can be a complex and time-consuming challenge. Users often struggle to formulate precise instructions that yield high-quality, platform-specific outputs, leading to frustration and suboptimal results across various AI tools like ChatGPT, Midjourney, and GitHub Copilot. The sheer diversity of AI models and their unique prompt requirements necessitates a specialized approach to achieve desired outcomes.

PromptCraft addresses this pain point by providing an intuitive AI prompt generator powered by the Google Gemini API. It empowers users to effortlessly create optimized prompts by selecting specific categories such as Chat Assistant, Image Creation, or Code Assistant. The application then intelligently tailors these prompts for different generative AI platforms, enhancing user interaction and significantly improving the quality and relevance of AI-generated content.

---

## ✨ Features

- 🤖 **AI Prompt Generation** — Dynamically crafts optimized prompts leveraging the Google Gemini API for diverse AI models and use cases.
- 📚 **Categorized Templates** — Organizes prompt generation by categories like Chat Assistant, Image Creation, Code Assistant, and Content Creator for targeted output.
- 📊 **Confidence Scoring** — Provides real-time feedback on prompt effectiveness with a dynamic confidence score display, guiding users to better prompts.
- 🎨 **Intuitive UI** — Features a user-friendly and interactive interface built with Next.js and `shadcn/ui` for a seamless prompt crafting experience.
- ⚙️ **Platform Optimization** — Tailors and optimizes generated prompts for specific generative AI tools including ChatGPT, Midjourney, GitHub Copilot, and Jasper.
- 📝 **Prompt History & Favorites** — Keeps track of all generated prompts and allows users to save their most effective prompts for quick access and reuse.

---

## 🛠️ Tech Stack

**🎨 Frontend & UI**
| Technology | Purpose |
|---|---|
| Next-Themes | Manages theme switching (dark/light mode) within the application. |
| Radix UI | Provides unstyled, accessible, and customizable UI components. |
| Recharts | A composable charting library for building interactive data visualizations. |
| shadcn/ui | A collection of beautifully designed, reusable UI components built with Radix UI and Tailwind CSS. |
| Sonner | A modern, accessible, and customizable toast notification library for React. |
| Tailwind CSS | A utility-first CSS framework for rapidly building custom designs. |

**⚙️ Core Framework & Utilities**
| Technology | Purpose |
|---|---|
| Next.js | The React framework for building full-stack web applications with server-side rendering and static site generation. |
| React Hook Form | A performant, flexible, and extensible library for form validation with React Hooks. |
| TypeScript | A strongly typed superset of JavaScript that enhances code quality and developer experience. |
| Zod | A TypeScript-first schema declaration and validation library, used for data parsing and validation. |

---

## 📋 Prerequisites

> ⚠️ Make sure you have all of these installed before starting.

1.  **Node.js 18+** — [Download](https://nodejs.org) · Check: `node --version`
2.  **npm** — Comes with Node.js · Check: `npm --version`
3.  **Google Gemini API Key** — [Get your API Key](https://ai.google.dev/gemini-api/docs/get-started/web)

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
| `NEXT_PUBLIC_GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API Key. This is essential for the application to generate prompts. |

> 🔒 **Never commit your `.env.local` file.** It's already included in the `.gitignore` to prevent accidental exposure of sensitive keys.

---

## 🚀 Usage

### Development Server

To start the development server:

```bash
npm run dev
```

Open **http://localhost:3000** in your browser to access the PromptCraft application.

### Quick Start Example

Once the application is running, you can immediately begin generating prompts:

1.  **Navigate** to the application in your browser at `http://localhost:3000`.
2.  **Select a Category** from the available options (e.g., "Chat Assistant", "Image Creation").
3.  **Input your requirements** or keywords into the provided text area.
4.  **Click the "Generate Prompt" button** to receive an optimized prompt tailored to your selected category and platform.
5.  **Review the generated prompt** and its dynamic confidence score, then copy it for use in your chosen AI model (e.g., ChatGPT, Midjourney).

---

## 📁 Project Structure

```
PromptCraft/
├── app/                  # Next.js App Router pages, layouts, and API routes (if any)
│   └── page.tsx          # Main entry point for the application
├── components/           # Reusable React UI components (e.g., shadcn/ui components)
├── config/               # Configuration files (e.g., for next-themes, shadcn/ui)
├── hooks/                # Custom React hooks for shared logic
├── lib/                  # Utility functions, API client for Google Gemini, helper modules
├── public/               # Static assets like images, favicons
├── styles/               # Global CSS and Tailwind CSS configuration
├── types/                # TypeScript type definitions and interfaces
├── .env.example          # Environment variables template
├── package.json          # Project dependencies and npm scripts
└── README.md             # This documentation file
```

The project follows a standard Next.js App Router structure, organizing code logically into `app/` for routing and pages, `components/` for UI elements, and `lib/` for core application logic and external API interactions. This modular approach enhances maintainability and scalability.

---

## 🤝 Contributing

Contributions make this project better.