"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Shortlisted({ candidates = [] }) {
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
