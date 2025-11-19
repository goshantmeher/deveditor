import React from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface AutoFixToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function AutoFixToggle({ enabled, onToggle }: AutoFixToggleProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <Button
            variant={enabled ? "default" : "ghost"}
            className="cursor-pointer"
            size="sm"
            onClick={onToggle}
          >
            <Sparkles className={enabled ? "" : "opacity-50"} />
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{enabled ? "Auto-fix enabled" : "Auto-fix disabled"}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default AutoFixToggle;
