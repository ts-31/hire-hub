import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "HireHub",
  description:
    "HireHub is a lightweight resume management and candidate shortlisting platform for recruiters and HRs with role-based access and automated matching.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Global toaster — placed here so toasts persist across route transitions */}
          <Toaster position="bottom-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
