import { cn } from "cn";
import { Eyebrow } from "@/components/site/layout-primitives";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  /** Rendered under the description — used for CTAs, notes, legends. */
  children?: React.ReactNode;
  as?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
  children,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      data-slot="section-heading"
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          className={cn(
            "mb-4",
            align === "center" && "justify-center",
            tone === "light" && "text-terracotta-300",
          )}
        >
          <span
            aria-hidden
            className="h-px w-8 bg-current opacity-40"
          />
          {eyebrow}
        </Eyebrow>
      ) : null}

      <Heading
        className={cn(
          "text-3xl leading-[1.15] font-semibold tracking-[-0.015em] text-balance sm:text-4xl lg:text-[2.75rem]",
          tone === "light" && "text-cream",
        )}
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
            tone === "light" ? "text-cream/80" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </div>
  );
}
