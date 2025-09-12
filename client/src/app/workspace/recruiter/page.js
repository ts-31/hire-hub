"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function RecruiterWorkspacePage() {
  const [user, setUser] = useState(null); // now using localStorage
  const [profileOpen, setProfileOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Read hh_user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("hh_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Failed to read user from localStorage:", err);
      toast.error("Failed to load user info");
    }
  }, []);

  const handleLogout = async () => {
    try {
      setAuthLoading(true);

      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      // Call backend to clear session cookie
      try {
        await fetch(`${apiBase}/session-logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (e) {
        console.warn("Failed to call session-logout:", e);
      }

      // Clear localStorage
      localStorage.removeItem("hh_user");

      toast.success("Logged out");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    } finally {
      setAuthLoading(false);
      setProfileOpen(false);
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-bold text-[#1E3A8A]">
          Recruiter Dashboard
        </h1>

        {/* Profile avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen((s) => !s)}
            className="flex items-center gap-3 bg-white border border-gray-200 px-3 py-1 rounded-full hover:shadow-md transition"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name || "profile"}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#06B6D4] text-white flex items-center justify-center font-semibold">
                {(user.name || user.email || "U").slice(0, 1).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium text-[#1E3A8A]">
              {user.name || user.email}
            </span>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              <div className="p-3 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-800">
                  {user.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user.email}
                </div>
              </div>
              <ul className="py-1">
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    disabled={authLoading}
                  >
                    {authLoading ? "Signing out..." : "Sign out"}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div className="p-8">
        <p className="text-gray-700">Welcome to your Recruiter workspace!</p>
      </div>
    </div>
  );
}
