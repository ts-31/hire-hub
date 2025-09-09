// src/components/HowItWorks.js
export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#E5E7EB] to-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A8A] mb-4">
            How HireHub Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple workflows designed for both Recruiters and HR teams
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recruiter Flow */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-[#F0FDFA] rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-[#1E3A8A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 8v10m8-10v10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1E3A8A]">
                Recruiter Workflow
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="text-gray-700">
                  Upload resumes individually or in bulk via ZIP files to get
                  started quickly
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-gray-700">
                  System parses and extracts candidate information in the
                  background
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="text-gray-700">
                  Use filters to find candidates matching specific job
                  requirements
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <p className="text-gray-700">
                  Apply the matching algorithm based on skills and experience
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">5</span>
                </div>
                <p className="text-gray-700">
                  Create shortlists with ratings and notes for HR handoff
                </p>
              </div>
            </div>
          </div>

          {/* HR Flow */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-[#EEF2FF] rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-5 h-5 text-[#1E3A8A]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1E3A8A]">
                HR Team Workflow
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="text-gray-700">
                  Access a dashboard showing active job postings and
                  requirements
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-gray-700">
                  Review shortlisted candidates with recruiter notes and
                  scores
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="text-gray-700">
                  View detailed candidate profiles with parsed resume data
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <p className="text-gray-700">
                  Track hiring pipeline and manage interview scheduling
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#0D9488] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold">5</span>
                </div>
                <p className="text-gray-700">
                  Generate reports on hiring performance and candidate quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}