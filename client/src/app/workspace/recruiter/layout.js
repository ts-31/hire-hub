// src/app/workspace/recruiter/layout.js
export const metadata = { title: "Recruiter • Workspace" };

// A minimal pass-through layout — page-level keeps Topbar & main UI
export default function RecruiterLayout({ children }) {
  return <>{children}</>;
}
