"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Braces,
  FoldVertical,
  Sun,
  UnfoldVertical,
} from "lucide-react";
import ImportButton from "@/components/ImportButton";
import Editor from "@/components/editor/Editor";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ExpandButton from "@/components/ExpandButton";
import CollapseButton from "@/components/CollapseButton";
import JusifyButton from "@/components/JustifiyButton";
import BracesButton from "@/components/BracesButton";
import SearchButton from "@/components/SearchButton";

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
  const [leftData, setLeftData] = React.useState<unknown>(defaultData);
  const [rightData, setRightData] = React.useState<unknown>(defaultData);
  const [leftTabConfig, setLeftTabConfig] = React.useState(tabHeaderConfig);
  const [rightTabConfig, setRightTabConfig] = React.useState(tabHeaderConfig);

  const handleDataChange = (newData: unknown) => {
    setLeftData(newData);
  };

  const handleCopyToRight = () => {
    console.log("Copying left data to right");

    setRightData(leftData);
  };

  const handleCopyToLeft = () => {
    setLeftData(rightData);
  };

  // const handleCompareLeftRight = () => {
  //   //to be implemented
  //   console.log("Comparing left and right data");
  // };

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
            <div className="flex justify-between items-center w-full pl-2">
              <div className="flex items-center">
                <ExpandButton onClick={() => console.log("Expand clicked")} />
                <CollapseButton
                  onClick={() => console.log("Collapse clicked")}
                />
                <JusifyButton
                  onClick={() => console.log("Justify clicked")}
                  title="Remove whitespace and indentation"
                />
                <BracesButton
                  onClick={() => console.log("Braces clicked")}
                  title="Format"
                />
              </div>
              <div className="flex items-center">
                <SearchButton onClick={() => console.log("Search clicked")} />
                <ImportButton
                  onImport={handleDataChange}
                  data_type="json"
                  onImportClick={() =>
                    setLeftTabConfig((prev) => ({ ...prev, active: "text" }))
                  }
                />
              </div>
            </div>
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
            <ImportButton
              onImport={handleDataChange}
              data_type="json"
              onImportClick={() =>
                setRightTabConfig((prev) => ({ ...prev, active: "text" }))
              }
            />
          </Editor>
        </div>
      </div>
    </div>
  );
}

export default PageContent;
