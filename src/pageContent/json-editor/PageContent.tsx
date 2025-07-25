"use client";
import React from "react";
import JSONEditor from "@/components/editor/json-editior";
import TextEditor from "@/components/editor/text-editor";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash, ArrowBigRightDash, Bold } from "lucide-react";
import ImportButton from "@/components/ImportButton";
import Editor from "@/components/editor/Editor";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const defaultData = {
  name: "John",
  age: 30,
  city: "New York",
};

export const tabEditorTypes = {
  json: "json",
  text: "text",
};

const tabHeaderConfig: {
  active: keyof typeof tabEditorTypes;
} = {
  active: tabEditorTypes.text as keyof typeof tabEditorTypes,
};

function PageContent() {
  const [leftData, setLeftData] = React.useState(defaultData);
  const [rightData, setRightData] = React.useState(defaultData);
  const [leftTabConfig, setLeftTabConfig] = React.useState(tabHeaderConfig);
  const [rightTabConfig, setRightTabConfig] = React.useState(tabHeaderConfig);

  const handleDataChange = (newData: any) => {
    setLeftData(newData);
  };

  const handleCopyToRight = () => {
    console.log("Copying left data to right");

    setRightData(leftData);
  };

  const handleCopyToLeft = () => {
    setLeftData(rightData);
  };

  const handleCompareLeftRight = () => {
    //to be implemented
    console.log("Comparing left and right data");
  };

  const updateEditorType = (
    type: keyof typeof tabEditorTypes,
    side: "left" | "right"
  ) => {
    if (side === "left") {
      setLeftTabConfig((prev) => ({ ...prev, active: type }));
    } else {
      setRightTabConfig((prev) => ({ ...prev, active: type }));
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row w-full h-full">
        <div className="w-full md:flex-1  ">
          <Editor
            data={leftData}
            onChange={setLeftData}
            type={leftTabConfig.active}
          >
            <ToggleGroup
              type="single"
              size="sm"
              defaultValue="text"
              variant="outline"
              onValueChange={(value) =>
                updateEditorType(value as keyof typeof tabEditorTypes, "left")
              }
            >
              <ToggleGroupItem value="text" aria-label="Toggle text">
                <span>text</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="json" aria-label="Toggle tree">
                <span>tree</span>
              </ToggleGroupItem>
            </ToggleGroup>
            <ImportButton onImport={handleDataChange} data_type="json" />
          </Editor>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-[100px] md:max-w-[100px] items-center justify-center bg-card border-l border-r border-border">
          <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={handleCopyToRight}
          >
            Copy <ArrowBigRightDash />
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={handleCopyToLeft}
          >
            <ArrowBigLeftDash /> Copy
          </Button>
          {/* <Button
            variant="ghost"
            className="cursor-pointer"
            size="sm"
            onClick={handleCompareLeftRight}
          >
            Compare
          </Button> */}
        </div>
        <div className="w-full md:flex-1  ">
          <Editor
            data={rightData}
            onChange={setRightData}
            type={rightTabConfig.active}
          >
            <ImportButton onImport={handleDataChange} data_type="json" />
          </Editor>
          {/* <TextEditor data={rightData} onChange={setRightData}>
            <div className="w-full h-10 flex gap-2 pl-2 pr-2 bg-blue-400 items-center">
              <ImportButton onImport={handleDataChange} data_type="json" />
            </div>
          </TextEditor> */}
        </div>
      </div>
    </div>
  );
}

export default PageContent;
