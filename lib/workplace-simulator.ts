export type WorkplaceExercise = {
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
};

export type WorkplaceRole = {
  id: string;
  title: string;
  description: string;
  exercises: WorkplaceExercise[];
};

export const workplaceRoles: WorkplaceRole[] = [
  {
    id: "office-manager",
    title: "Office Manager",
    description:
      "Coordinate teams, manage schedules, and keep operations running smoothly with AI-assisted communication and planning.",
    exercises: [
      {
        title: "Summarize meeting notes into action items",
        difficulty: "Beginner",
        estimatedMinutes: 15,
      },
      {
        title: "Draft a professional follow-up email",
        difficulty: "Beginner",
        estimatedMinutes: 10,
      },
      {
        title: "Create a weekly task plan",
        difficulty: "Intermediate",
        estimatedMinutes: 20,
      },
    ],
  },
  {
    id: "real-estate-agent",
    title: "Real Estate Agent",
    description:
      "Use AI to write listings, respond to leads faster, and turn showing feedback into follow-up opportunities.",
    exercises: [
      {
        title: "Write a property listing description",
        difficulty: "Beginner",
        estimatedMinutes: 15,
      },
      {
        title: "Reply to a buyer lead",
        difficulty: "Intermediate",
        estimatedMinutes: 12,
      },
      {
        title: "Summarize showing feedback",
        difficulty: "Beginner",
        estimatedMinutes: 10,
      },
    ],
  },
  {
    id: "customer-service",
    title: "Customer Service Rep",
    description:
      "Handle customer issues with clarity and empathy using AI to draft replies, summarize tickets, and explain policies.",
    exercises: [
      {
        title: "Rewrite an angry customer reply professionally",
        difficulty: "Intermediate",
        estimatedMinutes: 15,
      },
      {
        title: "Create a support ticket summary",
        difficulty: "Beginner",
        estimatedMinutes: 10,
      },
      {
        title: "Draft a refund explanation",
        difficulty: "Intermediate",
        estimatedMinutes: 12,
      },
    ],
  },
  {
    id: "it-technician",
    title: "IT Technician",
    description:
      "Document troubleshooting, communicate with clients, and produce clear technical updates with AI support.",
    exercises: [
      {
        title: "Write a ticket update for a printer issue",
        difficulty: "Beginner",
        estimatedMinutes: 12,
      },
      {
        title: "Summarize troubleshooting steps",
        difficulty: "Intermediate",
        estimatedMinutes: 15,
      },
      {
        title: "Create a client-facing network report",
        difficulty: "Advanced",
        estimatedMinutes: 25,
      },
    ],
  },
  {
    id: "accounting",
    title: "Accounting / Bookkeeping",
    description:
      "Streamline invoicing, payment follow-ups, and expense categorization with practical AI workflows.",
    exercises: [
      {
        title: "Summarize invoices",
        difficulty: "Beginner",
        estimatedMinutes: 12,
      },
      {
        title: "Draft a payment reminder email",
        difficulty: "Beginner",
        estimatedMinutes: 10,
      },
      {
        title: "Categorize expenses",
        difficulty: "Intermediate",
        estimatedMinutes: 18,
      },
    ],
  },
  {
    id: "small-business-owner",
    title: "Small Business Owner",
    description:
      "Save time on marketing, customer communication, and weekly planning so you can focus on growing your business.",
    exercises: [
      {
        title: "Create a marketing post",
        difficulty: "Beginner",
        estimatedMinutes: 15,
      },
      {
        title: "Draft a customer email",
        difficulty: "Beginner",
        estimatedMinutes: 10,
      },
      {
        title: "Build a weekly business plan",
        difficulty: "Intermediate",
        estimatedMinutes: 20,
      },
    ],
  },
];
