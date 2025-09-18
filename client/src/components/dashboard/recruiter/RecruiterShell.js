"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function RecruiterShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Load user from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem("hh_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (err) {
      console.warn("Failed to parse hh_user:", err);
    }
  }, []);

  const TOPBAR_HEIGHT = 64;
  const SIDEBAR_EXPANDED = 256;
  const SIDEBAR_COLLAPSED = 72;
  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  const active = useMemo(() => {
    if (!pathname) return "dashboard";
    const p = pathname.replace(/\/+$/, "");
    if (p === "/workspace/recruiter") return "dashboard";
    if (p.startsWith("/workspace/recruiter/jobs")) return "jobs";
    if (p.startsWith("/workspace/recruiter/resumes")) return "resumes";
    if (p.startsWith("/workspace/recruiter/matching")) return "matching";
    if (p.startsWith("/workspace/recruiter/shortlisted")) return "shortlisted";
    return "dashboard";
  }, [pathname]);

  const setActive = (section) => {
    if (section === "dashboard") {
      router.push("/workspace/recruiter");
      return;
    }
    router.push(`/workspace/recruiter/${section}`);
  };

  /** 🔑 Centralized Logout Implementation */
  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      const res = await fetch(`${apiBase}/session-logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Logout failed");
        return;
      }

      localStorage.removeItem("hh_user");
      setUser(null); // clear user state
      toast.success("Logged out");

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed (server unreachable)");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div>
      {/* Topbar */}
      <div
        className="fixed left-0 right-0 top-0 z-30"
        style={{
          height: TOPBAR_HEIGHT,
          background: "var(--color-background)",
          borderBottom: "1px solid var(--color-sidebar-border)",
        }}
      >
        <div className="max-w-full mx-auto h-full flex items-center px-4">
          <Topbar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            onCreateJob={() => toast("Create job clicked")}
            onLogout={handleLogout}
            searchMaxWidth={isCollapsed ? 900 : 1200}
            user={user}
            authLoading={authLoading}
          />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        active={active}
        setActive={setActive}
        isCollapsed={isCollapsed}
        TOPBAR_HEIGHT={TOPBAR_HEIGHT}
        sidebarWidth={sidebarWidth}
      />

      {/* Main content */}
      <main
        className="transition-all"
        style={{
          position: "fixed",
          left: sidebarWidth,
          top: TOPBAR_HEIGHT,
          right: 0,
          bottom: 0,
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          padding: 24,
        }}
      >
        <div style={{ minHeight: "100%" }}>{children}</div>
      </main>
    </div>
  );
}
