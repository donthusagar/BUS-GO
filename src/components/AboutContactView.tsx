import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import {
  Info,
  Mail,
  Send,
  Code2,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Smartphone,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  HelpCircle,
} from 'lucide-react';

interface AboutContactViewProps {
  initialTab?: 'about' | 'contact';
}

export const AboutContactView: React.FC<AboutContactViewProps> = ({ initialTab = 'about' }) => {
  const { showNotification } = useBooking();
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>(initialTab);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formCategory, setFormCategory] = useState('Feedback / Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormError('Please fill in your name, email, and message.');
      return;
    }
    setFormError(null);
    setFormSubmitted(true);
    showNotification('Thank you! Your message has been received.');
    setTimeout(() => {
      setFormSubmitted(false);
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {activeTab === 'about' ? 'About BusGo Project' : 'Contact Support & Faculty'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            College Capstone Engineering Project · Bus Ticket Booking System
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'about'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Overview
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contact & Feedback
          </button>
        </div>
      </div>

      {activeTab === 'about' ? (
        <div className="space-y-8">
          {/* Executive Overview */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Academic Engineering Prototype</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              BusGo: Modernizing Highway Transit Reservations
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              <strong>BusGo</strong> is an end-to-end interactive Bus Ticket Booking System designed and engineered
              as a college capstone project. The project addresses key friction points in conventional intercity bus
              travel in India by delivering a responsive web application that streamlines route exploration, multi-deck
              sleeper seat selection, passenger data capture, and simulated zero-risk payments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-900 block mb-1">01. Interactive Seat Layout</span>
                <p className="text-xs text-slate-600">
                  Dual-deck visual layout with real-time berth availability, ladies' reservation logic, and dynamic price compilation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-900 block mb-1">02. Local Persistence Engine</span>
                <p className="text-xs text-slate-600">
                  Full session resilience via browser LocalStorage, retaining bookings, PNR statuses, and cancellation histories.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-900 block mb-1">03. Verifiable Boarding Passes</span>
                <p className="text-xs text-slate-600">
                  Print-ready e-tickets equipped with unique PNR IDs, passenger rosters, QR simulation, and downloadable receipts.
                </p>
              </div>
            </div>
          </div>

          {/* Project Objectives */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Project Objectives & Deliverables</h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Intuitive Search & Route Filtering:</strong> Allow users to filter schedules across popular corridors (e.g. Hyderabad, Bengaluru, Vijayawada, Chennai) by price range, departure time slot, coach tier, and fleet operator.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Component Architecture:</strong> Built using React and Tailwind CSS adhering strictly to WCAG AA color contrast, responsive viewport constraints, and zero dead clicks.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Student Concession Hub:</strong> Tailored for collegiate usage with an integrated Student Dashboard, 10% student ticket subsidy, and roll number ID verification.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Transparent Simulation:</strong> Explicitly designed as a safe prototype that never asks for real payment credentials or bank details.
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Specs */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-teal-400" />
              <span>Technical Architecture</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-slate-400 block font-mono">Frontend Library</span>
                <span className="font-bold text-white text-sm">React 19 (TypeScript)</span>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-slate-400 block font-mono">Styling Engine</span>
                <span className="font-bold text-white text-sm">Tailwind CSS 4</span>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-slate-400 block font-mono">Icons & UI Assets</span>
                <span className="font-bold text-white text-sm">Lucide React</span>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                <span className="text-slate-400 block font-mono">State & Storage</span>
                <span className="font-bold text-white text-sm">React Context + LocalStorage</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Contact Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Send Us a Message</h2>
              <p className="text-xs text-slate-500 mt-1">
                Have feedback on this college project or need to report an inquiry? Fill in the form below.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">Message Submitted!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you for testing the BusGo system. Your feedback has been noted in the project log.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Sagar Donthu"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="student@college.edu"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Project Demonstration Feedback"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
                    >
                      <option value="Feedback / Inquiry">General Feedback</option>
                      <option value="College Evaluation">Faculty & Evaluation Review</option>
                      <option value="Student Pass Query">Student Pass Verification</option>
                      <option value="Bug Report">UI / Feature Bug Report</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message *</label>
                  <textarea
                    rows={4}
                    placeholder="Enter your comments or project evaluation remarks..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                {formError && <p className="text-xs text-rose-500">{formError}</p>}

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Contact Info */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">College Department Contacts</h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Campus Location</p>
                  <p>Department of Computer Science & Engineering</p>
                  <p>Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Project Support Email</p>
                  <p className="font-mono text-teal-700">donthusagar1@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">Simulated Helpline</p>
                  <p>+91 (040) 2419-3276 · 24/7 Demo Support</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              <strong>Notice:</strong> This web portal is built strictly for student project demonstration.
              Inquiries submitted through this form are logged in simulated memory for review.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
