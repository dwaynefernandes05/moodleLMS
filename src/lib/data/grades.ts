export type GradeLetter = "O" | "A+" | "A";

export type GradedCourse = {
  id: string;
  kind: "graded";
  code: string;
  credits: string;
  status: { text: string; icon: "award" | "check" | "check-outline" };
  title: string;
  faculty: string;
  aggregate: string;
  aggregateGreen?: boolean;
  grade: GradeLetter;
  points: string;
  components: { label: string; value: string }[];
};

export type PendingCourse =
  | {
      id: string;
      kind: "lab";
      code: string;
      credits: string;
      status: string;
      title: string;
      faculty: string;
      partial: string;
      outOf: string;
      note: string;
    }
  | {
      id: string;
      kind: "awaiting";
      code: string;
      credits: string;
      status: string;
      title: string;
      faculty: string;
      release: string;
      releaseNote: string;
      badge: "Pending" | "Upcoming";
    };

export type GradeCourse = GradedCourse | PendingCourse;

export const gradeCourses: GradeCourse[] = [
  {
    id: "cs401",
    kind: "graded",
    code: "CS401 • OE",
    credits: "Credits: 3.0",
    status: { text: "Subject Topper", icon: "award" },
    title: "Business Analytics Using Python",
    faculty: "Faculty: Prof. K. T. Talele • Div A (2024-25 ODD)",
    aggregate: "92.40",
    aggregateGreen: true,
    grade: "O",
    points: "10 PTS",
    components: [
      { label: "In-Sem (ISE)", value: "23.00 / 25" },
      { label: "Mid-Sem (MSE)", value: "27.50 / 30" },
      { label: "Lab Practical", value: "23.50 / 25" },
    ],
  },
  {
    id: "cs402",
    kind: "graded",
    code: "CS402 • PC",
    credits: "Credits: 4.0",
    status: { text: "Finalized", icon: "check" },
    title: "Software Engineering 25-26 A&B div",
    faculty: "Faculty: Dr. Anand Godbole • Division A & B",
    aggregate: "94.20",
    aggregateGreen: true,
    grade: "O",
    points: "10 PTS",
    components: [
      { label: "In-Sem (ISE)", value: "24.00 / 25" },
      { label: "Mid-Sem (MSE)", value: "28.50 / 30" },
      { label: "SRS Project", value: "29.00 / 30" },
    ],
  },
  {
    id: "cs403",
    kind: "graded",
    code: "CS403 • PC",
    credits: "Credits: 4.0",
    status: { text: "Graded", icon: "check-outline" },
    title: "CSE DBMS 24-25 ODD",
    faculty: "Faculty: Prof. Harshil Kanakia • Database Systems Lab",
    aggregate: "88.75",
    grade: "A+",
    points: "9 PTS",
    components: [
      { label: "ISE Quiz & Task", value: "23.50 / 25" },
      { label: "MSE Exam", value: "27.00 / 30" },
      { label: "SQL Lab Practicals", value: "37.00 / 40" },
    ],
  },
  {
    id: "cs304",
    kind: "graded",
    code: "CS304 • Core",
    credits: "Credits: 3.0",
    status: { text: "Graded", icon: "check-outline" },
    title: "PSOOP ISE 2023–24 (Object Oriented Programming)",
    faculty: "Faculty: Prof. Pallavi Thakur • Java & Design Patterns",
    aggregate: "78.50",
    grade: "A",
    points: "8 PTS",
    components: [
      { label: "ISE Theory", value: "20.00 / 25" },
      { label: "Mid-Sem (MSE)", value: "24.00 / 30" },
      { label: "OOP Lab Experiments", value: "36.00 / 45" },
    ],
  },
  {
    id: "cs405",
    kind: "graded",
    code: "CS405 • PE",
    credits: "Credits: 3.0",
    status: { text: "Graded", icon: "check-outline" },
    title: "BDA_PE_2025-26_EVEN (Big Data Analytics)",
    faculty: "Faculty: Prof. Kailas Devadkar • Spark & Hadoop",
    aggregate: "82.00",
    grade: "A",
    points: "8 PTS",
    components: [
      { label: "ISE Phase 1", value: "21.00 / 25" },
      { label: "Mid-Sem MSE", value: "20.50 / 25" },
      { label: "Cluster Lab", value: "42.00 / 50" },
    ],
  },
  {
    id: "cs406",
    kind: "lab",
    code: "CS406 • Lab",
    credits: "Credits: 2.0",
    status: "1 Lab Submission Pending",
    title: "Fourth yr -DWM LAB-Assign (Data Warehouse & Mining)",
    faculty: "Faculty: Prof. Preetida Jani • Division A",
    partial: "14.20",
    outOf: "/ 15",
    note: "Lab Assignment 4 (Association Rule Mining) due in 3 days.",
  },
  {
    id: "cs407",
    kind: "awaiting",
    code: "CS407 • Core",
    credits: "Credits: 4.0",
    status: "Awaiting Faculty Evaluation",
    title: "Operating Systems 24-25 (Advanced Kernel Architecture)",
    faculty: "Faculty: Prof. D. G. Borse • Mid-Semester Papers in Moderation",
    release: "Release: Nov 04",
    releaseNote: "Departmental Moderation",
    badge: "Pending",
  },
  {
    id: "cs408",
    kind: "awaiting",
    code: "CS408 • Core",
    credits: "Credits: 3.0",
    status: "Awaiting Faculty Evaluation",
    title: "Distributed Computing & Cloud Consensus",
    faculty: "Faculty: Dr. Aarti M. Karande • ISE Quiz scheduled Nov 12",
    release: "Release: Nov 15",
    releaseNote: "Awaiting Quiz Submissions",
    badge: "Upcoming",
  },
];

export const sgpa = [
  { sem: "S1", value: 8.5 },
  { sem: "S3", value: 8.75 },
  { sem: "S5", value: 8.92 },
  { sem: "S7", value: 9.22 },
];

export const gradeBands = [
  { letter: "O", label: "Outstanding", range: "90.00 – 100% (10 GP)", tone: "green" },
  { letter: "A+", label: "Excellent", range: "80.00 – 89.99% (9 GP)", tone: "blue" },
  { letter: "A", label: "Very Good", range: "70.00 – 79.99% (8 GP)", tone: "blue" },
  { letter: "B+", label: "Good", range: "60.00 – 69.99% (7 GP)", tone: "amber" },
  { letter: "B", label: "Above Average", range: "50.00 – 59.99% (6 GP)", tone: "slate" },
] as const;
