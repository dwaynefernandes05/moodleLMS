export const welcome = {
  title: "Welcome back, Shreyash!",
  chip: "SEM 7 · COMPUTER ENGINEERING",
  subline: "B.Tech Academic Year 2024–25 · Autonomous Autonomy 2.0 Track",
  progress: 84,
  activeCourses: "5 Courses",
  pendingDeadlines: "3 Tasks",
  overdue: "0 Overdue",
};

export const urgent = {
  chip: "Due in 18 Hours",
  course: "ISE2 DWM PRACTICAL",
  headline: "Tomorrow, 2:45 PM · Submission Slot Closes",
  meta: "Fourth Year B.Tech CSE · Lab Batch B2 · Evaluator: Prof. Dr. Anand Godbole",
};

export type UpcomingKind = "pending" | "draft" | "quiz" | "graded";

export type UpcomingItem = {
  id: string;
  kind: UpcomingKind;
  title: string;
  chip: string;
  course: string;
  meta: string;
  metaTone?: "red" | "default";
  extra?: string;
  action: string;
  quote?: string;
};

export const upcoming: UpcomingItem[] = [
  {
    id: "ise2",
    kind: "pending",
    title: "ISE2 DWM PRACTICAL",
    chip: "Not Submitted",
    course: "Course: Fourth Year - DWM LAB (CS402L) · 10 Marks",
    meta: "Due in 18 hrs (Tomorrow, 2:45 PM)",
    metaTone: "red",
    extra: "Max 10MB PDF",
    action: "Upload",
  },
  {
    id: "da1",
    kind: "draft",
    title: "DA1 ISE (Association Rule Mining)",
    chip: "Draft Saved (v1.2)",
    course: "Course: Fourth Year - DWM LAB (CS402L) · Prof. Vaishali",
    meta: "Due Nov 12, 11:59 PM (in 4 days)",
    extra: "2 files uploaded",
    action: "Resume & Submit",
  },
  {
    id: "ds-quiz",
    kind: "quiz",
    title: "Data Structures ISE Quiz",
    chip: "Upcoming Online Quiz",
    course: "Course: CSE 24-25 Core Elective · 45 mins · 30 Questions",
    meta: "Window opens: Nov 15, 10:00 AM",
    action: "Guidelines",
  },
  {
    id: "exp8",
    kind: "graded",
    title: "EXP 8: K-Means Clustering on Census Dataset",
    chip: "Graded: 28 / 30",
    course: "Course: Fourth Year - DWM LAB · Verified by Prof. A. Godbole",
    meta: "",
    action: "View Annotated Feedback",
    quote: "“Excellent convergence analysis with elbow graph. Clean code documentation!”",
  },
];

export type Material = {
  id: string;
  subject: string;
  title: string;
  fullTitle: string;
  size: string;
  meta: string;
  kind: "pdf" | "video" | "code";
};

export const materials: Material[] = [
  {
    id: "dwm-manual",
    subject: "DWM LAB MANUAL",
    title: "Module 4: OLAP Cube…",
    fullTitle: "Module 4: OLAP Cube Design and Operations",
    size: "3.8 MB",
    meta: "Updated 2 days ago",
    kind: "pdf",
  },
  {
    id: "dist-sys",
    subject: "DISTRIBUTED SYSTEMS",
    title: "Lec 14: Paxos & Raft…",
    fullTitle: "Lec 14: Paxos & Raft Consensus Algorithms",
    size: "14.2 MB",
    meta: "Uploaded by Prof. S. Rao",
    kind: "video",
  },
  {
    id: "os",
    subject: "OPERATING SYSTEMS",
    title: "Kernel Page Fault Handler…",
    fullTitle: "Kernel Page Fault Handler Implementation",
    size: "1.1 MB",
    meta: "Archived C++ Source Code",
    kind: "code",
  },
];
