export function beautifyJS(input: string): string {
  let formatted = input
  const indentSize = 4
  const indent = (level: number) => ' '.repeat(level * indentSize)

  // Add line breaks after { } and ;
  formatted = formatted.replace(/\{/g, ' {\n')
  formatted = formatted.replace(/\}/g, '\n}\n')
  formatted = formatted.replace(/;/g, ';\n')

  // Add proper indentation
  const lines = formatted.split('\n')
  let indentLevel = 0
  const indentedLines = lines.map(line => {
    line = line.trim()
    if (!line) return ''

    if (line.startsWith('}')) {
      indentLevel = Math.max(0, indentLevel - 1)
    }

    const indented = indent(indentLevel) + line

    if (line.endsWith('{')) {
      indentLevel++
    }

    return indented
  })

  return indentedLines.join('\n').trim()
}
