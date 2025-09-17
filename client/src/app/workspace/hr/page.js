"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Menu, Search, Plus, LogOut } from "lucide-react";

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
import Sidebar from "@/components/dashboard/hr/Sidebar";
import Topbar from "@/components/dashboard/hr/Topbar";

/* ---------- Single-file HR dashboard (Resumes + Matching removed) ---------- */

export default function HRDashboardPage() {
  const router = useRouter();

  const [active, setActive] = useState("dashboard"); // 'dashboard' | 'jobs' | 'candidates' | 'shortlisted' | 'settings'
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

  // Fake data (candidates / jobs)
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
        return;
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
    }
  };

  const handleCreateJob = () => {
    toast("Create job clicked — wire this to your modal.");
  };

  // Main content switcher
  const renderMain = () => {
    if (active === "dashboard") return <DashboardMain />;
    if (active === "candidates")
      return <CandidatesMain candidates={fakeCandidates} jobs={fakeJobs} />;
    if (active === "jobs") return <JobsMain jobs={fakeJobs} />;
    if (active === "shortlisted")
      return <ShortlistedMain candidates={shortlistedCandidates} />;
    return <DashboardMain />;
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
            topbarPlaceholder="Search jobs, candidates, skills..."
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

/* ------------------- Dashboard Main ------------------- */
function DashboardMain() {
  const stats = {
    jobs: 8,
    candidates: 420,
    shortlisted: 12,
    pendingInterviews: 3,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card
          className="bg-white/60"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <CardHeader>
            <CardTitle className="text-xl">Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--color-foreground-muted)]">
              At-a-glance metrics and quick actions.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <MiniStat label="Jobs" value={stats.jobs} />
              <MiniStat label="Candidates" value={stats.candidates} />
              <MiniStat label="Shortlisted" value={stats.shortlisted} />
              <MiniStat
                label="Pending Interviews"
                value={stats.pendingInterviews}
              />
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-white/60"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">Recent Hires / Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--color-foreground-muted)]">
              Recent candidate activity.
            </p>
            <div className="mt-4 space-y-3">
              <SimpleCandidateRow
                name="Priya Sharma"
                role="Frontend Intern"
                score={94}
              />
              <SimpleCandidateRow
                name="Rohit Kumar"
                role="Backend Intern"
                score={88}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-6">
        <Card
          className="bg-white/60"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--color-foreground-muted)]">
              Jobs you recently posted.
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Frontend Intern</div>
                  <div className="text-xs text-[color:var(--color-foreground-muted)]">
                    Open • 12 applicants
                  </div>
                </div>
                <Badge>Active</Badge>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Backend Intern</div>
                  <div className="text-xs text-[color:var(--color-foreground-muted)]">
                    Open • 22 applicants
                  </div>
                </div>
                <Badge>Active</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ------------------- Candidates Main (simpler version of matching) ------------------- */
function CandidatesMain({ candidates = [], jobs = [] }) {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const pageCount = Math.max(1, Math.ceil(candidates.length / pageSize));
  const paginated = candidates.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main column: candidates */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-[color:var(--color-foreground-muted)] block mb-1">
              Showing candidates
            </div>
          </div>

          {/* pagination controls */}
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </Button>
            <div className="text-sm text-[color:var(--color-foreground-muted)]">
              Page {page} of {pageCount}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
            >
              Next
            </Button>
          </div>
        </div>

        <Card
          className="bg-white/60"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-[color:var(--color-foreground-muted)]">
                    <th className="p-3">Name</th>
                    <th className="p-3">Match</th>
                    <th className="p-3">Skills</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      <td className="p-3">
                        <div className="font-medium">{c.name}</div>
                        <div className="text-xs text-[color:var(--color-foreground-muted)]">
                          ID: {c.id}
                        </div>
                      </td>
                      <td className="p-3 font-semibold">{c.score}%</td>
                      <td className="p-3">
                        <div className="flex gap-2 flex-wrap">
                          {c.skills.map((s, i) => (
                            <Badge key={i}>{s}</Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-3">{c.experience}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                          <Button size="sm">Shortlist</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {candidates.length === 0 && (
                <p className="text-sm text-[color:var(--color-foreground-muted)] p-4">
                  No candidates yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* page controls at bottom too */}
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <div className="text-sm text-[color:var(--color-foreground-muted)]">
            Page {page} of {pageCount}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Right column: filters */}
      <div className="lg:col-span-1 space-y-4">
        <Card
          className="bg-white/60"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[color:var(--color-foreground-muted)] block mb-1">
                  Minimum match (%)
                </label>
                <Input placeholder="e.g. 75" />
              </div>

              <div>
                <label className="text-xs text-[color:var(--color-foreground-muted)] block mb-1">
                  Experience (yrs)
                </label>
                <Input placeholder="e.g. 0.5 - 3" />
              </div>

              <div>
                <label className="text-xs text-[color:var(--color-foreground-muted)] block mb-1">
                  Skills (comma separated)
                </label>
                <Input placeholder="React, Node, SQL" />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Button className="flex-1">Apply</Button>
                <Button variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ------------------- Jobs Main ------------------- */
function JobsMain({ jobs = [] }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card
        className="bg-white/60"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <CardHeader>
          <CardTitle className="text-xl">Your Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((j) => (
              <div
                key={j.id}
                className="p-4 rounded-md bg-[color:var(--color-surface-1)] border"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{j.title}</div>
                    <div className="text-xs text-[color:var(--color-foreground-muted)]">
                      {j.status} • {j.applicants} applicants
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------- Shortlisted Main ------------------- */
function ShortlistedMain({ candidates = [] }) {
  return (
    <div className="space-y-4">
      <Card
        className="bg-white/60"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <CardHeader>
          <CardTitle className="text-xl">Shortlisted Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          {candidates.length === 0 ? (
            <p className="text-sm text-[color:var(--color-foreground-muted)]">
              No shortlisted candidates yet.
            </p>
          ) : (
            <div className="space-y-3">
              {candidates.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-md bg-[color:var(--color-surface-1)] border"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-[color:var(--color-foreground-muted)]">
                        Score: {c.score}% • {c.experience}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                      <Button size="sm">Remove</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------- Small helpers & UI pieces ------------------- */

function MiniStat({ label, value }) {
  return (
    <div
      className="p-3 rounded-md bg-[color:var(--color-surface-1)] border"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="text-xs text-[color:var(--color-foreground-muted)]">
        {label}
      </div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function SimpleCandidateRow({ name, role, score }) {
  return (
    <div
      className="p-3 rounded-md bg-[color:var(--color-surface-1)] border"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-[color:var(--color-foreground-muted)]">
            {role}
          </div>
        </div>
        <div className="text-lg font-semibold">{score}%</div>
      </div>
    </div>
  );
}
