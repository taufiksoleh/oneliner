import { describe, it, expect } from 'vitest'
import { beautifyHTML } from '~/utils/beautifiers/html'
import { beautifyCSS } from '~/utils/beautifiers/css'
import { beautifyJS } from '~/utils/beautifiers/js'
import { beautifyJSON } from '~/utils/beautifiers/json'

describe('HTML Beautifier', () => {
  it('should add proper indentation', () => {
    const input = '<div><p>Hello</p></div>'
    const result = beautifyHTML(input)
    expect(result).toContain('\n')
    expect(result.split('\n').length).toBeGreaterThan(1)
  })

  it('should handle nested elements', () => {
    const input = '<div><ul><li>Item</li></ul></div>'
    const result = beautifyHTML(input)
    expect(result).toContain('\n')
    expect(result).toContain('    ') // Indentation
  })

  it('should handle empty input', () => {
    const result = beautifyHTML('')
    expect(result).toBe('')
  })
})

describe('CSS Beautifier', () => {
  it('should add line breaks and indentation', () => {
    const input = 'body{color:red;margin:0}'
    const result = beautifyCSS(input)
    expect(result).toContain('\n')
    expect(result).toContain('    ') // Indentation
  })

  it('should format selectors properly', () => {
    const input = 'body{color:red}h1{font-size:2em}'
    const result = beautifyCSS(input)
    expect(result.split('\n').length).toBeGreaterThan(1)
    expect(result).toContain('body')
    expect(result).toContain('h1')
  })

  it('should handle empty input', () => {
    const result = beautifyCSS('')
    expect(result).toBe('')
  })
})

describe('JavaScript Beautifier', () => {
  it('should add line breaks and indentation', () => {
    const input = 'function test(){return true;}'
    const result = beautifyJS(input)
    expect(result).toContain('\n')
    expect(result).toContain('    ') // Indentation
  })

  it('should handle nested blocks', () => {
    const input = 'if(true){if(false){return;}}'
    const result = beautifyJS(input)
    expect(result.split('\n').length).toBeGreaterThan(1)
  })

  it('should handle empty input', () => {
    const result = beautifyJS('')
    expect(result).toBe('')
  })
})

describe('JSON Beautifier', () => {
  it('should format JSON with proper indentation', () => {
    const input = '{"name":"John","age":30}'
    const result = beautifyJSON(input)
    expect(result).toContain('\n')
    expect(result).toContain('    ') // 4-space indentation
    expect(result).toContain('"name": "John"')
  })

  it('should throw error for invalid JSON', () => {
    const input = '{ invalid json }'
    expect(() => beautifyJSON(input)).toThrow('Invalid JSON')
  })

  it('should handle nested objects', () => {
    const input = '{"person":{"name":"John","age":30}}'
    const result = beautifyJSON(input)
    expect(result.split('\n').length).toBeGreaterThan(3)
  })

  it('should handle arrays', () => {
    const input = '[1,2,3]'
    const result = beautifyJSON(input)
    expect(result).toContain('[\n')
  })
})
