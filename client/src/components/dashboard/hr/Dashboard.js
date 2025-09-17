"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HRDashboard({
  stats = { jobs: 8, candidates: 420, shortlisted: 12, pendingInterviews: 3 },
  recentMatches = [
    { name: "Priya Sharma", role: "Frontend Intern", score: 94 },
    { name: "Rohit Kumar", role: "Backend Intern", score: 88 },
  ],
}) {
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
              {recentMatches.map((m, i) => (
                <SimpleCandidateRow
                  key={i}
                  name={m.name}
                  role={m.role}
                  score={m.score}
                />
              ))}
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

/* ---- Helpers ---- */
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
