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
    <nav className="bg-surface-1 shadow-sm border-b border-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            {/* Brand/title uses secondary color */}
            <h1 className="text-2xl font-bold text-secondary">HireHub</h1>
          </div>

          <div className="flex items-center space-x-4">
            {!isSignedIn ? (
              <>
                <button
                  onClick={handleLogin}
                  disabled={authLoading}
                  className="text-foreground-muted hover:text-secondary px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {authLoading ? "Signing in..." : "Login"}
                </button>

                <button
                  className="bg-primary hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-transform transform hover:scale-105"
                  onClick={() => {
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
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  className="flex items-center gap-3 bg-surface-1 border border-surface-2 px-3 py-1 rounded-full hover:shadow-md transition"
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || "profile"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                      {(user?.name || user?.email || "U")
                        .toString()
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                  )}

                  {/* username uses secondary color */}
                  <span className="text-sm font-medium text-secondary">
                    {user?.name || user?.email}
                  </span>

                  <svg
                    className="w-4 h-4 text-foreground-muted"
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
                  <div className="absolute right-0 mt-2 w-48 bg-surface-1 border border-surface-2 rounded-md shadow-lg z-20">
                    <div className="p-3 border-b border-surface-2">
                      <div className="text-sm font-semibold text-foreground">
                        {user?.name || user?.email}
                      </div>
                      <div className="text-xs text-foreground-muted truncate">
                        {user?.email}
                      </div>
                    </div>
                    <ul className="py-1">
                      <li>
                        <button
                          onClick={() => setProfileOpen(false)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-surface-2"
                        >
                          Dashboard
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-accent hover:bg-surface-2"
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
