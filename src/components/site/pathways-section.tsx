"use client";

import { ArrowRight, Check, MessageCircleHeart } from "lucide-react";

import { Container, Section } from "@/components/site/layout-primitives";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pathways, type PathwayId } from "@/content/pathways";

const tabIcons: Record<PathwayId, string> = {
  self: "01",
  family: "02",
  school: "03",
  workplace: "04",
};

export function PathwaysSection() {
  return (
    <Section id="pathways" edge="white" spacing="default">
      <Container>
        <SectionHeading
          eyebrow="Find your starting point"
          title="How can Manmitra support you?"
          description="Most people arrive unsure which door to knock on. Choose the one that sounds closest — you can change it later, and there is no wrong answer."
        />

        <Tabs
          defaultValue={0}
          className="mt-12 gap-8 sm:mt-14"
          // TabsList renders below TabsContent in the DOM; source order still
          // puts the triggers first so keyboard and screen-reader order is right.
        >
          {/* Mobile: horizontally scrollable pills. md+: single-row grid. */}
          <TabsList
            variant="default"
            aria-label="Who is seeking support"
            // `h-auto!` is load-bearing: TabsList ships
            // `group-data-horizontal/tabs:h-8`, and tailwind-merge treats that
            // variant-prefixed utility as a different group from a plain
            // `h-auto`, so both are emitted and the fixed 32px wins on source
            // order. The important flag is what actually lets the list grow to
            // its 56px triggers.
            className="flex h-auto! w-full flex-nowrap gap-2 overflow-x-auto rounded-full border border-border bg-sand-100 p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible"
          >
            {pathways.map((pathway, index) => (
              <TabsTrigger
                key={pathway.id}
                value={index}
                className="h-auto min-w-max gap-0.5 rounded-full border-0 px-4 py-3 text-left transition-all after:hidden md:min-w-0 md:px-5 md:py-4"
              >
                <span
                  aria-hidden
                  className="font-mono text-[0.65rem] font-medium tracking-widest text-current opacity-45"
                >
                  {tabIcons[pathway.id]}
                </span>
                <span className="text-[0.95rem] font-semibold whitespace-nowrap md:text-base">
                  {pathway.tab}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {pathways.map((pathway, index) => (
            <TabsContent
              key={pathway.id}
              value={index}
              className="rounded-3xl border border-border bg-background p-6 shadow-float sm:p-8 lg:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <h3 className="font-heading text-2xl leading-tight font-semibold tracking-[-0.015em] text-balance sm:text-[1.75rem]">
                    {pathway.heading}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-pretty text-ink-muted">
                    {pathway.blurb}
                  </p>

                  <div className="mt-7 rounded-2xl border border-terracotta-300/45 bg-terracotta-100/45 p-5">
                    <p className="flex items-center gap-2 font-heading text-sm font-semibold text-forest-900">
                      <MessageCircleHeart aria-hidden className="size-4 text-terracotta-700" />
                      {pathway.cta.label}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {pathway.cta.note}
                    </p>
                    <SiteButton
                      size="md"
                      className="mt-4 w-full"
                      render={<a href={pathway.cta.href} />}
                    >
                      {pathway.cta.label}
                      <ArrowRight aria-hidden />
                    </SiteButton>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {pathway.services.map((service) => (
                      <li
                        key={service.title}
                        className="group rounded-2xl border border-border bg-card/70 p-5 transition-colors hover:border-forest-600/30 hover:bg-card"
                      >
                        <p className="flex items-start gap-2.5 font-heading text-base font-semibold text-forest-900">
                          <Check
                            aria-hidden
                            className="mt-0.5 size-4 shrink-0 text-terracotta-600"
                          />
                          {service.title}
                        </p>
                        <p className="mt-2 pl-6.5 text-sm leading-relaxed text-pretty text-ink-muted">
                          {service.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  );
}
