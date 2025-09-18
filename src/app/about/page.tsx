"use client"

import { useEffect } from "react"

export default function AboutPage() {
  // 动效：IntersectionObserver 渐显 + 下滑过渡
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-animate]"))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.classList.add("opacity-100", "translate-y-0")
            el.classList.remove("opacity-0", "translate-y-6")
          }
        })
      },
      { root: null, threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    )

    elements.forEach((el, i) => {
      const delay = Number(el.dataset.delay || 0)
      el.style.transitionDelay = `${delay}ms`
      obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  // SEO: 结构化数据（Organization）
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "星炬耀森",
    url: siteUrl ? `${siteUrl}/about` : undefined,
    logo: siteUrl ? `${siteUrl}/vercel.svg` : undefined,
    description:
      "我们专注于企业级 AI 解决方案，注重从技术到业务价值的端到端交付，打造务实可落地的智能化能力。",
  }

  const milestones = [
    { title: "团队成立", desc: "核心成员来自 AI、全栈与增长领域，确立“价值落地优先”的产品工程方法。" },
    { title: "方案打磨", desc: "在教育培训与直播电商场景试点，沉淀 AI 直播辅助、智能获客等可复制方案。" },
    { title: "业务规模化", desc: "以更稳定的工程体系与更快的交付节奏，帮助多行业客户实现可衡量的业务增长。" },
  ]

  const members = [
    { name: "Alex", role: "AI 方案架构", highlight: "大型语言模型与检索增强落地，擅长需求抽象与系统集成" },
    { name: "Ivy", role: "全栈工程", highlight: "Next.js / Node / 数据工程，追求工程质量与交付效率" },
    { name: "Leo", role: "增长与运营", highlight: "数据驱动的增长实验，兼顾品牌叙事与效果转化" },
  ]

  return (
    <main className="relative min-h-svh w-full bg-black text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(76,29,149,0.18),rgba(2,6,23,0.92)_60%)]" />

      {/* 顶部介绍 */}
      <section aria-labelledby="about-hero-title" className="relative z-10 px-6 pt-10 pb-6 md:pt-14 md:pb-8">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-3xl" data-animate data-delay="0">
            <h1 id="about-hero-title" className="text-3xl md:text-5xl font-semibold tracking-tight opacity-0 translate-y-6 transition-all duration-700 ease-out will-change-transform">
              关于我们
            </h1>
            <p className="mt-3 text-white/70 opacity-0 translate-y-6 transition-all duration-700 ease-out will-change-transform" data-animate data-delay="120">
              我们专注于企业级 AI 解决方案，注重从技术到业务价值的端到端交付，打造务实可落地的智能化能力。
            </p>
          </header>
        </div>

        {/* 二级导航锚点菜单 */}
        <nav aria-label="关于我们二级导航" className="mt-6 sticky top-14 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/30 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-1">
            <ul className="flex flex-wrap gap-1 md:gap-2 py-2 text-sm md:text-base">
              {[
                { id: "who", label: "我们是谁" },
                { id: "how", label: "我们的工作方式" },
                { id: "why", label: "为何选择我们" },
                { id: "recognition", label: "社会认可与案例" },
              ].map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10 transition-colors"
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById(item.id)
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
                    }}
                  >
                    <span className="opacity-80">{String(idx + 1).padStart(2, "0")}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </section>

      {/* 内容块 */}
      <section aria-labelledby="about-content" className="relative z-10 px-6 pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 我们是谁 */}
          <article id="who" aria-labelledby="who-title" className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 scroll-mt-32">
            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 mb-4" />
            <h2 id="who-title" className="text-xl md:text-2xl font-semibold opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="0">
              我们是谁
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="100">
              我们是一支融合技术热情、市场洞察与商业智慧的多元化团队。团队成员涵盖人工智能算法研究、全栈开发、增长运营及项目管理等领域，确保从技术实现到商业落地的无缝衔接。
            </p>
          </article>

          {/* 我们的工作方式 */}
          <article id="how" aria-labelledby="how-title" className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 scroll-mt-32">
            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 mb-4" />
            <h2 id="how-title" className="text-xl md:text-2xl font-semibold opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="0">
              我们的工作方式
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="100">
              我们秉持'敏捷共创'的工作理念。通过高效的内部协作与透明的沟通机制，我们能快速理解客户需求，并像内部开发团队一样迅速响应，确保每个项目精准实施，直击业务核心。
            </p>
          </article>

          {/* 为何选择我们 */}
          <article id="why" aria-labelledby="why-title" className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 scroll-mt-32">
            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 mb-4" />
            <h2 id="why-title" className="text-xl md:text-2xl font-semibold opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="0">
              为何选择我们
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="100">
              相比大型机构，我们提供的不只是技术方案，更是深度的专注与灵活的协作。您将直接与我们的核心团队成员沟通，避免层层外包带来的信息偏差，确保决策高效、成果优质。
            </p>
          </article>

          {/* 社会认可与案例（不透露敏感信息） */}
          <article id="recognition" aria-labelledby="recognition-title" className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 scroll-mt-32">
            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-amber-500 via-fuchsia-500 to-sky-500 mb-4" />
            <h2 id="recognition-title" className="text-xl md:text-2xl font-semibold opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="0">
              社会认可与案例
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="100">
              我们的技术能力已成功为直播电商、教育培训等领域的合作伙伴提供了包括AI直播辅助、智能获客等解决方案，并帮助他们实现了显著的业务增长。
            </p>
          </article>
        </div>
      </section>

      {/* 团队时间线 / 成员亮点 */}
      <section aria-labelledby="team-section-title" className="relative z-10 px-6 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 时间线 */}
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 mb-4" />
            <h2 id="team-section-title" className="text-xl md:text-2xl font-semibold opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="0">
              团队时间线
            </h2>
            <ol className="mt-4 relative border-l border-white/10 pl-4">
              {milestones.map((m, i) => (
                <li key={i} className="mb-6 last:mb-0">
                  <div
                    className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-500"
                    aria-hidden
                  />
                  <div
                    className="opacity-0 translate-y-6 transition-all duration-700 ease-out"
                    data-animate
                    data-delay={`${100 + i * 120}`}
                  >
                    <div className="font-medium">{m.title}</div>
                    <p className="mt-1 text-white/70 leading-relaxed">{m.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          {/* 成员亮点 */}
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-sky-500 via-emerald-500 to-violet-500 mb-4" />
            <h2 className="text-xl md:text-2xl font-semibold opacity-0 translate-y-6 transition-all duration-700 ease-out" data-animate data-delay="0">
              成员亮点
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {members.map((p, i) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 opacity-0 translate-y-6 transition-all duration-700 ease-out"
                  data-animate
                  data-delay={`${100 + i * 120}`}
                >
                  <div className="text-base font-medium">{p.name}</div>
                  <div className="text-sm text-white/60">{p.role}</div>
                  <p className="mt-2 text-white/70 leading-relaxed">{p.highlight}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* JSON-LD 结构化数据 */}
      <script suppressHydrationWarning type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}