export function minifyJSON(input: string): string {
  try {
    // Parse JSON to validate and then stringify without whitespace
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed)
  } catch (error) {
    // If parsing fails, throw error with message
    throw new Error('Invalid JSON: ' + (error as Error).message)
  }
}
