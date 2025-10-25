import { useCallback } from "react";

export function useEditorActions(
  leftData: unknown,
  rightData: unknown,
  setLeftData: (data: unknown) => void,
  setRightData: (data: unknown) => void
) {
  const copyToRight = useCallback(() => {
    setRightData(leftData);
  }, [leftData, setRightData]);

  const copyToLeft = useCallback(() => {
    setLeftData(rightData);
  }, [rightData, setLeftData]);

  return {
    copyToRight,
    copyToLeft,
  };
}

