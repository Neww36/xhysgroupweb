import Link from "next/link"
import { Video, Megaphone, Radio, Sparkles, Wrench, Cable } from "lucide-react"
import TechnologyHighlight from "@/components/solutions/TechnologyHighlight"
import CustomerCaseStudies from "@/components/solutions/CustomerCaseStudies"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "AI 解决方案 | XJYS.AI",
  description: "AIGC 视频智能体、AI 获客系统、AI 直播代运营助手的一体化企业级解决方案。",
}

export default function SolutionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI 解决方案",
    description: "AIGC 视频智能体、AI 获客系统、AI 直播代运营助手的一体化企业级解决方案。",
    url: "https://example.com/solutions",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: "https://example.com/" },
        { "@type": "ListItem", position: 2, name: "解决方案", item: "https://example.com/solutions" },
      ],
    },
  }

  return (
    <main className="relative min-h-svh w-full bg-black text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(76,29,149,0.18),rgba(2,6,23,0.92)_60%)]" />

      {/* 顶部 Hero + 概览模块 */}
      <section aria-labelledby="solutions-hero-title" className="relative z-10 px-6 pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-3xl">
            <h1 id="solutions-hero-title" className="text-3xl md:text-5xl font-semibold tracking-tight">智能增长 · 企业级 AI 解决方案</h1>
            <p className="mt-3 text-white/70">
              聚焦三大场景：AIGC 视频智能体开发、AI 获客系统、AI 直播代运营助手，助力企业高效增长。
            </p>
          </header>

          {/* 三大模块概览 */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="#aigc" className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40">
              <article className="flex items-start gap-3">
                <div className="rounded-xl bg-white/10 p-2 text-white/90" aria-hidden>
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">AIGC 视频智能体开发</h2>
                  <p className="mt-1 text-sm text-white/70">多模态生成、4K 高清、智能编辑、API/SDK 接入。</p>
                </div>
              </article>
            </Link>
            <Link href="#leadgen" className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40">
              <article className="flex items-start gap-3">
                <div className="rounded-xl bg-white/10 p-2 text-white/90" aria-hidden>
                  <Megaphone className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">AI 获客系统</h2>
                  <p className="mt-1 text-sm text-white/70">画像构建、内容生成、多渠道投放、转化追踪。</p>
                </div>
              </article>
            </Link>
            <Link href="#liveops" className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40">
              <article className="flex items-start gap-3">
                <div className="rounded-xl bg-white/10 p-2 text-white/90" aria-hidden>
                  <Radio className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">AI 直播代运营助手</h2>
                  <p className="mt-1 text-sm text-white/70">多平台管理、AI 实时互动、虚拟场景、自动化运营。</p>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      {/* AIGC 详解 */}
      <section id="aigc" aria-labelledby="aigc-title" className="scroll-mt-24 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-6">
          <header className="lg:col-span-2">
            <h2 id="aigc-title" className="text-2xl md:text-3xl font-semibold">AIGC 视频智能体开发</h2>
            <p className="mt-2 text-white/70">面向品牌与内容团队的一体化视频智能体解决方案。</p>
            <div className="mt-4 flex gap-3">
              <Button size="lg" asChild>
                <Link href="/contact" aria-label="立即体验 AIGC 视频智能体">立即体验</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products#aigc" aria-label="了解更多 AIGC 视频智能体">了解更多</Link>
              </Button>
            </div>
          </header>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{icon:<Sparkles className="h-5 w-5" /> ,t:'多模态视频生成',d:'文本/语音/图像/视频多模态协同生成，支持脚本到视频一键生成。'},
              {icon:<Video className="h-5 w-5" /> ,t:'4K 高清输出',d:'最高 4K/60fps 输出，适配各大短视频与直播平台。'},
              {icon:<Wrench className="h-5 w-5" /> ,t:'智能编辑工具箱',d:'智能剪辑、字幕生成、背景音乐混音、换装与虚拟形象。'},
              {icon:<Cable className="h-5 w-5" /> ,t:'API/SDK 集成',d:'提供 REST/SDK，接入现有生产流程，二次开发友好。'}].map((f,i)=> (
              <article key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-white/10 p-2" aria-hidden>
                    {/* @ts-ignore - icon as ReactNode */}
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-medium">{f.t}</h3>
                    <p className="mt-1 text-sm text-white/70">{f.d}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 获客系统 */}
      <section id="leadgen" aria-labelledby="leadgen-title" className="scroll-mt-24 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <header className="max-w-3xl">
            <h2 id="leadgen-title" className="text-2xl md:text-3xl font-semibold">AI 获客系统解决方案</h2>
            <p className="mt-2 text-white/70">从用户画像到转化追踪的全链路智能增长闭环。</p>
           </header>
          {/* 流程步骤 */}
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {[{t:'用户画像构建',d:'整合一方/三方数据，构建高维特征画像。'},
              {t:'智能内容生成',d:'多模态内容自动生成与个性化改写。'},
              {t:'多渠道投放',d:'覆盖广告、私域、邮件、SMS、社媒。'},
              {t:'转化追踪',d:'转化归因与 A/B 实验，端到端优化。'}].map((s,i)=> (
              <li key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm text-white/50">Step {i+1}</div>
                <div className="mt-1 text-base font-medium">{s.t}</div>
                <p className="mt-1 text-sm text-white/70">{s.d}</p>
              </li>
            ))}
          </ol>
          {/* 价值主张 */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">获客成本 降低 30%</span>
            <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-sm text-sky-300">转化率 提升 25%</span>
            <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-sm text-fuchsia-300">投放效率 提升 2x</span>
          </div>
        </div>
      </section>

      {/* 直播助手 */}
      <section id="liveops" aria-labelledby="liveops-title" className="scroll-mt-24 px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-6">
          <header className="lg:col-span-2">
            <h2 id="liveops-title" className="text-2xl md:text-3xl font-semibold">AI 直播代运营助手</h2>
            <p className="mt-2 text-white/70">面向直播电商的智能化运营工具与虚拟场景方案。</p>
          </header>
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{t:'多平台管理',d:'主流平台账号/排期/素材统一管理。'},
              {t:'AI 实时互动',d:'弹幕理解与语音对话，自动回复与引导。'},
              {t:'虚拟直播场景',d:'虚拟人、虚拟背景、道具与镜头编排。'},
              {t:'自动化运营',d:'脚本驱动的流程与 KPI 看板指标。'}].map((f,i)=> (
              <article key={i} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
                <h3 className="text-base font-medium">{f.t}</h3>
                <p className="mt-1 text-sm text-white/70">{f.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 技术亮点 */}
      <TechnologyHighlight />

      {/* 客户案例 */}
      <CustomerCaseStudies id="cases" />

      {/* CTA 区域 */}
      <section aria-labelledby="cta-title" className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/40 via-fuchsia-900/30 to-sky-900/30 p-8 md:p-12 text-center">
          <h2 id="cta-title" className="text-2xl md:text-3xl font-semibold">开启智能增长新篇章</h2>
          <p className="mt-2 text-white/80">马上预约演示或与我们交流需求，获取定制化方案。</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/contact" aria-label="免费咨询">免费咨询</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact?type=demo" aria-label="预约演示">预约演示</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* JSON-LD 结构化数据 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}