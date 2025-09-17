"use client";

import {
  Home,
  Folder,
  FileText,
  SlidersHorizontal,
  CheckCircle,
  Settings,
} from "lucide-react";

export default function Sidebar({
  active,
  setActive,
  isCollapsed,
  TOPBAR_HEIGHT,
  sidebarWidth,
}) {
  return (
    <aside
      className="fixed left-0 z-20 bg-[color:var(--color-surface-1)] border-r overflow-hidden"
      style={{
        top: TOPBAR_HEIGHT,
        width: sidebarWidth,
        height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
        borderColor: "var(--color-sidebar-border)",
        transition: "width 200ms ease",
      }}
      aria-label="Main navigation"
    >
      <div className="flex flex-col h-full">
        {/* Header area */}
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="w-8 h-8 rounded-md flex items-center justify-center bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 12h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {!isCollapsed && <div className="font-bold text-lg">Recruiter</div>}
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-1 py-2 space-y-1">
          <NavButtonLarge
            icon={<Home className="w-5 h-5" />}
            label="Dashboard"
            active={active === "dashboard"}
            collapsed={isCollapsed}
            onClick={() => setActive("dashboard")}
          />
          <NavButtonLarge
            icon={<Folder className="w-5 h-5" />}
            label="Jobs"
            active={active === "jobs"}
            collapsed={isCollapsed}
            onClick={() => setActive("jobs")}
          />
          <NavButtonLarge
            icon={<FileText className="w-5 h-5" />}
            label="Resumes"
            active={active === "resumes"}
            collapsed={isCollapsed}
            onClick={() => setActive("resumes")}
          />
          <NavButtonLarge
            icon={<SlidersHorizontal className="w-5 h-5" />}
            label="Matching"
            active={active === "matching"}
            collapsed={isCollapsed}
            onClick={() => setActive("matching")}
          />
          <NavButtonLarge
            icon={<CheckCircle className="w-5 h-5" />}
            label="Shortlisted"
            active={active === "shortlisted"}
            collapsed={isCollapsed}
            onClick={() => setActive("shortlisted")}
          />
          <NavButtonLarge
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            active={false}
            collapsed={isCollapsed}
            onClick={() => {}}
          />
        </nav>

        {/* Bottom spacer */}
        <div
          className="p-3"
          style={{ borderTop: "1px solid var(--color-sidebar-border)" }}
        >
          <div className="text-xs text-[color:var(--color-foreground-muted)] text-center">
            {!isCollapsed && "Recruiter Dashboard"}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* Reuse your NavButtonLarge component here */
function NavButtonLarge({
  icon,
  label,
  active = false,
  collapsed = false,
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full rounded-md px-4 ${
        collapsed ? "justify-center py-4" : "py-4"
      } transition-colors duration-150
        ${
          active
            ? "bg-[color:var(--color-sidebar-primary)] text-[color:var(--color-sidebar-primary-foreground)]"
            : "hover:bg-[color:var(--color-surface-1)]"
        }
      `}
      aria-current={active ? "page" : undefined}
    >
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
