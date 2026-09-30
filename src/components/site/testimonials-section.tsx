"use client";

import { Quote, Star } from "lucide-react";

import { Container, Section } from "@/components/site/layout-primitives";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { testimonials } from "@/content/site-content";

const accentStyles = {
  forest: "bg-forest-900/6 text-forest-700",
  terracotta: "bg-terracotta-100 text-terracotta-700",
  teal: "bg-sand-200 text-forest-700",
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .slice(-2)
    .map((part) => part[0])
    .join("");
}

function CarouselControls() {
  // Reading scroll state straight from the carousel context avoids mirroring
  // it into component state, which would force an extra render on every move.
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  const controlClass =
    "grid size-11 place-items-center rounded-full border border-border bg-card text-ink-muted transition-colors hover:border-forest-600/30 hover:text-forest-800 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous testimonial"
        className={controlClass}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <p className="text-sm text-ink-faint">
        Swipe or use the arrows — {testimonials.length} stories
      </p>

      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next testimonial"
        className={controlClass}
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <Section id="testimonials" edge="sand" spacing="default">
      <Container>
        <SectionHeading
          eyebrow="In their words"
          title="What changes, in practice"
          description="We would rather show you the work than describe it. These are the words of the people and organisations who have sat in the room."
        />

        <Carousel
          opts={{ align: "start", loop: true }}
          aria-label="Testimonials"
          className="mt-12 sm:mt-14"
        >
          <CarouselContent className="-ml-4 sm:-ml-5">
            {testimonials.map((item) => (
              <CarouselItem
                key={item.name}
                className="pl-4 sm:basis-1/2 sm:pl-5 lg:basis-1/3"
              >
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card/90 p-6 shadow-float sm:p-7">
                  <div className="flex items-center justify-between">
                    <Quote
                      aria-hidden
                      className="size-7 text-terracotta-300"
                      strokeWidth={1.5}
                    />
                    <div className="flex gap-0.5" aria-label="Rated 5 out of 5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          aria-hidden
                          className="size-3.5 fill-terracotta-500 text-terracotta-500"
                        />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-pretty text-ink">
                    {item.quote}
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3.5 border-t border-border pt-5">
                    <span
                      aria-hidden
                      className={`grid size-11 shrink-0 place-items-center rounded-full font-heading text-sm font-semibold ${accentStyles[item.accent]}`}
                    >
                      {initials(item.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-forest-900">
                        {item.name}
                      </span>
                      <span className="block truncate text-xs text-ink-muted">
                        {item.role} · {item.org}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselControls />
        </Carousel>
      </Container>
    </Section>
  );
}
