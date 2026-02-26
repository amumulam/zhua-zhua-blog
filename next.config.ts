import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出支持（GitHub Pages）
  output: process.env.EXPORT ? 'export' : undefined,
  
  // Base Path（GitHub Pages 需要）
  basePath: process.env.GITHUB_PAGES ? '/zhua-zhua-blog' : '',
  assetPrefix: process.env.GITHUB_PAGES ? '/zhua-zhua-blog/' : undefined,
  
  // 图片优化（静态导出需要禁用）
  images: {
    unoptimized: !!process.env.EXPORT,
  },
};

export default nextConfig;
