export type PathwayId = "self" | "family" | "school" | "workplace";

export type Pathway = {
  id: PathwayId;
  tab: string;
  heading: string;
  blurb: string;
  /** Services revealed when the tab is selected. */
  services: { title: string; description: string }[];
  cta: { label: string; href: string; note: string };
};

export const pathways: Pathway[] = [
  {
    id: "self",
    tab: "Myself",
    heading: "Individual therapy for adults",
    blurb:
      "A confidential, one-to-one space to work through anxiety, low mood, stress, grief, trauma or life transitions — at a pace that feels safe.",
    services: [
      {
        title: "Anxiety & Panic",
        description: "CBT-informed work to interrupt worry cycles and rebuild a sense of safety.",
      },
      {
        title: "Depression & Low Mood",
        description: "Behavioural activation and cognitive restructuring with careful pacing.",
      },
      {
        title: "Stress & Burnout",
        description: "Boundaries, recovery routines and longer-term resilience planning.",
      },
      {
        title: "Trauma & Grief",
        description: "Trauma-informed, phased processing with explicit consent at every step.",
      },
    ],
    cta: {
      label: "Book a free 15-min call",
      href: "#consultation",
      note: "No commitment — just a conversation about what you need.",
    },
  },
  {
    id: "family",
    tab: "Child & Family",
    heading: "Support for children, adolescents and families",
    blurb:
      "Play-based and family-centred work for behaviour, communication, exam stress and relationships — with parents as active partners, not bystanders.",
    services: [
      {
        title: "Child & Adolescent Therapy",
        description: "Play therapy, drawing and sandplay for younger clients who need a gentler entry point.",
      },
      {
        title: "Family Therapy",
        description: "Structured sessions that repair communication patterns and renegotiate roles.",
      },
      {
        title: "Parent Guidance",
        description: "Practical, non-judgemental strategies that work on a Tuesday evening, not in theory.",
      },
      {
        title: "Exam & Transition Support",
        description: "Anxiety management and study routines for board exams and college transitions.",
      },
    ],
    cta: {
      label: "Speak about your child",
      href: "#consultation",
      note: "Parents and guardians are welcome to reach out first.",
    },
  },
  {
    id: "school",
    tab: "School",
    heading: "Counselling for students and teachers",
    blurb:
      "An embedded school counsellor who knows the campus, the curriculum and the pressure points — supporting students and staff under a shared confidentiality policy.",
    services: [
      {
        title: "On-Campus Counselling",
        description: "A regular on-site presence, so students never have to travel for help.",
      },
      {
        title: "Teacher Wellbeing",
        description: "Burnout support and classroom stress-management for teaching staff.",
      },
      {
        title: "Life Skills Curriculum",
        description: "Age-appropriate sessions on emotions, relationships, study and digital wellbeing.",
      },
      {
        title: "Crisis & Case Reviews",
        description: "A clear referral pathway and documentation support when a student needs more.",
      },
    ],
    cta: {
      label: "Request a school proposal",
      href: "#workplaces",
      note: "Includes session plan, confidentiality policy and pricing.",
    },
  },
  {
    id: "workplace",
    tab: "Workplace",
    heading: "Corporate mental health and institutional mandates",
    blurb:
      "Confidential clinical support for employees, statutory compliance training, and leadership work that survives contact with a real organisation chart.",
    services: [
      {
        title: "Employee Assistance Programme",
        description: "24×7 access to confidential counselling with utilisation reporting, never case data.",
      },
      {
        title: "POSH Training",
        description: "Statutory sexual harassment training aligned to the 2013 Act, with certification and drills.",
      },
      {
        title: "Leadership Development",
        description: "For managers carrying emotional labour: holding hard conversations, feedback and burnout.",
      },
      {
        title: "Organisational Assessment",
        description: "Anonymous pulse surveys and a written, prioritised action plan — diagnosis before intervention.",
      },
    ],
    cta: {
      label: "Request an organisation proposal",
      href: "#workplaces",
      note: "EAP, POSH and leadership tracks can be combined.",
    },
  },
];
