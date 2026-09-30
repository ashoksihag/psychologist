import { ArrowRight, Building2, Check, GraduationCap, Quote } from "lucide-react";

import { Container, Section } from "@/components/site/layout-primitives";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/button";
import { corporatePillars, engagementTiers } from "@/content/site-content";

const schoolsIncludes = [
  "Weekly on-campus counselling hours",
  "Confidentiality and safeguarding policy, co-signed",
  "Student, parent and teacher sessions",
  "Anonymous utilisation reporting each term",
] as const;

export function CorporateSection() {
  return (
    <Section id="workplaces" edge="forest" spacing="default" className="overflow-hidden">
      {/* Ambient depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_20%_0%,oklch(0.4_0.05_175_/_0.55)_0%,transparent_70%),radial-gradient(45%_40%_at_95%_10%,oklch(0.58_0.09_45_/_0.28)_0%,transparent_70%)]"
      />
      <span aria-hidden className="texture-grain absolute inset-0 opacity-40" />

      <Container className="relative">
        <SectionHeading
          tone="light"
          eyebrow="For organisations"
          title="Mental health infrastructure, not a one-off seminar"
          description="A single workshop changes an afternoon. What an organisation actually needs is a clinician it can call, training it can evidence, and reporting it can act on."
        />

        {/* Pillars */}
        <ul className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {corporatePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <li
                key={pillar.title}
                className="rounded-2xl border border-cream/12 bg-cream/5 p-6 backdrop-blur-sm transition-colors hover:border-cream/25 hover:bg-cream/8 sm:p-7"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-terracotta-500/15 text-terracotta-300 ring-1 ring-terracotta-300/25">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold text-cream">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-pretty text-cream/70">
                  {pillar.body}
                </p>
              </li>
            );
          })}
        </ul>

        {/* Engagement models */}
        <div className="mt-20 lg:mt-24">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-terracotta-300 uppercase">
              Engagement models
            </p>
            <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.015em] text-balance text-cream sm:text-3xl">
              Start where the need is sharpest. Scale when it is proven.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-pretty text-cream/70">
              Every engagement is scoped after a free discovery call. Pricing
              below reflects structure, not a fixed fee — travel, cohort size
              and duration are confirmed in writing before anything begins.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {engagementTiers.map((tier) => (
              <div
                key={tier.name}
                className={[
                  "relative flex flex-col rounded-2xl p-6 sm:p-7",
                  tier.highlighted
                    ? "border border-terracotta-300/40 bg-cream text-forest-900 shadow-lift lg:-my-3 lg:py-10"
                    : "border border-cream/12 bg-cream/5 backdrop-blur-sm",
                ].join(" ")}
              >
                {tier.badge ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-terracotta-600 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-cream uppercase">
                    {tier.badge}
                  </span>
                ) : null}

                <h4
                  className={[
                    "font-heading text-xl font-semibold",
                    tier.highlighted ? "text-forest-900" : "text-cream",
                  ].join(" ")}
                >
                  {tier.name}
                </h4>

                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={[
                      "font-heading text-3xl font-semibold tracking-[-0.02em]",
                      tier.highlighted ? "text-forest-800" : "text-terracotta-300",
                    ].join(" ")}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={[
                      "text-xs",
                      tier.highlighted ? "text-ink-muted" : "text-cream/55",
                    ].join(" ")}
                  >
                    {tier.priceNote}
                  </span>
                </div>

                <p
                  className={[
                    "mt-4 text-[0.95rem] leading-relaxed text-pretty",
                    tier.highlighted ? "text-ink-muted" : "text-cream/70",
                  ].join(" ")}
                >
                  {tier.summary}
                </p>

                <ul
                  className={[
                    "mt-6 flex flex-col gap-3 border-t pt-6",
                    tier.highlighted
                      ? "border-forest-900/12"
                      : "border-cream/12",
                  ].join(" ")}
                >
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-relaxed"
                    >
                      <Check
                        aria-hidden
                        className={[
                          "mt-0.5 size-4 shrink-0",
                          tier.highlighted
                            ? "text-terracotta-600"
                            : "text-terracotta-300",
                        ].join(" ")}
                      />
                      <span
                        className={
                          tier.highlighted ? "text-ink" : "text-cream/80"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Absorbs the slack so every tier's CTA lands on the same
                    baseline — the cards are equal height but their feature
                    lists differ in length. */}
                <div aria-hidden className="mt-7 grow" />

                <SiteButton
                  size="md"
                  variant={tier.highlighted ? "primary" : "outline"}
                  className={[
                    "w-full",
                    !tier.highlighted &&
                      "border-cream/25 bg-cream/5 text-cream hover:border-cream/40 hover:bg-cream/10 hover:text-cream",
                  ].join(" ")}
                  render={<a href="#consultation" />}
                >
                  Request a proposal
                  <ArrowRight aria-hidden />
                </SiteButton>
              </div>
            ))}
          </div>
        </div>

        {/* Schools track */}
        <div
          id="schools"
          className="mt-20 scroll-mt-28 overflow-hidden rounded-3xl border border-cream/12 bg-cream/5 backdrop-blur-sm lg:mt-24"
        >
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-cream/12 p-7 sm:p-9 lg:col-span-7 lg:border-r lg:border-b-0 lg:p-10">
              <span className="grid size-12 place-items-center rounded-xl bg-terracotta-500/15 text-terracotta-300 ring-1 ring-terracotta-300/25">
                <GraduationCap aria-hidden className="size-5" />
              </span>
              <h3 className="mt-5 font-heading text-2xl leading-tight font-semibold tracking-[-0.015em] text-balance text-cream sm:text-3xl">
                For schools: a counsellor on campus, not a referral list
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-cream/70">
                Access is the single biggest predictor of whether a student
                actually gets help. When a counsellor is physically present,
                asking for support stops being an event and becomes an
                ordinary thing a student does.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {schoolsIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-cream/80"
                  >
                    <Check
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-terracotta-300"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center gap-6 p-7 sm:p-9 lg:col-span-5 lg:p-10">
              <div>
                <Quote aria-hidden className="size-7 text-terracotta-300/50" />
                <blockquote className="mt-4 text-lg leading-relaxed text-pretty text-cream/85">
                  “Having the counsellor physically on campus changed how the
                  students behaved around her. It removed the stigma
                  entirely.”
                </blockquote>
                <p className="mt-4 text-sm text-cream/55">
                  Dr. Meera Iyer — School Counsellor Lead
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <SiteButton
                  size="md"
                  variant="inverted"
                  className="w-full sm:w-auto"
                  render={<a href="#consultation" />}
                >
                  <Building2 aria-hidden />
                  Request a school proposal
                </SiteButton>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
