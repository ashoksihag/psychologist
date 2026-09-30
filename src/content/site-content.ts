import {
  Brain,
  BriefcaseBusiness,
  Compass,
  HeartHandshake,
  MessagesSquare,
  School,
  ShieldCheck,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ---------------------------------------------------------------- */
/* 4. Philosophy & Approach                                          */
/* ---------------------------------------------------------------- */

export const pillars: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Compass,
    title: "Understand",
    body: "We start with what is actually happening — not with a label. Careful assessment, a shared formulation, and language you can make sense of.",
  },
  {
    icon: HeartHandshake,
    title: "Connect",
    body: "Therapy only works inside a real relationship. You are not a case file. Expect warmth, honesty, and someone who takes your experience seriously.",
  },
  {
    icon: Sprout,
    title: "Grow",
    body: "The goal is not to feel fine forever — it is to carry less, and carry it better. Skills and small, durable changes that outlast the sessions.",
  },
];

/* ---------------------------------------------------------------- */
/* 5. Services Grid                                                  */
/* ---------------------------------------------------------------- */

export type Service = {
  title: string;
  description: string;
  deliverables: string[];
};

export type ServiceCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "clinical",
    label: "Clinical",
    icon: Brain,
    blurb: "One-to-one psychological care for adults, adolescents and families.",
    services: [
      {
        title: "Individual Psychotherapy",
        description:
          "Structured, evidence-based therapy for anxiety, depression, stress, phobias and life transitions.",
        deliverables: [
          "Detailed intake and clinical formulation",
          "Written, goal-based treatment plan",
          "Fortnightly progress reviews",
        ],
      },
      {
        title: "Trauma & Grief Therapy",
        description:
          "Phased, trauma-informed processing that never outpaces your capacity.",
        deliverables: [
          "Trauma history mapping and grounding plan",
          "Stabilisation before processing",
          "Post-therapy consolidation plan",
        ],
      },
      {
        title: "Assessment & Diagnosis",
        description:
          "Standardised psychological testing with a clear, non-stigmatising explanation of results.",
        deliverables: [
          "Standardised battery of tests",
          "Clinical interview and observation",
          "Written report with practical recommendations",
        ],
      },
    ],
  },
  {
    id: "developmental",
    label: "Developmental",
    icon: Sparkles,
    blurb: "Growing-up support for children, teens and the adults guiding them.",
    services: [
      {
        title: "Child & Adolescent Counselling",
        description:
          "Play-based and conversational therapy tuned to how a child actually communicates.",
        deliverables: [
          "Age-appropriate session format",
          "Structured parent check-ins",
          "Home practice activities",
        ],
      },
      {
        title: "Family Therapy",
        description:
          "Rebuilding communication patterns and renegotiating roles within the family system.",
        deliverables: [
          "Family systems mapping",
          "Joint and individual sessions",
          "Family practice plan",
        ],
      },
      {
        title: "Parent Guidance & Training",
        description:
          "Concrete strategies for behaviour, routines and communication, designed to be used under pressure.",
        deliverables: [
          "Individual parent coaching sessions",
          "Behavioural strategy roadmaps",
          "Crisis and transition playbooks",
        ],
      },
    ],
  },
  {
    id: "institutional",
    label: "Institutional",
    icon: School,
    blurb: "Embedded, on-site support for schools and campuses.",
    services: [
      {
        title: "School Counsellor Services",
        description:
          "A regular on-site counsellor who becomes part of how the school actually operates.",
        deliverables: [
          "Weekly on-campus sessions",
          "Staff consultation and safeguarding support",
          "Anonymous utilisation reporting",
        ],
      },
      {
        title: "Life Skills Curriculum",
        description:
          "Structured workshops on emotions, relationships, study habits and digital wellbeing.",
        deliverables: [
          "Age-banded session modules",
          "Student and parent sessions",
          "Curriculum mapping to school calendar",
        ],
      },
      {
        title: "Teacher Wellbeing",
        description:
          "Recognising burnout early and rebuilding sustainable practice for teaching staff.",
        deliverables: [
          "Confidential staff counselling",
          "Stress and workload workshops",
          "Escalation and referral guidance",
        ],
      },
    ],
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: BriefcaseBusiness,
    blurb: "Confidential clinical support and statutory compliance for organisations.",
    services: [
      {
        title: "Employee Assistance Programme",
        description:
          "A confidential front door for employees, with reporting that never exposes individual cases.",
        deliverables: [
          "24×7 multi-channel access",
          "Counselling sessions for employees and families",
          "Anonymised utilisation and trend reports",
        ],
      },
      {
        title: "POSH Training & Compliance",
        description:
          "Statutory sexual harassment training aligned to the POSH Act, 2013.",
        deliverables: [
          "Role-specific modules for employees and committees",
          "Case drills with anonymised scenarios",
          "Certification and attendance records",
        ],
      },
      {
        title: "Leadership Development",
        description:
          "Helping managers carry emotional labour without burning out or going quiet.",
        deliverables: [
          "Manager masterclasses",
          "Difficult-conversation coaching",
          "Team wellbeing charters",
        ],
      },
    ],
  },
];

/* ---------------------------------------------------------------- */
/* 6. Corporate & Institutional deep dive                           */
/* ---------------------------------------------------------------- */

export const corporatePillars: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Statutory by default",
    body: "POSH training mapped to the 2013 Act: ICC awareness, committee obligations, complaint pathways and documentation. Certification and attendance records maintained for every batch.",
  },
  {
    icon: Users,
    title: "Confidential at every layer",
    body: "Employees are never told who used the service. Reports are aggregated and anonymised, so a small team cannot be reverse-identified. Clinical notes never leave the clinical record.",
  },
  {
    icon: MessagesSquare,
    title: "Engagement you can measure",
    body: "Baseline pulse surveys, utilisation trends and a written action plan. We report on the system, never on the individual.",
  },
];

export type EngagementTier = {
  name: string;
  price: string;
  priceNote: string;
  summary: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
};

export const engagementTiers: EngagementTier[] = [
  {
    name: "Focused Masterclass",
    price: "One session",
    priceNote: "per batch, 60–90 minutes",
    summary:
      "A focused, well-facilitated session for a team that needs one specific thing fixed.",
    features: [
      "One 90-minute facilitated masterclass",
      "Topic chosen from a short intake",
      "A one-page take-away summary for attendees",
      "Post-session Q&A for 14 days",
    ],
  },
  {
    name: "Programme Series",
    price: "3–6 sessions",
    priceNote: "tailored to your calendar",
    summary:
      "A sequenced curriculum that builds skills over time instead of a one-off talk nobody remembers.",
    features: [
      "Everything in Focused Masterclass",
      "Curriculum mapped to real workplace scenarios",
      "Manager and employee tracks delivered separately",
      "Pre- and post-session pulse surveys",
      "Written progress summary at programme close",
    ],
    highlighted: true,
    badge: "Most chosen",
  },
  {
    name: "Annual Wellbeing Retainer",
    price: "Annual",
    priceNote: "scoped after a discovery call",
    summary:
      "A standing clinical relationship — the right answer for organisations that need ongoing, measurable support.",
    features: [
      "Everything in Programme Series",
      "Employee Assistance Programme access",
      "Statutory POSH training for all new joiners",
      "Quarterly leadership coaching and utilisation reviews",
      "Named clinician with defined response-time SLA",
    ],
  },
];

/* ---------------------------------------------------------------- */
/* 7. Testimonials                                                   */
/* ---------------------------------------------------------------- */

export const testimonials: {
  quote: string;
  name: string;
  role: string;
  org: string;
  accent: "forest" | "terracotta" | "teal";
}[] = [
  {
    quote:
      "We had tried a generic EAP before and barely anyone used it. After the first quarter the numbers told a very different story — and more importantly, our managers had language for hard conversations. That was the part we did not expect.",
    name: "Aparna Deshmukh",
    role: "Vice President, People",
    org: "Mid-size IT services firm",
    accent: "forest",
  },
  {
    quote:
      "The POSH programme was thorough without being legalistic. Our ICC members finally understood what documentation was actually expected of them, and we passed the audit without scrambling for records.",
    name: "Sr. Anil Verma",
    role: "Principal",
    org: "CBSE senior secondary school",
    accent: "terracotta",
  },
  {
    quote:
      "My son refused to talk to us for months. He talked to the counsellor in weeks. The thing that changed our home was not just him — it was us finally having a way to talk that did not end in a fight.",
    name: "Priya Nair",
    role: "Parent",
    org: "Grade 8 student, online sessions",
    accent: "teal",
  },
  {
    quote:
      "I expected sessions to feel like a wellness formality. What I got was a clinician who pushed back on me thoughtfully and stayed accountable. That accountability is what kept me in the work.",
    name: "Rahul Menon",
    role: "Engineering Director",
    org: "Manufacturing group",
    accent: "forest",
  },
  {
    quote:
      "Having the counsellor physically on campus changed how the students behaved around her. It removed the stigma entirely — asking for help became an ordinary thing to do, not an event.",
    name: "Dr. Meera Iyer",
    role: "School Counsellor Lead",
    org: "International school",
    accent: "terracotta",
  },
];

/* ---------------------------------------------------------------- */
/* 9. FAQ                                                            */
/* ---------------------------------------------------------------- */

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Is what I share confidential?",
    answer:
      "Yes. What you discuss stays between you and your psychologist, and is recorded only in a clinical file. Confidentiality can be broken in three narrow situations: you are at risk of serious harm to yourself, you pose a risk of serious harm to others, or the law requires disclosure. Where those limits apply, I will tell you as far as I safely can, and I will never surprise you with a disclosure you did not see coming.",
  },
  {
    question: "What happens in a first session?",
    answer:
      "The first session is a conversation, not an assessment you can fail. I will ask about what brought you, your history, sleep, mood, relationships and what you have already tried. You finish with an initial understanding and a suggested next step. If we are not the right fit, I will say so and help you find someone who is.",
  },
  {
    question: "How do online sessions work, and is the privacy real?",
    answer:
      "Online sessions run over an encrypted video platform in a private room, with the same clinical standards as a clinic session. I do not use personal messaging apps, and I never record sessions. You will need a private space, headphones, and a stable connection. If the connection drops, we reconnect and continue — technology should not be the reason you do not get help.",
  },
  {
    question: "Do you work with children and adolescents?",
    answer:
      "Yes. Younger clients usually start with play, drawing or sand-based work, and I speak with parents separately so you understand the work even when your child is the one in the room. With adolescents I will explain, honestly and in advance, when a confidential conversation has limits — so trust is not broken by a surprise.",
  },
  {
    question: "What does POSH training cover, and who is it for?",
    answer:
      "The programme is aligned with the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. Separate modules are delivered for general employees, line managers, and Internal Committee members, because the obligations genuinely differ. Sessions use anonymised case drills rather than slides alone, and you receive certification and attendance records for your compliance file.",
  },
  {
    question: "Is an EAP genuinely confidential for employees?",
    answer:
      "Confidentiality runs in both directions. The organisation receives only aggregated utilisation statistics and never learns who accessed support, which team they are in, or what was discussed. A minimum group threshold is applied to every report so a small team cannot be reverse-identified. Clinical records are held separately from any HR record.",
  },
  {
    question: "Do you offer sessions outside standard clinic hours?",
    answer:
      "Standard hours are Monday to Friday, 10:00–20:00 IST and Saturday, 10:00–15:00 IST. Online sessions can sometimes be arranged earlier or later, and early appointment slots are reserved for students and for people in acute distress. If your situation is urgent, call the clinic and say so — it changes how we schedule.",
  },
];
