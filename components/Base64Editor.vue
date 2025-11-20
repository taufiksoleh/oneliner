<template>
  <div class="base64-editor">
    <!-- Text Encode/Decode Section -->
    <div class="editor-section">
      <h3>Text Encode/Decode</h3>

      <label for="base64TextInput">Input Text:</label>
      <textarea
        id="base64TextInput"
        v-model="textInput"
        placeholder="Enter text to encode or base64 to decode..."
      />
    </div>

    <div class="button-group">
      <button class="btn-minify" @click="handleEncodeText">
        Encode to Base64
      </button>
      <button class="btn-beautify" @click="handleDecodeText">
        Decode from Base64
      </button>
      <button class="btn-copy" @click="handleCopyText">
        Copy Output
      </button>
      <button class="btn-clear" @click="handleClearText">
        Clear All
      </button>
    </div>

    <div class="editor-section">
      <label for="base64TextOutput">Output:</label>
      <textarea
        id="base64TextOutput"
        v-model="textOutput"
        readonly
        placeholder="Encoded/decoded text will appear here..."
      />
    </div>

    <hr class="divider">

    <!-- Image Encode/Decode Section -->
    <div class="editor-section">
      <h3>Image Encode/Decode</h3>

      <FileUpload
        label="📁 Drag & drop image file here or click to browse"
        accept="image/*"
        @file-selected="handleImageUpload"
      />

      <div v-if="imagePreview" class="image-preview-container">
        <label>Image Preview:</label>
        <div class="image-preview-wrapper">
          <img :src="imagePreview" alt="Preview" class="image-preview">
        </div>
      </div>

      <label for="base64ImageInput">Base64 String:</label>
      <textarea
        id="base64ImageInput"
        v-model="imageInput"
        placeholder="Paste base64 image string here to decode or it will appear here after encoding..."
      />
    </div>

    <div class="button-group">
      <button class="btn-beautify" @click="handleDecodeImage">
        Decode Base64 to Image
      </button>
      <button class="btn-copy" @click="handleCopyImage">
        Copy Base64
      </button>
      <button class="btn-download" @click="handleDownloadImage">
        Download Image
      </button>
      <button class="btn-clear" @click="handleClearImage">
        Clear All
      </button>
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-label">Base64 Size</div>
        <div class="stat-value">{{ base64SizeFormatted }}</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Image Type</div>
        <div class="stat-value" style="font-size: 1.125rem;">{{ imageType }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { encodeBase64Text, decodeBase64Text, fileToBase64, extractImageType, getBase64Size } from '~/utils/base64'

const editorStore = useEditorStore()
const { showNotification } = useNotification()
const { copyToClipboard } = useClipboard()
const { downloadBase64Image } = useFileHandling()

const textInput = computed({
  get: () => editorStore.base64.textInput,
  set: (value) => {
    editorStore.base64.textInput = value
  }
})

const textOutput = computed({
  get: () => editorStore.base64.textOutput,
  set: (value) => {
    editorStore.base64.textOutput = value
  }
})

const imageInput = computed({
  get: () => editorStore.base64.imageInput,
  set: (value) => {
    editorStore.base64.imageInput = value
  }
})

const imagePreview = computed(() => editorStore.base64.imagePreview)
const imageType = computed(() => editorStore.base64.imageType)
const base64Size = computed(() => editorStore.base64.base64Size)

const base64SizeFormatted = computed(() => {
  return base64Size.value > 0 ? `${base64Size.value.toFixed(2)} KB` : '0'
})

const handleEncodeText = () => {
  if (!textInput.value.trim()) {
    showNotification({ message: 'Please enter some text!', color: '#ef4444' })
    return
  }

  try {
    const encoded = encodeBase64Text(textInput.value)
    editorStore.updateBase64Text(textInput.value, encoded)
    showNotification({ message: 'Text encoded to Base64 successfully!', color: '#10b981' })
  } catch (error) {
    showNotification({ message: (error as Error).message, color: '#ef4444' })
  }
}

const handleDecodeText = () => {
  if (!textInput.value.trim()) {
    showNotification({ message: 'Please enter a Base64 string!', color: '#ef4444' })
    return
  }

  try {
    const decoded = decodeBase64Text(textInput.value)
    editorStore.updateBase64Text(textInput.value, decoded)
    showNotification({ message: 'Base64 decoded to text successfully!', color: '#10b981' })
  } catch (error) {
    showNotification({ message: (error as Error).message, color: '#ef4444' })
  }
}

const handleCopyText = () => {
  copyToClipboard(textOutput.value)
}

const handleClearText = () => {
  editorStore.clearBase64Text()
  showNotification({ message: 'Cleared all fields!', color: '#10b981' })
}

const handleImageUpload = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    showNotification({ message: 'Please select a valid image file!', color: '#ef4444' })
    return
  }

  try {
    const base64String = await fileToBase64(file)
    const type = extractImageType(base64String)
    const size = getBase64Size(base64String)

    editorStore.updateBase64Image(base64String, base64String, type, size)
    showNotification({ message: `Image "${file.name}" encoded to Base64!`, color: '#10b981' })
  } catch (error) {
    showNotification({ message: 'Error encoding image: ' + (error as Error).message, color: '#ef4444' })
  }
}

const handleDecodeImage = () => {
  if (!imageInput.value.trim()) {
    showNotification({ message: 'Please enter a Base64 image string!', color: '#ef4444' })
    return
  }

  try {
    const type = extractImageType(imageInput.value)
    const size = getBase64Size(imageInput.value)

    editorStore.updateBase64Image(imageInput.value, imageInput.value, type, size)
    showNotification({ message: 'Base64 decoded to image successfully!', color: '#10b981' })
  } catch (error) {
    showNotification({ message: 'Error decoding Base64 image: ' + (error as Error).message, color: '#ef4444' })
  }
}

const handleCopyImage = () => {
  copyToClipboard(imageInput.value)
}

const handleDownloadImage = () => {
  downloadBase64Image(imageInput.value)
}

const handleClearImage = () => {
  editorStore.clearBase64Image()
  showNotification({ message: 'Cleared all fields!', color: '#10b981' })
}

// Handle keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (editorStore.currentTab !== 'base64') return

    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      handleClearText()
      handleClearImage()
    }
  }

  document.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.base64-editor {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.editor-section {
  margin-bottom: 1.5rem;
}

.editor-section h3 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.editor-section label {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 0.9375rem;
  transition: color 0.3s ease;
  letter-spacing: -0.01em;
}

textarea {
  width: 100%;
  min-height: 280px;
  padding: 1rem;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  resize: vertical;
  transition: var(--transition);
  background: var(--card-bg);
  color: var(--text-primary);
}

textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

textarea::placeholder {
  color: var(--text-muted);
}

.divider {
  border: none;
  border-top: 2px solid var(--border);
  margin: 2.5rem 0;
}

.image-preview-container {
  margin-bottom: 1.5rem;
  text-align: center;
}

.image-preview-wrapper {
  margin-top: 0.75rem;
  padding: 1rem;
  background: var(--bg-body);
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--border);
}

.image-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: var(--radius);
}

.button-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.875rem;
  margin: 1.5rem 0;
}

button {
  padding: 0.875rem 1.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition);
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
  font-family: inherit;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.2);
  opacity: 0;
  transition: var(--transition);
}

button:hover::before {
  opacity: 1;
}

.btn-minify {
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow);
}

.btn-minify:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  background: var(--primary-dark);
}

.btn-beautify {
  background: var(--secondary);
  color: white;
  box-shadow: var(--shadow);
}

.btn-beautify:hover {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-copy {
  background: var(--success);
  color: white;
  box-shadow: var(--shadow);
}

.btn-copy:hover {
  background: #047857;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-download {
  background: var(--warning);
  color: white;
  box-shadow: var(--shadow);
}

.btn-download:hover {
  background: #b45309;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-clear {
  background: var(--danger);
  color: white;
  box-shadow: var(--shadow);
}

.btn-clear:hover {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

button:active {
  transform: translateY(0) scale(0.98);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: var(--bg-body);
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--border);
  transition: background 0.3s ease;
}

.stat-item {
  text-align: center;
  padding: 0.75rem;
  border-radius: var(--radius);
  transition: var(--transition);
}

.stat-item:hover {
  background: var(--card-bg);
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.02em;
}

@media (max-width: 768px) {
  .button-group {
    grid-template-columns: 1fr;
  }

  textarea {
    min-height: 200px;
    font-size: 0.8125rem;
  }

  .stats {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}
</style>
