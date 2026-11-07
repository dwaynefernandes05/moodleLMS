export type Subject = "DWM LAB" | "DBMS" | "Operating Systems" | "Software Engineering" | "HMI" | "Cloud Computing";
export const subjects: Subject[] = ["DWM LAB", "DBMS", "Operating Systems", "Software Engineering", "HMI", "Cloud Computing"];

export type StatusKey = "pending" | "submitted" | "graded";

export type Deliverable = {
  id: "ise2" | "da1" | "vm" | "srs";
  subject: Subject;
  status: StatusKey;
  accent: "red" | "blue" | "amber";
  label: string;
  title: string;
  sub: string;
  description: string;
  searchText: string;
};

export const deliverables: Deliverable[] = [
  {
    id: "ise2",
    subject: "DWM LAB",
    status: "pending",
    accent: "red",
    label: "FOURTH YR • DWM LAB (CPC701)",
    title: "ISE2 DWM PRACTICAL",
    sub: "Prof. Surekha Dholay • Lab Batch B2",
    description:
      "Implement association rule mining using Apriori and FP-Growth algorithms in Python. Submit Jupyter notebook with clear visual support graphs and dataset preprocessing steps for the Retail transactions.",
    searchText: "ISE2 DWM PRACTICAL CPC701 Surekha Dholay",
  },
  {
    id: "da1",
    subject: "DWM LAB",
    status: "submitted",
    accent: "blue",
    label: "FOURTH YR • DWM LAB (CPC701)",
    title: "DA1 ISE: K-Means Clustering",
    sub: "Prof. Surekha Dholay • Autonomous Track",
    description:
      "Formulate iterative cluster centers using Euclidean distance metrics and compute the Silhouette coefficient for optimal cluster count evaluation.",
    searchText: "DA1 ISE K-Means Clustering CPC701 Surekha Dholay",
  },
  {
    id: "vm",
    subject: "Operating Systems",
    status: "pending",
    accent: "amber",
    label: "FOURTH YR • OPERATING SYSTEMS (CPC702)",
    title: "Virtual Memory Sim Lab",
    sub: "Prof. Kailas Devadkar • Lab 4",
    description:
      "Build a memory management simulator in C++ comparing LRU (Least Recently Used), FIFO, and Optimal Page Replacement policies across sample 10,000 page reference traces.",
    searchText: "Virtual Memory Sim Lab CPC702 Kailas Devadkar",
  },
  {
    id: "srs",
    subject: "Software Engineering",
    status: "pending",
    accent: "blue",
    label: "FOURTH YR • SOFTWARE ENG (CPC703)",
    title: "SRS Document (IEEE 830 Std)",
    sub: "Prof. Anand Godbole • Capstone Module",
    description:
      "Author complete Software Requirements Specification (SRS) for your selected semester capstone project adhering to IEEE standard format, including Use Cases & non-functional requirements.",
    searchText: "SRS Document IEEE 830 CPC703 Anand Godbole",
  },
];

export type PastSubmission = {
  id: string;
  subject: Subject;
  status: StatusKey;
  course: string;
  submitted: string;
  chip: string;
  title: string;
  quote: string;
  by: string;
  score: number;
  outOf: number;
  grade: string;
  searchText: string;
};

export const pastSubmissions: PastSubmission[] = [
  {
    id: "dbms",
    subject: "DBMS",
    status: "graded",
    course: "DBMS LAB (CPC704)",
    submitted: "Submitted on Oct 24, 2:10 PM",
    chip: "On-Time (6h Early)",
    title: "Lab 4: Complex SQL Joins & Index Optimization",
    quote: "Exemplary query plan analysis. B-Tree index breakdown is thoroughly documented with benchmark graphs.",
    by: "Prof. M. Patil",
    score: 24,
    outOf: 25,
    grade: "Grade: O (Outstanding)",
    searchText: "DBMS LAB CPC704 Lab 4 Complex SQL Joins Index Optimization Patil",
  },
  {
    id: "hmi",
    subject: "HMI",
    status: "graded",
    course: "HMI (CPC705)",
    submitted: "Submitted on Oct 18, 11:42 PM",
    chip: "Verified",
    title: "Assignment 2: Fitts' Law Micro-Interaction Heuristics",
    quote: "Thoughtful UI design decisions. Ensure touch targets on mobile viewports adhere strictly to the 48×48px rule next time.",
    by: "Prof. S. Rane",
    score: 18,
    outOf: 20,
    grade: "Grade: A+ (Very Good)",
    searchText: "HMI CPC705 Assignment 2 Fitts Law Micro-Interaction Heuristics Rane",
  },
];
