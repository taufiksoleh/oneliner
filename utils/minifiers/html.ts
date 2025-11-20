export function minifyHTML(input: string): string {
  let minified = input

  // Store preserved content (pre, textarea, script tags)
  const preserved: string[] = []
  const preserveTags = ['pre', 'textarea', 'script', 'code']

  preserveTags.forEach(tag => {
    const regex = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi')
    minified = minified.replace(regex, match => {
      preserved.push(match)
      return `___PRESERVED_${preserved.length - 1}___`
    })
  })

  // Remove HTML comments (but preserve conditional comments)
  minified = minified.replace(/<!--(?!\[if\s)(?!<!)[^\[][\s\S]*?-->/g, '')

  // First, normalize all whitespace to prevent word merging
  // Replace all newlines and multiple whitespace with a single space
  minified = minified.replace(/\s+/g, ' ')

  // Remove spaces around = in attributes
  minified = minified.replace(/\s*=\s*/g, '=')

  // Only remove spaces between tags when it's clearly structural
  // This targets block-level elements to avoid affecting inline content
  const blockTags = 'div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|section|article|header|footer|nav|main|aside|table|thead|tbody|tfoot|tr|td|th|form|fieldset|blockquote|dl|dt|dd|figure|figcaption|address|hr|br'
  const blockTagRegex = new RegExp(`(<\\/?(${blockTags})[^>]*>)\\s+(<\\/?(${blockTags})[^>]*>)`, 'gi')
  minified = minified.replace(blockTagRegex, '$1$3')

  // Remove spaces after block-level opening tags
  const afterOpenTagRegex = new RegExp(`(<(${blockTags})[^>]*>)\\s+`, 'gi')
  minified = minified.replace(afterOpenTagRegex, '$1')

  // Remove spaces before block-level closing tags
  const beforeCloseTagRegex = new RegExp(`\\s+(<\\/(${blockTags})>)`, 'gi')
  minified = minified.replace(beforeCloseTagRegex, '$1')

  // Remove spaces before self-closing tags
  minified = minified.replace(/\s+(\/?>)/g, '$1')

  // Remove spaces after opening tags (for malformed HTML)
  minified = minified.replace(/<\s+/g, '<')

  // Restore preserved content
  preserved.forEach((content, index) => {
    minified = minified.replace(`___PRESERVED_${index}___`, content)
  })

  return minified.trim()
}
