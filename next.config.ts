import type { NextConfig } from "next"
import { resolve } from "path"

const nextConfig: NextConfig = {
  // 运行 Node 服务器以支持 API Routes 等服务端能力（避免静态导出禁用 /api/*）
  output: "standalone",
  // 关闭全局尾随斜杠，避免 /api/* 在无斜杠时被 308 重定向
  trailingSlash: false,
  // 在使用 Turbopack 的开发环境下，显式设置根目录并对齐别名
  turbopack: {
    root: resolve(__dirname),
    resolveAlias: {
      // 对齐 tsconfig.json 中的 paths 配置
      "@": resolve(__dirname, "./src"),
      // 让依赖 react-router-dom 的组件在 Next 中可用（映射到本地 shim）
      "react-router-dom": resolve(__dirname, "./src/shims/react-router-dom.tsx"),
      // 全量屏蔽 react-bits 示例，避免构建与类型扫描进入示例代码
      "react-bits": resolve(__dirname, "./react-bits/void-module.js"),
      "react-bits/src": resolve(__dirname, "./react-bits/void-module.js"),
      "react-bits/src/ts-default": resolve(__dirname, "./react-bits/void-module.js"),
      "react-bits/src/ts-tailwind": resolve(__dirname, "./react-bits/void-module.js"),
    },
  },
}

export default nextConfig
