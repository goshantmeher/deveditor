"use client";

import React from "react";
import { getLineDiffs } from "@/lib/json-compare";

interface EditorStatsProps {
  leftData: unknown;
  rightData: unknown;
}

export function EditorStats({ leftData, rightData }: EditorStatsProps) {
  const stats = React.useMemo(() => {
    try {
      const { left, right } = getLineDiffs(leftData, rightData);

      // Count added, removed, and modified lines
      const addedLines = right.filter((line) => line.type === "added").length;
      const removedLines = left.filter(
        (line) => line.type === "removed"
      ).length;
      const modifiedLines = left.filter(
        (line) => line.type === "modified"
      ).length;

      return { addedLines, removedLines, modifiedLines };
    } catch (error) {
      console.error("Error calculating diff stats:", error);
      return { addedLines: 0, removedLines: 0, modifiedLines: 0 };
    }
  }, [leftData, rightData]);

  return (
    <div className="px-3 py-1.5 bg-muted/50 border-b border-border text-xs text-muted-foreground flex gap-4 justify-center">
      <span className="text-green-600 dark:text-green-400">
        +{stats.addedLines} added
      </span>
      <span className="text-red-600 dark:text-red-400">
        -{stats.removedLines} removed
      </span>
      <span className="text-yellow-600 dark:text-yellow-400">
        ~{stats.modifiedLines} modified
      </span>
    </div>
  );
}
