export const siteConfig = {
  name: "Manmitra",
  legalName: "Manmitra Psychological Services",
  tagline: "A safe space to understand, connect and grow.",
  description:
    "RCI-registered clinical psychology, child & family therapy, school counselling and corporate wellbeing — including EAP, POSH training and leadership development. Clinic and confidential online sessions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manmitra.example.com",
  locale: "en_IN",

  credentials: "RCI Registered Psychologist · Clinic & Online",

  contact: {
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    email: "hello@manmitra.com",
    emailHref: "mailto:hello@manmitra.com",
  },

  clinic: {
    name: "Manmitra Clinic",
    line1: "2nd Floor, Aria House",
    line2: "14 M.G. Road, Indore, Madhya Pradesh 452001",
  },

  hours: [
    { days: "Monday – Friday", time: "10:00 – 20:00 IST" },
    { days: "Saturday", time: "10:00 – 15:00 IST" },
    { days: "Sunday", time: "Closed (crisis line available)" },
  ],

  crisis: {
    label: "In immediate danger or crisis?",
    text: "Manmitra is not an emergency or crisis service. If you or someone else is at risk of self-harm or harm to others, please contact your local emergency number, or reach a 24×7 mental health helpline.",
    links: [
      { label: "iCall (TISS)", href: "tel:9152987821" },
      { label: "Vandrevala Foundation", href: "tel:18602662090" },
      { label: "AASRA", href: "tel:18008231000" },
    ],
  },

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
} as const;

export const navLinks = [
  { label: "Pathways", href: "#pathways" },
  { label: "Services", href: "#services" },
  { label: "Workplaces", href: "#workplaces" },
  { label: "Schools", href: "#schools" },
  { label: "About", href: "#about" },
  { label: "FAQs", href: "#faqs" },
] as const;

export const heroStats = [
  { value: "10+", label: "Years of clinical practice" },
  { value: "1,000+", label: "Individuals supported" },
  { value: "100%", label: "Ethical & confidential" },
  { value: "RCI", label: "Registered psychologist" },
] as const;
