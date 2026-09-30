import { ArrowUpRight, Check } from "lucide-react";

import { Container, Section } from "@/components/site/layout-primitives";
import { SectionHeading } from "@/components/site/section-heading";
import { serviceCategories, type ServiceCategory } from "@/content/site-content";

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function ServiceCard({
  service,
}: {
  service: ServiceCategory["services"][number];
}) {
  const headingId = `service-${slug(service.title)}`;

  return (
    <article
      aria-labelledby={headingId}
      className="group flex flex-col rounded-2xl border border-border bg-card/80 p-6 shadow-float transition-all duration-300 hover:-translate-y-1 hover:border-forest-600/25 hover:shadow-lift sm:p-7"
    >
      <h4
        id={headingId}
        className="font-heading text-lg leading-snug font-semibold tracking-[-0.01em] text-balance text-forest-900"
      >
        {service.title}
      </h4>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-ink-muted">
        {service.description}
      </p>

      <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
            <Check
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-terracotta-600"
            />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#consultation"
        className="mt-6 inline-flex items-center gap-1.5 self-start rounded text-sm font-medium text-forest-700 underline-offset-4 transition-colors hover:text-terracotta-700 hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        View details
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <span className="sr-only"> for {service.title}</span>
      </a>
    </article>
  );
}

function CategoryBlock({ category }: { category: ServiceCategory }) {
  const Icon = category.icon;

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest-900/6 text-forest-700">
            <Icon aria-hidden className="size-5" />
          </span>
          <h3 className="font-heading text-2xl font-semibold tracking-[-0.015em] text-forest-900">
            {category.label}
          </h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-pretty text-ink-muted sm:text-right">
          {category.blurb}
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {category.services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <Section id="services" edge="cream" spacing="default">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Services built around real situations"
          description="Four practice areas, one standard of care. Every engagement below is delivered by a qualified psychologist — never delegated to a script."
        />

        <div className="mt-16 flex flex-col gap-16 lg:mt-20 lg:gap-20">
          {serviceCategories.map((category) => (
            <CategoryBlock key={category.id} category={category} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
