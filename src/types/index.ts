export type BusType = 'AC Sleeper' | 'Non-AC Sleeper' | 'AC Seater' | 'Non-AC Seater' | 'Multi-Axle AC Sleeper';

export type DeckType = 'lower' | 'upper';

export interface Seat {
  id: string; // e.g., 'L1', 'U1'
  number: string;
  deck: DeckType;
  row: number;
  col: number; // 0, 1 (left side) or 3, 4 (right side), with 2 as aisle
  type: 'sleeper' | 'seater';
  fare: number;
  isBooked: boolean;
  isLadiesOnly?: boolean;
}

export interface BoardingPoint {
  id: string;
  location: string;
  time: string;
  landmark: string;
}

export interface DroppingPoint {
  id: string;
  location: string;
  time: string;
  landmark: string;
}

export interface Bus {
  id: string;
  operatorName: string;
  operatorLogoText: string;
  busType: BusType;
  totalSeats: number;
  availableSeatsCount: number;
  fromCity: string;
  toCity: string;
  departureTime: string; // "21:30"
  arrivalTime: string;   // "06:45"
  duration: string;      // "9h 15m"
  baseFare: number;
  rating: number;
  reviewsCount: number;
  features: string[]; // e.g. ["AC", "Charging Point", "Water Bottle", "Blanket", "Live Tracking", "WiFi"]
  seats: Seat[];
  boardingPoints: BoardingPoint[];
  droppingPoints: DroppingPoint[];
  hasUpperDeck: boolean;
}

export interface Passenger {
  seatId: string;
  seatNumber: string;
  name: string;
  age: number | '';
  gender: 'Male' | 'Female' | 'Other';
  fare: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  collegeId?: string;
  isStudentDiscountApplied: boolean;
}

export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cash';

export interface Booking {
  id: string;
  pnr: string;
  busId: string;
  operatorName: string;
  busType: BusType;
  fromCity: string;
  toCity: string;
  journeyDate: string; // "YYYY-MM-DD"
  departureTime: string;
  arrivalTime: string;
  duration: string;
  boardingPoint: string;
  droppingPoint: string;
  passengers: Passenger[];
  contactInfo: ContactInfo;
  paymentMethod: PaymentMethod;
  paymentId: string;
  baseFareTotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'CANCELLED';
  bookedAt: string; // ISO string
}

export interface SearchCriteria {
  fromCity: string;
  toCity: string;
  journeyDate: string;
  passengersCount: number;
}

export interface FilterOptions {
  priceMax: number;
  busTypes: BusType[];
  departureTimes: ('early_morning' | 'morning' | 'afternoon' | 'night')[];
  acOnly: boolean;
  sleeperOnly: boolean;
  operator: string;
  sortBy: 'cheapest' | 'departure_early' | 'departure_late' | 'fastest' | 'rating';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  collegeName: string;
  studentId: string;
  isStudentPassActive: boolean;
}
