"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Jobs({ jobs = [] }) {
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
