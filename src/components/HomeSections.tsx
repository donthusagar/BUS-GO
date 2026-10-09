import React from 'react';
import { useBooking } from '../context/BookingContext';
import { POPULAR_ROUTES, FEATURED_OPERATORS } from '../data/sampleBuses';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CreditCard,
  Ticket,
  Headphones,
  MapPin,
  Star,
  Users,
  Compass,
  GraduationCap,
} from 'lucide-react';

export const HomeSections: React.FC = () => {
  const { startNewSearch, setCurrentView } = useBooking();

  const handleRouteClick = (from: string, to: string) => {
    const today = new Date().toISOString().split('T')[0];
    startNewSearch(from, to, today);
  };

  return (
    <div className="space-y-16 py-12">
      {/* 1. Popular Destinations & Corridors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
              <Compass className="w-4 h-4" />
              <span>Trending Intercity Routes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Travel Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              High-frequency express routes with verified sleeper and pushback luxury coaches.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('search')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>View All Schedules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_ROUTES.map((route, idx) => (
            <div
              key={`${route.from}-${route.to}-${idx}`}
              onClick={() => handleRouteClick(route.from, route.to)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-medium text-teal-700">{route.category}</span>
                  <span className="font-mono">{route.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {route.from}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {route.to}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 mt-1">
                  Approx. {route.distanceKm} km · {route.busesDaily} daily services available
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Fares starting from</span>
                  <span className="text-lg font-extrabold text-slate-900 font-mono tabular-nums">
                    ₹{route.startingFare}
                  </span>
                </div>

                <span className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-bold group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  Check Buses
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Featured Bus Operators */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Bus Operators
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Partnering with India’s leading government state transport corporations and verified luxury private operators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_OPERATORS.map((op) => (
              <div
                key={op.name}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-teal-400 font-extrabold flex items-center justify-center text-sm shadow-sm">
                    {op.code}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">{op.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex items-center text-emerald-700 text-xs font-bold">
                        <Star className="w-3 h-3 fill-emerald-600 text-emerald-600 mr-0.5" />
                        <span>{op.rating}</span>
                      </div>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-[11px] text-slate-500">{op.fleetCount}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  {op.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. System Benefits & Why BusGo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Choose BusGo?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Engineered to deliver seamless, transparent, and passenger-friendly reservations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Effortless 3-Step Booking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore available routes, inspect lower and upper sleeper berths in real time, and lock in
              your seat in less than 2 minutes.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Simulated Safe Checkout</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Experience modern digital payments (UPI, Card, NetBanking, Pay on Board) with zero financial
              risk or actual bank credential sharing.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Instant QR Boarding Passes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive print-ready e-tickets equipped with scannable QR tokens, luggage guidelines, and instant
              cancellation refund simulation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Student Innovation Project Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              <GraduationCap className="w-4 h-4" />
              <span>College Capstone Project Demonstration</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Built with React, TypeScript & Tailwind CSS
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Designed as a comprehensive web engineering project showcasing client state management, responsive UX,
              and realistic intercity transit workflows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('about')}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Learn More
            </button>
            <button
              onClick={() => setCurrentView('student-dashboard')}
              className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Open Student Hub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
