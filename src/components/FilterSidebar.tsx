import React from 'react';
import { useBooking } from '../context/BookingContext';
import { BusType } from '../types';
import { RotateCcw, Filter, Sun, Sunrise, Sunset, Moon } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { filters, setFilters, resetFilters } = useBooking();

  const handleBusTypeToggle = (type: BusType) => {
    setFilters((prev) => {
      const exists = prev.busTypes.includes(type);
      return {
        ...prev,
        busTypes: exists ? prev.busTypes.filter((t) => t !== type) : [...prev.busTypes, type],
      };
    });
  };

  const handleTimeToggle = (timeSlot: 'early_morning' | 'morning' | 'afternoon' | 'night') => {
    setFilters((prev) => {
      const exists = prev.departureTimes.includes(timeSlot);
      return {
        ...prev,
        departureTimes: exists
          ? prev.departureTimes.filter((t) => t !== timeSlot)
          : [...prev.departureTimes, timeSlot],
      };
    });
  };

  const busTypeOptions: BusType[] = [
    'Multi-Axle AC Sleeper',
    'AC Sleeper',
    'AC Seater',
    'Non-AC Sleeper',
    'Non-AC Seater',
  ];

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-teal-600" />
          <h3 className="text-sm font-bold text-slate-900">Filter Buses</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-teal-600 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-semibold text-slate-800 mb-2">Sort Results By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
        >
          <option value="cheapest">Cheapest First (Lowest Fare)</option>
          <option value="rating">Top Customer Rated</option>
          <option value="departure_early">Earliest Departure</option>
          <option value="departure_late">Latest Departure</option>
          <option value="fastest">Fastest Journey Duration</option>
        </select>
      </div>

      {/* Maximum Price Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
          <span>Max Ticket Fare</span>
          <span className="font-mono text-teal-700 font-bold tabular-nums">
            ₹{filters.priceMax.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={400}
          max={2000}
          step={50}
          value={filters.priceMax}
          onChange={(e) => setFilters((prev) => ({ ...prev, priceMax: Number(e.target.value) }))}
          className="w-full accent-teal-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>₹400</span>
          <span>₹2,000</span>
        </div>
      </div>

      {/* Quick Amenities/Toggles */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-800">Comfort Features</label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.acOnly}
              onChange={(e) => setFilters((prev) => ({ ...prev, acOnly: e.target.checked }))}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span>AC Coaches Only</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.sleeperOnly}
              onChange={(e) => setFilters((prev) => ({ ...prev, sleeperOnly: e.target.checked }))}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span>Sleeper Berths Only</span>
          </label>
        </div>
      </div>

      {/* Departure Time Slots */}
      <div>
        <label className="block text-xs font-semibold text-slate-800 mb-2">Departure Window</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleTimeToggle('early_morning')}
            className={`p-2 rounded-xl text-left border text-xs transition-colors flex flex-col gap-1 ${
              filters.departureTimes.includes('early_morning')
                ? 'border-teal-500 bg-teal-50 text-teal-900 font-semibold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-1 text-[11px]">
              <Sunrise className="w-3.5 h-3.5 text-amber-500" />
              <span>12am – 6am</span>
            </div>
            <span className="text-[10px] text-slate-400">Early Morning</span>
          </button>

          <button
            type="button"
            onClick={() => handleTimeToggle('morning')}
            className={`p-2 rounded-xl text-left border text-xs transition-colors flex flex-col gap-1 ${
              filters.departureTimes.includes('morning')
                ? 'border-teal-500 bg-teal-50 text-teal-900 font-semibold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-1 text-[11px]">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>6am – 12pm</span>
            </div>
            <span className="text-[10px] text-slate-400">Morning</span>
          </button>

          <button
            type="button"
            onClick={() => handleTimeToggle('afternoon')}
            className={`p-2 rounded-xl text-left border text-xs transition-colors flex flex-col gap-1 ${
              filters.departureTimes.includes('afternoon')
                ? 'border-teal-500 bg-teal-50 text-teal-900 font-semibold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-1 text-[11px]">
              <Sunset className="w-3.5 h-3.5 text-orange-500" />
              <span>12pm – 6pm</span>
            </div>
            <span className="text-[10px] text-slate-400">Afternoon</span>
          </button>

          <button
            type="button"
            onClick={() => handleTimeToggle('night')}
            className={`p-2 rounded-xl text-left border text-xs transition-colors flex flex-col gap-1 ${
              filters.departureTimes.includes('night')
                ? 'border-teal-500 bg-teal-50 text-teal-900 font-semibold'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-1 text-[11px]">
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              <span>6pm – 12am</span>
            </div>
            <span className="text-[10px] text-slate-400">Night</span>
          </button>
        </div>
      </div>

      {/* Bus Types Checkbox list */}
      <div>
        <label className="block text-xs font-semibold text-slate-800 mb-2">Bus Category</label>
        <div className="space-y-1.5">
          {busTypeOptions.map((type) => {
            const isChecked = filters.busTypes.includes(type);
            return (
              <label key={type} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleBusTypeToggle(type)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="truncate">{type}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
