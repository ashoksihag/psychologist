import { ArrowRight, Check, MessageCircleHeart, ShieldCheck } from "lucide-react";

import { Container } from "@/components/site/layout-primitives";
import { SiteButton } from "@/components/site/button";
import { HeroVisual } from "@/components/site/hero-visual";
import { heroStats, siteConfig } from "@/lib/site-config";

const heroReassurances = [
  "Confidential, judgement-free",
  "Online & in-clinic",
  "No commitment first call",
] as const;

export function Hero() {
  return (
    <section
      id="top"
      data-slot="hero"
      className="relative scroll-mt-24 overflow-hidden pt-12 pb-24 sm:pt-16 lg:pt-20 lg:pb-32"
    >
      {/* Ambient background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_15%_0%,oklch(0.94_0.028_70)_0%,transparent_65%),radial-gradient(50%_45%_at_95%_20%,oklch(0.93_0.02_180)_0%,transparent_70%)]"
      />
      <span aria-hidden className="texture-grain absolute inset-0 -z-10 opacity-50" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------------------------------------------------- Copy */}
          <div className="lg:col-span-6">
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-card/70 py-1.5 pr-4 pl-2 text-xs font-medium text-ink-muted backdrop-blur-sm">
              <span className="grid size-6 place-items-center rounded-full bg-terracotta-100 text-terracotta-700">
                <ShieldCheck aria-hidden className="size-3.5" />
              </span>
              {siteConfig.credentials}
            </p>

            <h1 className="text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.025em] text-balance sm:text-[3.25rem] lg:text-[3.75rem]">
              A safe space to{" "}
              <span className="relative inline-block text-forest-700">
                understand
                <svg
                  aria-hidden
                  viewBox="0 0 220 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-terracotta-300"
                >
                  <path
                    d="M2 8.5C48 3 160 1.5 218 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              , connect and grow.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">
              Every conversation matters. Every connection heals.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-ink-muted">
              Clinical psychology for individuals and families, school
              counselling, and confidential workplace wellbeing — held to RCI
              standards and to your right to privacy.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
              {heroReassurances.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-ink"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-forest-900/8">
                    <Check aria-hidden className="size-3 text-forest-800" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SiteButton
                size="lg"
                render={<a href="#consultation" />}
                className="group"
              >
                Book a Consultation
                <ArrowRight
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </SiteButton>

              <SiteButton
                size="lg"
                variant="outline"
                render={<a href="#pathways" />}
              >
                See how we work
              </SiteButton>
            </div>

            <p className="mt-6 text-sm text-ink-faint">
              Prefer to talk first?{" "}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-medium text-forest-700 underline underline-offset-4 decoration-terracotta-300 decoration-2 transition-colors hover:decoration-terracotta-600"
              >
                Call {siteConfig.contact.phone}
              </a>
            </p>
          </div>

          {/* ------------------------------------------------- Visual */}
          <div className="lg:col-span-6">
            <div className="relative">
              <HeroVisual />

              {/* Floating "not sure where to begin" widget */}
              <div className="absolute -bottom-8 left-0 w-[min(20rem,88%)] sm:-bottom-10 sm:left-2 lg:-left-8">
                <div className="rounded-2xl border border-border bg-card/95 p-5 shadow-float backdrop-blur-md sm:p-6">
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-terracotta-100 text-terracotta-700">
                      <MessageCircleHeart aria-hidden className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-heading text-base leading-snug font-semibold text-forest-900 sm:text-lg">
                        Not sure where to begin? Let&rsquo;s talk first.
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                        A free 15-minute call. No forms, no commitment — just a
                        conversation.
                      </p>
                    </div>
                  </div>
                  <SiteButton
                    size="md"
                    className="mt-4 w-full"
                    render={<a href="#consultation" />}
                  >
                    Book Free Call
                    <ArrowRight aria-hidden />
                  </SiteButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ Stats bar */}
        <div className="mt-24 sm:mt-28 lg:mt-36">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-float lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-card/90 px-5 py-6 text-center backdrop-blur-sm sm:py-7"
              >
                <span className="font-heading text-2xl font-semibold tracking-[-0.02em] text-forest-800 sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-[0.8rem] leading-snug text-ink-muted sm:text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
