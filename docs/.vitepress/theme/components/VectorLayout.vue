<script setup lang="ts">
import { ref, computed } from 'vue'
import { CdxButton, CdxIcon, CdxSearchInput, CdxTable } from '@wikimedia/codex'
import {
  cdxIconMenu,
  cdxIconClose,
  cdxIconEdit,
  cdxIconHistory,
  cdxIconUserAvatar,
  cdxIconBell,
  cdxIconLanguage
} from '@wikimedia/codex-icons'

const props = defineProps<{
  siteName?: string
  pageTitle: string
  pageSubtitle?: string
  lastModified?: string
  sidebarSections?: Array<{
    heading: string
    items: Array<{ text: string; href: string; icon?: any; active?: boolean }>
  }>
  tocItems?: Array<{ text: string; id: string; level: number }>
  pageActions?: Array<{ text: string; href: string; icon?: any }>
  infobox?: { title: string; rows: Array<{ key: string; value: string }> }
}>()

const sidebarCollapsed = ref(false)
const tocExpanded = ref(true)
const searchQuery = ref('')

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const toggleToc = () => {
  tocExpanded.value = !tocExpanded.value
}
</script>

<template>
  <div 
    class="vector-2022" 
    :class="{ 
      'vector-sidebar-collapsed': sidebarCollapsed,
      'vector-toc-collapsed': !tocExpanded
    }"
  >
    <!-- Header -->
    <header class="vector-header">
      <div class="vector-header-start">
        <CdxButton 
          weight="quiet" 
          :aria-label="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
          class="vector-header-button"
          @click="toggleSidebar"
        >
          <CdxIcon :icon="sidebarCollapsed ? cdxIconMenu : cdxIconClose" />
        </CdxButton>
        <a href="/" class="vector-logo">
          <span class="vector-logo-icon">W</span>
          <span class="vector-logo-text">{{ siteName || '维基百科' }}</span>
        </a>
      </div>
      
      <div class="vector-header-center">
        <CdxSearchInput
          v-model="searchQuery"
          placeholder="搜索维基百科"
          :clearable="true"
          class="vector-search"
        />
      </div>
      
      <div class="vector-header-end">
        <CdxButton weight="quiet" class="vector-header-button">
          <CdxIcon :icon="cdxIconLanguage" />
          <span class="vector-header-button-text">中文</span>
        </CdxButton>
        <CdxButton weight="quiet" class="vector-header-button">
          <CdxIcon :icon="cdxIconBell" />
        </CdxButton>
        <CdxButton weight="quiet" class="vector-header-button">
          <CdxIcon :icon="cdxIconUserAvatar" />
          <span class="vector-header-button-text">未登录</span>
        </CdxButton>
      </div>
    </header>

    <!-- Page Container -->
    <div class="vector-page-container">
      
      <!-- Sidebar -->
      <nav class="vector-sidebar" :class="{ 'is-collapsed': sidebarCollapsed }">
        <div class="vector-sidebar-inner">
          <template v-for="section in sidebarSections" :key="section.heading">
            <div class="vector-sidebar-section">
              <h3 class="vector-sidebar-heading">{{ section.heading }}</h3>
              <ul class="vector-sidebar-list">
                <li v-for="item in section.items" :key="item.href">
                  <a 
                    :href="item.href" 
                    class="vector-sidebar-link"
                    :class="{ 'is-active': item.active }"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </nav>

      <!-- Main Content Area -->
      <main class="vector-page-main">
        
        <!-- Page Header -->
        <header class="mw-page-header">
          <h1 class="mw-page-title">{{ pageTitle }}</h1>
          <p v-if="pageSubtitle" class="mw-page-subtitle">{{ pageSubtitle }}</p>
        </header>

        <!-- Page Tools -->
        <div class="vector-page-tools">
          <CdxButton 
            v-for="action in pageActions" 
            :key="action.text"
            weight="quiet"
            class="vector-page-tool-button"
          >
            <CdxIcon v-if="action.icon" :icon="action.icon" />
            {{ action.text }}
          </CdxButton>
        </div>

        <!-- Article Content -->
        <article class="mw-parser-output">
          <!-- Infobox -->
          <div v-if="infobox" class="mw-infobox">
            <CdxTable
              :caption="infobox.title"
              :hide-caption="false"
              :columns="[{ id: 'key', label: '' }, { id: 'value', label: '' }]"
              :data="infobox.rows"
            />
          </div>
          
          <!-- Slot for page content -->
          <slot></slot>
        </article>

        <!-- Footer Info -->
        <footer class="mw-footer">
          <div class="mw-categories">
            <span class="mw-categories-label">分类：</span>
            <a href="#" class="mw-category">示例分类</a>
          </div>
          <p v-if="lastModified" class="mw-last-modified">
            本页面最后修订于{{ lastModified }}
          </p>
        </footer>
      </main>

      <!-- TOC (Table of Contents) -->
      <aside v-if="tocItems && tocItems.length > 0" class="vector-toc" :class="{ 'is-collapsed': !tocExpanded }">
        <div class="vector-toc-header">
          <h2 class="vector-toc-title">目录</h2>
          <CdxButton 
            weight="quiet" 
            size="small"
            class="vector-toc-toggle"
            @click="toggleToc"
          >
            <CdxIcon :icon="tocExpanded ? cdxIconClose : cdxIconMenu" />
          </CdxButton>
        </div>
        <nav class="vector-toc-list-container">
          <ul class="vector-toc-list">
            <li 
              v-for="(item, index) in tocItems" 
              :key="index" 
              class="vector-toc-item"
              :class="`vector-toc-level-${item.level}`"
            >
              <a :href="`#${item.id}`" class="vector-toc-link">{{ item.text }}</a>
            </li>
          </ul>
        </nav>
      </aside>

    </div>
  </div>
</template>

<style>
/* ============================================
   Vector 2022 CSS Variables (Design Tokens)
   ============================================ */
.vector-2022 {
  /* Colors */
  --color-base: #202122;
  --color-subtle: #54595d;
  --color-progressive: #3366cc;
  --color-progressive--hover: #4474d4;
  --color-progressive--active: #2a4b8d;
  
  /* Background */
  --background-color-base: #ffffff;
  --background-color-interactive: #f8f9fa;
  --background-color-interactive-subtle: #eaecf0;
  --background-color-progressive-subtle: rgba(51, 102, 204, 0.1);
  
  /* Border */
  --border-color-base: #a2a9b1;
  --border-color-muted: #c8ccd1;
  
  /* Spacing (8px scale) */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Layout */
  --header-height: 56px;
  --sidebar-width: 240px;
  --toc-width: 240px;
  --content-max-width: 960px;
  
  /* Grid */
  --grid-columns: 24;
  --grid-gutter: 24px;
  --grid-margin: 24px;
  
  /* Typography */
  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-serif: 'Linux Libertine', 'Georgia', 'Times', serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;
  --font-size-h1: 32px;
  --font-size-h2: 24px;
  --font-size-h3: 20px;
  --font-size-h4: 18px;
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
}

/* ============================================
   Base Layout
   ============================================ */
.vector-2022 {
  min-height: 100vh;
  background-color: var(--background-color-base);
  color: var(--color-base);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
}

/* ============================================
   Header (56px height)
   ============================================ */
.vector-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background-color: var(--background-color-base);
  border-bottom: 1px solid var(--border-color-muted);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-md);
  z-index: 100;
  box-sizing: border-box;
}

.vector-header-start,
.vector-header-end {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.vector-header-center {
  flex: 1;
  max-width: 480px;
  min-width: 320px;
  margin: 0 var(--spacing-lg);
}

.vector-search {
  width: 100%;
}

/* Logo */
.vector-logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-base);
}

.vector-logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3366cc 0%, #2a4b8d 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.25rem;
  font-family: var(--font-family-serif);
}

.vector-logo-text {
  font-family: var(--font-family-serif);
  font-size: 1.125rem;
  font-weight: normal;
}

.vector-header-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.vector-header-button-text {
  font-size: 0.875rem;
}

/* ============================================
   Page Container (Grid Layout)
   ============================================ */
.vector-page-container {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr var(--toc-width);
  grid-template-areas: "sidebar main toc";
  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
}

.vector-sidebar-collapsed .vector-page-container {
  grid-template-columns: 0 1fr var(--toc-width);
}

.vector-toc-collapsed .vector-page-container {
  grid-template-columns: var(--sidebar-width) 1fr 0;
}

.vector-sidebar-collapsed.vector-toc-collapsed .vector-page-container {
  grid-template-columns: 0 1fr 0;
}

/* ============================================
   Sidebar (240px)
   ============================================ */
.vector-sidebar {
  grid-area: sidebar;
  position: sticky;
  top: var(--header-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--header-height));
  background-color: var(--background-color-base);
  border-right: 1px solid var(--border-color-muted);
  overflow-y: auto;
  transition: transform var(--transition-normal), width var(--transition-normal);
}

.vector-sidebar.is-collapsed {
  transform: translateX(-100%);
  width: 0;
  overflow: hidden;
}

.vector-sidebar-inner {
  padding: var(--spacing-md);
}

.vector-sidebar-section {
  margin-bottom: var(--spacing-lg);
}

.vector-sidebar-heading {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-subtle);
  margin: 0 0 var(--spacing-sm) 0;
  padding: 0 var(--spacing-sm);
}

.vector-sidebar-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.vector-sidebar-link {
  display: block;
  padding: var(--spacing-sm) var(--spacing-sm);
  color: var(--color-base);
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: background-color var(--transition-fast);
}

.vector-sidebar-link:hover {
  background-color: var(--background-color-interactive);
}

.vector-sidebar-link.is-active {
  background-color: var(--background-color-progressive-subtle);
  color: var(--color-progressive);
}

/* ============================================
   Main Content Area
   ============================================ */
.vector-page-main {
  grid-area: main;
  padding: var(--spacing-lg) var(--spacing-xl);
  max-width: var(--content-max-width);
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* Page Header */
.mw-page-header {
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color-muted);
}

.mw-page-title {
  font-family: var(--font-family-serif);
  font-size: var(--font-size-h1);
  font-weight: normal;
  margin: 0;
  color: var(--color-base);
}

.mw-page-subtitle {
  font-size: 0.875rem;
  color: var(--color-subtle);
  margin: var(--spacing-xs) 0 0 0;
}

/* Page Tools */
.vector-page-tools {
  display: flex;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color-muted);
}

.vector-page-tool-button {
  font-size: 0.875rem;
}

/* Article Content */
.mw-parser-output {
  font-family: var(--font-family-serif);
}

.mw-parser-output h2 {
  font-family: var(--font-family-serif);
  font-size: var(--font-size-h2);
  font-weight: normal;
  margin: var(--spacing-lg) 0 var(--spacing-md) 0;
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid var(--border-color-muted);
  color: var(--color-base);
}

.mw-parser-output h3 {
  font-family: var(--font-family-serif);
  font-size: var(--font-size-h3);
  font-weight: 600;
  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
  color: var(--color-base);
}

.mw-parser-output h4 {
  font-family: var(--font-family-serif);
  font-size: var(--font-size-h4);
  font-weight: 600;
  margin: var(--spacing-md) 0 var(--spacing-sm) 0;
  color: var(--color-base);
}

.mw-parser-output p {
  margin: var(--spacing-sm) 0;
}

.mw-parser-output a {
  color: var(--color-progressive);
  text-decoration: none;
}

.mw-parser-output a:hover {
  text-decoration: underline;
}

/* Infobox */
.mw-infobox {
  float: right;
  clear: right;
  width: 280px;
  margin: 0 0 var(--spacing-md) var(--spacing-lg);
  background-color: var(--background-color-interactive);
  border: 1px solid var(--border-color-base);
  border-radius: 4px;
  overflow: hidden;
}

/* Footer */
.mw-footer {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color-muted);
  font-size: 0.75rem;
  color: var(--color-subtle);
  clear: both;
}

.mw-categories {
  margin-bottom: var(--spacing-sm);
}

.mw-categories-label {
  font-weight: 600;
}

.mw-category {
  color: var(--color-progressive);
  text-decoration: none;
}

.mw-category:hover {
  text-decoration: underline;
}

/* ============================================
   TOC (240px, sticky)
   ============================================ */
.vector-toc {
  grid-area: toc;
  position: sticky;
  top: var(--header-height);
  width: var(--toc-width);
  height: calc(100vh - var(--header-height));
  background-color: var(--background-color-base);
  border-left: 1px solid var(--border-color-muted);
  overflow-y: auto;
  transition: transform var(--transition-normal), width var(--transition-normal);
}

.vector-toc.is-collapsed {
  transform: translateX(100%);
  width: 0;
  overflow: hidden;
}

.vector-toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color-muted);
}

.vector-toc-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0;
}

.vector-toc-toggle {
  flex-shrink: 0;
}

.vector-toc-list-container {
  padding: var(--spacing-sm) var(--spacing-md);
}

.vector-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.vector-toc-item {
  margin: 0;
}

.vector-toc-link {
  display: block;
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--color-progressive);
  text-decoration: none;
  font-size: 0.8125rem;
  border-left: 2px solid transparent;
  transition: all var(--transition-fast);
}

.vector-toc-link:hover {
  background-color: var(--background-color-interactive);
  border-left-color: var(--color-progressive);
}

.vector-toc-level-2 {
  padding-left: var(--spacing-sm);
}

.vector-toc-level-3 {
  padding-left: var(--spacing-md);
}

.vector-toc-level-4 {
  padding-left: var(--spacing-lg);
}

/* ============================================
   Responsive Breakpoints
   ============================================ */

/* Tablet (640px - 1024px) */
@media (max-width: 1024px) {
  .vector-page-container {
    grid-template-columns: var(--sidebar-width) 1fr 0;
    grid-template-areas: "sidebar main main";
  }
  
  .vector-toc {
    display: none;
  }
  
  .vector-toc-collapsed .vector-page-container {
    grid-template-columns: var(--sidebar-width) 1fr;
  }
}

/* Mobile (< 640px) */
@media (max-width: 640px) {
  .vector-page-container {
    grid-template-columns: 0 1fr 0;
    grid-template-areas: "main main main";
  }
  
  .vector-sidebar {
    position: fixed;
    z-index: 90;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
  
  .vector-sidebar.is-collapsed {
    transform: translateX(-100%);
  }
  
  .vector-header-center {
    min-width: auto;
    margin: 0 var(--spacing-sm);
  }
  
  .vector-header-button-text {
    display: none;
  }
  
  .vector-page-main {
    padding: var(--spacing-md);
  }
  
  .mw-infobox {
    float: none;
    width: 100%;
    margin: var(--spacing-md) 0;
  }
  
  .mw-page-title {
    font-size: 24px;
  }
}
</style>
