import { cn } from "cn";

/**
 * Decorative hero artwork, drawn in SVG so it costs no network request,
 * no layout shift, and no image-optimisation round trip.
 *
 * The composition is deliberately kept inside the top ~60% of the viewBox:
 * the floating "Not sure where to begin?" card overlaps the lower part of the
 * frame, so anything placed down there would be hidden on narrow screens.
 *
 * Swap for photography by replacing <HeroVisual /> with a next/image <figure>.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      data-slot="hero-visual"
      className={cn(
        "relative aspect-4/5 w-full overflow-hidden rounded-3xl sm:aspect-4/3 lg:aspect-square",
        "bg-[radial-gradient(120%_110%_at_20%_0%,var(--terracotta-100)_0%,transparent_55%),radial-gradient(100%_100%_at_85%_15%,oklch(0.9_0.045_175)_0%,transparent_60%),linear-gradient(160deg,var(--sand-100)_0%,var(--beige)_100%)]",
        "ring-1 ring-forest-900/8",
        className,
      )}
    >
      {/* Calm concentric ripples — "connection radiating outward" */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="absolute inset-0 size-full text-forest-800/12"
        preserveAspectRatio="xMidYMid slice"
      >
        {[70, 108, 146, 184, 222, 260].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="176"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
          />
        ))}
      </svg>

      {/* Abstract two-figure composition */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="mm-figure-a" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--forest-600)" />
            <stop offset="100%" stopColor="var(--forest-900)" />
          </linearGradient>
          <linearGradient id="mm-figure-b" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--terracotta-500)" />
            <stop offset="100%" stopColor="var(--terracotta-700)" />
          </linearGradient>
        </defs>

        {/* Ground / horizon */}
        <ellipse cx="196" cy="250" rx="132" ry="15" fill="var(--forest-900)" opacity="0.08" />

        {/* Shared canopy arcing over both heads — the held, safe space */}
        <path
          d="M118 156a82 82 0 0 1 150 0"
          fill="none"
          stroke="var(--forest-800)"
          strokeOpacity="0.28"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />

        {/* Left figure — seated, leaning in */}
        <g>
          <circle cx="156" cy="112" r="24" fill="url(#mm-figure-a)" />
          <path
            d="M112 242v-58c0-25 20-45 44-45s44 20 44 45v58a8 8 0 0 1-8 8h-72a8 8 0 0 1-8-8Z"
            fill="url(#mm-figure-a)"
          />
        </g>

        {/* Right figure — turned toward the left figure */}
        <g>
          <circle cx="248" cy="118" r="21" fill="url(#mm-figure-b)" />
          <path
            d="M210 242v-50c0-22 17-39 38-39s38 17 38 39v50a8 8 0 0 1-8 8h-60a8 8 0 0 1-8-8Z"
            fill="url(#mm-figure-b)"
          />
        </g>

        {/* Shared breath drifting between them */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={206 + i * 13}
            cy={132 - i * 17}
            r={5 - i * 1.2}
            fill="var(--forest-800)"
            opacity={0.26 - i * 0.07}
          />
        ))}

        {/* A small growing plant — growth */}
        <g transform="translate(300 214)">
          <path
            d="M0 36V14"
            stroke="var(--forest-700)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M0 18c-12-3-17-12-16-22 11-1 18 7 16 22Z" fill="var(--forest-600)" opacity="0.75" />
          <path
            d="M0 26c12-3 17-12 16-22-11-1-18 7-16 22Z" fill="var(--terracotta-500)" opacity="0.6" />
        </g>
      </svg>

      {/* Paper grain */}
      <span aria-hidden className="texture-grain absolute inset-0 opacity-60" />
    </div>
  );
}
