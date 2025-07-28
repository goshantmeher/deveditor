import React from "react";
import { Button } from "./ui/button";
import { Braces } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface BracesButtonProps {
  onClick: () => void;
  variant?: "ghost" | "default" | "secondary";
  title?: string;
}
function BracesButton(props: BracesButtonProps) {
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
              <Braces />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.title || "Braces"}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export default BracesButton;
