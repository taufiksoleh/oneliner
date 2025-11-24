import { describe, it, expect } from 'vitest'
import {
  base64UrlEncode,
  base64UrlDecode,
  validateJwtStructure,
  decodeJwt,
  encodeJwtUnsigned,
  getExpirationInfo,
  formatTimestamp
} from '~/utils/jwt'

describe('JWT Base64 URL Encoding/Decoding', () => {
  it('should encode string to base64url', () => {
    const input = 'Hello World'
    const result = base64UrlEncode(input)
    expect(result).toBe('SGVsbG8gV29ybGQ')
  })

  it('should decode base64url to string', () => {
    const input = 'SGVsbG8gV29ybGQ'
    const result = base64UrlDecode(input)
    expect(result).toBe('Hello World')
  })

  it('should handle URL-safe characters', () => {
    const input = '{"test": "value"}'
    const encoded = base64UrlEncode(input)
    expect(encoded).not.toContain('+')
    expect(encoded).not.toContain('/')
    expect(encoded).not.toContain('=')
  })

  it('should handle UTF-8 characters', () => {
    const input = 'こんにちは'
    const encoded = base64UrlEncode(input)
    const decoded = base64UrlDecode(encoded)
    expect(decoded).toBe(input)
  })

  it('should throw error for invalid base64url', () => {
    const input = '!!invalid!!'
    expect(() => base64UrlDecode(input)).toThrow()
  })
})

describe('JWT Structure Validation', () => {
  it('should validate correct JWT structure', () => {
    const validJwt = 'header.payload.signature'
    expect(validateJwtStructure(validJwt)).toBe(true)
  })

  it('should reject JWT with less than 3 parts', () => {
    const invalidJwt = 'header.payload'
    expect(validateJwtStructure(invalidJwt)).toBe(false)
  })

  it('should reject JWT with more than 3 parts', () => {
    const invalidJwt = 'header.payload.signature.extra'
    expect(validateJwtStructure(invalidJwt)).toBe(false)
  })

  it('should reject empty string', () => {
    expect(validateJwtStructure('')).toBe(false)
  })
})

describe('JWT Decoder', () => {
  it('should decode a valid JWT token', () => {
    // Sample JWT: {"alg":"HS256","typ":"JWT"}.{"sub":"1234567890","name":"John Doe","iat":1516239022}.signature
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

    const result = decodeJwt(token)

    expect(result.isValid).toBe(true)
    expect(result.error).toBe('')
    expect(result.headerObj).toEqual({
      alg: 'HS256',
      typ: 'JWT'
    })
    expect(result.payloadObj).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022
    })
    expect(result.signature).toBe('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  })

  it('should return formatted header and payload', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

    const result = decodeJwt(token)

    expect(result.header).toContain('"alg"')
    expect(result.header).toContain('"typ"')
    expect(result.payload).toContain('"sub"')
    expect(result.payload).toContain('"name"')
  })

  it('should handle empty token', () => {
    const result = decodeJwt('')

    expect(result.isValid).toBe(false)
    expect(result.error).toContain('empty')
  })

  it('should handle invalid token format', () => {
    const result = decodeJwt('invalid.token')

    expect(result.isValid).toBe(false)
    expect(result.error).toContain('Invalid JWT format')
  })

  it('should handle invalid base64 in header', () => {
    const result = decodeJwt('!!!invalid!!!.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature')

    expect(result.isValid).toBe(false)
    expect(result.error).toContain('Invalid header')
  })

  it('should handle invalid JSON in payload', () => {
    const invalidPayload = base64UrlEncode('not valid json')
    const validHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    const result = decodeJwt(`${validHeader}.${invalidPayload}.signature`)

    expect(result.isValid).toBe(false)
    expect(result.error).toContain('Invalid payload')
  })
})

describe('JWT Encoder', () => {
  it('should encode valid header and payload', () => {
    const header = '{"alg":"HS256","typ":"JWT"}'
    const payload = '{"sub":"1234567890","name":"John Doe"}'

    const result = encodeJwtUnsigned(header, payload)

    expect(result).toBeTruthy()
    expect(result.split('.')).toHaveLength(3)
  })

  it('should add default algorithm and type if missing', () => {
    const header = '{}'
    const payload = '{"sub":"1234567890"}'

    const result = encodeJwtUnsigned(header, payload)
    const decoded = decodeJwt(result)

    expect(decoded.headerObj.alg).toBeDefined()
    expect(decoded.headerObj.typ).toBe('JWT')
  })

  it('should handle formatted JSON', () => {
    const header = `{
      "alg": "HS256",
      "typ": "JWT"
    }`
    const payload = `{
      "sub": "1234567890",
      "name": "John Doe"
    }`

    const result = encodeJwtUnsigned(header, payload)

    expect(result).toBeTruthy()
    expect(result.split('.')).toHaveLength(3)
  })

  it('should throw error for invalid header JSON', () => {
    const header = 'not valid json'
    const payload = '{"sub":"1234567890"}'

    expect(() => encodeJwtUnsigned(header, payload)).toThrow()
  })

  it('should throw error for invalid payload JSON', () => {
    const header = '{"alg":"HS256"}'
    const payload = 'not valid json'

    expect(() => encodeJwtUnsigned(header, payload)).toThrow()
  })

  it('should create decodable token', () => {
    const header = '{"alg":"HS256","typ":"JWT"}'
    const payload = '{"sub":"1234567890","name":"John Doe"}'

    const encoded = encodeJwtUnsigned(header, payload)
    const decoded = decodeJwt(encoded)

    expect(decoded.isValid).toBe(true)
    expect(decoded.payloadObj.sub).toBe('1234567890')
    expect(decoded.payloadObj.name).toBe('John Doe')
  })
})

describe('JWT Expiration Info', () => {
  it('should return "No expiration" for payload without exp', () => {
    const payload = { sub: '1234567890' }
    const result = getExpirationInfo(payload)
    expect(result).toBe('No expiration')
  })

  it('should detect expired token', () => {
    const yesterday = Math.floor(Date.now() / 1000) - 86400
    const payload = { exp: yesterday }
    const result = getExpirationInfo(payload)
    expect(result).toContain('Expired')
  })

  it('should detect valid token', () => {
    const tomorrow = Math.floor(Date.now() / 1000) + 86400
    const payload = { exp: tomorrow }
    const result = getExpirationInfo(payload)
    expect(result).toContain('Expires in')
  })

  it('should handle null payload', () => {
    const result = getExpirationInfo(null)
    expect(result).toBe('No expiration')
  })
})

describe('Timestamp Formatting', () => {
  it('should format Unix timestamp', () => {
    const timestamp = 1516239022
    const result = formatTimestamp(timestamp)
    expect(result).toBeTruthy()
    expect(result).not.toBe('N/A')
  })

  it('should return N/A for invalid timestamp', () => {
    const result = formatTimestamp(0)
    expect(result).toBe('N/A')
  })

  it('should handle null/undefined', () => {
    const result = formatTimestamp(null as any)
    expect(result).toBe('N/A')
  })
})

describe('JWT Round-trip Encoding/Decoding', () => {
  it('should successfully round-trip encode and decode', () => {
    const originalHeader = {
      alg: 'HS256',
      typ: 'JWT'
    }
    const originalPayload = {
      sub: '1234567890',
      name: 'John Doe',
      admin: true,
      iat: 1516239022
    }

    const encoded = encodeJwtUnsigned(
      JSON.stringify(originalHeader),
      JSON.stringify(originalPayload)
    )
    const decoded = decodeJwt(encoded)

    expect(decoded.isValid).toBe(true)
    expect(decoded.headerObj).toEqual(originalHeader)
    expect(decoded.payloadObj).toEqual(originalPayload)
  })

  it('should preserve special characters in payload', () => {
    const payload = {
      message: 'Hello, World! 你好 こんにちは',
      symbols: '!@#$%^&*()'
    }

    const encoded = encodeJwtUnsigned(
      '{"alg":"HS256"}',
      JSON.stringify(payload)
    )
    const decoded = decodeJwt(encoded)

    expect(decoded.isValid).toBe(true)
    expect(decoded.payloadObj.message).toBe(payload.message)
    expect(decoded.payloadObj.symbols).toBe(payload.symbols)
  })
})
