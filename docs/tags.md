---
title: 标签
---

# 标签

按标签聚合的文章列表。

<CdxMessage type="notice">
  <template #default>VitePress 不内置标签系统，建议使用搜索功能查找相关内容。</template>
</CdxMessage>

## 常用标签

<CdxTable 
  caption="常用标签"
  :hide-caption="true"
  :columns="[{ id: 'tag', label: '标签' }, { id: 'desc', label: '描述' }]"
  :data="[
    { tag: '代理', desc: '网络代理配置相关' },
    { tag: 'Git', desc: 'Git 使用技巧' },
    { tag: 'MCP', desc: 'Model Context Protocol' },
    { tag: '踩坑', desc: '踩坑记录和解决方案' },
    { tag: '日记', desc: '日常记录' }
  ]"
/>
