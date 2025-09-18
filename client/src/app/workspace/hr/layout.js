// src/app/workspace/hr/layout.js
import HrShell from "@/components/dashboard/hr/HrShell";

export const metadata = {
  title: "HR • Workspace",
};

export default function HrLayout({ children }) {
  // simple server layout that delegates the interactive shell to the client component
  return <HrShell>{children}</HrShell>;
}
