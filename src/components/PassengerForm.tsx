import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Passenger } from '../types';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  ArrowLeft,
  CreditCard,
  AlertCircle,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Ticket,
} from 'lucide-react';

interface PassengerFormProps {
  onProceedToPayment: () => void;
  onBackToSeats: () => void;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({
  onProceedToPayment,
  onBackToSeats,
}) => {
  const {
    selectedBus,
    selectedSeats,
    searchCriteria,
    selectedBoardingPoint,
    selectedDroppingPoint,
    passengers,
    setPassengers,
    contactInfo,
    setContactInfo,
    user,
  } = useBooking();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!selectedBus || selectedSeats.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No seats selected. Please return to bus search.</p>
        <button
          onClick={onBackToSeats}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm"
        >
          Back to Seat Selection
        </button>
      </div>
    );
  }

  // Update specific passenger field
  const handlePassengerChange = (
    index: number,
    field: keyof Passenger,
    value: any
  ) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    // Clear error for this field
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[`p_${index}_${field}`];
      return copy;
    });
  };

  // Quick auto-fill student credentials
  const handleFillStudentData = () => {
    if (!user) return;
    if (passengers.length > 0) {
      handlePassengerChange(0, 'name', user.name);
      handlePassengerChange(0, 'age', 21);
      handlePassengerChange(0, 'gender', 'Male');
    }
    setContactInfo((prev) => ({
      ...prev,
      email: user.email,
      phone: user.phone,
      collegeId: user.studentId,
      isStudentDiscountApplied: true,
    }));
  };

  // Validation before proceeding
  const validateForm = () => {
    const errs: { [key: string]: string } = {};

    passengers.forEach((p, idx) => {
      if (!p.name || p.name.trim().length < 2) {
        errs[`p_${idx}_name`] = 'Please enter full passenger name.';
      }
      if (!p.age || Number(p.age) < 1 || Number(p.age) > 120) {
        errs[`p_${idx}_age`] = 'Enter valid age (1-120).';
      }
    });

    // Contact info validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email || !emailRegex.test(contactInfo.email)) {
      errs['contact_email'] = 'Enter a valid email address.';
    }

    const phoneDigits = contactInfo.phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      errs['contact_phone'] = 'Enter a valid 10-digit mobile number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onProceedToPayment();
    }
  };

  // Calculations
  const baseFareTotal = selectedSeats.reduce((sum, s) => sum + s.fare, 0);
  const discountAmount = contactInfo.isStudentDiscountApplied
    ? Math.round(baseFareTotal * 0.1)
    : 0;
  const taxAmount = Math.round((baseFareTotal - discountAmount) * 0.05); // 5% GST
  const finalPayable = baseFareTotal - discountAmount + taxAmount;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back button & page header */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBackToSeats}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Seat Selection</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-teal-600">Step 2 of 3:</span>
          <span>Passenger Details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Passenger and Contact Forms */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student 1-Click Fast Fill Banner */}
            {user && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-teal-600 shrink-0" />
                  <div>
                    <p className="font-bold text-teal-950">Student Profile Detected</p>
                    <p className="text-teal-700">Pre-fill details and apply 10% student concession pass.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleFillStudentData}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shrink-0 cursor-pointer transition-colors"
                >
                  Quick Fill
                </button>
              </div>
            )}

            {/* Passenger Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Passenger Information</span>
                <span className="text-xs text-slate-400 font-normal">
                  {selectedSeats.length} {selectedSeats.length === 1 ? 'Passenger' : 'Passengers'}
                </span>
              </h3>

              <div className="space-y-6">
                {passengers.map((p, idx) => {
                  const seat = selectedSeats[idx];
                  return (
                    <div
                      key={`passenger-${idx}`}
                      className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-teal-600" />
                          <span>Passenger {idx + 1}</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-slate-200 text-slate-800 font-mono">
                          Seat: {seat?.number || p.seatNumber} ({seat?.deck === 'upper' ? 'Upper' : 'Lower'})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        {/* Name */}
                        <div className="sm:col-span-6">
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Sagar Donthu"
                            value={p.name}
                            onChange={(e) => handlePassengerChange(idx, 'name', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                          {errors[`p_${idx}_name`] && (
                            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors[`p_${idx}_name`]}
                            </p>
                          )}
                        </div>

                        {/* Age */}
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Age *
                          </label>
                          <input
                            type="number"
                            placeholder="e.g. 21"
                            min={1}
                            max={120}
                            value={p.age}
                            onChange={(e) =>
                              handlePassengerChange(
                                idx,
                                'age',
                                e.target.value === '' ? '' : parseInt(e.target.value, 10)
                              )
                            }
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                          {errors[`p_${idx}_age`] && (
                            <p className="text-[11px] text-rose-500 mt-1">
                              {errors[`p_${idx}_age`]}
                            </p>
                          )}
                        </div>

                        {/* Gender */}
                        <div className="sm:col-span-3">
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            Gender *
                          </label>
                          <select
                            value={p.gender}
                            onChange={(e) =>
                              handlePassengerChange(idx, 'gender', e.target.value as any)
                            }
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Information & Student Pass */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                Ticket Delivery & Contact Details
              </h3>
              <p className="text-xs text-slate-500">
                Your booking confirmation and SMS alerts will be sent to these contact coordinates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-teal-600" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="student@college.edu or personal"
                    value={contactInfo.email}
                    onChange={(e) => {
                      setContactInfo((prev) => ({ ...prev, email: e.target.value }));
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy['contact_email'];
                        return copy;
                      });
                    }}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {errors['contact_email'] && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors['contact_email']}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-teal-600" />
                    <span>Mobile Number (10 Digits) *</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-500 text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      value={contactInfo.phone}
                      onChange={(e) => {
                        setContactInfo((prev) => ({ ...prev, phone: e.target.value }));
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy['contact_phone'];
                          return copy;
                        });
                      }}
                      className="w-full bg-white border border-slate-300 rounded-r-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  {errors['contact_phone'] && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors['contact_phone']}</p>
                  )}
                </div>
              </div>

              {/* College Student Discount Toggle */}
              <div className="pt-3 border-t border-slate-100">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-teal-50/50 border border-teal-200/60 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contactInfo.isStudentDiscountApplied}
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        isStudentDiscountApplied: e.target.checked,
                      }))
                    }
                    className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <div className="text-xs">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-teal-700" />
                      <span className="font-bold text-teal-900">
                        Apply Student Concession (10% Discount)
                      </span>
                    </div>
                    <p className="text-teal-700/80 mt-0.5">
                      Special benefit for university students travelling for exams, hackathons, or holidays.
                    </p>
                  </div>
                </label>

                {contactInfo.isStudentDiscountApplied && (
                  <div className="mt-3">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      College Student Roll Number / ID (Optional Verification)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. CBIT-CS-2026 or University Roll No."
                      value={contactInfo.collegeId || ''}
                      onChange={(e) =>
                        setContactInfo((prev) => ({ ...prev, collegeId: e.target.value }))
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl shadow-md shadow-teal-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Proceed to Payment Simulation</span>
            </button>
          </form>
        </div>

        {/* Right: Booking Itinerary & Fare Summary */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-teal-600" />
              <span>Trip Itinerary Summary</span>
            </h3>

            {/* Operator and Bus Type */}
            <div>
              <p className="text-base font-bold text-slate-900">{selectedBus.operatorName}</p>
              <p className="text-xs text-slate-500">{selectedBus.busType}</p>
            </div>

            {/* Schedule */}
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span className="font-medium">Journey Date:</span>
                </div>
                <span className="font-semibold text-slate-900">
                  {new Date(searchCriteria.journeyDate).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Boarding at {selectedBus.departureTime}</span>
                  <span className="font-medium text-slate-800">{selectedBoardingPoint}</span>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Dropping at {selectedBus.arrivalTime}</span>
                  <span className="font-medium text-slate-800">{selectedDroppingPoint}</span>
                </div>
              </div>
            </div>

            {/* Selected Seats */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Reserved Seats:</span>
                <span className="font-bold text-teal-700 font-mono">
                  {selectedSeats.map((s) => s.number).join(', ')}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Travellers:</span>
                <span className="font-medium text-slate-800">{selectedSeats.length} Person(s)</span>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Ticket Fare</span>
                <span className="font-mono tabular-nums">₹{baseFareTotal.toLocaleString('en-IN')}</span>
              </div>

              {contactInfo.isStudentDiscountApplied && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Student Concession (10%)</span>
                  <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>GST & Transport Cess (5%)</span>
                <span className="font-mono tabular-nums">₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="border-t border-slate-200 pt-2.5 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-900">Total Payable Amount</span>
                <span className="text-xl font-extrabold text-teal-700 font-mono tabular-nums">
                  ₹{finalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Simulated checkout: Zero actual bank charge. E-ticket issued instantly.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
