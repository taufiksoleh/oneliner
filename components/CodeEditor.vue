<template>
  <div class="code-editor">
    <FileUpload
      :label="`📁 Drag & drop ${type.toUpperCase()} file here or click to browse`"
      :accept="acceptType"
      @file-selected="handleFileUpload"
    />

    <div class="editor-section">
      <label :for="`${type}Input`">Input {{ type.toUpperCase() }}:</label>
      <textarea
        :id="`${type}Input`"
        v-model="inputText"
        :placeholder="`Paste your ${type.toUpperCase()} code here...`"
      />
    </div>

    <div class="button-group">
      <button class="btn-minify" @click="handleMinify">
        Minify {{ type.toUpperCase() }}
      </button>
      <button class="btn-beautify" @click="handleBeautify">
        Beautify {{ type.toUpperCase() }}
      </button>
      <button class="btn-copy" @click="handleCopy">
        Copy Output
      </button>
      <button class="btn-download" @click="handleDownload">
        Download
      </button>
      <button class="btn-clear" @click="handleClear">
        Clear All
      </button>
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-label">Original Size</div>
        <div class="stat-value">{{ stats.originalSize }} bytes</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Processed Size</div>
        <div class="stat-value">{{ stats.processedSize }} bytes</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">Saved</div>
        <div class="stat-value">{{ stats.savedPercentage }}</div>
      </div>
    </div>

    <div class="editor-section">
      <label :for="`${type}Output`">Output:</label>
      <textarea
        :id="`${type}Output`"
        v-model="outputText"
        readonly
        :placeholder="`Processed ${type.toUpperCase()} will appear here...`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CodeType } from '~/types/editor'
import { minifyHTML } from '~/utils/minifiers/html'
import { minifyCSS } from '~/utils/minifiers/css'
import { minifyJS } from '~/utils/minifiers/js'
import { minifyJSON } from '~/utils/minifiers/json'
import { beautifyHTML } from '~/utils/beautifiers/html'
import { beautifyCSS } from '~/utils/beautifiers/css'
import { beautifyJS } from '~/utils/beautifiers/js'
import { beautifyJSON } from '~/utils/beautifiers/json'

interface Props {
  type: CodeType
}

const props = defineProps<Props>()

const editorStore = useEditorStore()
const { showNotification } = useNotification()
const { copyToClipboard } = useClipboard()
const { readFileAsText, downloadCodeFile } = useFileHandling()

const acceptType = computed(() => {
  const types: Record<CodeType, string> = {
    html: '.html,.htm',
    css: '.css',
    js: '.js',
    json: '.json'
  }
  return types[props.type]
})

const inputText = computed({
  get: () => editorStore[props.type].input,
  set: (value) => editorStore.updateEditorInput(props.type, value)
})

const outputText = computed({
  get: () => editorStore[props.type].output,
  set: (value) => editorStore.updateEditorOutput(props.type, value)
})

const stats = computed(() => editorStore[props.type].stats)

const handleMinify = () => {
  if (!inputText.value.trim()) {
    showNotification({ message: 'Please enter some code!', color: '#ef4444' })
    return
  }

  const originalSize = inputText.value.length

  try {
    let minified = ''
    switch (props.type) {
      case 'html':
        minified = minifyHTML(inputText.value)
        break
      case 'css':
        minified = minifyCSS(inputText.value)
        break
      case 'js':
        minified = minifyJS(inputText.value)
        break
      case 'json':
        minified = minifyJSON(inputText.value)
        break
    }

    const minifiedSize = minified.length
    editorStore.updateEditorOutput(props.type, minified)
    editorStore.updateEditorStats(props.type, originalSize, minifiedSize)

    const saved = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2)
    showNotification({
      message: `${props.type.toUpperCase()} minified successfully! Saved ${saved}%`,
      color: '#10b981'
    })
  } catch (error) {
    showNotification({ message: (error as Error).message, color: '#ef4444' })
  }
}

const handleBeautify = () => {
  if (!inputText.value.trim()) {
    showNotification({ message: 'Please enter some code!', color: '#ef4444' })
    return
  }

  const originalSize = inputText.value.length

  try {
    let beautified = ''
    switch (props.type) {
      case 'html':
        beautified = beautifyHTML(inputText.value)
        break
      case 'css':
        beautified = beautifyCSS(inputText.value)
        break
      case 'js':
        beautified = beautifyJS(inputText.value)
        break
      case 'json':
        beautified = beautifyJSON(inputText.value)
        break
    }

    const beautifiedSize = beautified.length
    const difference = beautifiedSize - originalSize
    const percentChange = originalSize > 0 ? ((difference / originalSize) * 100).toFixed(2) : '0'

    editorStore.updateEditorOutput(props.type, beautified)
    editorStore.updateEditorStats(props.type, originalSize, beautifiedSize)

    showNotification({
      message: `${props.type.toUpperCase()} beautified successfully!`,
      color: '#8b5cf6'
    })
  } catch (error) {
    showNotification({ message: (error as Error).message, color: '#ef4444' })
  }
}

const handleCopy = () => {
  copyToClipboard(outputText.value)
}

const handleDownload = () => {
  downloadCodeFile(props.type, outputText.value)
}

const handleClear = () => {
  editorStore.clearEditor(props.type)
  showNotification({ message: 'Cleared all fields!', color: '#10b981' })
}

const handleFileUpload = async (file: File) => {
  try {
    const content = await readFileAsText(file)
    editorStore.updateEditorInput(props.type, content)
    showNotification({ message: `File "${file.name}" loaded successfully!`, color: '#10b981' })
  } catch (error) {
    showNotification({ message: 'Error reading file: ' + (error as Error).message, color: '#ef4444' })
  }
}

// Handle keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (editorStore.currentTab !== props.type) return

    // Ctrl/Cmd + Enter to minify
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleMinify()
    }

    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      handleClear()
    }
  }

  document.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.code-editor {
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
