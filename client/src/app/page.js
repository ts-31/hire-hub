// src/app/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
  const [modalError, setModalError] = useState("");

  // Keep a local copy of whether user is signed in to immediately render UI
  const isSignedIn = !!user;

  // helper: store token in localStorage
  const storeToken = async (credentialUser) => {
    try {
      if (!credentialUser) return;
      const token = await credentialUser.getIdToken();
      localStorage.setItem("fb_token", token);
    } catch (err) {
      console.error("Failed to get/store token:", err);
    }
  };

  const handleLogin = async (extraInfo) => {
    // extraInfo = { role: "HR" | "Recruiter", company_name: "Acme Corp" }
    setModalError("");
    try {
      setAuthLoading(true);

      // 1) Sign in with Google
      const result = await signInWithGoogle(); // returns UserCredential
      const firebaseUser = result?.user;
      if (!firebaseUser)
        throw new Error("No Firebase user returned from sign-in");

      // 2) Get ID token (initial token) to authenticate the /check-user call
      const idToken = await firebaseUser.getIdToken();

      // 3) Call backend /check-user
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      const resp = await fetch(`${apiBase}/check-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
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

        // sign the user out to avoid partial auth state
        try {
          await logOut();
        } catch (e) {
          console.warn("Failed to sign out after backend error:", e);
        }
        localStorage.removeItem("fb_token");

        const errMsg =
          body.detail ||
          body.message ||
          "Registration failed. Please verify company and role.";
        setModalError(errMsg);
        return { ok: false, error: errMsg };
      }

      const data = await resp.json();

      // 5) IMPORTANT: Force refresh the ID token so it includes custom claims set by backend
      //    (this is required because claims are not present in the initial token)
      try {
        const refreshedToken = await firebaseUser.getIdToken(true); // force refresh
        localStorage.setItem("fb_token", refreshedToken);
      } catch (refreshErr) {
        // If refresh fails, still proceed but log
        console.warn(
          "Failed to refresh ID token after registration:",
          refreshErr
        );
        // fallback: store the original token
        localStorage.setItem("fb_token", idToken);
      }

      // 6) Optionally store user object returned by server
      if (data.user) {
        try {
          localStorage.setItem("hh_user", JSON.stringify(data.user));
        } catch (e) {
          /* ignore */
        }
      }

      // 7) Close modal and redirect to role workspace
      setModalOpen(false);
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
      setModalError(err.message || "Login failed");
      // ensure sign-out cleanup
      try {
        await logOut();
      } catch {}
      localStorage.removeItem("fb_token");
      return { ok: false, error: err.message };
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      await logOut();
      localStorage.removeItem("fb_token");
      setProfileOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleModalSubmit = (extraInfo) => {
    // keep modal open until backend returns; set error inside handleLogin
    handleLogin(extraInfo);
  };

  const handleOpenModal = () => {
    setModalError("");
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
        serverError={modalError}
      />
    </div>
  );
}
