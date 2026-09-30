export const servicesWhoOptions = [
  { value: "myself", label: "Myself (adult)" },
  { value: "child", label: "My child or teenager" },
  { value: "spouse", label: "My spouse / partner" },
  { value: "family", label: "My family" },
  { value: "school", label: "My school (as a leader)" },
  { value: "workplace", label: "My organisation (as a leader)" },
] as const;

export const concernOptions = [
  { value: "anxiety", label: "Anxiety, panic or worry" },
  { value: "depression", label: "Low mood or depression" },
  { value: "stress", label: "Stress or burnout" },
  { value: "relationships", label: "Relationship or family conflict" },
  { value: "child", label: "Child behaviour, learning or emotional needs" },
  { value: "academic", label: "Exam or academic pressure" },
  { value: "grief", label: "Grief or loss" },
  { value: "trauma", label: "Trauma or a difficult experience" },
  { value: "workplace", label: "Workplace stress or HR compliance (POSH)" },
  { value: "school", label: "School wellbeing programme" },
  { value: "other", label: "Something else — I will explain in the call" },
] as const;

export const modeOptions = [
  {
    value: "online",
    label: "Online",
    description: "Encrypted video sessions from wherever you are.",
  },
  {
    value: "offline",
    label: "In-clinic",
    description: "Face-to-face at the Indore clinic.",
  },
  {
    value: "either",
    label: "Either",
    description: "Happy to start one way and switch.",
  },
] as const;

export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  seekingSupportFor: string;
  primaryConcern: string;
  preferredMode: string;
  notes?: string;
  source?: string;
  submittedAt?: string;
};
