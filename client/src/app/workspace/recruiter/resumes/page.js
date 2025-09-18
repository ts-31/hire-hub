// src/app/workspace/recruiter/resumes/page.js
import Resumes from "@/components/dashboard/recruiter/Resumes";

export default function ResumesPage() {
  // Replace with server-side fetch when ready:
  const stats = {
    uploaded: 420,
    parsed: 408,
    avgScore: 78,
    newThisWeek: 32,
  };

  return <Resumes stats={stats} />;
}
