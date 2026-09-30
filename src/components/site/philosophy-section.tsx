import { Section, Container, Eyebrow } from "@/components/site/layout-primitives";
import { SectionHeading } from "@/components/site/section-heading";
import { pillars } from "@/content/site-content";

export function PhilosophySection() {
  return (
    <Section id="about" edge="cream" spacing="default">
      <Container>
        <SectionHeading
          eyebrow="Our approach"
          title="The work, in three moves"
          description="Psychotherapy is not a technique applied to a person. It is a relationship in which understanding becomes possible, and from there, change."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <li
                key={pillar.title}
                className="group relative flex flex-col rounded-2xl border border-border bg-card/80 p-7 shadow-float transition-all duration-300 hover:-translate-y-1 hover:border-forest-600/25 hover:shadow-lift sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-13 place-items-center rounded-2xl bg-forest-900/6 text-forest-700 transition-colors duration-300 group-hover:bg-forest-900 group-hover:text-cream">
                    <Icon aria-hidden className="size-6" />
                  </span>
                  <span
                    aria-hidden
                    className="font-heading text-4xl font-semibold text-forest-900/8"
                  >
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold tracking-[-0.01em] text-forest-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-pretty text-ink-muted">
                  {pillar.body}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 rounded-2xl border border-dashed border-border bg-sand-100/60 px-6 py-6 text-center sm:px-10">
          <Eyebrow className="justify-center text-ink-faint">Our commitment</Eyebrow>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-pretty text-ink sm:text-lg">
            You are a person, not a diagnosis. We work with what is hardest
            right now, and we will always tell you honestly when something
            is outside our scope.
          </p>
        </div>
      </Container>
    </Section>
  );
}
