"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Resumes({
  stats = { uploaded: 420, parsed: 408, avgScore: 78, newThisWeek: 32 },
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card
          className="bg-white/60"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <CardHeader>
            <CardTitle className="text-xl">Resume Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--color-foreground-muted)]">
              Overview of resumes uploaded and parsing / match stats.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <MiniStat label="Uploaded" value={stats.uploaded} />
              <MiniStat label="Parsed" value={stats.parsed} />
              <MiniStat label="Avg Match" value={`${stats.avgScore}%`} />
              <MiniStat label="New this week" value={stats.newThisWeek} />
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
            <CardTitle className="text-lg">Parsing Health</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[color:var(--color-foreground-muted)]">
              Errors, average parse time, and last run.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Last run: 2 hours ago</li>
              <li>Parse errors: 1.4%</li>
              <li>Avg parse time: 1.2s</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* Small helper (same style as Dashboard) */
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
