export const dwmLab = {
  code: "IT402L",
  dept: "DEPT OF INFORMATION TECHNOLOGY",
  term: "Odd Semester 2024-25",
  title: "Fourth yr – DWM LAB",
  subtitle: "(Data Warehousing & Mining)",
  instructor: "Prof. Rohini Chaudhari",
  batches: "Batches: Div A & Div B (All Batches)",
  nextSession: { label: "Next Session:", value: "Thursday 11:00 AM - 1:00 PM (Lab 403)" },
};

export type Attachment = { name: string; size: string; icon: "pdf" | "csv" | "sql" };

export type Practical = {
  id: string;
  code: string;
  kind: string;
  closes: string;
  closesTone: "red" | "amber";
  title: string;
  description: string;
  attachLabel: string;
  attachments: Attachment[];
  points: string;
  footerNote: string;
  secondary: string;
  primary: string;
  noteTone: "ok" | "plain";
  submitHref: string;
};

export const activePracticals: Practical[] = [
  {
    id: "ise2",
    code: "LAB-ISE-02",
    kind: "INTERNAL SESSIONAL EXAM PRACTICAL",
    closes: "Closes Nov 5, 2:45 PM",
    closesTone: "red",
    title: "ISE2 DWM PRACTICAL: Multi-Algorithm Evaluation",
    description:
      "Perform Comparative Classification Analysis on Diabetes Dataset with Naive Bayes, J48 Decision Tree, and Apriori Association in WEKA or Python.",
    attachLabel: "DIRECT ATTACHMENTS:",
    attachments: [
      { name: "ISE2_Problem_Statement_v2.pdf", size: "(340 KB)", icon: "pdf" },
      { name: "diabetes_cleaned_dataset.csv", size: "(1.2 MB)", icon: "csv" },
    ],
    points: "Max Points: 30",
    footerNote: "Single PDF or ZIP accepted • In-browser compression active",
    noteTone: "ok",
    secondary: "View Scoring Rubric",
    primary: "Submit Response",
    submitHref: "/assignments/ise2-dwm-practical/submit",
  },
  {
    id: "da1",
    code: "LAB-DA-01",
    kind: "DOMAIN ASSESSMENT",
    closes: "Closes Nov 12, 11:59 PM",
    closesTone: "amber",
    title: "DA1 ISE: Multi-Dimensional OLAP Modeling",
    description:
      "Design Star Schema and Snowflake Schema for Academic Admissions System. Execute Roll-up, Drill-down, and Slice queries in PostgreSQL.",
    attachLabel: "STARTER KIT:",
    attachments: [{ name: "olap_schema_template.sql", size: "(18 KB)", icon: "sql" }],
    points: "Weightage: 10 Marks",
    footerNote: "Not yet submitted",
    noteTone: "plain",
    secondary: "Lab Instructions",
    primary: "Submit Practical",
    submitHref: "/assignments/ise2-dwm-practical/submit",
  },
];

export type Evaluated = {
  id: string;
  code: string;
  label: string;
  title: string;
  description: string;
  score: string;
  grade: string;
  feedback?: { by: string; when: string; quote: string };
  submitted: string;
  file?: { name: string; size: string };
  action: { label: string; kind: "button" | "link" };
};

export const evaluated: Evaluated[] = [
  {
    id: "exp8",
    code: "EXP-08",
    label: "EVALUATED & CERTIFIED",
    title: "EXP 8: Association Rule Mining using Apriori Algorithm",
    description: "Frequent itemset generation with Minimum Support = 0.4 and Minimum Confidence = 0.7 on Retail Grocery transactions.",
    score: "29 / 30",
    grade: "GRADE A+",
    feedback: {
      by: "Prof. Rohini Chaudhari:",
      when: "Oct 26, 2024 at 4:15 PM",
      quote:
        "“Excellent execution and clear confusion matrix analysis. Graph plot of support vs confidence was meticulously formatted according to IEEE standards.”",
    },
    submitted: "Submitted Oct 24, 2024 (11:22 AM)",
    file: { name: "2022300045_Exp8_Apriori_Report.pdf", size: "(4.1 MB)" },
    action: { label: "Download Signed Copy", kind: "button" },
  },
  {
    id: "exp1",
    code: "EXP-01",
    label: "EVALUATED",
    title: "Practical 1: ETL Pipeline in Python & Data Warehousing Setup",
    description: "Extracting heterogeneous logs, cleaning categorical noise, and loading normalized tables into central warehouse.",
    score: "28 / 30",
    grade: "GRADE A",
    submitted: "Submitted Aug 19, 2024 • Graded by TA Ronak Shah",
    action: { label: "View Submission & Notebook", kind: "link" },
  },
];

export const utilities = [
  { id: "manual", icon: "pdf", title: "DWM Lab Manual 2024-25", sub: "Official Department Format • 8.4 MB", trailing: "download" },
  { id: "datasets", icon: "grid", title: "Standard Datasets Folder", sub: "ARFF, CSV, SQL Dumps • 14 Files", trailing: "folder" },
  { id: "jupyter", icon: "code", title: "Jupyter Notebook Starter", sub: "SPIT Header & Rubric Pre-filled", trailing: "download" },
  { id: "weka", icon: "terminal", title: "WEKA 3.8 Machine Config", sub: "Java JVM Memory Flags • Guide", trailing: "external" },
] as const;

export const lectureNotes = [
  { id: "n1", title: "Module 1: Data Warehouse Architecture & OLAP", meta: "PDF • 2.6 MB • Updated Jul 22, 2024" },
  { id: "n2", title: "Module 3: Classification — Naive Bayes & Decision Trees", meta: "PPTX • 5.1 MB • Updated Sep 03, 2024" },
  { id: "n3", title: "Module 4: Association Rules — Apriori & FP-Growth", meta: "PDF • 3.4 MB • Updated Oct 11, 2024" },
  { id: "n4", title: "Module 5: Clustering — K-Means & Hierarchical", meta: "PDF • 4.0 MB • Updated Oct 29, 2024" },
];

export const courseAnnouncements = [
  { id: "a1", unread: true, title: "ISE2 practical slot closes Nov 5, 2:45 PM", meta: "Prof. Rohini Chaudhari • Today, 9:10 AM" },
  { id: "a2", unread: true, title: "Lab 403 will be open for extra practice on Wednesday", meta: "Ronak Shah (TA) • Yesterday" },
  { id: "a3", unread: false, title: "EXP 8 marks have been published", meta: "Prof. Rohini Chaudhari • Oct 26, 2024" },
  { id: "a4", unread: false, title: "WEKA 3.8 configuration guide uploaded", meta: "Ronak Shah (TA) • Oct 14, 2024" },
];

export const marks = [
  { id: "m1", label: "EXP 8: Association Rule Mining", score: "29 / 30", grade: "A+" },
  { id: "m2", label: "Practical 1: ETL Pipeline", score: "28 / 30", grade: "A" },
];

export const competencies = [
  { label: "Data Preprocessing & ETL", value: 96 },
  { label: "Classification Algorithms", value: 92 },
  { label: "Association Rule Mining", value: 97 },
  { label: "Clustering & Evaluation", value: 88 },
];
