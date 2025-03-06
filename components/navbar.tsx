"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles, Github } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl py-2 border-b border-purple-100/10 dark:border-purple-800/10 shadow-sm shadow-purple-500/5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white animate-pulse-slow" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full shadow-inner shadow-blue-600/50" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
                PromptCraft
              </span>
              <span className="text-xs text-purple-600/70 dark:text-purple-400/70 font-medium -mt-1">
                AI Prompt Engineering
              </span>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-white/40 dark:bg-gray-800/30 backdrop-blur-lg border border-purple-200/20 dark:border-purple-800/20 hover:bg-purple-100/30 dark:hover:bg-purple-900/30 shadow-sm"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-600" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-purple-200/30 dark:border-purple-800/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-purple-100/40 dark:hover:bg-purple-900/20">
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-purple-100/40 dark:hover:bg-purple-900/20">
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-purple-100/40 dark:hover:bg-purple-900/20">
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* GitHub link */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/40 dark:bg-gray-800/30 backdrop-blur-lg border border-purple-200/20 dark:border-purple-800/20 hover:bg-purple-100/30 dark:hover:bg-purple-900/30 shadow-sm"
              asChild
            >
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-[1.2rem] w-[1.2rem] text-gray-700 dark:text-gray-300" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;