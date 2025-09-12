"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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
  const { user, signInWithGoogle, logOut, loading } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Keep a local copy of whether user is signed in to immediately render UI
  const isSignedIn = !!user;

  const handleLogin = async (extraInfo) => {
    // extraInfo = { role: "HR" | "Recruiter", company_name: "Acme Corp" }
    try {
      setAuthLoading(true);

      // 1) Sign in with Google (Firebase Web SDK)
      const result = await signInWithGoogle(); // returns UserCredential
      const firebaseUser = result?.user;
      if (!firebaseUser)
        throw new Error("No Firebase user returned from sign-in");

      // 2) Get ID token (initial token) to authenticate the /check-user call
      const idToken = await firebaseUser.getIdToken();

      // 3) Call backend /check-user (server will create/set session cookie)
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const resp = await fetch(`${apiBase}/check-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        // IMPORTANT: allow cookies to be set by server / included on future requests
        credentials: "include",
        body: JSON.stringify(extraInfo),
      });

      // 4) Handle backend response
      if (!resp.ok) {
        // parse error if possible
        let body = {};
        try {
          body = await resp.json();
        } catch {
          /* ignore */
        }

        // sign the user out to avoid partial auth state on the client SDK
        try {
          await logOut();
        } catch (e) {
          console.warn("Failed to sign out after backend error:", e);
        }

        const errMsg =
          body.detail ||
          body.message ||
          "Registration failed. Please verify company and role.";

        toast.error(errMsg);
        return { ok: false, error: errMsg };
      }

      const data = await resp.json();

      // 5) IMPORTANT: Do NOT store the ID token in localStorage.
      // The server sets an HttpOnly session cookie; we use data.user for UI.

      // 6) Optionally store only the profile object returned by server
      if (data.user) {
        try {
          localStorage.setItem("hh_user", JSON.stringify(data.user));
        } catch (e) {
          /* ignore */
        }
      }

      // 7) Close modal, show success toast, and redirect to role workspace
      setModalOpen(false);
      toast.success("Signed in successfully");

      const serverRole = (
        data.user?.role ||
        extraInfo.role ||
        ""
      ).toLowerCase();
      if (serverRole === "hr") router.push("/workspace/hr");
      else router.push("/workspace/recruiter");

      return { ok: true, data };
    } catch (err) {
      console.error("Login flow failed:", err);

      const msg = err?.message || "Login failed";
      toast.error(msg);

      // ensure sign-out cleanup of the Firebase client
      try {
        await logOut();
      } catch {}
      return { ok: false, error: msg };
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setAuthLoading(true);

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      // 1) Tell backend to clear session cookie (credentials included)
      try {
        await fetch(`${apiBase}/session-logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (e) {
        console.warn("Failed to call session-logout:", e);
      }

      // 2) Also sign out from Firebase client SDK (clears client state)
      try {
        await logOut();
      } catch (e) {
        console.warn("Firebase signOut failed:", e);
      }

      // 3) Clear client-side stored profile (not tokens)
      localStorage.removeItem("hh_user");

      setProfileOpen(false);
      toast.success("Logged out");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleModalSubmit = (extraInfo) => {
    // keep modal open until backend returns; set error inside handleLogin
    handleLogin(extraInfo);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      <Navbar
        isSignedIn={isSignedIn}
        handleLogin={handleOpenModal}
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
        onSubmit={handleModalSubmit}
        authLoading={authLoading}
      />
    </div>
  );
}
