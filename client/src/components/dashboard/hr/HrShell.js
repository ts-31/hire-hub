// src/components/dashboard/hr/HrShell.jsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Sidebar from "./Sidebar"; // create under src/components/dashboard/hr/Sidebar.jsx
import Topbar from "./Topbar"; // create under src/components/dashboard/hr/Topbar.jsx

export default function HrShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // load user once from localStorage
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

  // derive active section from pathname (keeps highlight in sync)
  const active = useMemo(() => {
    if (!pathname) return "dashboard";
    const p = pathname.replace(/\/+$/, ""); // strip trailing slash
    if (p === "/workspace/hr") return "dashboard";
    if (p.startsWith("/workspace/hr/jobs")) return "jobs";
    if (p.startsWith("/workspace/hr/candidates")) return "candidates";
    if (p.startsWith("/workspace/hr/shortlisted")) return "shortlisted";
    return "dashboard";
  }, [pathname]);

  // setActive transitions to the route — helpful when you later add nested pages
  const setActive = (section) => {
    if (section === "dashboard") {
      router.push("/workspace/hr");
      return;
    }
    router.push(`/workspace/hr/${section}`);
  };

  // centralized logout (works from any HR route)
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

      // clear local state and storage
      localStorage.removeItem("hh_user");
      setUser(null);

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
      {/* Topbar (fixed) */}
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

      {/* Sidebar (fixed under topbar) */}
      <Sidebar
        active={active}
        setActive={setActive}
        isCollapsed={isCollapsed}
        TOPBAR_HEIGHT={TOPBAR_HEIGHT}
        sidebarWidth={sidebarWidth}
      />

      {/* Main content area */}
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
