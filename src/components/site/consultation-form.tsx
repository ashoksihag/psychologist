"use client";

import * as React from "react";
import { cn } from "cn";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Lock,
  Pencil,
  PhoneCall,
  ShieldCheck,
  User,
  Workflow,
} from "lucide-react";

import { Container, Section } from "@/components/site/layout-primitives";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  concernOptions,
  modeOptions,
  servicesWhoOptions,
  type LeadPayload,
} from "@/content/form-options";
import { siteConfig } from "@/lib/site-config";

/* ------------------------------------------------------------------ */
/* Steps                                                              */
/* ------------------------------------------------------------------ */

const STEPS = [
  { id: "you", label: "About you", icon: User },
  { id: "support", label: "Who & what", icon: Workflow },
  { id: "preference", label: "Preference", icon: PhoneCall },
  { id: "done", label: "Sent", icon: CheckCircle2 },
] as const;

const TOTAL_STEPS = 3;

type FormState = {
  name: string;
  phone: string;
  email: string;
  seekingSupportFor: string;
  primaryConcern: string;
  preferredMode: string;
  notes: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  seekingSupportFor: "",
  primaryConcern: "",
  preferredMode: "",
  notes: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((o) => o.value === value)?.label ?? value;
}

/* ------------------------------------------------------------------ */
/* Field shell                                                        */
/* ------------------------------------------------------------------ */

function Field({
  name,
  label: fieldLabel,
  hint,
  error,
  required,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="text-sm font-medium text-ink">
        {fieldLabel}
        {required ? (
          <span aria-hidden className="ml-1 text-terracotta-600">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-ink-faint">
            (optional)
          </span>
        )}
      </Label>
      {children}
      {error ? (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-sm font-medium text-destructive"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Validation                                                         */
/* ------------------------------------------------------------------ */

function validateStep(step: number, values: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 1) {
    if (values.name.trim().length < 2) {
      errors.name = "Please tell us your name.";
    }
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      errors.phone = "Enter a 10-digit phone number we can reach you on.";
    }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
      errors.email = "That email address does not look right.";
    }
  }

  if (step === 2) {
    if (!values.seekingSupportFor) {
      errors.seekingSupportFor = "Please choose who is seeking support.";
    }
    if (!values.primaryConcern) {
      errors.primaryConcern = "Please choose a primary area of concern.";
    }
  }

  if (step === 3) {
    if (!values.preferredMode) {
      errors.preferredMode = "Please choose a preferred mode.";
    }
  }

  return errors;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

type Status = "idle" | "submitting" | "success" | "error";

export function ConsultationForm() {
  const [step, setStep] = React.useState(1);
  const [values, setValues] = React.useState<FormState>(INITIAL);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const headingRef = React.useRef<HTMLParagraphElement>(null);
  const liveRef = React.useRef<HTMLDivElement>(null);

  const set = React.useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key]) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    [],
  );

  const goTo = React.useCallback((next: number) => {
    setStep(next);
    // Move focus to the step heading so screen readers announce the change.
    requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  const handleNext = (event: React.FormEvent) => {
    event.preventDefault();
    const stepErrors = validateStep(step, values);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const firstField = Object.keys(stepErrors)[0];
      liveRef.current?.focus();
      document.getElementById(String(firstField))?.focus();
      return;
    }
    goTo(Math.min(step + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setErrors({});
    goTo(Math.max(step - 1, 1));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Re-validate every step before committing.
    const allErrors: FieldErrors = {
      ...validateStep(1, values),
      ...validateStep(2, values),
      ...validateStep(3, values),
    };
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      liveRef.current?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    const payload: LeadPayload = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      seekingSupportFor: values.seekingSupportFor,
      primaryConcern: values.primaryConcern,
      preferredMode: values.preferredMode,
      notes: values.notes.trim() || undefined,
      source: "manmitra-website",
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setStatus("success");
      goTo(4);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not send your request. Please call the clinic instead.",
      );
    }
  };

  const progress = status === "success" ? 100 : ((step - 1) / TOTAL_STEPS) * 100;

  return (
    <Section id="consultation" edge="cream" spacing="default">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------------------------------------------------- Pitch */}
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Start here"
              title="Tell us what you need, in your own words"
              description="Four short questions. No clinical jargon, no judgement, and no obligation to continue after you submit."
              className="lg:sticky lg:top-32"
            />

            <ul className="mt-8 flex flex-col gap-3">
              {[
                "We reply within one working day",
                "Your details stay confidential — never shared",
                "A free 15-minute call before any commitment",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-ink"
                >
                  <Check
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-terracotta-600"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-border bg-sand-100/70 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-forest-900">
                <Lock aria-hidden className="size-4 text-forest-700" />
                If this is urgent
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Please do not wait for a form response. Call{" "}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="font-medium text-forest-700 underline underline-offset-4"
                >
                  {siteConfig.contact.phone}
                </a>{" "}
                or use a 24×7 helpline listed in the footer.
              </p>
            </div>
          </div>

          {/* ----------------------------------------------------- Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-float sm:p-8 lg:p-10">
              {/* Progress */}
              <div className="mb-8">
                <ol className="flex items-center gap-2">
                  {STEPS.map((s, i) => {
                    const index = i + 1;
                    const state =
                      status === "success" || index < step
                        ? "done"
                        : index === step
                          ? "current"
                          : "upcoming";
                    const Icon = s.icon;
                    return (
                      <li
                        key={s.id}
                        className="flex flex-1 items-center gap-2.5"
                        aria-current={state === "current" ? "step" : undefined}
                      >
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors duration-300",
                            state === "done" &&
                              "border-forest-800 bg-forest-800 text-cream",
                            state === "current" &&
                              "border-terracotta-600 bg-terracotta-100 text-terracotta-700",
                            state === "upcoming" &&
                              "border-border bg-sand-100 text-ink-faint",
                          )}
                        >
                          {state === "done" ? (
                            <Check aria-hidden className="size-4" />
                          ) : (
                            <Icon aria-hidden className="size-4" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "hidden text-xs font-medium transition-colors sm:block",
                            state === "upcoming"
                              ? "text-ink-faint"
                              : "text-ink",
                          )}
                        >
                          {s.label}
                        </span>
                        {i < STEPS.length - 1 ? (
                          <span
                            aria-hidden
                            className="h-px flex-1 bg-border"
                          />
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
                <div
                  className="mt-4 h-1 overflow-hidden rounded-full bg-sand-200"
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Form completion"
                >
                  <div
                    className="h-full rounded-full bg-terracotta-500 transition-[width] duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Announcements */}
              <div
                ref={liveRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="sr-only"
              >
                {status === "error"
                  ? (errorMessage ?? "Submission failed")
                  : `Step ${Math.min(step, TOTAL_STEPS)} of ${TOTAL_STEPS}`}
              </div>

              {/* ------------------------------------------ Success */}
              {status === "success" ? (
                <div className="flex flex-col items-start py-6">
                  <span className="grid size-14 place-items-center rounded-2xl bg-forest-800/8 text-forest-700">
                    <CheckCircle2 aria-hidden className="size-7" />
                  </span>
                  <h3
                    ref={headingRef}
                    tabIndex={-1}
                    className="mt-6 font-heading text-2xl font-semibold tracking-[-0.015em] outline-none"
                  >
                    Thank you, {values.name.split(" ")[0]}. We have your request.
                  </h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-pretty text-ink-muted">
                    We will reach out on{" "}
                    <span className="font-medium text-ink">
                      {values.phone}
                    </span>{" "}
                    within one working day. Nothing you wrote here is shared
                    with anyone else.
                  </p>
                  <dl className="mt-7 w-full max-w-lg rounded-2xl border border-border bg-sand-100/60 p-5 text-sm">
                    <div className="flex justify-between gap-4 py-1.5">
                      <dt className="text-ink-muted">Seeking support for</dt>
                      <dd className="text-right font-medium text-ink">
                        {optionLabel(servicesWhoOptions, values.seekingSupportFor)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-1.5">
                      <dt className="text-ink-muted">Primary concern</dt>
                      <dd className="text-right font-medium text-ink">
                        {optionLabel(concernOptions, values.primaryConcern)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 py-1.5">
                      <dt className="text-ink-muted">Preferred mode</dt>
                      <dd className="text-right font-medium text-ink">
                        {optionLabel(modeOptions, values.preferredMode)}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <SiteButton
                      size="md"
                      render={<a href={siteConfig.contact.phoneHref} />}
                    >
                      <PhoneCall aria-hidden />
                      Call the clinic
                    </SiteButton>
                    <SiteButton
                      size="md"
                      variant="outline"
                      onClick={() => {
                        setValues(INITIAL);
                        setErrors({});
                        setStatus("idle");
                        goTo(1);
                      }}
                    >
                      <Pencil aria-hidden />
                      Send another request
                    </SiteButton>
                  </div>
                </div>
              ) : (
                /* --------------------------------------- Form body */
                <form onSubmit={step === TOTAL_STEPS ? handleSubmit : handleNext} noValidate>
                  <p
                    ref={headingRef}
                    tabIndex={-1}
                    className="font-heading text-xl font-semibold tracking-[-0.01em] outline-none"
                  >
                    {step === 1 && "First, how can we reach you?"}
                    {step === 2 && "Who is this for, and what is happening?"}
                    {step === 3 && "How would you like to meet?"}
                    <span className="ml-2 text-sm font-normal text-ink-faint">
                      Step {step} of {TOTAL_STEPS}
                    </span>
                  </p>

                  <div className="mt-7">
                    {step === 1 ? (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <Field
                            name="name"
                            label="Full name"
                            required
                            error={errors.name}
                            hint="Whatever name you would like to be called by."
                          >
                            <Input
                              id="name"
                              name="name"
                              autoComplete="name"
                              required
                              aria-invalid={Boolean(errors.name)}
                              aria-describedby={errors.name ? "name-error" : "name-hint"}
                              placeholder="Your name"
                              value={values.name}
                              onChange={(e) => set("name", e.target.value)}
                              className="h-12 rounded-xl"
                            />
                          </Field>
                        </div>

                        <Field
                          name="phone"
                          label="Phone"
                          required
                          error={errors.phone}
                          hint="We call or text — never share it."
                        >
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            required
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                            placeholder="98765 43210"
                            value={values.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            className="h-12 rounded-xl"
                          />
                        </Field>

                        <Field
                          name="email"
                          label="Email"
                          error={errors.email}
                          hint="Only if you prefer email."
                        >
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : "email-hint"}
                            placeholder="you@example.com"
                            value={values.email}
                            onChange={(e) => set("email", e.target.value)}
                            className="h-12 rounded-xl"
                          />
                        </Field>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="flex flex-col gap-5">
                        <Field
                          name="seekingSupportFor"
                          label="Who is seeking support?"
                          required
                          error={errors.seekingSupportFor}
                        >
                          <Select
                            name="seekingSupportFor"
                            value={values.seekingSupportFor || null}
                            onValueChange={(v) =>
                              set("seekingSupportFor", (v as string) ?? "")
                            }
                          >
                            <SelectTrigger
                              id="seekingSupportFor"
                              className="h-12 w-full rounded-xl bg-transparent"
                              aria-invalid={Boolean(errors.seekingSupportFor)}
                              aria-describedby={
                                errors.seekingSupportFor
                                  ? "seekingSupportFor-error"
                                  : undefined
                              }
                            >
                              <SelectValue placeholder="Choose one…" />
                            </SelectTrigger>
                            <SelectContent align="start" className="rounded-xl">
                              {servicesWhoOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="rounded-lg"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field
                          name="primaryConcern"
                          label="Primary area of concern"
                          required
                          error={errors.primaryConcern}
                        >
                          <Select
                            name="primaryConcern"
                            value={values.primaryConcern || null}
                            onValueChange={(v) =>
                              set("primaryConcern", (v as string) ?? "")
                            }
                          >
                            <SelectTrigger
                              id="primaryConcern"
                              className="h-12 w-full rounded-xl bg-transparent"
                              aria-invalid={Boolean(errors.primaryConcern)}
                              aria-describedby={
                                errors.primaryConcern
                                  ? "primaryConcern-error"
                                  : undefined
                              }
                            >
                              <SelectValue placeholder="Choose the closest fit…" />
                            </SelectTrigger>
                            <SelectContent align="start" className="rounded-xl">
                              {concernOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className="rounded-lg"
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <fieldset className="flex flex-col gap-5">
                        <legend className="text-sm font-medium text-ink">
                          Preferred mode
                          <span aria-hidden className="ml-1 text-terracotta-600">
                            *
                          </span>
                        </legend>

                        <div
                          className="grid gap-3 sm:grid-cols-3"
                          role="radiogroup"
                          aria-describedby={
                            errors.preferredMode ? "preferredMode-error" : undefined
                          }
                        >
                          {modeOptions.map((option) => {
                            const active = values.preferredMode === option.value;
                            return (
                              <label
                                key={option.value}
                                className={cn(
                                  "flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-all",
                                  "focus-within:ring-[3px] focus-within:ring-ring/50",
                                  active
                                    ? "border-forest-700 bg-forest-900/5 shadow-[0_0_0_1px_var(--forest-700)]"
                                    : "border-border bg-card hover:border-forest-600/30",
                                )}
                              >
                                <span className="flex items-center gap-2.5">
                                  <input
                                    id={`preferredMode-${option.value}`}
                                    type="radio"
                                    name="preferredMode"
                                    value={option.value}
                                    checked={active}
                                    onChange={() => set("preferredMode", option.value)}
                                    className="sr-only"
                                  />
                                  <span
                                    aria-hidden
                                    className={cn(
                                      "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                                      active
                                        ? "border-forest-700 bg-forest-700"
                                        : "border-border bg-card",
                                    )}
                                  >
                                    {active ? (
                                      <Check className="size-3 text-cream" strokeWidth={3} />
                                    ) : null}
                                  </span>
                                  <span className="text-sm font-semibold text-forest-900">
                                    {option.label}
                                  </span>
                                </span>
                                <span className="text-xs leading-relaxed text-ink-muted">
                                  {option.description}
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        {errors.preferredMode ? (
                          <p
                            id="preferredMode-error"
                            role="alert"
                            className="text-sm font-medium text-destructive"
                          >
                            {errors.preferredMode}
                          </p>
                        ) : null}

                        <Field
                          name="notes"
                          label="Anything else you want us to know"
                          hint="One or two lines is plenty."
                        >
                          <Textarea
                            id="notes"
                            name="notes"
                            rows={4}
                            placeholder="e.g. I would prefer morning appointments…"
                            value={values.notes}
                            onChange={(e) => set("notes", e.target.value)}
                            aria-describedby="notes-hint"
                            className="resize-none rounded-xl"
                          />
                        </Field>
                      </fieldset>
                    ) : null}
                  </div>

                  {status === "error" ? (
                    <p
                      role="alert"
                      className="mt-6 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/8 p-3.5 text-sm text-destructive"
                    >
                      {errorMessage}
                    </p>
                  ) : null}

                  {/* Actions */}
                  <div className="mt-8 flex items-center gap-3">
                    {step > 1 ? (
                      <SiteButton
                        type="button"
                        variant="quiet"
                        size="md"
                        onClick={handleBack}
                      >
                        <ArrowLeft aria-hidden />
                        Back
                      </SiteButton>
                    ) : null}

                    <SiteButton
                      type="submit"
                      size="md"
                      className="ml-auto"
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 aria-hidden className="animate-spin" />
                          Sending…
                        </>
                      ) : step === TOTAL_STEPS ? (
                        <>
                          <ShieldCheck aria-hidden />
                          Send my request
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight aria-hidden />
                        </>
                      )}
                    </SiteButton>
                  </div>
                </form>
              )}

              <p className="mt-7 flex items-start gap-2 border-t border-border pt-5 text-xs leading-relaxed text-ink-faint">
                <Lock aria-hidden className="mt-0.5 size-3.5 shrink-0" />
                By submitting, you agree to be contacted about your enquiry. This
                form is not for emergencies or crisis support.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
