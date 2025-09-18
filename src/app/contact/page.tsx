"use client"

/**
 * 联系我们页面
 * - 统一配色：黑底 + 中性文字
 * - CTA 风格与 /entry 保持一致
 */

import { Button } from "@/components/ui/button";
import { SiTiktok, SiWechat } from "react-icons/si";
import { RiBookOpenLine } from "react-icons/ri";
import { FiMail } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-black text-neutral-100">
      <main className="mx-auto flex min-h-svh w-full max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          联系我们
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-white/80">
          有合作意向或产品咨询？留下您的需求，我们将在1个工作日内联系您。
        </p>
        <p className="max-w-2xl text-sm sm:text-base text-white/70">
          如有任何AI相关咨询，我们的业务人员24小时为您解答
        </p>

        {/* 联系方式卡片 */}
        <section aria-labelledby="contact-channels" className="w-full max-w-3xl">
          <h2 id="contact-channels" className="sr-only">
            联系方式列表
          </h2>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 抖音 */}
            <div className="group rounded-xl border border-white/10 bg-white/5 p-4 text-left shadow-sm ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-500/30 to-fuchsia-500/30 text-violet-200 ring-1 ring-white/10">
                  <SiTiktok aria-hidden className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-white/70">抖音</span>
                  <span className="text-base font-medium text-white">星炬AI</span>
                </div>
              </div>
            </div>

            {/* 小红书 */}
            <div className="group rounded-xl border border-white/10 bg-white/5 p-4 text-left shadow-sm ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-pink-500/30 to-rose-500/30 text-rose-200 ring-1 ring-white/10">
                  <RiBookOpenLine aria-hidden className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-white/70">小红书</span>
                  <span className="text-base font-medium text-white">星炬AI</span>
                </div>
              </div>
            </div>

            {/* 公众号 */}
            <div className="group rounded-xl border border-white/10 bg-white/5 p-4 text-left shadow-sm ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-emerald-500/30 to-cyan-500/30 text-emerald-200 ring-1 ring-white/10">
                  <SiWechat aria-hidden className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-white/70">公众号</span>
                  <span className="text-base font-medium text-white">星炬耀森</span>
                </div>
              </div>
            </div>

            {/* 官方邮箱 */}
            <a
              href="mailto:xingjuyaosenxiaoshi@xingjuai.cn"
              className="group rounded-xl border border-white/10 bg-white/5 p-4 text-left shadow-sm ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#7C3AED]/50"
              aria-label="发送邮件至 xingjuyaosenxiaoshi@xingjuai.cn"
              title="发送邮件"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-500/30 to-indigo-500/30 text-sky-200 ring-1 ring-white/10">
                  <FiMail aria-hidden className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-white/70">官方邮箱</span>
                  <span className="text-base font-medium text-white break-all">xingjuyaosenxiaoshi@xingjuai.cn</span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* CTA 区域 */}
        <div className="mt-2 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-1/2 h-11 text-base bg-gradient-to-r from-slate-600/70 to-slate-800/70 text-neutral-100 border border-slate-300/30 hover:bg-slate-600/60 hover:border-slate-200/40 transition-colors"
          >
            <a
              href="https://www.xingjuai.icu/booking"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="预约咨询"
              title="预约咨询"
            >
              预约咨询
            </a>
          </Button>

          <a
            href="mailto:xingjuyaosenxiaoshi@xingjuai.cn"
            aria-label="发送邮件至 xingjuyaosenxiaoshi@xingjuai.cn"
            className="w-full sm:w-1/2 inline-flex items-center justify-center h-11 rounded-xl font-medium text-base bg-gradient-to-r from-slate-600 to-slate-800 text-neutral-100 shadow-sm ring-1 ring-white/10 hover:brightness-[1.06] hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#7C3AED]/50 active:scale-[0.98] transition-[colors,transform,shadow]"
            title="发送邮件"
          >
            发送邮件
          </a>
        </div>

        <div className="mt-6 text-sm text-white/70">
          或访问我们的官网获取更多信息：{" "}
          <a
            className="underline underline-offset-4 hover:text-white"
            href="https://www.xingjuai.icu"
            target="_blank"
            rel="noopener noreferrer"
          >
            xingjuai.icu
          </a>
        </div>
      </main>
    </div>
  );
}