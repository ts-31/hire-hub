// src/app/workspace/recruiter/jobs/page.js
import Jobs from "@/components/dashboard/recruiter/Jobs";

export default function JobsPage() {
  const jobs = [
    { id: "j1", title: "Frontend Intern", applicants: 12, status: "Open" },
    { id: "j2", title: "Backend Intern", applicants: 22, status: "Open" },
    { id: "j3", title: "Data Analyst", applicants: 8, status: "Closed" },
  ];

  return <Jobs jobs={jobs} />;
}
