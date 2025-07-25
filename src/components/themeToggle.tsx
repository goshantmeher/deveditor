"use client";
import { Toggle } from "@radix-ui/react-toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const currentTheme = theme?.includes("dark") ? "dark" : "light";
  console.log("Current theme:", currentTheme, theme);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Toggle
      aria-label="Toggle italic"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
    >
      {currentTheme === "dark" ? <Moon size="20" /> : <Sun size="20" />}
    </Toggle>
  );
}

export default ThemeToggle;
