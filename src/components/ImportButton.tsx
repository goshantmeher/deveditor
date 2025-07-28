import React, { useRef } from "react";
import { Button } from "./ui/button";
import { FileInput } from "lucide-react";
import { parseJson } from "@/lib/parser";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ImportButtonProps {
  onImport: (data: unknown) => void;
  variant?: "ghost" | "default" | "secondary";
  data_type: "json" | "text";
  title?: string;
  onImportClick?: () => void;
}
function ImportButton(props: ImportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      let newData: string | unknown;
      try {
        switch (props.data_type) {
          case "json":
            debugger;
            if (!file.name.endsWith(".json")) {
              throw new Error("Please select a valid JSON file");
            }
            newData = parseJson(e.target?.result as string);
            break;
          case "text":
            if (!file.name.endsWith(".txt")) {
              throw new Error("Please select a valid text file");
            }
            newData = e.target?.result as string;
            break;
          default:
            throw new Error("Unsupported file type");
        }
        props.onImport(newData);
      } catch (error) {
        console.error("Invalid file:", error);
        alert("Please select a valid file");
      }
    };
    reader.readAsText(file);
  };

  const handleImportClick = () => {
    if (props.onImportClick) {
      props.onImportClick();
    }
    fileInputRef.current?.click();
  };
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              variant={props.variant || "ghost"}
              className="cursor-pointer"
              size="sm"
              onClick={handleImportClick}
            >
              <FileInput />
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.title || "Import File"}</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export default ImportButton;
