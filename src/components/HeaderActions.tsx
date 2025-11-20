"use client";

import { usePathname } from "next/navigation";
import ThemeToggle from "./themeToggle";
import InfoButton from "./InfoButton";
import JsonEditorInfo from "./json-editor/JsonEditorInfo";

export default function HeaderActions() {
  const pathname = usePathname();
  const isJsonEditor =
    pathname === "/json-editor" || pathname === "/json-editor/";

  return (
    <div className="flex items-center gap-2">
      {isJsonEditor && (
        <InfoButton title="JSON Editor Guide">
          <JsonEditorInfo />
        </InfoButton>
      )}
      <ThemeToggle />
    </div>
  );
}
