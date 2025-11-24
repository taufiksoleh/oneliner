export type CodeType = 'html' | 'css' | 'js' | 'json'
export type TabType = CodeType | 'base64' | 'jwt'

export interface CodeStats {
  originalSize: number
  processedSize: number
  savedPercentage: string
}

export interface EditorState {
  input: string
  output: string
  stats: CodeStats
}

export interface Base64State {
  textInput: string
  textOutput: string
  imageInput: string
  imagePreview: string
  imageType: string
  base64Size: number
}

export interface NotificationOptions {
  message: string
  color?: string
  duration?: number
}

export interface JwtState {
  token: string
  header: string
  payload: string
  signature: string
  isValid: boolean
  error: string
}
