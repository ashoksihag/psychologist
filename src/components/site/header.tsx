"use client";

import * as React from "react";
import { cn } from "cn";
import { Mail, Menu, Phone, ShieldCheck } from "lucide-react";

import { Container } from "@/components/site/layout-primitives";
import { Logo } from "@/components/site/logo";
import { SiteButton } from "@/components/site/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // In-page anchors scroll; the sheet would otherwise stay open over the target.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      data-slot="site-header"
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70",
        "transition-[box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-border shadow-[0_1px_24px_-12px_oklch(0.311_0.034_195.5/0.35)]"
          : "border-b border-transparent",
      )}
    >
      {/* Top bar */}
      <div className="hidden border-b border-border/70 bg-sand-100/70 lg:block">
        <Container className="flex h-9 items-center justify-between text-xs text-ink-muted">
          <p className="flex items-center gap-2">
            <ShieldCheck aria-hidden className="size-3.5 text-terracotta-600" />
            {siteConfig.credentials}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-1.5 rounded transition-colors hover:text-forest-800 focus-visible:text-forest-800"
            >
              <Phone aria-hidden className="size-3.5" />
              {siteConfig.contact.phone}
            </a>
            <a
              href={siteConfig.contact.emailHref}
              className="flex items-center gap-1.5 rounded transition-colors hover:text-forest-800 focus-visible:text-forest-800"
            >
              <Mail aria-hidden className="size-3.5" />
              {siteConfig.contact.email}
            </a>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a
          href="#top"
          className="rounded-xl focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex h-10 items-center rounded-full px-3.5 text-[0.9rem] font-medium text-ink-muted transition-colors hover:bg-sand-100 hover:text-forest-800 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <SiteButton
            size="md"
            className="hidden sm:inline-flex"
            render={<a href="#consultation" />}
          >
            Book a Consultation
          </SiteButton>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <SiteButton
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu aria-hidden />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(22rem,88vw)] gap-0 border-l border-border bg-background p-0 sm:max-w-sm"
            >
              <SheetHeader className="border-b border-border p-5 text-left">
                <SheetTitle className="font-heading text-lg font-semibold">
                  Navigate
                </SheetTitle>
                <SheetDescription className="text-ink-muted">
                  {siteConfig.credentials}
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose
                        render={
                          <a
                            href={link.href}
                            className="flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-medium text-foreground transition-colors hover:bg-sand-100 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                          />
                        }
                      >
                        {link.label}
                        <span aria-hidden className="text-ink-faint">
                          →
                        </span>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-3 border-t border-border p-5">
                <SiteButton
                  size="lg"
                  className="w-full"
                  render={<a href="#consultation" />}
                  onClick={() => setOpen(false)}
                >
                  Book a Consultation
                </SiteButton>
                <div className="flex flex-col gap-1.5 text-sm text-ink-muted">
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="flex items-center gap-2 rounded-lg py-1 hover:text-forest-800"
                  >
                    <Phone aria-hidden className="size-4" />
                    {siteConfig.contact.phone}
                  </a>
                  <a
                    href={siteConfig.contact.emailHref}
                    className="flex items-center gap-2 rounded-lg py-1 hover:text-forest-800"
                  >
                    <Mail aria-hidden className="size-4" />
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
