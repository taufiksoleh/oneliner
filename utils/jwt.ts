/**
 * JWT Encoder and Decoder utilities
 * All operations are performed client-side for privacy and security
 */

/**
 * Base64 URL encode (JWT uses URL-safe base64)
 */
export function base64UrlEncode(str: string): string {
  try {
    const base64 = btoa(unescape(encodeURIComponent(str)))
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  } catch (error) {
    throw new Error('Error encoding to base64url: ' + (error as Error).message)
  }
}

/**
 * Base64 URL decode (JWT uses URL-safe base64)
 */
export function base64UrlDecode(str: string): string {
  try {
    // Add padding if needed
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const padding = base64.length % 4
    if (padding) {
      base64 += '='.repeat(4 - padding)
    }
    return decodeURIComponent(escape(atob(base64)))
  } catch (error) {
    throw new Error('Error decoding from base64url: ' + (error as Error).message)
  }
}

/**
 * Validate JWT structure
 */
export function validateJwtStructure(token: string): boolean {
  const parts = token.split('.')
  return parts.length === 3
}

/**
 * Decode JWT token into its components
 */
export interface DecodedJwt {
  header: string
  payload: string
  signature: string
  headerObj: any
  payloadObj: any
  isValid: boolean
  error: string
}

export function decodeJwt(token: string): DecodedJwt {
  try {
    if (!token || !token.trim()) {
      throw new Error('Token is empty')
    }

    const parts = token.trim().split('.')

    if (parts.length !== 3) {
      throw new Error('Invalid JWT format. Expected 3 parts (header.payload.signature), got ' + parts.length)
    }

    const [headerB64, payloadB64, signature] = parts

    // Decode header
    let headerStr = ''
    let headerObj = null
    try {
      headerStr = base64UrlDecode(headerB64)
      headerObj = JSON.parse(headerStr)
    } catch (error) {
      throw new Error('Invalid header: ' + (error as Error).message)
    }

    // Decode payload
    let payloadStr = ''
    let payloadObj = null
    try {
      payloadStr = base64UrlDecode(payloadB64)
      payloadObj = JSON.parse(payloadStr)
    } catch (error) {
      throw new Error('Invalid payload: ' + (error as Error).message)
    }

    return {
      header: JSON.stringify(headerObj, null, 2),
      payload: JSON.stringify(payloadObj, null, 2),
      signature,
      headerObj,
      payloadObj,
      isValid: true,
      error: ''
    }
  } catch (error) {
    return {
      header: '',
      payload: '',
      signature: '',
      headerObj: null,
      payloadObj: null,
      isValid: false,
      error: (error as Error).message
    }
  }
}

/**
 * Encode JWT synchronously (without signing)
 */
export function encodeJwtUnsigned(headerJson: string, payloadJson: string): string {
  try {
    // Parse and validate JSON
    let headerObj
    let payloadObj

    try {
      headerObj = JSON.parse(headerJson)
    } catch (error) {
      throw new Error('Invalid header JSON: ' + (error as Error).message)
    }

    try {
      payloadObj = JSON.parse(payloadJson)
    } catch (error) {
      throw new Error('Invalid payload JSON: ' + (error as Error).message)
    }

    // Set default values
    if (!headerObj.alg) {
      headerObj.alg = 'none'
    }
    if (!headerObj.typ) {
      headerObj.typ = 'JWT'
    }

    // Encode header and payload
    const headerB64 = base64UrlEncode(JSON.stringify(headerObj))
    const payloadB64 = base64UrlEncode(JSON.stringify(payloadObj))

    return `${headerB64}.${payloadB64}.`
  } catch (error) {
    throw new Error('Error encoding JWT: ' + (error as Error).message)
  }
}

/**
 * Get human-readable expiration info
 */
export function getExpirationInfo(payload: any): string {
  if (!payload || !payload.exp) {
    return 'No expiration'
  }

  const exp = payload.exp * 1000 // Convert to milliseconds
  const now = Date.now()
  const expDate = new Date(exp)

  if (exp < now) {
    const diff = now - exp
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) {
      return `Expired ${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
      return `Expired ${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      return 'Expired recently'
    }
  } else {
    const diff = exp - now
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) {
      return `Expires in ${days} day${days > 1 ? 's' : ''}`
    } else if (hours > 0) {
      return `Expires in ${hours} hour${hours > 1 ? 's' : ''}`
    } else {
      return 'Expires soon'
    }
  }
}

/**
 * Format Unix timestamp to readable date
 */
export function formatTimestamp(timestamp: number): string {
  if (!timestamp) return 'N/A'
  const date = new Date(timestamp * 1000)
  return date.toLocaleString()
}
