import React, { useState } from 'react';
import { Bus, Seat, DeckType } from '../types';
import { useBooking } from '../context/BookingContext';
import {
  Compass,
  Check,
  Ban,
  Heart,
  ArrowRight,
  Shield,
  Layers,
  MapPin,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';

interface SeatMapProps {
  bus: Bus;
  onProceedToDetails: () => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ bus, onProceedToDetails }) => {
  const {
    selectedSeats,
    toggleSeatSelection,
    selectedBoardingPoint,
    setSelectedBoardingPoint,
    selectedDroppingPoint,
    setSelectedDroppingPoint,
  } = useBooking();

  const [activeDeck, setActiveDeck] = useState<DeckType>('lower');

  // Initialize boarding/dropping if not set
  React.useEffect(() => {
    if (!selectedBoardingPoint && bus.boardingPoints.length > 0) {
      setSelectedBoardingPoint(bus.boardingPoints[0].location);
    }
    if (!selectedDroppingPoint && bus.droppingPoints.length > 0) {
      setSelectedDroppingPoint(bus.droppingPoints[0].location);
    }
  }, [bus, selectedBoardingPoint, selectedDroppingPoint, setSelectedBoardingPoint, setSelectedDroppingPoint]);

  const deckSeats = bus.seats.filter((s) => s.deck === activeDeck);
  const totalSelectedFare = selectedSeats.reduce((sum, s) => sum + s.fare, 0);

  // Group seats by row
  const rowsMap = new Map<number, Seat[]>();
  deckSeats.forEach((seat) => {
    const list = rowsMap.get(seat.row) || [];
    list.push(seat);
    rowsMap.set(seat.row, list);
  });
  const sortedRowKeys = Array.from(rowsMap.keys()).sort((a, b) => a - b);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 text-white shadow-xl">
      {/* Top Header & Deck Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white">Select Your Preferred Seats</h3>
            <span className="text-xs text-teal-400 font-medium">({bus.busType})</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click on any available berth or pushback seat to reserve.
          </p>
        </div>

        {/* Deck switcher if bus has upper deck */}
        {bus.hasUpperDeck && (
          <div className="flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700/80 self-start sm:self-auto">
            <button
              onClick={() => setActiveDeck('lower')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeDeck === 'lower'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Lower Deck</span>
            </button>
            <button
              onClick={() => setActiveDeck('upper')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeDeck === 'upper'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Upper Deck</span>
            </button>
          </div>
        )}
      </div>

      {/* Seat Legend */}
      <div className="py-4 border-b border-slate-800/80 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md border border-slate-600 bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
            1
          </div>
          <span>Available</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-[10px] shadow-sm">
            ✓
          </div>
          <span className="text-teal-300 font-medium">Selected</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-slate-800/50 border border-slate-800 text-slate-600 flex items-center justify-center text-[10px]">
            ✕
          </div>
          <span>Booked</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md border border-rose-500/40 bg-rose-950/20 text-rose-300 flex items-center justify-center text-[10px]">
            ♀
          </div>
          <span>Ladies Berth</span>
        </div>
      </div>

      {/* Main Bus Shell Interior */}
      <div className="py-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-slate-950/70 border-2 border-slate-800 rounded-3xl p-5 relative shadow-inner">
          {/* Driver Cabin Front Banner */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                Front / Windshield
              </span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block mr-1" />
              <span>Driver</span>
            </div>
          </div>

          {/* Seat Rows Matrix */}
          <div className="space-y-3.5">
            {sortedRowKeys.map((rowNum) => {
              const rowSeats = rowsMap.get(rowNum) || [];
              const leftSeats = rowSeats.filter((s) => s.col <= 1);
              const rightSeats = rowSeats.filter((s) => s.col >= 2);

              return (
                <div key={`row-${rowNum}`} className="flex items-center justify-between gap-4">
                  {/* Left Column(s) */}
                  <div className="flex items-center gap-2">
                    {leftSeats.map((seat) => {
                      const isSelected = selectedSeats.some((s) => s.id === seat.id);
                      const isBooked = seat.isBooked;

                      let seatStyle = 'border border-slate-700 bg-slate-800/90 text-slate-200 hover:border-teal-400 hover:bg-slate-750 cursor-pointer';
                      if (isBooked) {
                        seatStyle = 'border border-slate-800/60 bg-slate-900/60 text-slate-600 cursor-not-allowed';
                      } else if (isSelected) {
                        seatStyle = 'border-teal-400 bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20';
                      } else if (seat.isLadiesOnly) {
                        seatStyle = 'border-rose-500/40 bg-rose-950/30 text-rose-200 hover:border-rose-400 cursor-pointer';
                      }

                      const isSleeper = seat.type === 'sleeper';
                      const boxDims = isSleeper ? 'w-14 h-9 sm:w-16 sm:h-10' : 'w-10 h-10 sm:w-11 sm:h-11';

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          disabled={isBooked}
                          onClick={() => toggleSeatSelection(seat)}
                          className={`rounded-lg flex flex-col items-center justify-center relative transition-all ${boxDims} ${seatStyle}`}
                          title={`${seat.number} - ₹${seat.fare} ${isBooked ? '(Booked)' : isSelected ? '(Selected)' : '(Available)'}`}
                        >
                          <span className="text-[11px] font-semibold leading-none">{seat.number}</span>
                          <span className="text-[9px] opacity-75 mt-0.5">₹{seat.fare}</span>
                          {seat.isLadiesOnly && !isSelected && !isBooked && (
                            <span className="absolute top-0.5 right-0.5 text-[8px] text-rose-300">♀</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Center Aisle Indicator */}
                  <div className="text-[9px] uppercase tracking-widest text-slate-700 font-mono select-none px-1">
                    Aisle
                  </div>

                  {/* Right Column(s) */}
                  <div className="flex items-center gap-2">
                    {rightSeats.map((seat) => {
                      const isSelected = selectedSeats.some((s) => s.id === seat.id);
                      const isBooked = seat.isBooked;

                      let seatStyle = 'border border-slate-700 bg-slate-800/90 text-slate-200 hover:border-teal-400 hover:bg-slate-750 cursor-pointer';
                      if (isBooked) {
                        seatStyle = 'border border-slate-800/60 bg-slate-900/60 text-slate-600 cursor-not-allowed';
                      } else if (isSelected) {
                        seatStyle = 'border-teal-400 bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20';
                      } else if (seat.isLadiesOnly) {
                        seatStyle = 'border-rose-500/40 bg-rose-950/30 text-rose-200 hover:border-rose-400 cursor-pointer';
                      }

                      const isSleeper = seat.type === 'sleeper';
                      const boxDims = isSleeper ? 'w-14 h-9 sm:w-16 sm:h-10' : 'w-10 h-10 sm:w-11 sm:h-11';

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          disabled={isBooked}
                          onClick={() => toggleSeatSelection(seat)}
                          className={`rounded-lg flex flex-col items-center justify-center relative transition-all ${boxDims} ${seatStyle}`}
                          title={`${seat.number} - ₹${seat.fare} ${isBooked ? '(Booked)' : isSelected ? '(Selected)' : '(Available)'}`}
                        >
                          <span className="text-[11px] font-semibold leading-none">{seat.number}</span>
                          <span className="text-[9px] opacity-75 mt-0.5">₹{seat.fare}</span>
                          {seat.isLadiesOnly && !isSelected && !isBooked && (
                            <span className="absolute top-0.5 right-0.5 text-[8px] text-rose-300">♀</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rear Bus Exit */}
          <div className="mt-5 pt-3 border-t border-slate-800/80 text-center text-[10px] text-slate-500 font-mono uppercase">
            Rear Exit / Emergency Exit
          </div>
        </div>
      </div>

      {/* Boarding & Dropping Points Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 pb-6 border-t border-slate-800">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Select Boarding Point ({bus.fromCity})</span>
          </label>
          <select
            value={selectedBoardingPoint}
            onChange={(e) => setSelectedBoardingPoint(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-teal-400 focus:outline-none"
          >
            {bus.boardingPoints.map((bp) => (
              <option key={bp.id} value={bp.location}>
                {bp.time} - {bp.location} ({bp.landmark})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Select Dropping Point ({bus.toCity})</span>
          </label>
          <select
            value={selectedDroppingPoint}
            onChange={(e) => setSelectedDroppingPoint(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-teal-400 focus:outline-none"
          >
            {bus.droppingPoints.map((dp) => (
              <option key={dp.id} value={dp.location}>
                {dp.time} - {dp.location} ({dp.landmark})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Selection Summary & Proceed Bar */}
      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/50 -mx-5 -mb-5 sm:-mx-7 sm:-mb-7 p-5 rounded-b-2xl">
        <div>
          {selectedSeats.length > 0 ? (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Selected Seats:</span>
                <span className="text-sm font-bold text-teal-300">
                  {selectedSeats.map((s) => s.number).join(', ')} ({selectedSeats.length}{' '}
                  {selectedSeats.length === 1 ? 'seat' : 'seats'})
                </span>
              </div>
              <div className="text-xs text-slate-300">
                <span>Total Fare: </span>
                <span className="font-mono text-base font-bold text-white tabular-nums">
                  ₹{totalSelectedFare.toLocaleString('en-IN')}
                </span>
                <span className="text-slate-400 text-[11px] ml-1.5">(excl. 5% GST)</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-teal-400" />
              <span>Please pick at least 1 seat to continue your booking.</span>
            </div>
          )}
        </div>

        <button
          type="button"
          disabled={selectedSeats.length === 0}
          onClick={onProceedToDetails}
          className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            selectedSeats.length > 0
              ? 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-lg shadow-teal-500/20 transform hover:-translate-y-0.5 cursor-pointer'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
          }`}
        >
          <span>Continue to Passenger Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
