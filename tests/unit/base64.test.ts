import { describe, it, expect } from 'vitest'
import { encodeBase64Text, decodeBase64Text, extractImageType, getBase64Size } from '~/utils/base64'

describe('Base64 Text Encoder/Decoder', () => {
  it('should encode text to Base64', () => {
    const input = 'Hello World'
    const result = encodeBase64Text(input)
    expect(result).toBe('SGVsbG8gV29ybGQ=')
  })

  it('should decode Base64 to text', () => {
    const input = 'SGVsbG8gV29ybGQ='
    const result = decodeBase64Text(input)
    expect(result).toBe('Hello World')
  })

  it('should handle UTF-8 characters', () => {
    const input = 'こんにちは'
    const encoded = encodeBase64Text(input)
    const decoded = decodeBase64Text(encoded)
    expect(decoded).toBe(input)
  })

  it('should handle empty string', () => {
    const result = encodeBase64Text('')
    expect(result).toBe('')
  })

  it('should throw error for invalid Base64', () => {
    const input = 'Not valid base64!'
    expect(() => decodeBase64Text(input)).toThrow()
  })
})

describe('Base64 Image Utilities', () => {
  it('should extract image type from data URL', () => {
    const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
    const type = extractImageType(dataUrl)
    expect(type).toBe('PNG')
  })

  it('should return Unknown for invalid data URL', () => {
    const invalidUrl = 'not a data url'
    const type = extractImageType(invalidUrl)
    expect(type).toBe('Unknown')
  })

  it('should calculate Base64 size in KB', () => {
    const base64String = 'A'.repeat(1024) // 1KB
    const size = getBase64Size(base64String)
    expect(size).toBe(1)
  })

  it('should handle different image types', () => {
    const jpegUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRg=='
    const type = extractImageType(jpegUrl)
    expect(type).toBe('JPEG')
  })
})
