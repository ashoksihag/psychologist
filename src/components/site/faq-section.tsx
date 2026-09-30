import { MessageCircleQuestion } from "lucide-react";

import { Container, Section } from "@/components/site/layout-primitives";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/site-content";
import { siteConfig } from "@/lib/site-config";

export function FaqSection() {
  return (
    <Section id="faqs" edge="white" spacing="default">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              align="left"
              eyebrow="Good questions"
              title="Frequently asked"
              description="The things people hesitate to ask on a first call. If yours is not here, just ask it directly — it is never a silly question."
              className="lg:sticky lg:top-32"
            >
              <SiteButton
                size="md"
                variant="outline"
                className="mt-8"
                render={<a href="#consultation" />}
              >
                <MessageCircleQuestion aria-hidden />
                Ask us directly
              </SiteButton>
              <p className="mt-4 text-sm text-ink-faint">
                Or call{" "}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="font-medium text-forest-700 underline underline-offset-4"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
            </SectionHeading>
          </div>

          <div className="lg:col-span-8">
            <Accordion
              defaultValue={[0]}
              className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/70"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={String(index)}
                  className="px-5 not-last:border-b-0 sm:px-7"
                >
                  <AccordionTrigger className="py-5 text-[0.95rem] leading-snug font-semibold text-forest-900 hover:no-underline sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-pretty text-ink-muted">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
