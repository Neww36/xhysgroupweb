import { useEffect, useState } from 'react';

/**
 * usePrefersReducedMotion
 * 统一检测并订阅用户的“减少动效”系统偏好。
 * - SSR 安全：在无 window 环境返回 false（不减少），以便客户端再水合时纠正。
 * - 事件订阅：监听 media query 变化，自动更新。
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(!!mql.matches);
    apply();
    try {
      mql.addEventListener('change', apply);
      return () => mql.removeEventListener('change', apply);
    } catch {
      // Safari < 14 fallback
      // @ts-ignore
      mql.addListener?.(apply);
      return () => {
        // @ts-ignore
        mql.removeListener?.(apply);
      };
    }
  }, []);

  return reduced;
}