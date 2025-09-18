// src/app/workspace/recruiter/matching/page.js
import Matching from "@/components/dashboard/recruiter/Matching";

export default function MatchingPage() {
  // Example mock data (replace with real fetch later)
  const jobs = [
    { id: "j1", title: "Frontend Intern" },
    { id: "j2", title: "Backend Intern" },
    { id: "j3", title: "Data Analyst" },
  ];

  const candidates = [
    {
      id: "c1",
      name: "Alice",
      jobId: "j1",
      score: 85,
      skills: ["React", "Tailwind", "JavaScript"],
      experience: "1.5 yrs",
    },
    {
      id: "c2",
      name: "Bob",
      jobId: "j2",
      score: 72,
      skills: ["Node.js", "Express", "SQL"],
      experience: "2 yrs",
    },
    {
      id: "c3",
      name: "Charlie",
      jobId: "j1",
      score: 92,
      skills: ["React", "TypeScript", "GraphQL"],
      experience: "1 yr",
    },
    {
      id: "c4",
      name: "Diana",
      jobId: "j3",
      score: 78,
      skills: ["Python", "Django", "REST API"],
      experience: "2.5 yrs",
    },
    {
      id: "c5",
      name: "Ethan",
      jobId: "j1",
      score: 88,
      skills: ["React", "Redux", "Next.js"],
      experience: "1.8 yrs",
    },
    {
      id: "c6",
      name: "Fiona",
      jobId: "j2",
      score: 65,
      skills: ["Node.js", "MongoDB", "Docker"],
      experience: "1.2 yrs",
    },
    {
      id: "c7",
      name: "George",
      jobId: "j3",
      score: 81,
      skills: ["Python", "Flask", "PostgreSQL"],
      experience: "3 yrs",
    },
    {
      id: "c8",
      name: "Hannah",
      jobId: "j1",
      score: 95,
      skills: ["React", "Tailwind", "Jest"],
      experience: "2 yrs",
    },
    {
      id: "c9",
      name: "Ian",
      jobId: "j2",
      score: 70,
      skills: ["Node.js", "Express", "GraphQL"],
      experience: "1.5 yrs",
    },
    {
      id: "c10",
      name: "Julia",
      jobId: "j3",
      score: 89,
      skills: ["Python", "FastAPI", "AWS"],
      experience: "2 yrs",
    },
  ];

  return <Matching jobs={jobs} candidates={candidates} />;
}
