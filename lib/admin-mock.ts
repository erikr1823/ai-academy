export type StudentStatus = "Active" | "Needs Help" | "Inactive";

export type Student = {
  id: string;
  name: string;
  track: string;
  currentWeek: number;
  progress: number;
  status: StudentStatus;
  lastActive: string;
};

export const adminStats = {
  totalStudents: 124,
  activeThisWeek: 92,
  averageCompletion: 68,
  certificatesEarned: 37,
};

export const students: Student[] = [
  {
    id: "erik-rivera",
    name: "Erik Rivera",
    track: "AI Builder Academy",
    currentWeek: 6,
    progress: 62,
    status: "Active",
    lastActive: "Today",
  },
  {
    id: "susan-miller",
    name: "Susan Miller",
    track: "AI Essentials",
    currentWeek: 3,
    progress: 45,
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: "carlos-reyes",
    name: "Carlos Reyes",
    track: "AI Builder Academy",
    currentWeek: 4,
    progress: 38,
    status: "Needs Help",
    lastActive: "3 days ago",
  },
  {
    id: "maria-johnson",
    name: "Maria Johnson",
    track: "AI Essentials",
    currentWeek: 7,
    progress: 82,
    status: "Active",
    lastActive: "Today",
  },
];

export const essentialsOverview = {
  name: "AI Essentials",
  enrolled: 68,
  avgProgress: 71,
  completionsThisMonth: 5,
};

export const builderOverview = {
  name: "AI Builder Academy",
  enrolled: 56,
  avgProgress: 58,
  completionsThisMonth: 2,
};

export const simulatorOverview = {
  name: "Workplace Simulator",
  usageSessions: 214,
  activeUsers: 47,
  topRole: "Office Manager",
};

export const trackOverview = [
  essentialsOverview,
  builderOverview,
  simulatorOverview,
];

export const recentAlerts = [
  "Carlos needs mentor support",
  "12 assignments pending review",
  "5 students completed AI Essentials this week",
];
