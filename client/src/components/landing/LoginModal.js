// src/components/LoginModal.js
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginModal({ open, setOpen, onSubmit, authLoading }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setRole("");
      setCompany("");
      setMode("login");
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
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (mode === "register") {
      if (!role || !company) {
        // show toast instead of inline error
        toast.error("Role and company are required.");
        return;
      }
      const extraInfo = { role, company_name: company.trim() };
      onSubmit(extraInfo);
      return;
    }

    // login mode => call onSubmit with empty object
    onSubmit({});
  };

  const GoogleIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
          fill="#4285F4"
        />
        <path
          d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
          fill="#34A853"
        />
        <path
          d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
          fill="#FBBC05"
        />
        <path
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
          fill="#EA4335"
        />
      </g>
    </svg>
  );

  const GoogleSignInButton = ({ onClick, disabled, isLoading, text }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
    >
      {isLoading ? (
        <>
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
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
        <>
          <GoogleIcon />
          {text}
        </>
      )}
    </button>
  );

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
            onClick={() => {
              setMode("login");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              mode === "login"
                ? "bg-white text-[#1E3A8A] shadow"
                : "text-white/90 hover:text-white/95"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setMode("register");
            }}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              mode === "register"
                ? "bg-white text-[#1E3A8A] shadow"
                : "text-white/90 hover:text-white/95"
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          <div className="h-[280px] md:h-[300px] flex flex-col">
            <div className="flex-1 overflow-auto">
              {mode === "login" ? (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Welcome back
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Sign in with your Google account to continue. If you don't
                    have an account yet, switch to Register.
                  </p>

                  <div className="flex flex-col gap-4">
                    {/* Official Google Sign-In Button */}
                    <GoogleSignInButton
                      onClick={handleSubmit}
                      disabled={authLoading}
                      isLoading={authLoading}
                      text="Sign in with Google"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setMode("register");
                      }}
                      className="text-sm text-[#06B6D4] hover:underline self-center"
                    >
                      Don't have an account? Register here
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Create your account
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Provide your company and role details, then sign in with
                    Google to complete your registration.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Role
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
                      >
                        <option value="">-- Select Role --</option>
                        <option value="HR">HR</option>
                        <option value="Recruiter">Recruiter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter your company name"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent"
                      />
                    </div>
                  </form>

                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                    }}
                    className="mt-4 text-sm text-[#06B6D4] hover:underline"
                  >
                    Already have an account? Sign in
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3 h-14">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-2 text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>

            {mode === "register" && (
              <GoogleSignInButton
                onClick={handleSubmit}
                disabled={authLoading || !role || !company}
                isLoading={authLoading}
                text="Continue with Google"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
