import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { POPULAR_CITIES } from '../data/sampleBuses';
import {
  MapPin,
  Calendar,
  Users,
  ArrowRightLeft,
  Search,
  ShieldCheck,
  Zap,
  Sparkles,
  Clock,
  Compass,
} from 'lucide-react';

export const HeroSearch: React.FC = () => {
  const { searchCriteria, setSearchCriteria, setCurrentView } = useBooking();

  const [fromCity, setFromCity] = useState(searchCriteria.fromCity);
  const [toCity, setToCity] = useState(searchCriteria.toCity);
  const [journeyDate, setJourneyDate] = useState(searchCriteria.journeyDate);
  const [passengersCount, setPassengersCount] = useState(searchCriteria.passengersCount);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Helper for date shortcuts
  const setQuickDate = (daysFromToday: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    const dateStr = d.toISOString().split('T')[0];
    setJourneyDate(dateStr);
  };

  const handleSwap = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCity || !toCity) {
      setErrorMsg('Please select both Origin and Destination cities.');
      return;
    }
    if (fromCity.toLowerCase() === toCity.toLowerCase()) {
      setErrorMsg('Origin and Destination cities cannot be the same.');
      return;
    }
    if (!journeyDate) {
      setErrorMsg('Please select a valid journey date.');
      return;
    }

    setErrorMsg(null);
    setSearchCriteria({
      fromCity,
      toCity,
      journeyDate,
      passengersCount,
    });
    setCurrentView('search');
  };

  // Quick select helper
  const handleSelectRoute = (from: string, to: string) => {
    setFromCity(from);
    setToCity(to);
    setErrorMsg(null);
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-14 lg:py-20 border-b border-slate-800">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-4 tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen College Transit System</span>
            <span aria-hidden="true">·</span>
            <span>Zero Booking Fee</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Your Journey Starts Here
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Book bus tickets easily, travel comfortably, and reach your destination with confidence.
          </p>
        </div>

        {/* Search Container Box */}
        <div className="max-w-5xl mx-auto bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4 items-center">
              {/* Origin City */}
              <div className="md:col-span-3 relative">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>From City</span>
                </label>
                <div className="relative">
                  <select
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-400 focus:outline-none appearance-none cursor-pointer"
                  >
                    {POPULAR_CITIES.map((c) => (
                      <option key={`from-${c}`} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none text-xs">▼</span>
                </div>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center pt-5 md:pt-6">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-teal-400 hover:border-teal-400/50 hover:bg-slate-750 transition-colors shadow-sm"
                  title="Swap Origin and Destination"
                  aria-label="Swap cities"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination City */}
              <div className="md:col-span-3 relative">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>To City</span>
                </label>
                <div className="relative">
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-400 focus:outline-none appearance-none cursor-pointer"
                  >
                    {POPULAR_CITIES.map((c) => (
                      <option key={`to-${c}`} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3.5 top-3.5 text-slate-400 pointer-events-none text-xs">▼</span>
                </div>
              </div>

              {/* Journey Date */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>Journey Date</span>
                </label>
                <input
                  type="date"
                  value={journeyDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-400 focus:outline-none cursor-pointer"
                />
              </div>

              {/* Passengers Count */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-400" />
                  <span>Passengers</span>
                </label>
                <select
                  value={passengersCount}
                  onChange={(e) => setPassengersCount(parseInt(e.target.value, 10))}
                  className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm font-medium focus:ring-2 focus:ring-teal-400 focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Passenger</option>
                  <option value={2}>2 Passengers</option>
                  <option value={3}>3 Passengers</option>
                  <option value={4}>4 Passengers</option>
                  <option value={5}>5 Passengers</option>
                  <option value={6}>6 Passengers</option>
                </select>
              </div>
            </div>

            {/* Quick shortcuts & Submit row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500 font-medium">Quick Dates:</span>
                <button
                  type="button"
                  onClick={() => setQuickDate(0)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(1)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(2)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  Day After
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Search className="w-4 h-4" />
                <span>Search Buses</span>
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium pt-1">{errorMsg}</p>
            )}
          </form>

          {/* Popular Route Shortcuts */}
          <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-500">Popular Corridors:</span>
            <button
              onClick={() => handleSelectRoute('Hyderabad', 'Bengaluru')}
              className="text-teal-400 hover:text-teal-300 hover:underline transition-colors cursor-pointer"
            >
              Hyderabad → Bengaluru
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => handleSelectRoute('Hyderabad', 'Vijayawada')}
              className="text-teal-400 hover:text-teal-300 hover:underline transition-colors cursor-pointer"
            >
              Hyderabad → Vijayawada
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => handleSelectRoute('Hyderabad', 'Chennai')}
              className="text-teal-400 hover:text-teal-300 hover:underline transition-colors cursor-pointer"
            >
              Hyderabad → Chennai
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => handleSelectRoute('Bengaluru', 'Chennai')}
              className="text-teal-400 hover:text-teal-300 hover:underline transition-colors cursor-pointer"
            >
              Bengaluru → Chennai
            </button>
          </div>
        </div>

        {/* 3-Pillar Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 pt-4 text-center sm:text-left">
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Instant Seat Allocation</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Pick upper/lower sleeper berths or pushback seating in real-time.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Risk-Free Simulation</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Full-featured demo sandbox with zero actual transaction liability.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Printable QR E-Ticket</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Download and print your verifiable boarding pass in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
