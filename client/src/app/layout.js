import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { decodeJwt } from "jose";

export const metadata = {
  title: "HireHub",
  description:
    "HireHub is a lightweight resume management and candidate shortlisting platform for recruiters and HRs with role-based access and automated matching.",
};

// ✅ Make RootLayout async so we can await cookies()
export default async function RootLayout({ children }) {
  const cookieStore = await cookies(); // <-- await is required

  const SESSION_COOKIE_NAME = "session";
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  let role = "public";
  if (sessionCookie) {
    try {
      const payload = decodeJwt(sessionCookie);

      role =
        payload.role ||
        payload?.custom?.role ||
        payload?.claims?.role ||
        (payload.roles && payload.roles[0]) ||
        "public";

      if (role) role = String(role).toLowerCase();
    } catch (err) {
      console.error("❌ Failed to decode session cookie in layout:", err);
      role = "public";
    }
  }

  console.log("[RootLayout] Final role:", role);

  return (
    <html lang="en" data-role={role}>
      <body>
        <AuthProvider>
          <Toaster position="bottom-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
