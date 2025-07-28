import React from "react";
import { Button } from "./ui/button";
import { FoldVertical } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface CollapseButtonProps {
  onClick: () => void;
  variant?: "ghost" | "default" | "secondary";
  title?: string;
}
function CollapseButton(props: CollapseButtonProps) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              variant={props.variant || "ghost"}
              className="cursor-pointer"
              size="sm"
              onClick={props.onClick}
            >
              <FoldVertical />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.title || "Collapse"}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export default CollapseButton;
