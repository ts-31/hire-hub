export default function Home() {
  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      {/* Navigation */}
      <nav className="bg-[#E5E7EB] shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#1E3A8A]">HireHub</h1>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-[#1E3A8A] px-3 py-2 text-sm font-medium transition-colors">
                Login
              </button>
              <button className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F0FDFA] via-[#E5E7EB] to-[#EEF2FF] py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3A8A] mb-6 leading-tight">
              Smart Resume Management
              <span className="block text-[#06B6D4]">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline recruitment with resume parsing, matching, and
              collaboration tools built for recruiters and HR teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-lg">
                Get Started
              </button>
              <button className="border-2 border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A8A] mb-4">
              Powerful Features for Modern Recruiting
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage resumes efficiently and find the
              right candidates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
                <svg
                  className="w-6 h-6 text-[#1E3A8A]"
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
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
                Smart Upload System
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Upload single resumes or bulk process folders via ZIP files.
                Integrated with AWS S3 for secure, scalable storage.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
                <svg
                  className="w-6 h-6 text-[#1E3A8A]"
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
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
                Background Processing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automated resume parsing and structured data extraction. Parsed
                data is stored in PostgreSQL for fast queries.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
                <svg
                  className="w-6 h-6 text-[#1E3A8A]"
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
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
                Intelligent Matching
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Algorithms match candidates based on skills, experience, and job
                requirements to produce ranked results.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
                <svg
                  className="w-6 h-6 text-[#1E3A8A]"
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
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
                Advanced Filtering
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Filter candidates by experience, skill sets, education, and
                custom criteria to quickly find the best matches.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
                <svg
                  className="w-6 h-6 text-[#1E3A8A]"
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
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
                Smart Shortlisting
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Recruiters can create shortlists with notes and ratings for a
                smooth handoff to HR.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2 group">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D2F5EE] transition-colors">
                <svg
                  className="w-6 h-6 text-[#1E3A8A]"
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
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-3">
                HR Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A concise dashboard for HR to view jobs, shortlisted candidates,
                and manage the hiring pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MVP Flow Section */}
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

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#0D9488] to-[#1E3A8A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Hiring Process?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Start using HireHub to streamline your recruitment workflow
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-[#0D9488] text-white hover:bg-[#0F766E] px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-xl min-w-[200px]">
                Register as Recruiter
              </button>
              <button className="border-2 border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 min-w-[200px]">
                Register as HR
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  Processed Resumes
                </div>
                <div className="text-gray-300">
                  Uploaded resumes are parsed and indexed
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  Trusted Workflow
                </div>
                <div className="text-gray-300">
                  Recruiter + HR collaboration for hiring
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  Accurate Matching
                </div>
                <div className="text-gray-300">
                  Matching and filtering for efficient shortlists
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3A8A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">HireHub</h3>
              <p className="text-gray-400">
                Resume management and shortlisting for recruiters and HR teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#4B5563] mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HireHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
