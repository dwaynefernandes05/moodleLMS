import { chromium } from "playwright";
const base = process.env.QA_BASE || "http://localhost:3000";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1283, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage();
const ok = (c, m) => console.log((c ? "PASS " : "FAIL ") + m);

// Theme toggle + persistence
await p.goto(base + "/", { waitUntil: "networkidle" });
ok(!(await p.evaluate(() => document.documentElement.classList.contains("dark"))), "starts light (OS light)");
await p.getByRole("button", { name: "Switch to dark mode" }).click();
ok(await p.evaluate(() => document.documentElement.classList.contains("dark")), "toggle -> dark");
await p.reload({ waitUntil: "networkidle" });
ok(await p.evaluate(() => document.documentElement.classList.contains("dark")), "dark persists after reload");
await p.getByRole("button", { name: "Switch to light mode" }).click();

// Cmd/Ctrl+K
await p.keyboard.press("Control+k");
ok(await p.evaluate(() => document.activeElement?.getAttribute("aria-label") === "Search courses, practicals, notes"), "Ctrl+K focuses search");

// Calendar nav
await p.getByRole("button", { name: "Next month" }).click();
ok(await p.getByRole("heading", { name: /December 2024/ }).isVisible(), "calendar -> December 2024");

// Courses filters
await p.goto(base + "/courses", { waitUntil: "networkidle" });
await p.getByRole("tab", { name: /Electives/ }).click();
ok(await p.getByRole("heading", { name: "Business Analytics Using Python" }).isVisible() && !(await p.getByRole("heading", { name: "Data Warehousing & Mining Lab" }).isVisible()), "electives tab filters courses");
const search = p.getByLabel(/Search enrolled courses/);
await search.fill("zzzz");
ok(await p.getByText("No courses match").isVisible(), "search empty state");
await search.press("Escape");
ok((await search.inputValue()) === "", "Esc clears search");

// Assignments filters
await p.goto(base + "/assignments", { waitUntil: "networkidle" });
await p.getByRole("tab", { name: /Graded/ }).click();
ok(await p.getByText("0 Actionable Tasks").isVisible(), "graded tab hides active deliverables");
await p.getByRole("tab", { name: /^All/ }).click();
await p.getByRole("button", { name: "Simulate Dragging 24MB PDF" }).click();
await p.waitForTimeout(400);
ok(await p.getByText(/Compressing locally/).isVisible(), "assignments: compression progress shown");
await p.waitForTimeout(1600);
ok(await p.getByText(/62% saved/).isVisible(), "assignments: 24 MB -> 9.0 MB (62% saved)");

// Submit flow
await p.goto(base + "/assignments/ise2-dwm-practical/submit", { waitUntil: "networkidle" });
const submit = p.getByRole("button", { name: /Submit Assignment for Final Grading/ });
ok(await submit.isEnabled(), "submit enabled initially (files + honor checked)");
await p.getByRole("checkbox", { name: "SPIT Academic Honor Declaration" }).click();
ok(await submit.isDisabled(), "submit disabled when honor unchecked");
await p.getByRole("checkbox", { name: "SPIT Academic Honor Declaration" }).click();
await p.setInputFiles('input[type=file]', [
  { name: "big.pdf", mimeType: "application/pdf", buffer: Buffer.alloc(25 * 1024 * 1024) },
  { name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("hi") },
  { name: "small.py", mimeType: "text/x-python", buffer: Buffer.from("print(1)") },
]);
await p.waitForTimeout(500);
ok(await p.getByText(/Auto-compressing locally/).isVisible(), "submit: progress bar for >20MB file");
ok(await p.getByText(/is not accepted/).isVisible(), "submit: inline error for .txt");
await p.waitForTimeout(1800);
ok(await p.getByText("Validated & Ready").count() >= 2, "submit: small files validated");
ok(await p.getByText(/Processed Files for Submission \(5\)/i).isVisible(), "submit: 5 rows listed");
await p.getByRole("button", { name: "Remove notes.txt" }).click();
ok(await p.getByText(/Processed Files for Submission \(4\)/i).isVisible(), "submit: remove works");
await submit.click();
await p.waitForTimeout(1800);
ok(await p.getByText(/Submission received & locked/).isVisible(), "submit: success state");
ok(await p.getByText(/SHA-256 · [0-9a-f]{64}/).isVisible(), "submit: receipt id (64 hex)");
ok(await p.getByText("Submitted", { exact: true }).isVisible(), "submit: status label Submitted");

// Profile countdown
await p.goto(base + "/profile", { waitUntil: "networkidle" });
const t1 = await p.getByRole("timer").innerText();
await p.waitForTimeout(2200);
const t2 = await p.getByRole("timer").innerText();
ok(t1 !== t2, `profile countdown ticks (${t1.trim()} -> ${t2.trim()})`);

// Grades tabs
await p.goto(base + "/grades", { waitUntil: "networkidle" });
await p.getByRole("tab", { name: /In-Progress/ }).click();
ok(await p.getByText("Distributed Computing & Cloud Consensus").isVisible() && !(await p.getByText("Business Analytics Using Python").isVisible()), "grades: in-progress tab filters");

// Course tabs
await p.goto(base + "/courses/dwm-lab", { waitUntil: "networkidle" });
await p.getByRole("tab", { name: /Announcements/ }).click();
ok(await p.getByRole("heading", { name: "Course Announcements" }).isVisible(), "course: announcements tab");
await b.close();
