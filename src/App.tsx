import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { NoticeBanner } from './components/NoticeBanner';
import { HeroSearch } from './components/HeroSearch';
import { HomeSections } from './components/HomeSections';
import { SearchResultsView } from './components/SearchResultsView';
import { PassengerForm } from './components/PassengerForm';
import { PaymentView } from './components/PaymentModal';
import { TicketConfirmation } from './components/TicketConfirmation';
import { MyBookingsView } from './components/MyBookingsView';
import { StudentDashboard } from './components/StudentDashboard';
import { AboutContactView } from './components/AboutContactView';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { CheckCircle, AlertCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, notification } = useBooking();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Demo announcement disclaimer */}
      <NoticeBanner />

      {/* Top Navbar */}
      <Navbar />

      {/* Toast Notification Container */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp no-print">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs max-w-sm">
            <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
            <p className="font-medium text-slate-200">{notification}</p>
          </div>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            <HeroSearch />
            <HomeSections />
          </div>
        )}

        {currentView === 'search' && (
          <SearchResultsView
            onProceedToPassengerDetails={() => setCurrentView('passenger-details')}
          />
        )}

        {currentView === 'passenger-details' && (
          <PassengerForm
            onProceedToPayment={() => setCurrentView('payment')}
            onBackToSeats={() => setCurrentView('search')}
          />
        )}

        {currentView === 'payment' && (
          <PaymentView
            onBackToDetails={() => setCurrentView('passenger-details')}
          />
        )}

        {currentView === 'confirmation' && <TicketConfirmation />}

        {currentView === 'my-bookings' && <MyBookingsView />}

        {currentView === 'student-dashboard' && <StudentDashboard />}

        {currentView === 'about' && <AboutContactView initialTab="about" />}

        {currentView === 'contact' && <AboutContactView initialTab="contact" />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Simulated Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
