import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { PaymentMethod } from '../types';
import {
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ShieldCheck,
  Lock,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Smartphone,
  Info,
} from 'lucide-react';

interface PaymentViewProps {
  onBackToDetails: () => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({ onBackToDetails }) => {
  const { selectedBus, selectedSeats, contactInfo, completeBooking } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('student@okaxis');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  if (!selectedBus || selectedSeats.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No active reservation found.</p>
        <button
          onClick={onBackToDetails}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm"
        >
          Return to Booking
        </button>
      </div>
    );
  }

  // Calculate total
  const baseFareTotal = selectedSeats.reduce((sum, s) => sum + s.fare, 0);
  const discountAmount = contactInfo.isStudentDiscountApplied
    ? Math.round(baseFareTotal * 0.1)
    : 0;
  const taxAmount = Math.round((baseFareTotal - discountAmount) * 0.05);
  const totalPayable = baseFareTotal - discountAmount + taxAmount;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setProcessingStep('Connecting to simulated payment network...');

    setTimeout(() => {
      setProcessingStep('Authorizing demo transaction token...');
    }, 700);

    setTimeout(() => {
      setProcessingStep('Simulated payment verified! Generating e-ticket...');
    }, 1400);

    setTimeout(() => {
      setIsProcessing(false);
      completeBooking(paymentMethod);
    }, 2000);
  };

  const handleFillDemoCard = () => {
    setCardNumber('4532 •••• •••• 8891');
    setCardExpiry('08/29');
    setCardCvv('982');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header & Back */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBackToDetails}
          disabled={isProcessing}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-teal-600 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Passenger Details</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-teal-600">Step 3 of 3:</span>
          <span>Payment Simulation</span>
        </div>
      </div>

      {/* Demo Disclaimer Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-950">Academic Demonstration Environment</h4>
          <p className="mt-0.5 text-amber-800">
            This checkout process is strictly simulated for a college software engineering project.
            No real credit card numbers, banking passwords, or UPI PINs are processed or requested.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Payment Gateways Selection (Left) */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Choose Payment Method</h3>
            <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Simulated 256-Bit SSL</span>
            </span>
          </div>

          {/* Payment Method Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('upi')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'upi'
                  ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4 text-teal-600" />
              <span>UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'card'
                  ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-4 h-4 text-teal-600" />
              <span>Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('netbanking')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'netbanking'
                  ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Building className="w-4 h-4 text-teal-600" />
              <span>NetBanking</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod('cash')}
              className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                paymentMethod === 'cash'
                  ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Banknote className="w-4 h-4 text-teal-600" />
              <span>On Boarding</span>
            </button>
          </div>

          <form onSubmit={handleSimulatePayment} className="space-y-5">
            {/* UPI View */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                  <div className="w-36 h-36 bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
                    {/* High quality SVG QR Code illustration */}
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
                  <p className="text-xs font-semibold text-slate-800 mt-3">
                    Scan with any UPI App (GPay / PhonePe / Paytm)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Simulated QR code — tap Simulate Payment below to approve.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Or Enter Test UPI Virtual Address (VPA)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="student@okaxis"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Credit / Debit Card View */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-700">Demo Card Details</span>
                  <button
                    type="button"
                    onClick={handleFillDemoCard}
                    className="text-xs text-teal-600 hover:text-teal-700 font-bold underline cursor-pointer"
                  >
                    1-Click Test Card Fill
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Card Number (Demo)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Net Banking View */}
            {paymentMethod === 'netbanking' && (
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-medium text-slate-700">
                  Select Demo Bank
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra'].map(
                    (b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`p-3 rounded-xl border text-xs font-medium text-left transition-colors ${
                          selectedBank === b
                            ? 'border-teal-500 bg-teal-50 text-teal-900 font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {b}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Cash on Boarding */}
            {paymentMethod === 'cash' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <p className="font-bold text-slate-900">Pay Directly to Bus Conductor / Depot Counter</p>
                <p className="text-slate-600">
                  Your seat will be reserved instantly. Present your e-ticket SMS or printout to the conductor
                  before boarding and pay ₹{totalPayable.toLocaleString('en-IN')} in cash or UPI.
                </p>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{processingStep}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Simulate Payment of ₹{totalPayable.toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Summary Card */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
            Payment Summary
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Bus Service:</span>
              <span className="font-semibold text-slate-900">{selectedBus.operatorName}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Route:</span>
              <span className="font-medium text-slate-800">
                {selectedBus.fromCity} → {selectedBus.toCity}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Seat(s):</span>
              <span className="font-mono font-bold text-teal-700">
                {selectedSeats.map((s) => s.number).join(', ')}
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Base Ticket Price</span>
              <span className="font-mono tabular-nums">₹{baseFareTotal.toLocaleString('en-IN')}</span>
            </div>

            {contactInfo.isStudentDiscountApplied && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Student Pass Discount (10%)</span>
                <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>GST & Cess (5%)</span>
              <span className="font-mono tabular-nums">₹{taxAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-900">Total Charged</span>
              <span className="text-xl font-extrabold text-teal-700 font-mono tabular-nums">
                ₹{totalPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 flex items-center gap-2 text-[11px] text-teal-900">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>Instant booking confirmation code and printable receipt will be generated.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
