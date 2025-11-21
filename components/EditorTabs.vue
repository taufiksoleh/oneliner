<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="tab"
      :class="{ active: currentTab === tab.value }"
      @click="switchTab(tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TabType } from '~/types/editor'

const editorStore = useEditorStore()

const tabs = [
  { label: 'HTML', value: 'html' as TabType },
  { label: 'CSS', value: 'css' as TabType },
  { label: 'JavaScript', value: 'js' as TabType },
  { label: 'JSON', value: 'json' as TabType },
  { label: 'Base64', value: 'base64' as TabType }
]

const currentTab = computed(() => editorStore.currentTab)

const switchTab = (tab: TabType) => {
  editorStore.setCurrentTab(tab)
}
</script>

<style scoped>
.tabs {
  display: inline-flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.375rem;
  background: var(--bg-body);
  border-radius: var(--radius-lg);
  border: 1.5px solid var(--border);
  flex-wrap: wrap;
}

.tab {
  padding: 0.625rem 1.5rem;
  background: transparent;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-secondary);
  transition: var(--transition);
  position: relative;
}

.tab.active {
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow-md);
}

.tab:hover:not(.active) {
  background: var(--border);
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .tabs {
    width: 100%;
    padding: 0.25rem;
  }

  .tab {
    flex: 1;
    min-width: 70px;
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
  }
}

@media (max-width: 480px) {
  .tab {
    font-size: 0.8125rem;
    padding: 0.5rem 0.625rem;
  }
}
</style>
