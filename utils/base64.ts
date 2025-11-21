/**
 * Encode text to Base64
 */
export function encodeBase64Text(input: string): string {
  try {
    return btoa(unescape(encodeURIComponent(input)))
  } catch (error) {
    throw new Error('Error encoding text: ' + (error as Error).message)
  }
}

/**
 * Decode Base64 to text
 */
export function decodeBase64Text(input: string): string {
  try {
    return decodeURIComponent(escape(atob(input)))
  } catch (error) {
    throw new Error('Error decoding Base64: ' + (error as Error).message)
  }
}

/**
 * Convert File to Base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new Error('Failed to read file as Base64'))
      }
    }
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Extract image type from Base64 data URL
 */
export function extractImageType(base64String: string): string {
  const match = base64String.match(/^data:image\/(\w+);base64,/)
  return match ? match[1].toUpperCase() : 'Unknown'
}

/**
 * Validate Base64 image string
 */
export function isValidBase64Image(base64String: string): boolean {
  const match = base64String.match(/^data:(image\/\w+);base64,(.+)$/)
  return match !== null
}

/**
 * Get file size in KB from Base64 string
 */
export function getBase64Size(base64String: string): number {
  return base64String.length / 1024
}
