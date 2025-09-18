// src/app/workspace/hr/candidates/page.js
import Candidates from "@/components/dashboard/hr/Candidates";

export default function HRCandidatesPage() {
  // Example data — replace with server fetch later
  const jobs = [
    { id: "hj1", title: "HR Manager", applicants: 4, status: "Open" },
    { id: "hj2", title: "Recruiter", applicants: 12, status: "Open" },
    { id: "hj3", title: "People Ops", applicants: 3, status: "Closed" },
  ];

  const candidates = Array.from({ length: 18 }).map((_, i) => ({
    id: `hc${i + 1}`,
    name: `Candidate ${i + 1}`,
    score: Math.floor(60 + ((i * 7) % 40)), // deterministic-ish sample score
    skills: [
      ["Communication", "Excel", "Sourcing"],
      ["Interviewing", "Onboarding"],
      ["Employee Relations", "Analytics"],
    ][i % 3],
    experience: `${(i % 5) + 0.5} yrs`,
    jobId: jobs[i % jobs.length].id,
    shortlisted: i % 5 === 0,
  }));

  return <Candidates candidates={candidates} jobs={jobs} />;
}
