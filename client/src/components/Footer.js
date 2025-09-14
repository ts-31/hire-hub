// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-surface-4 text-surface-1 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">HireHub</h3>
            <p className="text-gray-300">
              Resume management and shortlisting for recruiters and HR teams.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-surface-1 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 text-center text-gray-300"
          style={{ borderTop: "1px solid var(--color-foreground-muted)" }}
        >
          <p>&copy; 2025 HireHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
