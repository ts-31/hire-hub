// src/components/Features.js
export default function Features() {
  return (
    <section className="py-20 bg-surface-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Powerful Features for Modern Recruiting
          </h2>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Everything you need to manage resumes efficiently and find the right
            candidates
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              Smart Upload System
            </h3>
            <p className="text-foreground-muted leading-relaxed">
              Upload single resumes or bulk process folders via ZIP files.
              Integrated with AWS S3 for secure, scalable storage.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              Background Processing
            </h3>
            <p className="text-foreground-muted leading-relaxed">
              Automated resume parsing and structured data extraction. Parsed
              data is stored in PostgreSQL for fast queries.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              Intelligent Matching
            </h3>
            <p className="text-foreground-muted leading-relaxed">
              Algorithms match candidates based on skills, experience, and job
              requirements to produce ranked results.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              Advanced Filtering
            </h3>
            <p className="text-foreground-muted leading-relaxed">
              Filter candidates by experience, skill sets, education, and custom
              criteria to quickly find the best matches.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              Smart Shortlisting
            </h3>
            <p className="text-foreground-muted leading-relaxed">
              Recruiters can create shortlists with notes and ratings for a
              smooth handoff to HR.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
            <div className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              HR Dashboard
            </h3>
            <p className="text-foreground-muted leading-relaxed">
              A concise dashboard for HR to view jobs, shortlisted candidates,
              and manage the hiring pipeline.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
