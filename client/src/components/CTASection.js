export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hiring Process?
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Start using HireHub to streamline your recruitment workflow
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary CTA */}
            <button className="bg-primary text-white hover:opacity-90 px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-xl min-w-[200px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Register as Recruiter
            </button>

            {/* Secondary CTA (outline) */}
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
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
