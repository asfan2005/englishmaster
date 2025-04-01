// components/ui/theme-toggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, ArrowUp } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  function handleScrollTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center rounded-full border border-dotted">
        <button
          onClick={() => setTheme("light")}
          className="bg-black mr-3 rounded-full p-2 text-white dark:bg-background dark:text-white"
        >
          <Sun className="h-5 w-5" strokeWidth={1} />
          <span className="sr-only">Yorug' rejim</span>
        </button>

        <button type="button" onClick={handleScrollTop}>
          <ArrowUp className="h-3 w-3" />
          <span className="sr-only">Yuqoriga</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          className="dark:bg-black ml-3 rounded-full p-2 text-black dark:text-white"
        >
          <Moon className="h-5 w-5" strokeWidth={1} />
          <span className="sr-only">Qorong'i rejim</span>
        </button>
      </div>
    </div>
  );
}