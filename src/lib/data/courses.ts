export type CourseCategory = "core" | "elective" | "lab";
export type Tone = "blue" | "green" | "amber" | "red";

export type CoursePanel =
  | { type: "alert"; title: string; text: string }
  | { type: "tiles"; tiles: { icon: "file" | "quiz"; title: string; sub: string }[] }
  | { type: "tile"; icon: "terminal" | "cloud" | "check" | "users"; title: string; sub: string; trailing?: "external" }
  | { type: "none" };

export type Course = {
  id: string;
  code: string;
  kind: string;
  category: CourseCategory;
  title: string;
  prof: string;
  status: { text: string; tone: Tone; icon: "dot" | "check" | "calendar" | "bell" | "star" | "timer" };
  progress: { label: string; value: string; pct: number; tone: Tone; valueTone: Tone; note: string };
  panel: CoursePanel;
  primary?: { label: string; href: string };
  footerIcons: ("book" | "history" | "grid" | "help" | "download" | "chat" | "chart" | "network")[];
  hubHref?: string;
};

export const courses: Course[] = [
  {
    id: "cpc701",
    code: "CPC701",
    kind: "Lab Practical",
    category: "lab",
    title: "Data Warehousing & Mining Lab",
    prof: "Prof. Rohini Chaudhari, Prof. Surekha Dholay",
    status: { text: "Due in 18h", tone: "red", icon: "dot" },
    progress: {
      label: "Practical Journal Progress",
      value: "75% (6/8 Exp)",
      pct: 75,
      tone: "blue",
      valueTone: "blue",
      note: "Exp 7: Apriori Algorithm on Retail Dataset",
    },
    panel: { type: "alert", title: "ISE-1 Journal Submission", text: "Requires verified PDF & Python Notebook" },
    primary: { label: "Submit Exp 7", href: "/assignments/ise2-dwm-practical/submit" },
    footerIcons: ["book", "history"],
    hubHref: "/courses/dwm-lab",
  },
  {
    id: "cpc702",
    code: "CPC702",
    kind: "Core Theory",
    category: "core",
    title: "Design & Analysis of Algorithms",
    prof: "Prof. Swati Vyas",
    status: { text: "All Caught Up", tone: "green", icon: "check" },
    progress: {
      label: "Syllabus Covered",
      value: "82% (Module 5/6)",
      pct: 82,
      tone: "blue",
      valueTone: "blue",
      note: "Current Topic: Dynamic Programming (Bellman-Ford)",
    },
    panel: {
      type: "tiles",
      tiles: [
        { icon: "file", title: "Module 5 Notes", sub: "14 Slides (.PDF)" },
        { icon: "quiz", title: "MSE Quiz #2", sub: "Completed (19/20)" },
      ],
    },
    footerIcons: ["grid", "help"],
  },
  {
    id: "pe-cs703",
    code: "PE-CS703",
    kind: "Elective III",
    category: "elective",
    title: "Business Analytics Using Python",
    prof: "Prof. Shweta Jamdhade",
    status: { text: "Quiz: Nov 15", tone: "amber", icon: "calendar" },
    progress: {
      label: "Course Completion",
      value: "90%",
      pct: 90,
      tone: "green",
      valueTone: "blue",
      note: "Capstone: Predictive Churn Modelling",
    },
    panel: { type: "tile", icon: "terminal", title: "Jupyter Workspaces", sub: "Pandas, Scikit-learn datasets ready", trailing: "external" },
    footerIcons: ["download"],
  },
  {
    id: "bda-pe4",
    code: "BDA-PE4",
    kind: "Elective IV",
    category: "elective",
    title: "Big Data Analytics",
    prof: "Prof. Aparna Halbe",
    status: { text: "New Note Uploaded", tone: "blue", icon: "bell" },
    progress: {
      label: "Syllabus Covered",
      value: "64% (Module 4/6)",
      pct: 64,
      tone: "blue",
      valueTone: "blue",
      note: "Apache Hadoop & Spark Streaming",
    },
    panel: { type: "tile", icon: "cloud", title: "SparkRDD_PySpark_LabSetup.pdf", sub: "Uploaded today at 11:20 AM" },
    footerIcons: ["chat"],
  },
  {
    id: "hmi-cs306",
    code: "HMI-CS306",
    kind: "Core Theory",
    category: "core",
    title: "Human Machine Interaction",
    prof: "Dr. Dhananjay Kalbande (HOD)",
    status: { text: "Grade: A+ (19/20)", tone: "blue", icon: "star" },
    progress: {
      label: "Course Progress",
      value: "90% Completed",
      pct: 90,
      tone: "green",
      valueTone: "green",
      note: "Evaluated: Mid-Semester Heuristic UX Audit",
    },
    panel: {
      type: "tile",
      icon: "check",
      title: "Rubric Feedback Published",
      sub: "“Excellent visual cognitive hierarchy & accessibility”",
    },
    footerIcons: ["chart"],
  },
  {
    id: "se-div-ab",
    code: "SE-DIV-AB",
    kind: "Core Theory",
    category: "core",
    title: "Software Engineering & Agile Methodologies",
    prof: "Prof. Varsha Hole",
    status: { text: "Sprint 3 Active", tone: "amber", icon: "timer" },
    progress: {
      label: "Project Milestone Progress",
      value: "78%",
      pct: 78,
      tone: "blue",
      valueTone: "blue",
      note: "Team: ByteCoders (Sprint Planning 3 Review on Friday)",
    },
    panel: { type: "tile", icon: "users", title: "Team SRS Document v2.1", sub: "4 Peer reviews recorded" },
    footerIcons: ["network"],
  },
];

export const officialDownloads = [
  { id: "scheme", icon: "pdf", title: "Sem VII Academic Scheme & Syllabus", sub: "Official Autonomy PDF (2.4 MB)" },
  { id: "timetable", icon: "calendar", title: "End-Sem Exam Timetable (ESE Dec 24)", sub: "Published 2 days ago" },
  { id: "project", icon: "image", title: "Major Project Stage-1 Guidelines", sub: "Rubrics & Defense Dates" },
] as const;

export const officeHours = [
  { id: "dk", name: "Dr. Dhananjay Kalbande", sub: "Cabin 402 • HOD Office", time: "3:00 - 4:30 PM", tone: "green" },
  { id: "sv", name: "Prof. Swati Vyas", sub: "Cabin 307 • Algorithms Lab", time: "11:30 - 1:00 PM", tone: "blue" },
  { id: "rc", name: "Prof. Rohini Chaudhari", sub: "DWM Practical Lab 2", time: "Tomorrow 10 AM", tone: "neutral" },
] as const;

export const attendance = [
  { label: "Data Warehousing & Mining", value: 92.0, tone: "green" },
  { label: "Design & Analysis of Algo", value: 84.5, tone: "green" },
  { label: "Business Analytics (Python)", value: 78.0, tone: "amber" },
] as const;

export const archived = [
  { id: "s6", title: "Semester VI (Even 23-24)", sub: "GPA: 9.15 • 7 Subjects", icon: "arrow" },
  { id: "s5", title: "Semester V (Odd 23-24)", sub: "GPA: 8.80 • 6 Subjects", icon: "arrow" },
  { id: "s1-4", title: "Semesters I – IV (FE & SE)", sub: "Transcripts & Hall Tickets", icon: "folder" },
] as const;
