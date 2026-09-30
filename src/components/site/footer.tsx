import { Clock, Mail, MapPin, Phone, TriangleAlert } from "lucide-react";

import { Container } from "@/components/site/layout-primitives";
import { Logo } from "@/components/site/logo";
import { SiteButton } from "@/components/site/button";
import { navLinks, siteConfig } from "@/lib/site-config";

const quickLinks = [
  { label: "Book a consultation", href: "#consultation" },
  { label: "Individual therapy", href: "#services" },
  { label: "Child & family", href: "#pathways" },
  { label: "School counselling", href: "#schools" },
  { label: "EAP & POSH training", href: "#workplaces" },
] as const;

const legalLinks = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms of service", href: "#" },
  { label: "Cancellation policy", href: "#" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-slot="site-footer"
      className="relative overflow-hidden bg-forest-900 text-cream"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_85%_0%,oklch(0.42_0.05_175_/_0.6)_0%,transparent_70%)]"
      />
      <span aria-hidden className="texture-grain absolute inset-0 opacity-40" />

      <Container className="relative">
        {/* CTA strip */}
        <div className="flex flex-col gap-6 border-b border-cream/12 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div>
            <h2 className="font-heading text-2xl leading-tight font-semibold tracking-[-0.015em] text-balance sm:text-3xl">
              Not sure if this is the right place for you?
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-pretty text-cream/70">
              A free 15-minute call will tell you. If we are not the right fit,
              we will say so and point you somewhere better.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SiteButton
              size="lg"
              variant="inverted"
              render={<a href="#consultation" />}
            >
              Book a Consultation
            </SiteButton>
            <SiteButton
              size="lg"
              variant="outline"
              className="border-cream/25 bg-cream/5 text-cream hover:border-cream/40 hover:bg-cream/10 hover:text-cream"
              render={<a href={siteConfig.contact.phoneHref} />}
            >
              <Phone aria-hidden />
              {siteConfig.contact.phone}
            </SiteButton>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-14">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-pretty text-cream/65">
              {siteConfig.description}
            </p>
            <p className="mt-5 text-sm font-medium text-terracotta-300">
              {siteConfig.credentials}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.18em] text-cream/50 uppercase">
              Explore
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Quick links" className="lg:col-span-3">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.18em] text-cream/50 uppercase">
              Quick links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic lg:col-span-3">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.18em] text-cream/50 uppercase">
              Clinic &amp; contact
            </h3>
            <ul className="mt-4 flex flex-col gap-4 text-sm text-cream/70">
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-terracotta-300" />
                <span className="leading-relaxed">
                  {siteConfig.clinic.name}
                  <br />
                  {siteConfig.clinic.line1}
                  <br />
                  {siteConfig.clinic.line2}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-terracotta-300" />
                <a
                  href={siteConfig.contact.phoneHref}
                  className="rounded transition-colors hover:text-cream"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-terracotta-300" />
                <a
                  href={siteConfig.contact.emailHref}
                  className="rounded break-all transition-colors hover:text-cream"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-terracotta-300" />
                <span className="flex flex-col gap-1">
                  {siteConfig.hours.map((entry) => (
                    <span key={entry.days} className="text-[0.8rem]">
                      <span className="text-cream/50">{entry.days}</span>{" "}
                      {entry.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </address>
        </div>

        {/* Crisis disclaimer — important for this niche */}
        <div className="rounded-2xl border border-terracotta-300/30 bg-terracotta-500/8 p-5 sm:p-6">
          <p className="flex items-center gap-2.5 font-heading text-sm font-semibold text-terracotta-300">
            <TriangleAlert aria-hidden className="size-4" />
            {siteConfig.crisis.label}
          </p>
          <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-pretty text-cream/75">
            {siteConfig.crisis.text}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {siteConfig.crisis.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded text-sm font-medium text-cream underline decoration-terracotta-300/50 underline-offset-4 transition-colors hover:decoration-terracotta-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Base */}
        <div className="flex flex-col gap-5 border-t border-cream/12 py-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-cream/50">
            &copy; {year} {siteConfig.legalName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded text-xs text-cream/50 transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex items-center gap-4">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded text-xs text-cream/50 transition-colors hover:text-cream"
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="pb-8 text-[0.7rem] leading-relaxed text-cream/40">
          Information on this site is for general awareness and is not a
          substitute for professional medical advice, diagnosis or treatment.
          Always seek the advice of a qualified professional.
        </p>
      </Container>
    </footer>
  );
}
