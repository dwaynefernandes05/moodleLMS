export type Notice = {
  id: string;
  source: string;
  tone: "red" | "blue" | "green";
  time: string;
  title: string;
  description: string;
};

export const notices: Notice[] = [
  {
    id: "hod-cse",
    source: "HOD CSE NOTICE",
    tone: "red",
    time: "Today, 11:30 AM",
    title: "Mid-Term In-Semester Evaluation (ISE II) Schedule Revised",
    description:
      "Revised timetable for 7th Sem CSE uploaded. Practical viva examinations will commence from...",
  },
  {
    id: "exam-cell",
    source: "EXAM CELL",
    tone: "blue",
    time: "Yesterday",
    title: "Attendance Criteria Notice for Hall Ticket Release",
    description:
      "Mandatory 75% biometric attendance required by Nov 25 closure date for autonomous hall ticket...",
  },
  {
    id: "tnp-cell",
    source: "T&P CELL SPIT",
    tone: "green",
    time: "3 days ago",
    title: "Campus Placement Drive: Morgan Stanley & Barclays",
    description: "Resume shortlists declared on portal. Shortlisted students to report in Audi 1.",
  },
];
