import React from 'react';
import { useBooking } from '../context/BookingContext';
import { Bus, GraduationCap, ShieldCheck, Heart, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, startNewSearch } = useBooking();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs py-12 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Project Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Bus<span className="text-teal-400">Go</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              BusGo is an interactive Bus Ticket Booking System built as a college team capstone engineering project.
              Engineered with modern frontend components, dynamic dual-deck seat maps, and local state persistence.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-teal-400">
              <GraduationCap className="w-4 h-4" />
              <span>Developed for Academic Project Demonstration</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-2 space-y-2.5">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('search')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Search Buses
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('my-bookings')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('student-dashboard')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Student Transit Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Team
                </button>
              </li>
            </ul>
          </div>

          {/* Top Routes */}
          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Popular Routes</p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => startNewSearch('Hyderabad', 'Bengaluru', new Date().toISOString().split('T')[0])}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Hyderabad → Bengaluru (from ₹699)
                </button>
              </li>
              <li>
                <button
                  onClick={() => startNewSearch('Hyderabad', 'Vijayawada', new Date().toISOString().split('T')[0])}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Hyderabad → Vijayawada (from ₹420)
                </button>
              </li>
              <li>
                <button
                  onClick={() => startNewSearch('Hyderabad', 'Chennai', new Date().toISOString().split('T')[0])}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Hyderabad → Chennai (from ₹1,350)
                </button>
              </li>
              <li>
                <button
                  onClick={() => startNewSearch('Bengaluru', 'Chennai', new Date().toISOString().split('T')[0])}
                  className="hover:text-teal-300 transition-colors cursor-pointer"
                >
                  Bengaluru → Chennai (from ₹650)
                </button>
              </li>
            </ul>
          </div>

          {/* College Project Disclaimer */}
          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Academic Notice</p>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
              <p>
                <strong>Demo Sandbox Only:</strong> All bus schedules, seat matrices, and transactions are simulated.
              </p>
              <p>
                No real bank cards, UPI PINs, or monies are processed.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} BusGo – Bus Ticket Booking System. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Responsive React SPA</span>
            <span aria-hidden="true">·</span>
            <span>Tailwind CSS</span>
            <span aria-hidden="true">·</span>
            <span>College Project Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
