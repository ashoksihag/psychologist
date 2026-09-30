import { cva, type VariantProps } from "class-variance-authority";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "cn";

/**
 * Marketing-sized wrapper around the shadcn/ui button.
 * Extends the base with comfortable touch targets (min 44px) and the
 * rounded-2xl language used across the Manmitra design system.
 */
const siteButtonVariants = cva(
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_1px_0_oklch(1_0_0/0.12)_inset,0_6px_18px_-8px_oklch(0.311_0.034_195.5/0.55)] hover:bg-forest-700 hover:shadow-[0_1px_0_oklch(1_0_0/0.12)_inset,0_10px_26px_-10px_oklch(0.311_0.034_195.5/0.6)]",
        // terracotta-700 is used as the surface (not 600) so cream label text
        // clears 4.5:1 — 600 only reaches 4.17:1, which fails AA at this size.
        accent:
          "bg-terracotta-700 text-cream shadow-[0_1px_0_oklch(1_0_0/0.16)_inset,0_6px_18px_-8px_oklch(0.5848_0.1202_45.2/0.5)] hover:bg-terracotta-600",
        outline:
          "border border-border bg-card/80 text-foreground backdrop-blur-sm hover:border-forest-600/35 hover:bg-sand-100 hover:text-foreground",
        quiet: "text-foreground hover:bg-sand-100",
        inverted:
          "bg-cream text-forest-900 shadow-[0_1px_0_oklch(1_0_0/0.5)_inset,0_8px_24px_-10px_oklch(0.2597_0.0282_203.2/0.6)] hover:bg-white",
        link: "h-auto rounded-none p-0 text-terracotta-700 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-11 px-5 text-[0.95rem] [&_svg:not([class*='size-'])]:size-[1.05rem]",
        lg: "h-13 px-7 text-base sm:text-[1.0625rem] [&_svg:not([class*='size-'])]:size-5",
        icon: "size-11 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type SiteButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof siteButtonVariants> & { className?: string };

function SiteButton({
  className,
  variant = "primary",
  size = "md",
  render,
  nativeButton,
  ...props
}: SiteButtonProps) {
  // Base UI assumes `render` swaps in a native <button> (`nativeButton: true`).
  // Every CTA here renders an <a> instead, so that assumption must be relaxed
  // or Base UI logs a dev error and applies the wrong button semantics.
  const resolvedNativeButton = nativeButton ?? render === undefined;

  return (
    <ButtonPrimitive
      data-slot="site-button"
      data-variant={variant ?? "primary"}
      className={cn(siteButtonVariants({ variant, size }), className)}
      render={render}
      nativeButton={resolvedNativeButton}
      {...props}
    />
  );
}

export { SiteButton, siteButtonVariants };
export type { SiteButtonProps };
