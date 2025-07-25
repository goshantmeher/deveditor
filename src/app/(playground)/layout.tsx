import ThemeToggle from "@/components/themeToggle";
import React, { ReactNode } from "react";

interface PlaygroundLayoutProps {
  children: ReactNode;
}

export default function PlaygroundLayout({ children }: PlaygroundLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="testme p-2 bg-muted"
        style={{
          height: "calc(100vh - 56px)",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
