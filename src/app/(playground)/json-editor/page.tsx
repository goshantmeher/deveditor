import { JsonEditorView } from "@/components/json-editor/JsonEditorView";
import { PersistenceProvider } from "@/contexts/PersistenceContext";

export default function Page() {
  return (
    <PersistenceProvider>
      <JsonEditorView />
    </PersistenceProvider>
  );
}
