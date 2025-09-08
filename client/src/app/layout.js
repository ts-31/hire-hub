import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "HireHub",
  description:
    "HireHub is a lightweight resume management and candidate shortlisting platform for recruiters and HRs with role-based access and automated matching.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
