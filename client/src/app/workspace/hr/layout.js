// src/app/workspace/hr/layout.js
export const metadata = { title: "Hr • Workspace" };

// A minimal pass-through layout — page-level keeps Topbar & main UI
export default function RecruiterLayout({ children }) {
  return <>{children}</>;
}
