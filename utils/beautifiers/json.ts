export function beautifyJSON(input: string): string {
  try {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed, null, 4)
  } catch (error) {
    throw new Error('Invalid JSON: ' + (error as Error).message)
  }
}
