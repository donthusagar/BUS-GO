import React from 'react';
import { Bus } from '../types';
import { useBooking } from '../context/BookingContext';
import { SeatMap } from './SeatMap';
import {
  Star,
  Wifi,
  Zap,
  Coffee,
  Shield,
  ChevronDown,
  ChevronUp,
  Clock,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface BusCardProps {
  bus: Bus;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onProceedToPassengerDetails: () => void;
}

export const BusCard: React.FC<BusCardProps> = ({
  bus,
  isExpanded,
  onToggleExpand,
  onProceedToPassengerDetails,
}) => {
  const { selectedBus, selectedSeats } = useBooking();

  const isCurrentSelectedBus = selectedBus?.id === bus.id;
  const currentBusSelectedSeatsCount = isCurrentSelectedBus ? selectedSeats.length : 0;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
        isExpanded ? 'border-teal-500 ring-1 ring-teal-500/20' : 'border-slate-200'
      }`}
    >
      {/* Top Banner / Operator & Timings Grid */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Operator Identity & Bus Class */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              {/* Monogram emblem */}
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 font-bold flex items-center justify-center text-sm shadow-sm">
                {bus.operatorLogoText}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 hover:text-teal-700 transition-colors">
                  {bus.operatorName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{bus.busType}</span>
                  <span aria-hidden="true">·</span>
                  <span>{bus.hasUpperDeck ? '2+1 Sleeper Berths' : '2+2 Pushback Seater'}</span>
                </div>
              </div>
            </div>

            {/* Ratings & Amenities row */}
            <div className="flex items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/60">
                <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>{bus.rating.toFixed(1)}</span>
                <span className="text-emerald-700/80 font-normal">({bus.reviewsCount})</span>
              </div>

              {/* Amenity tags */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                {bus.features.slice(0, 3).map((f) => (
                  <span key={f} className="text-slate-600">
                    {f}
                  </span>
                ))}
                {bus.features.length > 3 && (
                  <span className="text-slate-400">+{bus.features.length - 3} more</span>
                )}
              </div>
            </div>
          </div>

          {/* Departure -> Duration -> Arrival schedule */}
          <div className="flex items-center justify-between sm:justify-start gap-6 sm:gap-10 border-y lg:border-y-0 border-slate-100 py-3 lg:py-0">
            {/* Departure */}
            <div>
              <p className="text-xl font-bold text-slate-900 font-mono tabular-nums leading-none">
                {bus.departureTime}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1 truncate max-w-[120px]">
                {bus.boardingPoints[0]?.location || bus.fromCity}
              </p>
              <p className="text-[11px] text-slate-400">{bus.fromCity}</p>
            </div>

            {/* Arrow & Duration */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-slate-400 font-medium">{bus.duration}</span>
              <div className="w-24 sm:w-28 flex items-center justify-center my-1 relative">
                <div className="w-full border-t border-slate-300 border-dashed" />
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 absolute right-0" />
              </div>
              <span className="text-[10px] text-teal-600 font-medium">Direct Non-Stop</span>
            </div>

            {/* Arrival */}
            <div>
              <p className="text-xl font-bold text-slate-900 font-mono tabular-nums leading-none">
                {bus.arrivalTime}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1 truncate max-w-[120px]">
                {bus.droppingPoints[0]?.location || bus.toCity}
              </p>
              <p className="text-[11px] text-slate-400">{bus.toCity}</p>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-slate-400 block">Starting from</span>
              <span className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                ₹{bus.baseFare.toLocaleString('en-IN')}
              </span>
              <span className="block text-[11px] text-teal-600 font-medium">
                {bus.availableSeatsCount} seats available
              </span>
            </div>

            <button
              onClick={onToggleExpand}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isExpanded
                  ? 'bg-slate-900 text-teal-300 hover:bg-slate-800'
                  : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
              }`}
            >
              <span>{isExpanded ? 'Hide Seats' : 'View Seats'}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Selected seats badge notification if already selected on this bus */}
        {currentBusSelectedSeatsCount > 0 && !isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-teal-700 font-medium">
              ✓ {currentBusSelectedSeatsCount} seat(s) selected: {selectedSeats.map((s) => s.number).join(', ')}
            </span>
            <button
              onClick={onToggleExpand}
              className="text-teal-600 hover:text-teal-800 font-semibold underline"
            >
              Modify Seat Selection
            </button>
          </div>
        )}
      </div>

      {/* Expanded Interactive Seat Selection Area */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-slate-950 p-4 sm:p-6 animate-fadeIn">
          <SeatMap bus={bus} onProceedToDetails={onProceedToPassengerDetails} />
        </div>
      )}
    </div>
  );
};
