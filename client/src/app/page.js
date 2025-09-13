"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("hh_user");
      if (storedUser) setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Failed to read user from localStorage:", err);
    }
  }, []);

  const isSignedIn = !!user;

  const handleLogin = async (extraInfo) => {
    try {
      setAuthLoading(true);

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      // 1) Sign in with Google
      const { auth, googleProvider } = await import("@/lib/firebase");
      const { signInWithPopup } = await import("firebase/auth");

      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result?.user;
      if (!firebaseUser) throw new Error("No Firebase user returned");

      // 2) Get ID token
      const idToken = await firebaseUser.getIdToken();

      // 3) Call backend /check-user (safe fetch)
      let resp;
      try {
        resp = await fetch(`${apiBase}/check-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          credentials: "include",
          body: JSON.stringify(extraInfo),
        });
      } catch (networkErr) {
        console.warn("Backend unreachable:", networkErr);
        toast.error("Server unreachable. Please try again later.");
        return { ok: false, error: "server-unreachable" }; // ✅ no throw
      }

      if (!resp.ok) {
        let body = {};
        try {
          body = await resp.json();
        } catch {}
        const errMsg =
          body.detail ||
          body.message ||
          "Registration failed. Verify role/company.";
        toast.error(errMsg);
        return { ok: false, error: errMsg };
      }

      const data = await resp.json();

      // 4) Save user profile
      if (data.user) {
        localStorage.setItem("hh_user", JSON.stringify(data.user));
        setUser(data.user);
      }

      setModalOpen(false);
      toast.success("Signed in successfully");

      // 5) Redirect
      const serverRole = (
        data.user?.role ||
        extraInfo.role ||
        ""
      ).toLowerCase();
      if (serverRole === "hr") router.push("/workspace/hr");
      else router.push("/workspace/recruiter");

      return { ok: true, data };
    } catch (err) {
      console.error("Login failed:", err); // ✅ still logged, but no red overlay
      toast.error(err?.message || "Login failed");
      return { ok: false, error: err?.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      let res;
      try {
        res = await fetch(`${apiBase}/session-logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (fetchErr) {
        console.warn("Failed to reach backend:", fetchErr);
        toast.error("Logout failed (server unreachable)");
        return; // stop execution here, don't clear localstorage
      }

      if (!res.ok) {
        console.warn("Server responded with error:", res.status);
        toast.error("Logout failed");
        return;
      }

      // ✅ Only clear local storage if server responded OK
      localStorage.removeItem("hh_user");
      console.log("session cookie + localstorage cleared");

      toast.success("Logged out");
      window.location.href = "/";
    } finally {
      setAuthLoading(false);
      setProfileOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      <Navbar
        isSignedIn={isSignedIn}
        handleLogin={() => setModalOpen(true)}
        authLoading={authLoading}
        user={user}
        handleLogout={handleLogout}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
      />
      <Hero />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
      <LoginModal
        open={modalOpen}
        setOpen={setModalOpen}
        onSubmit={handleLogin}
        authLoading={authLoading}
      />
    </div>
  );
}
