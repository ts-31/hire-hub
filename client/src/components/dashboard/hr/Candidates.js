"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Candidates({ candidates = [], jobs = [] }) {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const pageCount = Math.max(1, Math.ceil(candidates.length / pageSize));
  const paginated = candidates.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main column */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-[color:var(--color-foreground-muted)] block mb-1">
              Showing candidates
            </div>
          </div>

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
                          {c.skills?.map((s, i) => (
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
