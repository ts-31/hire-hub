// src/app/workspace/recruiter/layout.js
import RecruiterShell from "@/components/dashboard/recruiter/RecruiterShell";

export const metadata = {
  title: "Recruiter • Workspace",
};

export default function RecruiterLayout({ children }) {
  // Layout is a small server component that delegates rendering to a client shell.
  return <RecruiterShell>{children}</RecruiterShell>;
}
