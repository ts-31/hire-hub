// src/components/LoginModal.js
"use client";

import { useEffect, useState } from "react";

export default function LoginModal({ open, setOpen, onSubmit, authLoading, serverError }) {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // reset fields when closing for a clean UX
      setRole("");
      setCompany("");
      setError("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!role || !company) {
      setError("Role and company are required.");
      return;
    }

    const extraInfo = { role, company_name: company.trim() };
    onSubmit(extraInfo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md mx-4 transform rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden transition-all scale-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#06B6D4] to-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 21v-2a4 4 0 00-3-3.87M7 8a4 4 0 118 0 4 4 0 01-8 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold leading-tight">
                Almost there — a bit more info
              </h3>
              <p className="text-white/90 text-xs">
                We’ll use this to create your profile when you sign in
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-white/90 hover:text-white rounded-full p-1"
            title="Close"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            >
              <option value="">-- Select Role --</option>
              <option value="HR">HR</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Enter company name"
              className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
            />
          </div>

          {/* Local & Server Errors */}
          {error && <div className="text-xs text-red-600">{error}</div>}
          {serverError && <div className="text-xs text-red-600">{serverError}</div>}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-2 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={authLoading}
              className="inline-flex items-center gap-2 rounded-md bg-[#0D9488] px-4 py-2 text-sm font-medium text-white hover:brightness-105 disabled:opacity-60"
            >
              {authLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="opacity-75"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                "Continue with Google"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
