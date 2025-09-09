// src/components/CTASection.js
export default function CTASection() {
  return (
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
  );
}