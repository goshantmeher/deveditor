"use client";
import React from "react";
import { JsonEditor } from "json-edit-react";
import ImportButton from "../ImportButton";

interface JSONEditorProps {
  data: any;
}

function JSONEditor({ data }: JSONEditorProps) {
  return <JsonEditor data={data} className="w-full h-full" maxWidth={"100%"} />;
}

export default JSONEditor;
