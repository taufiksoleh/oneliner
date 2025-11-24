<template>
  <div class="jwt-editor">
    <!-- JWT Decoder Section -->
    <div class="editor-section">
      <h3>JWT Decoder</h3>
      <p class="section-description">
        Paste your JWT token below to decode and inspect its contents. All processing is done client-side for privacy.
      </p>

      <label for="jwtTokenInput">JWT Token:</label>
      <textarea
        id="jwtTokenInput"
        v-model="token"
        placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
        class="token-input"
      />

      <div class="button-group">
        <button class="btn-beautify" @click="handleDecode">
          🔍 Decode JWT
        </button>
        <button class="btn-copy" @click="handleCopyToken">
          Copy Token
        </button>
        <button class="btn-clear" @click="handleClearDecoder">
          Clear All
        </button>
      </div>

      <!-- Error Display -->
      <div v-if="error" class="error-box">
        <strong>⚠️ Error:</strong> {{ error }}
      </div>

      <!-- Decoded Output -->
      <div v-if="isValid && !error" class="decoded-sections">
        <div class="decoded-section">
          <label for="jwtHeader">Header:</label>
          <textarea
            id="jwtHeader"
            v-model="header"
            readonly
            placeholder="Decoded header will appear here..."
          />
        </div>

        <div class="decoded-section">
          <label for="jwtPayload">Payload:</label>
          <textarea
            id="jwtPayload"
            v-model="payload"
            readonly
            placeholder="Decoded payload will appear here..."
          />
        </div>

        <div class="decoded-section">
          <label for="jwtSignature">Signature:</label>
          <input
            id="jwtSignature"
            v-model="signature"
            readonly
            type="text"
            placeholder="Signature will appear here..."
          />
        </div>

        <!-- Token Info -->
        <div v-if="tokenInfo" class="token-info">
          <h4>Token Information</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Algorithm:</span>
              <span class="info-value">{{ tokenInfo.algorithm }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Type:</span>
              <span class="info-value">{{ tokenInfo.type }}</span>
            </div>
            <div v-if="tokenInfo.issuer" class="info-item">
              <span class="info-label">Issuer:</span>
              <span class="info-value">{{ tokenInfo.issuer }}</span>
            </div>
            <div v-if="tokenInfo.subject" class="info-item">
              <span class="info-label">Subject:</span>
              <span class="info-value">{{ tokenInfo.subject }}</span>
            </div>
            <div v-if="tokenInfo.audience" class="info-item">
              <span class="info-label">Audience:</span>
              <span class="info-value">{{ tokenInfo.audience }}</span>
            </div>
            <div v-if="tokenInfo.issuedAt" class="info-item">
              <span class="info-label">Issued At:</span>
              <span class="info-value">{{ tokenInfo.issuedAt }}</span>
            </div>
            <div v-if="tokenInfo.expiresAt" class="info-item">
              <span class="info-label">Expires At:</span>
              <span class="info-value">{{ tokenInfo.expiresAt }}</span>
            </div>
            <div v-if="tokenInfo.expirationStatus" class="info-item full-width">
              <span class="info-label">Expiration Status:</span>
              <span class="info-value" :class="tokenInfo.isExpired ? 'expired' : 'valid'">
                {{ tokenInfo.expirationStatus }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="divider">

    <!-- JWT Encoder Section -->
    <div class="editor-section">
      <h3>JWT Encoder</h3>
      <p class="section-description">
        Create a JWT token by providing the header and payload JSON. The token will be unsigned (alg: none) for testing purposes.
      </p>

      <div class="encode-grid">
        <div class="encode-section">
          <label for="encodeHeader">Header (JSON):</label>
          <textarea
            id="encodeHeader"
            v-model="encodeHeader"
            placeholder='{"alg": "HS256", "typ": "JWT"}'
          />
        </div>

        <div class="encode-section">
          <label for="encodePayload">Payload (JSON):</label>
          <textarea
            id="encodePayload"
            v-model="encodePayload"
            placeholder='{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}'
          />
        </div>
      </div>

      <div class="button-group">
        <button class="btn-minify" @click="handleEncode">
          🔐 Encode JWT
        </button>
        <button class="btn-copy" @click="handleCopyEncoded">
          Copy Token
        </button>
        <button class="btn-clear" @click="handleClearEncoder">
          Clear All
        </button>
      </div>

      <div v-if="encodedToken" class="encoded-output">
        <label for="encodedToken">Generated JWT Token:</label>
        <textarea
          id="encodedToken"
          v-model="encodedToken"
          readonly
          placeholder="Encoded JWT token will appear here..."
        />
      </div>
    </div>

    <!-- Security Notice -->
    <div class="security-notice">
      <strong>🔒 Privacy & Security:</strong>
      All JWT encoding and decoding is performed entirely in your browser. No data is sent to any server.
      The encoder creates unsigned tokens (alg: none) for testing purposes only.
      For production use, tokens should always be signed by a secure server.
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeJwt, encodeJwtUnsigned, getExpirationInfo, formatTimestamp } from '~/utils/jwt'

const editorStore = useEditorStore()
const { showNotification } = useNotification()
const { copyToClipboard } = useClipboard()

// Decoder state
const token = computed({
  get: () => editorStore.jwt.token,
  set: (value) => {
    editorStore.jwt.token = value
  }
})

const header = computed(() => editorStore.jwt.header)
const payload = computed(() => editorStore.jwt.payload)
const signature = computed(() => editorStore.jwt.signature)
const isValid = computed(() => editorStore.jwt.isValid)
const error = computed(() => editorStore.jwt.error)

// Encoder state
const encodeHeader = ref('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
const encodePayload = ref('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
const encodedToken = ref('')

// Token information
const tokenInfo = computed(() => {
  if (!isValid.value || !payload.value) return null

  try {
    const payloadObj = JSON.parse(payload.value)
    const headerObj = JSON.parse(header.value)

    return {
      algorithm: headerObj.alg || 'Unknown',
      type: headerObj.typ || 'JWT',
      issuer: payloadObj.iss || null,
      subject: payloadObj.sub || null,
      audience: payloadObj.aud || null,
      issuedAt: payloadObj.iat ? formatTimestamp(payloadObj.iat) : null,
      expiresAt: payloadObj.exp ? formatTimestamp(payloadObj.exp) : null,
      expirationStatus: payloadObj.exp ? getExpirationInfo(payloadObj) : null,
      isExpired: payloadObj.exp ? payloadObj.exp * 1000 < Date.now() : false
    }
  } catch {
    return null
  }
})

const handleDecode = () => {
  if (!token.value.trim()) {
    showNotification({ message: 'Please enter a JWT token!', color: '#ef4444' })
    return
  }

  try {
    const decoded = decodeJwt(token.value)
    editorStore.updateJwt(
      token.value,
      decoded.header,
      decoded.payload,
      decoded.signature,
      decoded.isValid,
      decoded.error
    )

    if (decoded.isValid) {
      showNotification({ message: 'JWT decoded successfully!', color: '#10b981' })
    } else {
      showNotification({ message: 'Invalid JWT: ' + decoded.error, color: '#ef4444' })
    }
  } catch (err) {
    showNotification({ message: 'Error decoding JWT: ' + (err as Error).message, color: '#ef4444' })
  }
}

const handleCopyToken = () => {
  copyToClipboard(token.value)
}

const handleClearDecoder = () => {
  editorStore.clearJwt()
  showNotification({ message: 'Cleared all fields!', color: '#10b981' })
}

const handleEncode = () => {
  if (!encodeHeader.value.trim() || !encodePayload.value.trim()) {
    showNotification({ message: 'Please provide both header and payload JSON!', color: '#ef4444' })
    return
  }

  try {
    const encoded = encodeJwtUnsigned(encodeHeader.value, encodePayload.value)
    encodedToken.value = encoded
    showNotification({ message: 'JWT encoded successfully!', color: '#10b981' })
  } catch (err) {
    showNotification({ message: (err as Error).message, color: '#ef4444' })
  }
}

const handleCopyEncoded = () => {
  if (!encodedToken.value) {
    showNotification({ message: 'No token to copy! Please encode first.', color: '#ef4444' })
    return
  }
  copyToClipboard(encodedToken.value)
}

const handleClearEncoder = () => {
  encodeHeader.value = '{\n  "alg": "HS256",\n  "typ": "JWT"\n}'
  encodePayload.value = '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}'
  encodedToken.value = ''
  showNotification({ message: 'Cleared all fields!', color: '#10b981' })
}

// Handle keyboard shortcuts
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (editorStore.currentTab !== 'jwt') return

    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      handleClearDecoder()
      handleClearEncoder()
    }
  }

  document.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.jwt-editor {
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
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.section-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
  line-height: 1.6;
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

textarea,
input[type="text"] {
  width: 100%;
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

textarea {
  min-height: 150px;
}

.token-input {
  min-height: 120px;
}

textarea:focus,
input[type="text"]:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

textarea::placeholder,
input[type="text"]::placeholder {
  color: var(--text-muted);
}

.divider {
  border: none;
  border-top: 2px solid var(--border);
  margin: 2.5rem 0;
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

.error-box {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1.5px solid #ef4444;
  border-radius: var(--radius-lg);
  color: #ef4444;
  margin: 1.5rem 0;
  font-size: 0.9375rem;
}

.decoded-sections {
  margin-top: 1.5rem;
}

.decoded-section {
  margin-bottom: 1.5rem;
}

.encode-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.encoded-output {
  margin-top: 1.5rem;
}

.encoded-output textarea {
  min-height: 120px;
}

.token-info {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-body);
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--border);
}

.token-info h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 700;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--card-bg);
  border-radius: var(--radius);
  transition: var(--transition);
}

.info-item:hover {
  background: var(--border);
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 600;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}

.info-value.expired {
  color: #ef4444;
}

.info-value.valid {
  color: #10b981;
}

.security-notice {
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
  color: white;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-md);
  line-height: 1.6;
}

.security-notice strong {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
}

@media (max-width: 768px) {
  .button-group {
    grid-template-columns: 1fr;
  }

  textarea {
    min-height: 120px;
    font-size: 0.8125rem;
  }

  .encode-grid {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
