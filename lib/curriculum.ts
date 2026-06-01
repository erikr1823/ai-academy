export type ModuleStatus = "completed" | "in_progress" | "available" | "locked";

export type CurriculumModule = {
  week: number;
  title: string;
  status: ModuleStatus;
  xp: number;
  estimatedMinutes: number;
  progress: number;
  lessons: number;
};

export type CurriculumTrack = {
  id: "essentials" | "builder";
  name: string;
  durationWeeks: number;
  description: string;
  modules: CurriculumModule[];
};

function essentialsModules(): CurriculumModule[] {
  const titles = [
    "What is AI?",
    "ChatGPT Basics",
    "Writing Better Prompts",
    "Email Automation",
    "Meeting Summaries",
    "Excel and Data Analysis",
    "AI for Your Industry",
    "Final Project",
  ];

  return titles.map((title, index) => {
    const week = index + 1;
    let status: ModuleStatus = "locked";
    let progress = 0;

    if (week <= 2) {
      status = "completed";
      progress = 100;
    } else if (week === 3) {
      status = "in_progress";
      progress = 65;
    } else if (week === 4) {
      status = "available";
      progress = 0;
    }

    return {
      week,
      title,
      status,
      xp: 100 + week * 25,
      estimatedMinutes: 45 + week * 5,
      progress,
      lessons: 4,
    };
  });
}

function builderModules(): CurriculumModule[] {
  const titles: Record<number, string> = {
    1: "AI Fundamentals",
    2: "Prompt Engineering",
    3: "AI Workflows",
    4: "Automation",
    5: "APIs",
    6: "Databases",
    7: "AI Agents",
    8: "Web Applications",
    9: "Vector Databases & RAG",
    10: "Document Processing Pipelines",
    11: "Multi-Agent Systems",
    12: "Testing AI Applications",
    13: "Error Handling & Observability",
    14: "Security & Guardrails",
    15: "Cost Optimization",
    16: "Streaming & Real-time AI",
    17: "Authentication & User Sessions",
    18: "CI/CD for AI Projects",
    19: "Monitoring & Analytics",
    20: "Payment & Billing Integration",
    21: "Scaling to Production",
    22: "Performance Tuning",
    23: "Portfolio Project Build",
    24: "Capstone: Ship to Production",
  };

  return Array.from({ length: 24 }, (_, index) => {
    const week = index + 1;
    let status: ModuleStatus = "locked";
    let progress = 0;

    if (week <= 4) {
      status = "completed";
      progress = 100;
    } else if (week === 5) {
      status = "in_progress";
      progress = 40;
    } else if (week === 6) {
      status = "available";
      progress = 0;
    }

    return {
      week,
      title: titles[week],
      status,
      xp: 150 + week * 30,
      estimatedMinutes: 60 + week * 8,
      progress,
      lessons: week <= 8 ? 5 : 4,
    };
  });
}

export const curriculumTracks: CurriculumTrack[] = [
  {
    id: "essentials",
    name: "AI Essentials",
    durationWeeks: 8,
    description:
      "Workplace AI fluency for professionals 45+. Master practical tools in 8 weeks.",
    modules: essentialsModules(),
  },
  {
    id: "builder",
    name: "AI Builder Academy",
    durationWeeks: 24,
    description:
      "Build and deploy AI products, agents, and workflows over a 24-week builder track.",
    modules: builderModules(),
  },
];

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function getTrackStats(track: CurriculumTrack) {
  const completed = track.modules.filter((m) => m.status === "completed").length;
  const inProgress = track.modules.filter((m) => m.status === "in_progress").length;
  const locked = track.modules.filter((m) => m.status === "locked").length;
  const totalXp = track.modules.reduce((sum, m) => sum + m.xp, 0);
  const earnedXp = track.modules
    .filter((m) => m.status === "completed")
    .reduce((sum, m) => sum + m.xp, 0);
  const partialXp = track.modules
    .filter((m) => m.status === "in_progress")
    .reduce((sum, m) => sum + Math.round((m.xp * m.progress) / 100), 0);

  const totalMinutes = track.modules.reduce((sum, m) => sum + m.estimatedMinutes, 0);
  const remainingMinutes = track.modules
    .filter((m) => m.status !== "completed")
    .reduce((sum, m) => {
      if (m.status === "in_progress") {
        return sum + Math.round(m.estimatedMinutes * (1 - m.progress / 100));
      }
      return sum + m.estimatedMinutes;
    }, 0);

  const progressPercent = Math.round(
    track.modules.reduce((sum, m) => {
      if (m.status === "completed") return sum + 100;
      if (m.status === "in_progress") return sum + m.progress;
      return sum;
    }, 0) / track.modules.length
  );

  return {
    completed,
    inProgress,
    locked,
    totalModules: track.modules.length,
    totalXp,
    earnedXp: earnedXp + partialXp,
    progressPercent,
    totalTime: formatMinutes(totalMinutes),
    remainingTime: formatMinutes(remainingMinutes),
  };
}
