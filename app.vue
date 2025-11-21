<template>
  <div>
    <NuxtPage />
    <NotificationToast />
  </div>
</template>

<script setup lang="ts">
const editorStore = useEditorStore()

// Initialize on client side
onMounted(() => {
  editorStore.loadPreferences()
  editorStore.loadSampleCode()
})
</script>
