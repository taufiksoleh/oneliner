<template>
  <div class="container">
    <div class="header">
      <div class="header-content">
        <h1>🚀 Oneliner</h1>
        <p class="subtitle">Professional HTML, CSS, JavaScript & JSON minifier for developers</p>
      </div>
      <ThemeToggle />
    </div>

    <EditorTabs />

    <!-- Code Editors -->
    <CodeEditor v-if="currentTab === 'html'" type="html" />
    <CodeEditor v-if="currentTab === 'css'" type="css" />
    <CodeEditor v-if="currentTab === 'js'" type="js" />
    <CodeEditor v-if="currentTab === 'json'" type="json" />

    <!-- Base64 Editor -->
    <Base64Editor v-if="currentTab === 'base64'" />

    <!-- Features Section -->
    <div class="features">
      <h3>✨ Features:</h3>
      <ul>
        <li><strong>Minify & Beautify:</strong> Compress or format HTML, CSS, JavaScript, and JSON</li>
        <li><strong>Base64 Encoder/Decoder:</strong> Encode and decode text and images to/from Base64</li>
        <li><strong>Two-Way Processing:</strong> Minify code to save space or beautify to improve readability</li>
        <li><strong>Works Offline:</strong> Full PWA support - install and use without internet</li>
        <li><strong>File Upload:</strong> Drag & drop or browse to upload files and images</li>
        <li><strong>File Download:</strong> Save processed output directly</li>
        <li><strong>Dark Mode:</strong> Eye-friendly dark theme with persistence</li>
        <li><strong>Statistics:</strong> Real-time size comparison and change percentage</li>
        <li><strong>Copy to Clipboard:</strong> One-click copy functionality</li>
        <li><strong>Keyboard Shortcuts:</strong> Ctrl/Cmd+Enter to minify, Ctrl/Cmd+K to clear</li>
      </ul>
    </div>

    <div class="keyboard-shortcuts">
      <strong>⌨️ Keyboard Shortcuts:</strong>
      <strong>Ctrl/Cmd+Enter</strong> - Minify |
      <strong>Ctrl/Cmd+K</strong> - Clear All
    </div>
  </div>
</template>

<script setup lang="ts">
const editorStore = useEditorStore()
const currentTab = computed(() => editorStore.currentTab)
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
  background: var(--container-bg);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  padding: 2.5rem;
  transition: var(--transition);
  border: 1px solid var(--border);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--border);
}

.header-content h1 {
  color: var(--text-primary);
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
  font-weight: 400;
}

.features {
  margin-top: 2rem;
  padding: 1.75rem;
  background: var(--bg-body);
  border-radius: var(--radius-lg);
  transition: background 0.3s ease;
  border: 1.5px solid var(--border);
}

.features h3 {
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  transition: color 0.3s ease;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.features ul {
  list-style: none;
  color: var(--text-secondary);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.75rem;
}

.features li {
  padding: 0.625rem 0;
  padding-left: 1.75rem;
  position: relative;
  transition: var(--transition);
  border-radius: var(--radius);
  font-size: 0.9375rem;
}

.features li:hover {
  padding-left: 2rem;
  background: var(--card-bg);
  padding-right: 0.625rem;
}

.features li:before {
  content: "✓";
  position: absolute;
  left: 0.5rem;
  color: var(--success);
  font-weight: bold;
  font-size: 1.125rem;
}

.features li strong {
  color: var(--text-primary);
  font-weight: 600;
}

.keyboard-shortcuts {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: var(--radius-lg);
  font-size: 0.9375rem;
  color: white;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
}

.keyboard-shortcuts strong {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  display: inline-block;
  margin: 0 0.25rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1.5rem;
    border-radius: var(--radius-lg);
  }

  .header {
    flex-direction: column;
    text-align: center;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .header-content h1 {
    font-size: 1.75rem;
    justify-content: center;
  }

  .subtitle {
    font-size: 0.9375rem;
  }

  .features ul {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .header-content h1 {
    font-size: 1.5rem;
  }
}
</style>
