export function beautifyHTML(input: string): string {
  let formatted = input
  let indentLevel = 0
  const indentSize = 4
  const indent = () => ' '.repeat(indentLevel * indentSize)

  // Remove existing whitespace between tags
  formatted = formatted.replace(/>\s+</g, '><')

  // Add line breaks and indentation
  formatted = formatted.replace(/(<(?:\/)?[\w-]+(?:[^>]*)>)/g, (match) => {
    if (match.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1)
      return '\n' + indent() + match
    } else if (match.endsWith('/>')) {
      return '\n' + indent() + match
    } else if (['<br>', '<hr>', '<img', '<input', '<meta', '<link'].some(tag => match.startsWith(tag))) {
      return '\n' + indent() + match
    } else {
      const result = '\n' + indent() + match
      if (!['<script', '<style', '<pre', '<textarea'].some(tag => match.startsWith(tag))) {
        indentLevel++
      } else {
        indentLevel++
      }
      return result
    }
  })

  return formatted.trim()
}
