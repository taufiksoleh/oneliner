export function minifyJS(input: string): string {
  let minified = input

  // Remove single-line comments (but not URLs)
  minified = minified.replace(/(?:^|\s)\/\/(?![^\n]*https?:).*$/gm, '')

  // Remove multi-line comments
  minified = minified.replace(/\/\*[\s\S]*?\*\//g, '')

  // Remove extra whitespace but preserve necessary spaces
  minified = minified.replace(/\s+/g, ' ')

  // Remove spaces around operators and punctuation
  minified = minified.replace(/\s*([{}()\[\];,.<>!&|+\-*\/%=])\s*/g, '$1')

  // Add back necessary spaces around keywords
  const keywords = ['return', 'var', 'let', 'const', 'function', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'typeof', 'instanceof', 'delete', 'in', 'of']
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    minified = minified.replace(regex, ` ${keyword} `)
  })

  // Clean up excessive spaces created by keyword replacement
  minified = minified.replace(/\s{2,}/g, ' ')

  // Remove newlines
  minified = minified.replace(/\n/g, '')
  minified = minified.replace(/\r/g, '')

  // Remove spaces after { and before }
  minified = minified.replace(/{\s+/g, '{')
  minified = minified.replace(/\s+}/g, '}')

  return minified.trim()
}
