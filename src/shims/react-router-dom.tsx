import Link from "next/link"
import type { ComponentProps } from "react"

// 这个 shim 仅提供最小的 Link 兼容层，供依赖 react-router-dom 的地方在 Next 中运行
export { Link as RouterLink }

// 使用 next/link 的 Props 作为基准，支持同时接收 to/href
type BaseProps = ComponentProps<typeof Link>
export type LinkShimProps = Omit<BaseProps, "href"> & {
  href?: BaseProps["href"]
  to?: BaseProps["href"]
}

export const LinkShim = ({ to, href, ...rest }: LinkShimProps) => {
  // 统一映射到 Next 的 href；保留字符串默认值兼容
  const finalHref = (href ?? to ?? "#") as BaseProps["href"]
  return <Link href={finalHref} {...rest} />
}

export default LinkShim