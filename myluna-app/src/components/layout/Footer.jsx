import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-plum text-white/70 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 30 30" className="w-8 h-8" fill="none">
                <path d="M15 26C15 26 4 20 4 12.5C4 8.36 7.36 5 11.5 5C13.24 5 14.84 5.61 16.1 6.62C17.36 5.61 18.96 5 20.7 5C24.64 5 28 8.36 28 12.5C28 20 15 26 15 26Z" fill="#D4537E" fillOpacity="0.3" stroke="#D4537E" strokeWidth="1.5"/>
                <path d="M15 22C15 22 7 17.5 7 12.5C7 9.46 9.46 7 12.5 7C13.74 7 14.88 7.44 15.77 8.18C16.66 7.44 17.8 7 19.04 7C22.04 7 24.5 9.46 24.5 12.5C24.5 17.5 15 22 15 22Z" fill="#D4537E"/>
              </svg>
              <span className="font-serif text-xl text-white">myluna</span>
            </div>
            <p className="text-sm text-white/50 max-w-xs">
              Period and cycle tracking built with care, for women who want to truly understand their bodies.
            </p>
          </div>

          {/* Product */}
          <div>
            <h5 className="font-medium text-white text-sm mb-3">Product</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition">How it works</Link></li>
              <li><Link to="/insights" className="hover:text-white transition">Health insights</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-medium text-white text-sm mb-3">Company</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition">About us</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-medium text-white text-sm mb-3">Support</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-white transition">Help centre</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms of service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2026 myluna. Made with ♡ for women everywhere.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <Link to="/cookies" className="hover:text-white transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}