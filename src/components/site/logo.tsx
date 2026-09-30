import { cn } from "cn";

/**
 * Manmitra mark: a lotus-like "mitra" (friend) halo cradling a leaf —
 * two figures, a conversation. Inherits `currentColor` so it adapts to
 * light and dark surfaces without a second asset.
 */
export function LogoMark({
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 40 40"
      role="img"
      aria-label="Manmitra"
      className={cn("size-9 shrink-0", className)}
      {...props}
    >
      <circle cx="20" cy="20" r="19" className="fill-current opacity-[0.08]" />
      <circle cx="20" cy="20" r="19" className="stroke-current opacity-20" strokeWidth="1" />
      <path
        d="M20 8.5c-3.4 0-6.1 2.6-6.1 5.9 0 2.3 1.3 4.3 3.2 5.3-1.4 1.6-2.4 3.7-2.6 6.1a.9.9 0 0 0 1.6.5c.9-2 2.4-3.6 3.9-4.4 1.5.8 3 2.4 3.9 4.4a.9.9 0 0 0 1.6-.5c-.2-2.4-1.2-4.5-2.6-6.1 1.9-1 3.2-3 3.2-5.3 0-3.3-2.7-5.9-6.1-5.9Z"
        className="fill-current opacity-90"
      />
      <path
        d="M20 11.2c-1.5 0-2.7 1.4-2.7 3.1s1.2 2.9 2.7 2.9 2.7-1.2 2.7-2.9-1.2-3.1-2.7-3.1Z"
        className="fill-current opacity-45"
      />
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
  ...props
}: React.ComponentProps<"div"> & {
  tone?: "dark" | "light";
  showWordmark?: boolean;
}) {
  return (
    <div
      data-slot="logo"
      className={cn("flex items-center gap-2.5", className)}
      {...props}
    >
      <LogoMark className={tone === "light" ? "text-terracotta-300" : "text-forest-800"} />
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-heading text-xl font-semibold tracking-[-0.01em]",
              tone === "light" ? "text-cream" : "text-forest-900",
            )}
          >
            Manmitra
          </span>
          <span
            className={cn(
              "mt-0.5 text-[0.6rem] font-medium tracking-[0.16em] uppercase",
              tone === "light" ? "text-cream/60" : "text-ink-faint",
            )}
          >
            Psychology &amp; Wellbeing
          </span>
        </span>
      ) : null}
    </div>
  );
}
