import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  CheckCircle,
  Printer,
  Home,
  BookOpen,
  Download,
  Bus,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  AlertCircle,
  Share2,
} from 'lucide-react';

export const TicketConfirmation: React.FC = () => {
  const { latestBooking, setCurrentView, showNotification } = useBooking();

  if (!latestBooking) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4">
        <h3 className="text-lg font-bold text-slate-800">No recent ticket found</h3>
        <p className="text-sm text-slate-500 mt-1">Please select a route to book a ticket.</p>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-4 px-5 py-2.5 bg-teal-600 text-white font-semibold rounded-xl text-sm"
        >
          Book a Bus Ticket
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const textData = `
========================================
       BUSGO E-TICKET RECEIPT (DEMO)
========================================
Booking ID : ${latestBooking.id}
PNR Number : ${latestBooking.pnr}
Status     : ${latestBooking.status}
Operator   : ${latestBooking.operatorName} (${latestBooking.busType})
Route      : ${latestBooking.fromCity} -> ${latestBooking.toCity}
Date       : ${latestBooking.journeyDate}
Departure  : ${latestBooking.departureTime} at ${latestBooking.boardingPoint}
Arrival    : ${latestBooking.arrivalTime} at ${latestBooking.droppingPoint}
Seats      : ${latestBooking.passengers.map((p) => p.seatNumber).join(', ')}

PASSENGERS:
${latestBooking.passengers.map((p, i) => `${i + 1}. ${p.name} (${p.age} yrs, ${p.gender}) - Seat ${p.seatNumber}`).join('\n')}

CONTACT:
Email      : ${latestBooking.contactInfo.email}
Phone      : ${latestBooking.contactInfo.phone}

PAYMENT:
Method     : ${latestBooking.paymentMethod.toUpperCase()} (Simulated)
Txn ID     : ${latestBooking.paymentId}
Total Paid : INR ${latestBooking.totalAmount}
========================================
Project Prototype: Bus Ticket Booking System
`;
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BusGo_Ticket_${latestBooking.pnr}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Ticket summary downloaded.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Success Banner (hidden in print) */}
      <div className="no-print bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-emerald-950">Booking Confirmed Successfully!</h2>
            <p className="text-xs text-emerald-700 mt-0.5">
              Your simulated reservation is secured. E-ticket and SMS confirmation have been generated.
            </p>
          </div>
        </div>

        {/* Top action buttons */}
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-teal-400" />
            <span>Print Ticket</span>
          </button>

          <button
            onClick={handleDownloadText}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download .txt</span>
          </button>
        </div>
      </div>

      {/* Printable E-Ticket Card */}
      <div className="printable-area bg-white rounded-3xl border border-slate-300 shadow-xl overflow-hidden">
        {/* Ticket Top Header / Airline-style Boarding Strip */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 border-b-2 border-teal-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  Bus<span className="text-teal-400">Go</span>
                </span>
                <p className="text-[11px] text-slate-400">Official Electronic Boarding Pass</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">
                Booking ID
              </span>
              <span className="font-mono text-base font-bold text-teal-400 tabular-nums">
                {latestBooking.id}
              </span>
              <div className="text-[11px] text-slate-300">
                PNR: <strong className="text-white font-mono">{latestBooking.pnr}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Route & Stations */}
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Origin */}
            <div className="md:col-span-4">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Origin Station
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {latestBooking.fromCity}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Boarding Point: {latestBooking.boardingPoint}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-teal-700 font-bold mt-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Departure: {latestBooking.departureTime}</span>
              </div>
            </div>

            {/* Travel Middle Icon & Duration */}
            <div className="md:col-span-4 text-center py-2 md:py-0 border-y md:border-y-0 border-slate-200">
              <span className="text-xs text-slate-500 font-semibold">{latestBooking.duration} Non-Stop</span>
              <div className="w-full flex items-center justify-center my-2">
                <div className="h-0.5 bg-slate-300 w-1/3" />
                <div className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                  {latestBooking.busType}
                </div>
                <div className="h-0.5 bg-slate-300 w-1/3" />
              </div>
              <p className="text-xs font-bold text-slate-800">{latestBooking.operatorName}</p>
            </div>

            {/* Destination */}
            <div className="md:col-span-4 md:text-right">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                Destination Station
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {latestBooking.toCity}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Dropping Point: {latestBooking.droppingPoint}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-teal-700 font-bold mt-2 md:justify-end">
                <Clock className="w-3.5 h-3.5" />
                <span>Arrival: {latestBooking.arrivalTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date & Passenger Roster */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Journey Date</span>
              <span className="font-bold text-slate-900 text-sm">
                {new Date(latestBooking.journeyDate).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Reserved Seat(s)</span>
              <span className="font-mono font-bold text-teal-700 text-base">
                {latestBooking.passengers.map((p) => p.seatNumber).join(', ')}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Booking Status</span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                  latestBooking.status === 'CONFIRMED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {latestBooking.status}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Total Fare Paid</span>
              <span className="font-mono font-extrabold text-slate-900 text-base">
                ₹{latestBooking.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Passenger Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Passenger Roster
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-semibold">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Passenger Name</th>
                    <th className="p-3">Age / Gender</th>
                    <th className="p-3">Seat Number</th>
                    <th className="p-3">Berth Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {latestBooking.passengers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono">{idx + 1}</td>
                      <td className="p-3 font-semibold text-slate-900">{p.name}</td>
                      <td className="p-3 text-slate-600">
                        {p.age} yrs · {p.gender}
                      </td>
                      <td className="p-3 font-mono font-bold text-teal-700">{p.seatNumber}</td>
                      <td className="p-3 text-slate-500">
                        {p.seatNumber.startsWith('U') ? 'Upper Sleeper' : 'Lower Deck'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact & Payment Verification Strip */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-200 items-center">
            <div className="md:col-span-8 space-y-2 text-xs text-slate-600">
              <div className="flex flex-wrap gap-4">
                <span>
                  <strong>Email:</strong> {latestBooking.contactInfo.email}
                </span>
                <span>
                  <strong>Mobile:</strong> +91 {latestBooking.contactInfo.phone}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-slate-500">
                <span>
                  <strong>Payment Token:</strong> {latestBooking.paymentId}
                </span>
                <span>
                  <strong>Method:</strong> {latestBooking.paymentMethod.toUpperCase()} (Demo)
                </span>
              </div>
              {latestBooking.contactInfo.isStudentDiscountApplied && (
                <p className="text-teal-700 font-medium">
                  ✓ Student Concession Pass Applied (College ID: {latestBooking.contactInfo.collegeId || 'Verified'})
                </p>
              )}
            </div>

            {/* Simulated Verifiable QR Code for conductors */}
            <div className="md:col-span-4 flex flex-col items-center md:items-end">
              <div className="w-24 h-24 bg-white p-1.5 border-2 border-slate-800 rounded-lg shadow-sm">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-slate-900"
                  fill="currentColor"
                >
                  <path d="M10 10 h30 v30 h-30 z M15 15 v20 h20 v-20 z M22 22 h6 v6 h-6 z" />
                  <path d="M60 10 h30 v30 h-30 z M65 15 v20 h20 v-20 z M72 22 h6 v6 h-6 z" />
                  <path d="M10 60 h30 v30 h-30 z M15 65 v20 h20 v-20 z M22 72 h6 v6 h-6 z" />
                  <path d="M48 10 h4 v30 h-4 z M48 60 h4 v30 h-4 z M60 48 h30 v4 h-30 z M10 48 h30 v4 h-30 z" />
                  <rect x="58" y="58" width="8" height="8" />
                  <rect x="74" y="58" width="8" height="8" />
                  <rect x="66" y="74" width="8" height="8" />
                  <rect x="82" y="82" width="8" height="8" />
                </svg>
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1">Scan for Boarding Gate</span>
            </div>
          </div>

          {/* Travel Advisory Rules */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Important Boarding Information:</p>
            <p>1. Please arrive at the boarding point 15 minutes prior to scheduled departure.</p>
            <p>2. Carry a valid government ID or College Student ID card for verification during transit.</p>
            <p>3. Maximum 20 kg personal baggage allowed per ticket.</p>
          </div>
        </div>
      </div>

      {/* Navigation Footer Actions (hidden in print) */}
      <div className="no-print mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setCurrentView('home')}
          className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Back to Home</span>
        </button>

        <button
          onClick={() => setCurrentView('my-bookings')}
          className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>View All My Bookings</span>
        </button>
      </div>
    </div>
  );
};
