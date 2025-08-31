"use client";
import { MoonIcon, SunIcon } from "@/icons/icons";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export const Toggle = () => {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("prefer-color-scheme: dark");
    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const SWITCH_THEME = () => {
    switch (theme) {
      case "light": {
        setTheme("dark");
        return;
      }
      case "dark": {
        setTheme("light");
        return;
      }
      case "system": {
        setTheme(systemTheme === "dark" ? "light" : "dark");
      }
    }
  };
  return (
    <button
      onClick={SWITCH_THEME}
      className="absolute top-4 right-4 flex size-6 cursor-pointer items-center justify-between rounded-md border border-neutral-200 dark:border-neutral-800"
    >
      <SunIcon className="absolute inset-0 m-auto size-4 shrink-0 scale-100 text-neutral-400 transition-all duration-300 dark:scale-0 dark:rotate-45" />
      <MoonIcon className="absolute inset-0 m-auto size-4 shrink-0 scale-0 rotate-45 text-neutral-400 transition-all duration-300 dark:scale-100 dark:rotate-0" />
    </button>
  );
};
