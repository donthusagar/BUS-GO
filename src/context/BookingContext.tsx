import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Bus,
  Seat,
  Booking,
  Passenger,
  ContactInfo,
  SearchCriteria,
  FilterOptions,
  UserProfile,
  PaymentMethod,
} from '../types';
import { SAMPLE_BUSES } from '../data/sampleBuses';

export type AppView =
  | 'home'
  | 'search'
  | 'passenger-details'
  | 'payment'
  | 'confirmation'
  | 'my-bookings'
  | 'student-dashboard'
  | 'about'
  | 'contact';

interface BookingContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  searchCriteria: SearchCriteria;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;
  filteredBuses: Bus[];
  selectedBus: Bus | null;
  setSelectedBus: (bus: Bus | null) => void;
  selectedSeats: Seat[];
  toggleSeatSelection: (seat: Seat) => void;
  clearSeatSelection: () => void;
  selectedBoardingPoint: string;
  setSelectedBoardingPoint: (point: string) => void;
  selectedDroppingPoint: string;
  setSelectedDroppingPoint: (point: string) => void;
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  bookings: Booking[];
  latestBooking: Booking | null;
  completeBooking: (paymentMethod: PaymentMethod) => Booking;
  cancelBooking: (bookingId: string) => boolean;
  user: UserProfile | null;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  viewTicketDetails: (booking: Booking) => void;
  startNewSearch: (from: string, to: string, date: string, passengersCount?: number) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const DEFAULT_FILTERS: FilterOptions = {
  priceMax: 2000,
  busTypes: [],
  departureTimes: [],
  acOnly: false,
  sleeperOnly: false,
  operator: 'all',
  sortBy: 'cheapest',
};

// Seed an initial demo booking for testing
const INITIAL_SEED_BOOKING: Booking = {
  id: 'BGO-2026-HYD-58291',
  pnr: 'PNR894125',
  busId: 'bus-hyd-blr-01',
  operatorName: 'IntrCity SmartBus',
  busType: 'Multi-Axle AC Sleeper',
  fromCity: 'Hyderabad',
  toCity: 'Bengaluru',
  journeyDate: '2026-10-15',
  departureTime: '21:30',
  arrivalTime: '06:15',
  duration: '8h 45m',
  boardingPoint: 'Ameerpet (Metro Station Pillar 1042)',
  droppingPoint: 'Majestic (Kempegowda Bus Station)',
  passengers: [
    {
      seatId: 'L1',
      seatNumber: 'L1',
      name: 'Sagar Donthu',
      age: 21,
      gender: 'Male',
      fare: 1199,
    },
  ],
  contactInfo: {
    email: 'donthusagar1@gmail.com',
    phone: '9876543210',
    collegeId: 'CBIT-CS-2026',
    isStudentDiscountApplied: true,
  },
  paymentMethod: 'upi',
  paymentId: 'UPI-SIM-8924018',
  baseFareTotal: 1199,
  discountAmount: 119,
  taxAmount: 54,
  totalAmount: 1134,
  status: 'CONFIRMED',
  bookedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
};

const DEFAULT_USER: UserProfile = {
  id: 'usr-student-01',
  name: 'Sagar Donthu',
  email: 'donthusagar1@gmail.com',
  phone: '9876543210',
  collegeName: 'Chaitanya Bharathi Institute of Technology (CBIT)',
  studentId: 'CBIT-CS-2026',
  isStudentPassActive: true,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Today + 1 day formatted as YYYY-MM-DD
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    fromCity: 'Hyderabad',
    toCity: 'Bengaluru',
    journeyDate: defaultDateStr,
    passengersCount: 1,
  });

  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<string>('');
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState<string>('');
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'donthusagar1@gmail.com',
    phone: '9876543210',
    collegeId: 'CBIT-CS-2026',
    isStudentDiscountApplied: true,
  });

  // Local storage for bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem('busgo_bookings');
      if (stored) {
        return JSON.parse(stored);
      }
      return [INITIAL_SEED_BOOKING];
    } catch {
      return [INITIAL_SEED_BOOKING];
    }
  });

  const [latestBooking, setLatestBooking] = useState<Booking | null>(() => {
    return bookings.length > 0 ? bookings[0] : null;
  });

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('busgo_user');
      return stored ? JSON.parse(stored) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [notification, setNotification] = useState<string | null>(null);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('busgo_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  // Sync user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('busgo_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('busgo_user');
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [user]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Toggle seat selection
  const toggleSeatSelection = (seat: Seat) => {
    if (seat.isBooked) return;

    const exists = selectedSeats.find((s) => s.id === seat.id);
    let updated: Seat[] = [];
    if (exists) {
      updated = selectedSeats.filter((s) => s.id !== seat.id);
    } else {
      // Max 6 seats per booking
      if (selectedSeats.length >= 6) {
        showNotification('Maximum 6 seats can be reserved in a single transaction.');
        return;
      }
      updated = [...selectedSeats, seat];
    }

    setSelectedSeats(updated);

    // Sync passengers array
    setPassengers((prevPassengers) => {
      const newPassengerList: Passenger[] = updated.map((st, idx) => {
        const existing = prevPassengers.find((p) => p.seatId === st.id) || prevPassengers[idx];
        return {
          seatId: st.id,
          seatNumber: st.number,
          name: existing?.name || (idx === 0 && user ? user.name : ''),
          age: existing?.age || '',
          gender: existing?.gender || 'Male',
          fare: st.fare,
        };
      });
      return newPassengerList;
    });
  };

  const clearSeatSelection = () => {
    setSelectedSeats([]);
    setPassengers([]);
  };

  // Filtered and sorted buses
  const filteredBuses = SAMPLE_BUSES.filter((bus) => {
    // Route matching (case insensitive)
    const matchesFrom = bus.fromCity.toLowerCase().trim() === searchCriteria.fromCity.toLowerCase().trim();
    const matchesTo = bus.toCity.toLowerCase().trim() === searchCriteria.toCity.toLowerCase().trim();
    if (!matchesFrom || !matchesTo) {
      return false;
    }

    // Price Max
    if (bus.baseFare > filters.priceMax) return false;

    // Bus Type filter
    if (filters.busTypes.length > 0 && !filters.busTypes.includes(bus.busType)) {
      return false;
    }

    // AC filter
    if (filters.acOnly && !bus.busType.toLowerCase().includes('ac')) {
      return false;
    }

    // Sleeper filter
    if (filters.sleeperOnly && !bus.busType.toLowerCase().includes('sleeper')) {
      return false;
    }

    // Operator filter
    if (filters.operator !== 'all' && bus.operatorName !== filters.operator) {
      return false;
    }

    // Departure Time period
    if (filters.departureTimes.length > 0) {
      const hour = parseInt(bus.departureTime.split(':')[0], 10);
      const isEarlyMorning = hour >= 0 && hour < 6;
      const isMorning = hour >= 6 && hour < 12;
      const isAfternoon = hour >= 12 && hour < 18;
      const isNight = hour >= 18 && hour < 24;

      const matchesTime = filters.departureTimes.some((dt) => {
        if (dt === 'early_morning') return isEarlyMorning;
        if (dt === 'morning') return isMorning;
        if (dt === 'afternoon') return isAfternoon;
        if (dt === 'night') return isNight;
        return false;
      });

      if (!matchesTime) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'cheapest') return a.baseFare - b.baseFare;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'departure_early') return a.departureTime.localeCompare(b.departureTime);
    if (filters.sortBy === 'departure_late') return b.departureTime.localeCompare(a.departureTime);
    if (filters.sortBy === 'fastest') {
      const getMin = (dur: string) => {
        const parts = dur.split(' ');
        const h = parseInt(parts[0]) || 0;
        const m = parseInt(parts[1]) || 0;
        return h * 60 + m;
      };
      return getMin(a.duration) - getMin(b.duration);
    }
    return 0;
  });

  const completeBooking = (paymentMethod: PaymentMethod): Booking => {
    if (!selectedBus || selectedSeats.length === 0) {
      throw new Error('No bus or seats selected');
    }

    const baseFareTotal = selectedSeats.reduce((acc, s) => acc + s.fare, 0);
    const discountAmount = contactInfo.isStudentDiscountApplied ? Math.round(baseFareTotal * 0.1) : 0;
    const taxAmount = Math.round((baseFareTotal - discountAmount) * 0.05); // 5% GST
    const totalAmount = baseFareTotal - discountAmount + taxAmount;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const pnrCode = `PNR${Math.floor(100000 + Math.random() * 900000)}`;
    const newBookingId = `BGO-${new Date().getFullYear()}-${selectedBus.fromCity.slice(0, 3).toUpperCase()}-${randomNum}`;

    const newBooking: Booking = {
      id: newBookingId,
      pnr: pnrCode,
      busId: selectedBus.id,
      operatorName: selectedBus.operatorName,
      busType: selectedBus.busType,
      fromCity: selectedBus.fromCity,
      toCity: selectedBus.toCity,
      journeyDate: searchCriteria.journeyDate,
      departureTime: selectedBus.departureTime,
      arrivalTime: selectedBus.arrivalTime,
      duration: selectedBus.duration,
      boardingPoint: selectedBoardingPoint || selectedBus.boardingPoints[0]?.location || 'Main Station',
      droppingPoint: selectedDroppingPoint || selectedBus.droppingPoints[0]?.location || 'Main Terminal',
      passengers: passengers.map((p, idx) => ({
        ...p,
        seatNumber: selectedSeats[idx]?.number || p.seatNumber,
      })),
      contactInfo,
      paymentMethod,
      paymentId: `${paymentMethod.toUpperCase()}-SIM-${Date.now().toString().slice(-7)}`,
      baseFareTotal,
      taxAmount,
      discountAmount,
      totalAmount,
      status: 'CONFIRMED',
      bookedAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLatestBooking(newBooking);
    clearSeatSelection();
    setCurrentView('confirmation');
    showNotification('Booking successfully confirmed! Your e-ticket is ready.');
    return newBooking;
  };

  const cancelBooking = (bookingId: string): boolean => {
    let found = false;
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId && b.status === 'CONFIRMED') {
          found = true;
          return { ...b, status: 'CANCELLED' };
        }
        return b;
      })
    );
    if (found) {
      showNotification('Demo booking cancelled successfully. Simulated refund initiated.');
    }
    return found;
  };

  const loginUser = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || 'Demo Student User',
      email,
      phone: '9876543210',
      collegeName: 'Engineering & Technology Campus',
      studentId: 'STU-2026-88',
      isStudentPassActive: true,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    showNotification(`Welcome back, ${newUser.name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    showNotification('Logged out successfully.');
  };

  const viewTicketDetails = (booking: Booking) => {
    setLatestBooking(booking);
    setCurrentView('confirmation');
  };

  const startNewSearch = (from: string, to: string, date: string, passengersCount = 1) => {
    setSearchCriteria({
      fromCity: from,
      toCity: to,
      journeyDate: date,
      passengersCount,
    });
    setSelectedBus(null);
    clearSeatSelection();
    setCurrentView('search');
  };

  return (
    <BookingContext.Provider
      value={{
        currentView,
        setCurrentView,
        searchCriteria,
        setSearchCriteria,
        filters,
        setFilters,
        resetFilters,
        filteredBuses,
        selectedBus,
        setSelectedBus,
        selectedSeats,
        toggleSeatSelection,
        clearSeatSelection,
        selectedBoardingPoint,
        setSelectedBoardingPoint,
        selectedDroppingPoint,
        setSelectedDroppingPoint,
        passengers,
        setPassengers,
        contactInfo,
        setContactInfo,
        bookings,
        latestBooking,
        completeBooking,
        cancelBooking,
        user,
        loginUser,
        logoutUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        viewTicketDetails,
        startNewSearch,
        notification,
        showNotification,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
