// src/components/LoginModal.js
"use client";

import { useEffect, useState } from "react";

export default function LoginModal({ open, setOpen, onSubmit, authLoading, serverError }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [localServerError, setLocalServerError] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setRole("");
      setCompany("");
      setError("");
      setLocalServerError("");
      setMode("login");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (serverError) setLocalServerError(serverError);
  }, [serverError]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError("");
    setLocalServerError("");

    if (mode === "register") {
      if (!role || !company) {
        setError("Role and company are required.");
        return;
      }
      const extraInfo = { role, company_name: company.trim() };
      onSubmit(extraInfo);
      return;
    }

    // login mode => call onSubmit with empty object
    onSubmit({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md mx-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
      >
        {/* Header (fixed height) */}
        <div className="flex items-center justify-between px-5 h-16 bg-gradient-to-r from-[#06B6D4] to-[#1E3A8A]">
          <button
            onClick={() => { setMode("login"); setLocalServerError(""); setError(""); }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${mode === "login" ? "bg-white text-[#1E3A8A] shadow" : "text-white/90 hover:text-white/95"}`}
          >
            Login
          </button>

          <button
            onClick={() => { setMode("register"); setLocalServerError(""); setError(""); }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${mode === "register" ? "bg-white text-[#1E3A8A] shadow" : "text-white/90 hover:text-white/95"}`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          <div className="h-[240px] md:h-[260px] flex flex-col">
            <div className="flex-1 overflow-auto">
              {mode === "login" ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome back</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Sign in with Google to continue. If you don't have an account yet, switch to Register.
                  </p>

                  {localServerError && <div className="mb-3 text-xs text-red-600">{localServerError}</div>}

                  <div className="flex flex-col gap-3">
                    {/* Primary CTA for login mode (body) */}
                    <button
                      onClick={handleSubmit}
                      disabled={authLoading}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0D9488] px-4 py-2 text-sm font-medium text-white hover:brightness-105 disabled:opacity-60"
                    >
                      {authLoading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                            <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                          </svg>
                          Signing in...
                        </>
                      ) : (
                        "Continue with Google"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => { setMode("register"); setLocalServerError(""); setError(""); }}
                      className="text-sm text-[#06B6D4] hover:underline self-start"
                    >
                      I don't have an account — Register
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Create your account</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Provide company and role so we can set up your profile after Google sign-in.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Select Role</label>
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

                    <div>
                      <label className="text-sm font-medium text-gray-700">Company Name</label>
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter company name"
                        className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                      />
                    </div>
                  </form>

                  {(error || localServerError) && (
                    <div className="mt-3">
                      {error && <div className="text-xs text-red-600">{error}</div>}
                      {localServerError && <div className="text-xs text-red-600">{localServerError}</div>}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3 h-14">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-2 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>

            {mode === "register" && (
              <button
                onClick={handleSubmit}
                disabled={authLoading}
                className="inline-flex items-center gap-2 rounded-md bg-[#0D9488] px-4 py-2 text-sm font-medium text-white hover:brightness-105 disabled:opacity-60"
              >
                {authLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Continue with Google"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
