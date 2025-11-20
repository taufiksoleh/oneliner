import type { CodeType } from '~/types/editor'

export const useFileHandling = () => {
  const { showNotification } = useNotification()

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          resolve(result)
        } else {
          reject(new Error('Failed to read file as text'))
        }
      }
      reader.onerror = () => reject(new Error('Error reading file'))
      reader.readAsText(file)
    })
  }

  const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain') => {
    if (!content.trim()) {
      showNotification({ message: 'Nothing to download!', color: '#ef4444' })
      return
    }

    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    showNotification({ message: 'File downloaded successfully!', color: '#10b981' })
  }

  const downloadCodeFile = (type: CodeType, content: string) => {
    const extensions: Record<CodeType, string> = {
      html: 'html',
      css: 'css',
      js: 'js',
      json: 'json'
    }

    downloadFile(content, `minified.min.${extensions[type]}`, 'text/plain')
  }

  const downloadBase64Image = (base64String: string) => {
    if (!base64String.trim()) {
      showNotification({ message: 'Nothing to download!', color: '#ef4444' })
      return
    }

    try {
      // Extract MIME type and base64 data
      const match = base64String.match(/^data:(image\/\w+);base64,(.+)$/)
      if (!match) {
        showNotification({ message: 'Invalid Base64 image format!', color: '#ef4444' })
        return
      }

      const mimeType = match[1]
      const extension = mimeType.split('/')[1]

      // Create download link
      const link = document.createElement('a')
      link.href = base64String
      link.download = `image.${extension}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showNotification({ message: 'Image downloaded successfully!', color: '#10b981' })
    } catch (error) {
      showNotification({ message: 'Error downloading image: ' + (error as Error).message, color: '#ef4444' })
    }
  }

  return {
    readFileAsText,
    downloadFile,
    downloadCodeFile,
    downloadBase64Image
  }
}
