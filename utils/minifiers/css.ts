export function minifyCSS(input: string): string {
  let minified = input

  // Remove comments
  minified = minified.replace(/\/\*[\s\S]*?\*\//g, '')

  // Remove whitespace around { } : ; ,
  minified = minified.replace(/\s*{\s*/g, '{')
  minified = minified.replace(/\s*}\s*/g, '}')
  minified = minified.replace(/\s*:\s*/g, ':')
  minified = minified.replace(/\s*;\s*/g, ';')
  minified = minified.replace(/\s*,\s*/g, ',')

  // Remove newlines and extra spaces
  minified = minified.replace(/\n/g, '')
  minified = minified.replace(/\r/g, '')
  minified = minified.replace(/\s{2,}/g, ' ')

  // Remove spaces around >
  minified = minified.replace(/\s*>\s*/g, '>')

  // Remove last semicolon in a block
  minified = minified.replace(/;}/g, '}')

  // Remove leading/trailing whitespace
  minified = minified.trim()

  // Remove spaces after opening and before closing braces
  minified = minified.replace(/{\s+/g, '{')
  minified = minified.replace(/\s+}/g, '}')

  return minified
}
