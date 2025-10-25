import React from "react";
import { Button } from "./ui/button";
import { UnfoldVertical } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ExpandButtonProps {
  onClick: () => void;
  variant?: "ghost" | "default" | "secondary";
  title?: string;
}
function ExpandButton(props: ExpandButtonProps) {
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
              <UnfoldVertical />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.title || "Expand"}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export default ExpandButton;
