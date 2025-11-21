<template>
  <button class="dark-mode-toggle" @click="toggleTheme">
    <span>{{ isDark ? '☀️' : '🌙' }}</span>
    <span>{{ isDark ? 'Light' : 'Dark' }}</span>
  </button>
</template>

<script setup lang="ts">
const editorStore = useEditorStore()
const { showNotification } = useNotification()

const isDark = computed(() => editorStore.darkMode)

const toggleTheme = () => {
  editorStore.toggleDarkMode()
  showNotification({
    message: isDark.value ? 'Dark mode enabled' : 'Light mode enabled',
    color: '#10b981'
  })
}
</script>

<style scoped>
.dark-mode-toggle {
  background: var(--card-bg);
  border: 1.5px solid var(--border);
  color: var(--text-primary);
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: var(--shadow-sm);
}

.dark-mode-toggle:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-hover);
  background: var(--bg-body);
}

.dark-mode-toggle:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .dark-mode-toggle {
    width: 100%;
    justify-content: center;
  }
}
</style>
