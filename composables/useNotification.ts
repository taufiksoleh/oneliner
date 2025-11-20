import type { NotificationOptions } from '~/types/editor'

export const useNotification = () => {
  const showNotification = (options: NotificationOptions | string) => {
    const config: NotificationOptions = typeof options === 'string'
      ? { message: options }
      : options

    const {
      message,
      color = '#10b981',
      duration = 3000
    } = config

    if (process.client) {
      const notification = document.getElementById('notification')
      if (notification) {
        notification.textContent = message
        notification.style.background = color
        notification.classList.add('show')

        setTimeout(() => {
          notification.classList.remove('show')
        }, duration)
      }
    }
  }

  return {
    showNotification
  }
}
