"use client";

import { useToast } from "@/components/ui/toast";

const links = ["Academic Regulations", "IT Support & Helpdesk", "Privacy Policy"];

export function Footer() {
  const toast = useToast();
  return (
    <footer className="mt-auto border-t border-line/70">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-6 py-8 text-[13px] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <span className="font-semibold text-fg">Sardar Patel Institute of Technology</span>
          <span className="text-fg-2">Autonomous Institute Affiliated to University of Mumbai</span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <button
              key={l}
              type="button"
              className="text-fg-2 hover:text-fg hover:underline"
              onClick={() => toast(`${l} is not part of this prototype`)}
            >
              {l}
            </button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
