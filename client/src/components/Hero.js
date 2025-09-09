// src/components/Hero.js
export default function Hero() {
  return (
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
  );
}