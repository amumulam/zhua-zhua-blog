import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@wikimedia/codex/dist/codex.style.css'
import '@wikimedia/codex-design-tokens/theme-wikimedia-ui.css'
import './styles/codex-theme.css'

import {
  CdxButton,
  CdxCard,
  CdxMessage,
  CdxTable,
  CdxTabs,
  CdxTab,
  CdxAccordion,
  CdxThumbnail,
  CdxIcon,
  CdxSearchInput,
  CdxTextInput,
  CdxProgressBar
} from '@wikimedia/codex'

import VectorLayout from './components/VectorLayout.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('CdxButton', CdxButton)
    app.component('CdxCard', CdxCard)
    app.component('CdxMessage', CdxMessage)
    app.component('CdxTable', CdxTable)
    app.component('CdxTabs', CdxTabs)
    app.component('CdxTab', CdxTab)
    app.component('CdxAccordion', CdxAccordion)
    app.component('CdxThumbnail', CdxThumbnail)
    app.component('CdxIcon', CdxIcon)
    app.component('CdxSearchInput', CdxSearchInput)
    app.component('CdxTextInput', CdxTextInput)
    app.component('CdxProgressBar', CdxProgressBar)
    app.component('VectorLayout', VectorLayout)
  }
} satisfies Theme
