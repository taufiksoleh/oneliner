export type CodeType = 'html' | 'css' | 'js' | 'json'
export type TabType = CodeType | 'base64'

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
