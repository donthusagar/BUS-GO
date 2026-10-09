import React, { useState } from 'react';
import { useBooking, AppView } from '../context/BookingContext';
import { Bus, User, Ticket, Menu, X, GraduationCap, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    user,
    logoutUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    bookings,
  } = useBooking();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter((b) => b.status === 'CONFIRMED').length;

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Single text element Brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group whitespace-nowrap shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-900 transition-colors">
              <Bus className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white leading-none">
                Bus<span className="text-teal-400">Go</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Intercity Reservation
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentView === 'home'
                  ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('search')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentView === 'search' || currentView === 'passenger-details' || currentView === 'payment'
                  ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Search Buses
            </button>

            <button
              onClick={() => handleNavClick('my-bookings')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentView === 'my-bookings' || currentView === 'confirmation'
                  ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[11px] font-bold rounded bg-teal-500 text-slate-950">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('student-dashboard')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentView === 'student-dashboard'
                  ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-teal-400" />
              <span>Student Pass</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentView === 'about'
                  ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              About Project
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentView === 'contact'
                  ? 'text-teal-400 font-semibold border-b-2 border-teal-400'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('student-dashboard')}
                  className="flex items-center gap-2 text-left p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center text-xs font-bold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-200 truncate max-w-[110px] leading-tight">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-teal-400">Student Verified</p>
                  </div>
                </button>
                <button
                  onClick={logoutUser}
                  className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded transition-colors"
                  title="Sign out of demo session"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-900 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-md ${
                currentView === 'home' ? 'bg-slate-800 text-teal-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('search')}
              className={`text-left px-3 py-2 rounded-md ${
                currentView === 'search' ? 'bg-slate-800 text-teal-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Search Buses
            </button>
            <button
              onClick={() => handleNavClick('my-bookings')}
              className={`text-left px-3 py-2 rounded-md flex items-center justify-between ${
                currentView === 'my-bookings' ? 'bg-slate-800 text-teal-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="px-2 py-0.5 text-xs rounded bg-teal-500 text-slate-950 font-bold">
                  {activeBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('student-dashboard')}
              className={`text-left px-3 py-2 rounded-md flex items-center gap-2 ${
                currentView === 'student-dashboard' ? 'bg-slate-800 text-teal-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-teal-400" />
              <span>Student Pass & Dashboard</span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2 rounded-md ${
                currentView === 'about' ? 'bg-slate-800 text-teal-400 font-semibold' : 'text-slate-300'
              }`}
            >
              About Project
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left px-3 py-2 rounded-md ${
                currentView === 'contact' ? 'bg-slate-800 text-teal-400 font-semibold' : 'text-slate-300'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800">
            {user ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-teal-400">{user.email}</p>
                </div>
                <button
                  onClick={logoutUser}
                  className="px-3 py-1.5 text-xs bg-slate-800 text-slate-300 hover:text-white rounded-md"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-900 bg-teal-400 rounded-lg"
              >
                Sign In / Student Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
