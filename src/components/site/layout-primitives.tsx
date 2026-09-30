import { cn } from "cn";

/** Page-width wrapper. Controls the single horizontal rhythm of the site. */
export function Container({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      data-slot="container"
      data-size={size}
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-[80rem]",
        size === "wide" && "max-w-[90rem]",
        className,
      )}
      {...props}
    />
  );
}

/** Vertical section spacing. `edge` controls the surface treatment. */
export function Section({
  className,
  edge = "cream",
  spacing = "default",
  id,
  ...props
}: React.ComponentProps<"section"> & {
  edge?: "cream" | "white" | "sand" | "forest" | "none";
  spacing?: "default" | "tight" | "loose";
}) {
  return (
    <section
      id={id}
      data-slot="section"
      data-edge={edge}
      className={cn(
        "relative scroll-mt-28",
        edge === "cream" && "bg-background",
        edge === "white" && "bg-card",
        edge === "sand" && "bg-sand-100",
        // Colour is set on the section and inherited. Descendants that need a
        // different tone set it explicitly — a blanket descendant rule here
        // would fight their own text-* utilities on equal specificity.
        edge === "forest" && "bg-forest-900 text-cream",
        spacing === "tight" && "py-14 sm:py-16",
        spacing === "default" && "py-20 sm:py-24 lg:py-28",
        spacing === "loose" && "py-24 sm:py-32 lg:py-36",
        className,
      )}
      {...props}
    />
  );
}

/** Small uppercase label that sits above section headings. */
export function Eyebrow({
  className,
  tone = "terracotta",
  ...props
}: React.ComponentProps<"p"> & {
  tone?: "terracotta" | "forest" | "cream";
}) {
  return (
    <p
      data-slot="eyebrow"
      className={cn(
        "flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.18em] uppercase",
        tone === "terracotta" && "text-terracotta-700",
        tone === "forest" && "text-forest-700",
        tone === "cream" && "text-terracotta-300",
        className,
      )}
      {...props}
    />
  );
}
