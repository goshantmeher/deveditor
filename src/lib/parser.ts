export interface JsonParseResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

export const parseJson = (jsonString: string): JsonParseResult => {
  try {
    const data = JSON.parse(jsonString);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Invalid JSON",
    };
  }
};

export const stringifyJson = (
  data: unknown,
  pretty: boolean = true
): string => {
  try {
    return JSON.stringify(data, null, pretty ? 2 : 0);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to stringify JSON"
    );
  }
};

export const validateJson = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

export const minifyJson = (jsonString: string): string => {
  const parsed = JSON.parse(jsonString);
  return JSON.stringify(parsed);
};

export const beautifyJson = (jsonString: string, indent: number = 2): string => {
  const parsed = JSON.parse(jsonString);
  return JSON.stringify(parsed, null, indent);
};
