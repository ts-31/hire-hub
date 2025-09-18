// src/app/workspace/hr/shortlisted/page.js
import Shortlisted from "@/components/dashboard/hr/Shortlisted";

export default function ShortlistedPage() {
  // Example mocked data (replace with actual API fetch later)
  const candidates = [
    { id: "c1", name: "Alice Johnson", score: 92, experience: "3 yrs" },
    { id: "c2", name: "Rahul Sharma", score: 88, experience: "2 yrs" },
    { id: "c3", name: "Maria Lopez", score: 85, experience: "1 yr" },
  ];

  return <Shortlisted candidates={candidates} />;
}
