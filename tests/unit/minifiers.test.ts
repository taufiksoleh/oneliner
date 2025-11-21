import { describe, it, expect } from 'vitest'
import { minifyHTML } from '~/utils/minifiers/html'
import { minifyCSS } from '~/utils/minifiers/css'
import { minifyJS } from '~/utils/minifiers/js'
import { minifyJSON } from '~/utils/minifiers/json'

describe('HTML Minifier', () => {
  it('should remove HTML comments', () => {
    const input = '<!-- This is a comment --><div>Hello</div>'
    const result = minifyHTML(input)
    expect(result).not.toContain('<!--')
    expect(result).toContain('<div>Hello</div>')
  })

  it('should remove extra whitespace', () => {
    const input = '<div>    <p>  Hello  </p>    </div>'
    const result = minifyHTML(input)
    expect(result.length).toBeLessThan(input.length)
    expect(result).toContain('Hello')
  })

  it('should preserve content in pre tags', () => {
    const input = '<pre>  formatted   code  </pre>'
    const result = minifyHTML(input)
    expect(result).toContain('<pre>  formatted   code  </pre>')
  })

  it('should handle empty input', () => {
    const result = minifyHTML('')
    expect(result).toBe('')
  })
})

describe('CSS Minifier', () => {
  it('should remove CSS comments', () => {
    const input = '/* Comment */ body { color: red; }'
    const result = minifyCSS(input)
    expect(result).not.toContain('/*')
    expect(result).toContain('body{color:red}')
  })

  it('should remove whitespace around braces', () => {
    const input = 'body { color: red; }'
    const result = minifyCSS(input)
    expect(result).toBe('body{color:red}')
  })

  it('should remove last semicolon in block', () => {
    const input = 'body { color: red; margin: 0; }'
    const result = minifyCSS(input)
    expect(result).toContain('margin:0}')
    expect(result).not.toContain(';}'  )
  })

  it('should handle empty input', () => {
    const result = minifyCSS('')
    expect(result).toBe('')
  })
})

describe('JavaScript Minifier', () => {
  it('should remove single-line comments', () => {
    const input = '// Comment\nconst x = 5;'
    const result = minifyJS(input)
    expect(result).not.toContain('//')
    expect(result).toContain('const')
  })

  it('should remove multi-line comments', () => {
    const input = '/* Comment */ const x = 5;'
    const result = minifyJS(input)
    expect(result).not.toContain('/*')
    expect(result).toContain('const')
  })

  it('should preserve necessary spaces around keywords', () => {
    const input = 'return x + y;'
    const result = minifyJS(input)
    expect(result).toContain('return')
    expect(result).toMatch(/return\s/)
  })

  it('should handle empty input', () => {
    const result = minifyJS('')
    expect(result).toBe('')
  })
})

describe('JSON Minifier', () => {
  it('should minify valid JSON', () => {
    const input = '{\n  "name": "John",\n  "age": 30\n}'
    const result = minifyJSON(input)
    expect(result).toBe('{"name":"John","age":30}')
  })

  it('should throw error for invalid JSON', () => {
    const input = '{ invalid json }'
    expect(() => minifyJSON(input)).toThrow('Invalid JSON')
  })

  it('should handle empty object', () => {
    const input = '{}'
    const result = minifyJSON(input)
    expect(result).toBe('{}')
  })

  it('should handle arrays', () => {
    const input = '[1, 2, 3]'
    const result = minifyJSON(input)
    expect(result).toBe('[1,2,3]')
  })
})
