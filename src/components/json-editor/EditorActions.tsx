"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";

interface EditorActionsProps {
  onCopyToRight: () => void;
  onCopyToLeft: () => void;
}

export function EditorActions({
  onCopyToRight,
  onCopyToLeft,
}: EditorActionsProps) {
  return (
    <div className="flex flex-col gap-2 w-full md:w-[100px] md:max-w-[100px] items-center justify-center bg-card border-l border-r border-border">
      <Button
        variant="ghost"
        className="cursor-pointer"
        size="sm"
        onClick={onCopyToRight}
      >
        Copy <ArrowBigRightDash />
      </Button>
      <Button
        variant="ghost"
        className="cursor-pointer"
        size="sm"
        onClick={onCopyToLeft}
      >
        <ArrowBigLeftDash /> Copy
      </Button>
    </div>
  );
}

