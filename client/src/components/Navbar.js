// src/components/Navbar.js
export default function Navbar({
  isSignedIn,
  handleLogin,
  authLoading,
  user,
  handleLogout,
  profileOpen,
  setProfileOpen,
}) {
  return (
    <nav className="bg-[#E5E7EB] shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-[#1E3A8A]">HireHub</h1>
          </div>

          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <button
                  onClick={handleLogin}
                  disabled={authLoading}
                  className="text-gray-600 hover:text-[#1E3A8A] px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {authLoading ? "Signing in..." : "Login"}
                </button>
                <button
                  className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                  onClick={() => {
                    // Scroll to CTA or take to register flow later
                    const el = document.querySelector(
                      "section.py-20.bg-gradient-to-br"
                    );
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get Started
                </button>
              </>
            ) : (
              // Profile avatar + dropdown
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-3 bg-white border border-gray-200 px-3 py-1 rounded-full hover:shadow-md transition"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "profile"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#06B6D4] text-white flex items-center justify-center font-semibold">
                      {(user.displayName || user.email || "U")
                        .toString()
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-[#1E3A8A]">
                    {user.displayName || user.email}
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
                        {user.displayName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {user.email}
                      </div>
                    </div>
                    <ul className="py-1">
                      <li>
                        <button
                          onClick={() => {
                            // route to dashboard later; for now close menu
                            setProfileOpen(false);
                            // TODO: router.push('/dashboard');
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          Dashboard
                        </button>
                      </li>
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}