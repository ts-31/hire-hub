"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Menu, Search, Plus, LogOut, ChevronDown } from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/dashboard/recruiter/Sidebar";
import Topbar from "@/components/dashboard/recruiter/Topbar";
import Jobs from "@/components/dashboard/recruiter/Jobs";
import Matching from "@/components/dashboard/recruiter/Matching";
import Dashboard from "@/components/dashboard/recruiter/Dashboard";
import Resumes from "@/components/dashboard/recruiter/Resumes";
import Shortlisted from "@/components/dashboard/recruiter/Shortlisted";

/* ---------- Single-file recruiter dashboard with real logout + hh_user ---------- */

export default function RecruiterDashboardPage() {
  const router = useRouter();

  const [active, setActive] = useState("dashboard"); // 'dashboard' | 'jobs' | 'resumes' | 'matching' | 'shortlisted' | 'settings'
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

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

  // Fake data (candidates / jobs / resumes)
  const fakeJobs = [
    { id: "j1", title: "Frontend Intern", applicants: 12, status: "Open" },
    { id: "j2", title: "Backend Intern", applicants: 22, status: "Open" },
    { id: "j3", title: "Data Analyst", applicants: 8, status: "Closed" },
  ];

  const fakeCandidates = useMemo(() => {
    const skills = [
      "React",
      "Node",
      "Python",
      "SQL",
      "Docker",
      "Data Analysis",
      "TypeScript",
    ];
    const arr = [];
    for (let i = 1; i <= 23; i++) {
      arr.push({
        id: `c${i}`,
        name: `Candidate ${i}`,
        score: Math.floor(60 + Math.random() * 40),
        skills: [skills[i % skills.length], skills[(i + 2) % skills.length]],
        experience: `${(i % 4) + 0.5} yrs`,
        jobId: fakeJobs[i % fakeJobs.length].id,
        shortlisted: i % 7 === 0,
      });
    }
    return arr;
  }, []);

  const shortlistedCandidates = fakeCandidates.filter((c) => c.shortlisted);

  // Real logout implementation (from your provided snippet)
  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      let res;
      try {
        res = await fetch(`${apiBase}/session-logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (fetchErr) {
        console.warn("Failed to reach backend:", fetchErr);
        toast.error("Logout failed (server unreachable)");
        return; // finally will run and clear loading
      }

      if (!res.ok) {
        console.warn("Server responded with error:", res.status);
        toast.error("Logout failed");
        return;
      }

      // Only clear local storage if server responded OK
      localStorage.removeItem("hh_user");
      console.log("session cookie + localstorage cleared");

      toast.success("Logged out");
      router.push("/");
      router.refresh();
    } finally {
      setAuthLoading(false);
      // no explicit profileOpen state used here (Radix handles menu), so nothing to close
    }
  };

  // Topbar actions
  const handleCreateJob = () => {
    toast("Create job clicked — wire this to your modal.");
  };

  // Main content switcher
  const renderMain = () => {
    if (active === "dashboard") return <Dashboard />;
    if (active === "matching")
      return <Matching candidates={fakeCandidates} jobs={fakeJobs} />;
    if (active === "jobs") return <Jobs jobs={fakeJobs} />;
    if (active === "resumes") return <Resumes />;
    if (active === "shortlisted")
      return <Shortlisted candidates={shortlistedCandidates} />;
    return <Dashboard />;
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
            onCreateJob={handleCreateJob}
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

      {/* Main content area (fixed and independently scrollable) */}
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
        <div style={{ minHeight: "100%" }}>{renderMain()}</div>
      </main>
    </div>
  );
}
