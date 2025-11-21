<template>
  <div
    class="file-upload-area"
    :class="{ dragover: isDragOver }"
    @click="triggerFileInput"
    @dragover.prevent="isDragOver = true"
    @dragleave="isDragOver = false"
    @drop.prevent="handleDrop"
  >
    <p>📁 {{ label || 'Drag & drop file here or click to browse' }}</p>
    <input
      :ref="'fileInput'"
      type="file"
      :accept="accept"
      style="display: none"
      @change="handleFileChange"
    >
    <button class="file-input-btn" type="button">
      Choose File
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  accept?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Drag & drop file here or click to browse',
  accept: '*'
})

const emit = defineEmits<{
  'file-selected': [file: File]
}>()

const isDragOver = ref(false)
const fileInput = ref<HTMLInputElement>()

const triggerFileInput = () => {
  const input = document.querySelector('input[type="file"]') as HTMLInputElement
  input?.click()
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    emit('file-selected', file)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    emit('file-selected', file)
  }
}
</script>

<style scoped>
.file-upload-area {
  border: 2px dashed var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  margin-bottom: 1.25rem;
  background: var(--bg-body);
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.file-upload-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--primary);
  opacity: 0;
  transition: var(--transition);
  z-index: 0;
}

.file-upload-area.dragover::before {
  opacity: 0.08;
}

.file-upload-area.dragover {
  border-color: var(--primary);
  transform: scale(0.99);
}

.file-upload-area:hover {
  border-color: var(--primary-light);
  box-shadow: var(--shadow);
}

.file-upload-area p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  font-size: 0.9375rem;
  position: relative;
  z-index: 1;
}

.file-input-btn {
  background: var(--card-bg);
  color: var(--text-primary);
  border: 1.5px solid var(--border);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: var(--transition);
  position: relative;
  z-index: 1;
}

.file-input-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: var(--shadow-sm);
}
</style>
