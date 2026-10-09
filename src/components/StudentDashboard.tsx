import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  TrendingDown,
  Award,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Zap,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user, bookings, viewTicketDetails, setCurrentView, startNewSearch } = useBooking();

  const confirmedBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const cancelledBookings = bookings.filter((b) => b.status === 'CANCELLED');

  const totalSpent = confirmedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalStudentSaved = confirmedBookings.reduce((sum, b) => sum + b.discountAmount, 0);

  // Next upcoming booking
  const nextTrip = confirmedBookings.length > 0 ? confirmedBookings[0] : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Student Transit Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track student concession fares, manage upcoming intercity travel, and view digital transit passes.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('search')}
          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>Book Next Journey</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Student Profile & Pass Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Profile Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-teal-400 font-bold flex items-center justify-center text-xl shadow-md border border-slate-800">
                  {user ? user.name.slice(0, 2).toUpperCase() : 'ST'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{user?.name || 'College Student'}</h3>
                  <p className="text-xs text-slate-500">{user?.collegeName || 'National Engineering Institute'}</p>
                  <p className="text-[11px] font-mono text-teal-700 mt-0.5">
                    Roll/ID: {user?.studentId || 'STU-2026-CS-09'}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold">
                <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Verified Student</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5 text-xs">
              <div>
                <span className="text-slate-400 block">Registered Email</span>
                <span className="font-medium text-slate-800 truncate block">
                  {user?.email || 'student@college.edu'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone Contact</span>
                <span className="font-medium text-slate-800">+91 {user?.phone || '9876543210'}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Concession Discount</span>
                <span className="font-bold text-teal-700">10% All Routes</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Academic Pass Active for Academic Year 2026–2027</span>
            </span>
          </div>
        </div>

        {/* Right Digital Concession Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 rounded-2xl border border-slate-800 p-6 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="font-black text-sm tracking-wide">BUSGO CAMPUS PASS</span>
              </div>
              <span className="font-mono text-[10px] text-teal-400 uppercase tracking-widest">
                VERIFIED ID
              </span>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">Card Holder</p>
              <p className="text-base font-bold text-white tracking-wide">{user?.name || 'Sagar Donthu'}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div>
                <p className="text-[10px] text-slate-400 font-mono">CAMPUS ID</p>
                <p className="font-semibold text-teal-300 font-mono">{user?.studentId || 'CBIT-CS-2026'}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-mono">CONCESSION TIER</p>
                <p className="font-semibold text-white">Tier 1 Intercity</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400">Valid on All TSRTC/APSRTC & Private Partners</span>
            <div className="font-mono text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium block">Confirmed Trips</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {confirmedBookings.length}
            </span>
            <span className="text-xs text-teal-700 font-semibold">Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Total journeys booked</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium block">Student Savings</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-emerald-700 font-mono tabular-nums">
              ₹{totalStudentSaved.toLocaleString('en-IN')}
            </span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Saved via 10% student concession</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium block">Total Simulated Spend</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              ₹{totalSpent.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Total across confirmed trips</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <span className="text-xs text-slate-500 font-medium block">Cancelled Trips</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-slate-600 font-mono tabular-nums">
              {cancelledBookings.length}
            </span>
            <span className="text-xs text-slate-400">Refunded</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Processed without penalty</p>
        </div>
      </div>

      {/* Next Upcoming Journey Feature Card */}
      {nextTrip ? (
        <div className="bg-white rounded-2xl border-2 border-teal-500/40 p-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Next Upcoming Travel</span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">
                {nextTrip.fromCity} <span className="text-teal-600">→</span> {nextTrip.toCity}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span>
                  <strong>Date:</strong> {nextTrip.journeyDate}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>
                  <strong>Departure:</strong> {nextTrip.departureTime} ({nextTrip.boardingPoint})
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>
                  <strong>Seats:</strong>{' '}
                  <span className="font-mono font-bold text-teal-700">
                    {nextTrip.passengers.map((p) => p.seatNumber).join(', ')}
                  </span>
                </span>
              </div>
            </div>

            <button
              onClick={() => viewTicketDetails(nextTrip)}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-teal-300 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              <Ticket className="w-4 h-4 text-teal-400" />
              <span>View E-Ticket & Pass</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
          <p className="text-sm font-semibold text-slate-700">No upcoming journey scheduled.</p>
          <p className="text-xs text-slate-500 mt-1">Book your seat early for weekend campus returns or hackathons.</p>
          <button
            onClick={() => startNewSearch('Hyderabad', 'Bengaluru', new Date().toISOString().split('T')[0])}
            className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
          >
            Search Hyderabad → Bengaluru
          </button>
        </div>
      )}

      {/* Quick Booking Routes for Students */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-teal-600" />
          <span>Quick Student Routes (Popular University Corridors)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <button
            onClick={() => startNewSearch('Hyderabad', 'Bengaluru', new Date().toISOString().split('T')[0])}
            className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-teal-50/30 text-left transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <span className="font-bold text-slate-900 group-hover:text-teal-700">
                Hyderabad → Bengaluru
              </span>
              <span className="text-[11px] font-mono font-bold text-teal-700">₹699+</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Tech Hub & Campus Corridor</p>
          </button>

          <button
            onClick={() => startNewSearch('Hyderabad', 'Vijayawada', new Date().toISOString().split('T')[0])}
            className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-teal-50/30 text-left transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <span className="font-bold text-slate-900 group-hover:text-teal-700">
                Hyderabad → Vijayawada
              </span>
              <span className="text-[11px] font-mono font-bold text-teal-700">₹420+</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Weekend Home Express</p>
          </button>

          <button
            onClick={() => startNewSearch('Hyderabad', 'Chennai', new Date().toISOString().split('T')[0])}
            className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-teal-50/30 text-left transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <span className="font-bold text-slate-900 group-hover:text-teal-700">
                Hyderabad → Chennai
              </span>
              <span className="text-[11px] font-mono font-bold text-teal-700">₹1,350+</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Inter-Collegiate Fest Express</p>
          </button>
        </div>
      </div>
    </div>
  );
};
