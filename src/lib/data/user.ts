export const user = {
  name: "Shreyash Singh",
  firstName: "Shreyash",
  uid: "2022300045",
  initials: "SS",
};

export type NavLink = {
  label: string;
  lines: string[];
  href: string;
  match: (pathname: string) => boolean;
};

export const navLinks: NavLink[] = [
  { label: "Dashboard", lines: ["Dashboard"], href: "/", match: (p) => p === "/" },
  { label: "My Courses", lines: ["My", "Courses"], href: "/courses", match: (p) => p.startsWith("/courses") },
  {
    label: "Upcoming Deadlines & Tasks",
    lines: ["Upcoming", "Deadlines", "& Tasks"],
    href: "/assignments",
    match: (p) => p.startsWith("/assignments"),
  },
  {
    label: "Announcements & Updates",
    lines: ["Announcements", "& Updates"],
    href: "/announcements",
    match: (p) => p.startsWith("/announcements"),
  },
];
