// src/app/page.js
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const { user, signInWithGoogle, logOut, loading } = useAuth();
  const [authLoading, setAuthLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Keep a local copy of whether user is signed in to immediately render UI
  const isSignedIn = !!user;

  // helper: store token in localStorage
  const storeToken = async (credentialUser) => {
    try {
      if (!credentialUser) return;
      // credentialUser is Firebase User object from signInWithPopup result
      const token = await credentialUser.getIdToken();
      localStorage.setItem("fb_token", token);
    } catch (err) {
      console.error("Failed to get/store token:", err);
    }
  };

  const handleLogin = async (extraInfo) => {
    try {
      setAuthLoading(true);
      const result = await signInWithGoogle(); // returns UserCredential
      // result.user is Firebase User
      await storeToken(result.user);
      console.log("Extra profile info:", extraInfo);

    } catch (err) {
      console.error("Login failed:", err);
      alert("Sign in failed. See console for details.");
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
    setModalOpen(false);
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


