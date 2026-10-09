import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Booking } from '../types';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Printer,
  XCircle,
  CheckCircle,
  AlertCircle,
  Search,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const MyBookingsView: React.FC = () => {
  const { bookings, cancelBooking, viewTicketDetails, setCurrentView } = useBooking();
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const displayedBookings = bookings.filter((b) => {
    if (filterStatus === 'ALL') return true;
    return b.status === filterStatus;
  });

  const handleConfirmCancel = (id: string) => {
    cancelBooking(id);
    setCancellingBookingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Bookings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your bus tickets, download e-tickets, and process simulated cancellations.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'ALL'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setFilterStatus('CONFIRMED')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'CONFIRMED'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Confirmed ({bookings.filter((b) => b.status === 'CONFIRMED').length})
          </button>
          <button
            onClick={() => setFilterStatus('CANCELLED')}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-colors cursor-pointer ${
              filterStatus === 'CANCELLED'
                ? 'bg-white text-rose-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cancelled ({bookings.filter((b) => b.status === 'CANCELLED').length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {displayedBookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 mx-auto flex items-center justify-center mb-4">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No bookings in this category</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            You don't have any {filterStatus.toLowerCase()} tickets recorded in this session.
          </p>
          <button
            onClick={() => setCurrentView('search')}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Search Buses & Book Tickets
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedBookings.map((b) => {
            const isConfirmed = b.status === 'CONFIRMED';
            return (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Route, Date & Status */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                          isConfirmed
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {b.status}
                      </span>
                      <span className="text-xs font-mono text-slate-400">ID: {b.id}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs font-mono text-slate-600">PNR: {b.pnr}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {b.fromCity} <span className="text-teal-600">→</span> {b.toCity}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">({b.operatorName})</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>
                          {new Date(b.journeyDate).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>
                          {b.departureTime} – {b.arrivalTime} ({b.duration})
                        </span>
                      </div>

                      <div>
                        <span>Seats: </span>
                        <strong className="text-teal-700 font-mono">
                          {b.passengers.map((p) => p.seatNumber).join(', ')}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Right: Total Fare & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0 gap-3">
                    <div className="text-left lg:text-right">
                      <span className="text-[11px] text-slate-400 block">Total Amount</span>
                      <span className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                        ₹{b.totalAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[10px] text-slate-500 font-mono">
                        {b.paymentMethod.toUpperCase()} Simulated
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewTicketDetails(b)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-teal-300 hover:text-teal-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>View Ticket</span>
                      </button>

                      {isConfirmed && (
                        <button
                          onClick={() => setCancellingBookingId(b.id)}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors cursor-pointer"
                          title="Simulate Booking Cancellation"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Cancel</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancellingBookingId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3 text-rose-600">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Confirm Booking Cancellation</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel booking <strong>{cancellingBookingId}</strong>?
              According to the demo cancellation policy, a 100% refund of the simulated fare will be processed
              back to your mock payment account.
            </p>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
              This action will immediately update the ticket status to <strong>CANCELLED</strong> in local storage.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancellingBookingId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={() => handleConfirmCancel(cancellingBookingId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
