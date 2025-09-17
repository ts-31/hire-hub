// components/dashboard/recruiter/Matching.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

export default function Matching({ candidates = [], jobs = [] }) {
  const [selectedJob, setSelectedJob] = useState(
    jobs.length ? jobs[0].id : null
  );
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const candidatesForJob = candidates.filter((c) =>
    selectedJob ? c.jobId === selectedJob : true
  );
  const pageCount = Math.max(1, Math.ceil(candidatesForJob.length / pageSize));
  const paginated = candidatesForJob.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* === Main Column: Candidates Table === */}
      <div className="lg:col-span-2 space-y-4">
        {/* Header: Job Selector + Pagination */}
        <div className="flex items-center justify-between gap-4">
          {/* Job Selector */}
          <div>
            <label className="text-sm text-[color:var(--color-foreground-muted)] block mb-1">
              Select job
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {jobs.find((j) => j.id === selectedJob)?.title || "All jobs"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setSelectedJob(null)}>
                  All jobs
                </DropdownMenuItem>
                {jobs.map((j) => (
                  <DropdownMenuItem
                    key={j.id}
                    onSelect={() => setSelectedJob(j.id)}
                  >
                    {j.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Pagination */}
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

        {/* Candidate Table */}
        <Card className="bg-white/60 border border-[var(--color-border)]">
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
                      <td className="p-3 flex gap-2">
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                        <Button size="sm">Shortlist</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {candidatesForJob.length === 0 && (
                <p className="text-sm text-[color:var(--color-foreground-muted)] p-4">
                  No candidates for the selected job.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Pagination */}
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

      {/* === Right Column: Filters === */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="bg-white/60 border border-[var(--color-border)]">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <FilterInput label="Minimum match (%)" placeholder="e.g. 75" />
              <FilterInput
                label="Experience (yrs)"
                placeholder="e.g. 0.5 - 3"
              />
              <FilterInput
                label="Skills (comma separated)"
                placeholder="React, Node, SQL"
              />
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

// 🔹 Small reusable subcomponent for filters
function FilterInput({ label, placeholder }) {
  return (
    <div>
      <label className="text-xs text-[color:var(--color-foreground-muted)] block mb-1">
        {label}
      </label>
      <Input placeholder={placeholder} />
    </div>
  );
}
