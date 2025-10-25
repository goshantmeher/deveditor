import React from "react";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface JusifyButtonProps {
  onClick: () => void;
  variant?: "ghost" | "default" | "secondary";
  title?: string;
}
function JusifyButton(props: JusifyButtonProps) {
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
              <AlignJustify />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.title || "Justify"}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export default JusifyButton;
