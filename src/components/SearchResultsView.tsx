import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Bus } from '../types';
import { BusCard } from './BusCard';
import { FilterSidebar } from './FilterSidebar';
import { POPULAR_CITIES } from '../data/sampleBuses';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ArrowRightLeft,
  Filter,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface SearchResultsViewProps {
  onProceedToPassengerDetails: () => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  onProceedToPassengerDetails,
}) => {
  const {
    searchCriteria,
    setSearchCriteria,
    filteredBuses,
    selectedBus,
    setSelectedBus,
    resetFilters,
  } = useBooking();

  const [expandedBusId, setExpandedBusId] = useState<string | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isModifyingSearch, setIsModifyingSearch] = useState(false);

  // Search modify form state
  const [editFrom, setEditFrom] = useState(searchCriteria.fromCity);
  const [editTo, setEditTo] = useState(searchCriteria.toCity);
  const [editDate, setEditDate] = useState(searchCriteria.journeyDate);
  const [editPassengers, setEditPassengers] = useState(searchCriteria.passengersCount);

  const handleToggleBusExpand = (bus: Bus) => {
    if (expandedBusId === bus.id) {
      setExpandedBusId(null);
      setSelectedBus(null);
    } else {
      setExpandedBusId(bus.id);
      setSelectedBus(bus);
    }
  };

  const handleApplyModify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchCriteria({
      fromCity: editFrom,
      toCity: editTo,
      journeyDate: editDate,
      passengersCount: editPassengers,
    });
    setExpandedBusId(null);
    setSelectedBus(null);
    setIsModifyingSearch(false);
  };

  const handleSwapCities = () => {
    const temp = editFrom;
    setEditFrom(editTo);
    setEditTo(temp);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Search Criteria Summary Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
        {!isModifyingSearch ? (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base">
                  {searchCriteria.fromCity}
                </span>
                <span className="text-teal-600 font-bold">→</span>
                <span className="font-bold text-slate-900 text-base">
                  {searchCriteria.toCity}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span className="font-medium">
                  {new Date(searchCriteria.journeyDate).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Users className="w-3.5 h-3.5 text-teal-600" />
                <span className="font-medium">
                  {searchCriteria.passengersCount} {searchCriteria.passengersCount === 1 ? 'Seat' : 'Seats'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <button
                onClick={() => {
                  setEditFrom(searchCriteria.fromCity);
                  setEditTo(searchCriteria.toCity);
                  setEditDate(searchCriteria.journeyDate);
                  setEditPassengers(searchCriteria.passengersCount);
                  setIsModifyingSearch(true);
                }}
                className="px-4 py-2 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Modify Search
              </button>
            </div>
          </div>
        ) : (
          /* Modify Search Inline Form */
          <form onSubmit={handleApplyModify} className="space-y-4 pt-1 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900">Modify Journey Route</span>
              <button
                type="button"
                onClick={() => setIsModifyingSearch(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">From</label>
                <select
                  value={editFrom}
                  onChange={(e) => setEditFrom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {POPULAR_CITIES.map((c) => (
                    <option key={`edit-from-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1 flex justify-center pt-4">
                <button
                  type="button"
                  onClick={handleSwapCities}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                  title="Swap Cities"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">To</label>
                <select
                  value={editTo}
                  onChange={(e) => setEditTo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {POPULAR_CITIES.map((c) => (
                    <option key={`edit-to-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Date</label>
                <input
                  type="date"
                  value={editDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Apply Search
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Main Grid: Filters Sidebar + Bus Results List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20">
          <FilterSidebar />
        </div>

        {/* Bus List (Right) */}
        <div className="lg:col-span-9 space-y-4">
          {/* Results count & status banner */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
            <p>
              Showing <strong className="text-slate-900 font-bold">{filteredBuses.length}</strong> available bus
              service(s) for this route
            </p>
            <span className="text-[11px] text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Demo Schedule Data
            </span>
          </div>

          {/* List of buses */}
          {filteredBuses.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No matching buses found for this query
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No operators currently match your filter criteria or route combination. Try resetting your filters
                or exploring our primary travel corridors.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
                <button
                  onClick={() => {
                    setSearchCriteria({
                      fromCity: 'Hyderabad',
                      toCity: 'Bengaluru',
                      journeyDate: new Date().toISOString().split('T')[0],
                      passengersCount: 1,
                    });
                    resetFilters();
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Switch to Hyderabad → Bengaluru
                </button>
              </div>
            </div>
          ) : (
            filteredBuses.map((bus) => (
              <BusCard
                key={bus.id}
                bus={bus}
                isExpanded={expandedBusId === bus.id}
                onToggleExpand={() => handleToggleBusExpand(bus)}
                onProceedToPassengerDetails={onProceedToPassengerDetails}
              />
            ))
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-sm h-full p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Filter Buses</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-teal-600 text-white font-bold text-xs rounded-xl mt-4"
            >
              Apply Filters ({filteredBuses.length} buses)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
