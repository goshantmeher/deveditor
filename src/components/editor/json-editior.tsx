"use client";
import React from "react";
import { JsonEditor } from "json-edit-react";

interface JSONEditorProps {
  data: unknown;
}

function JSONEditor({ data }: JSONEditorProps) {
  return <JsonEditor data={data} className="w-full h-full" maxWidth={"100%"} />;
}

export default JSONEditor;
