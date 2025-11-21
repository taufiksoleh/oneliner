export const useClipboard = () => {
  const { showNotification } = useNotification()

  const copyToClipboard = async (text: string) => {
    if (!text.trim()) {
      showNotification({ message: 'Nothing to copy!', color: '#ef4444' })
      return false
    }

    try {
      // Modern Clipboard API
      await navigator.clipboard.writeText(text)
      showNotification({ message: 'Copied to clipboard!', color: '#10b981' })
      return true
    } catch (err) {
      // Fallback for older browsers
      try {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        showNotification({ message: 'Copied to clipboard!', color: '#10b981' })
        return true
      } catch (fallbackErr) {
        showNotification({ message: 'Failed to copy!', color: '#ef4444' })
        return false
      }
    }
  }

  return {
    copyToClipboard
  }
}
