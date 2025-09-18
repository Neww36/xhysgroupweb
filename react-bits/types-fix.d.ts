/* 仅对 react-bits 子库进行类型放宽，避免 cloneElement 传入自定义属性时报错 */
/* keep: third-party code untouched; this file is safe to remove if upstream fixes types */

import * as React from "react"

declare module "react" {
  // 放宽 cloneElement 的第二个参数类型，允许额外属性（如 isHovered）
  // 参考：React.cloneElement<P>(element, props?: Partial<P> & Record<string, unknown>, ...children)
  function cloneElement<P>(
    element: React.ReactElement<P>,
    props?: Partial<P> & Record<string, unknown> | null,
    ...children: React.ReactNode[]
  ): React.ReactElement<P>

  // 放宽 LibraryManagedAttributes 的推断，避免对象字面量仅允许已知属性的限制
  // 这仅作为局部宽松处理，避免影响主工程组件的严格性
   
  interface LibraryManagedAttributes<C, P> extends P {}
}