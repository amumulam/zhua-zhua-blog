---
layout: page
title: 维基百科
---

<VectorLayout
  site-name="维基百科，自由的百科全书"
  page-title="维基百科"
  page-subtitle="自由的百科全书"
  last-modified="2024年1月15日 (星期一) 08:30"
  :sidebar-sections="[
    {
      heading: '导航',
      items: [
        { text: '首页', href: '/', icon: null, active: false },
        { text: '分类索引', href: '#', icon: null, active: false },
        { text: '特色内容', href: '#', icon: null, active: false },
        { text: '新闻动态', href: '#', icon: null, active: false },
        { text: '随机条目', href: '#', icon: null, active: false }
      ]
    },
    {
      heading: '帮助',
      items: [
        { text: '帮助', href: '#', icon: null, active: false },
        { text: '维基社区', href: '#', icon: null, active: false },
        { text: '方针与指引', href: '#', icon: null, active: false },
        { text: '互助客栈', href: '#', icon: null, active: false }
      ]
    },
    {
      heading: '工具',
      items: [
        { text: '链入页面', href: '#', icon: null, active: false },
        { text: '相关更改', href: '#', icon: null, active: false },
        { text: '上传文件', href: '#', icon: null, active: false },
        { text: '特殊页面', href: '#', icon: null, active: false },
        { text: '打印版本', href: '#', icon: null, active: false },
        { text: '永久链接', href: '#', icon: null, active: false }
      ]
    }
  ]"
  :toc-items="[
    { text: '概述', id: '概述', level: 2 },
    { text: '历史', id: '历史', level: 2 },
    { text: '创立', id: '创立', level: 3 },
    { text: '发展', id: '发展', level: 3 },
    { text: '特点', id: '特点', level: 2 },
    { text: '技术', id: '技术', level: 2 },
    { text: '统计', id: '统计', level: 2 },
    { text: '参见', id: '参见', level: 2 },
    { text: '参考资料', id: '参考资料', level: 2 },
    { text: '外部链接', id: '外部链接', level: 2 }
  ]"
  :page-actions="[
    { text: '阅读', href: '#', icon: null },
    { text: '编辑', href: '#', icon: null },
    { text: '查看历史', href: '#', icon: null }
  ]"
  :infobox="{
    title: '维基百科',
    rows: [
      { key: '网站类型', value: '网络百科全书' },
      { key: '创始人', value: '吉米·威尔士、拉里·桑格' },
      { key: '成立时间', value: '2001年1月15日' },
      { key: '运营方', value: '维基媒体基金会' },
      { key: '网站', value: 'wikipedia.org' },
      { key: '语言', value: '300+ 种语言' },
      { key: '许可协议', value: 'CC BY-SA 3.0' }
    ]
  }"
>

**维基百科**（英语：Wikipedia）是一个自由内容、公开编辑且多语言的网络百科全书项目，通过Wiki技术发展而来，其目标是创建一个任何人都能编辑的全球知识库。

维基百科由吉米·威尔士和拉里·桑格于2001年1月15日创立。截至2024年，维基百科已拥有超过300种语言版本，其中英文版本拥有超过600万篇文章，是全球最大的在线参考工具。

## 历史

### 创立

维基百科最初是Nupedia的补充项目。Nupedia是一个由专家撰写文章的百科全书项目，但由于其严格的同行评审流程，进展缓慢。为了加快内容创建速度，威尔士和桑格决定创建一个开放的wiki系统。

2001年1月15日，维基百科正式上线。最初只支持英语，但很快就有其他语言版本加入。

### 发展

<CdxTable 
  caption="维基百科发展里程碑"
  :hide-caption="true"
  :columns="[{ id: 'year', label: '年份' }, { id: 'event', label: '事件' }]"
  :data="[
    { year: '2001', event: '维基百科上线' },
    { year: '2002', event: '中文维基百科成立' },
    { year: '2003', event: '维基媒体基金会成立' },
    { year: '2004', event: '文章数量突破100万' },
    { year: '2006', event: '英文维基百科文章数量达到150万' },
    { year: '2015', event: '英文维基百科文章数量达到500万' },
    { year: '2020', event: '英文维基百科文章数量达到600万' }
  ]"
/>

## 特点

维基百科的主要特点包括：

<div class="wikimedia-card-group">

<CdxCard>
  <template #title>自由内容</template>
  <template #description>所有内容均在自由许可证下发布，任何人都可以使用、修改和分发。</template>
</CdxCard>

<CdxCard>
  <template #title>开放编辑</template>
  <template #description>任何人都可以编辑大多数文章，无需注册账户。</template>
</CdxCard>

<CdxCard>
  <template #title>多语言</template>
  <template #description>支持超过300种语言版本，覆盖全球大部分地区。</template>
</CdxCard>

<CdxCard>
  <template #title>非营利</template>
  <template #description>由维基媒体基金会运营，依靠捐款维持运营。</template>
</CdxCard>

</div>

## 技术

维基百科使用以下技术：

- **MediaWiki** - 核心Wiki引擎，开源软件
- **PHP** - 服务端编程语言
- **MySQL/MariaDB** - 数据库系统
- **Lua** - 模板脚本语言，用于复杂模板
- **JavaScript** - 前端交互功能
- **Apache/Nginx** - Web服务器

## 统计

<CdxTable 
  caption="主要语言版本统计"
  :hide-caption="false"
  :columns="[
    { id: 'language', label: '语言' },
    { id: 'articles', label: '文章数量' },
    { id: 'edits', label: '编辑次数' },
    { id: 'admins', label: '管理员' }
  ]"
  :data="[
    { language: '英语', articles: '6,700,000+', edits: '1,200,000,000+', admins: '850+' },
    { language: '中文', articles: '1,400,000+', edits: '76,000,000+', admins: '80+' },
    { language: '西班牙语', articles: '1,900,000+', edits: '140,000,000+', admins: '150+' },
    { language: '日语', articles: '1,400,000+', edits: '85,000,000+', admins: '60+' },
    { language: '德语', articles: '2,800,000+', edits: '200,000,000+', admins: '180+' }
  ]"
/>

## 参见

- **维基词典** - 多语言词典和词库
- **维基文库** - 自由内容图书馆
- **维基共享资源** - 自由媒体文件库
- **维基数据** - 自由知识库
- **维基教科书** - 自由教科书和手册

## 参考资料

1. Wikipedia:About. Wikipedia. [2024-01-15].
2. History of Wikipedia. Wikipedia. [2024-01-15].
3. Wikimedia Foundation. Wikimedia Foundation. [2024-01-15].

## 外部链接

<p>
  <CdxButton action="progressive" weight="primary" url="https://www.wikipedia.org">
    访问维基百科
  </CdxButton>
</p>

</VectorLayout>
