import { Bus, Seat } from '../types';

// Helper to generate realistic seats for Sleeper buses (Lower and Upper decks, 2+1 layout)
function generateSleeperSeats(baseFare: number, busIndex: number): Seat[] {
  const seats: Seat[] = [];
  const rows = 6;

  // Lower Deck
  // Col 0: Single sleeper berth (Window), Col 1: Aisle (empty), Col 2: Double berth (Window + Aisle), Col 3: Double berth
  let lowerSeatNum = 1;
  for (let r = 1; r <= rows; r++) {
    // Left single berth
    const isBooked1 = (r * 3 + busIndex * 7) % 5 === 0 || (r === 2 && busIndex % 2 === 0);
    seats.push({
      id: `L${lowerSeatNum}`,
      number: `L${lowerSeatNum}`,
      deck: 'lower',
      row: r,
      col: 0,
      type: 'sleeper',
      fare: baseFare,
      isBooked: isBooked1,
      isLadiesOnly: r === 1,
    });
    lowerSeatNum++;

    // Right double berth (seat 1)
    const isBooked2 = (r * 2 + busIndex * 3) % 4 === 0;
    seats.push({
      id: `L${lowerSeatNum}`,
      number: `L${lowerSeatNum}`,
      deck: 'lower',
      row: r,
      col: 2,
      type: 'sleeper',
      fare: baseFare,
      isBooked: isBooked2,
    });
    lowerSeatNum++;

    // Right double berth (seat 2 - window)
    const isBooked3 = (r * 4 + busIndex) % 3 === 0;
    seats.push({
      id: `L${lowerSeatNum}`,
      number: `L${lowerSeatNum}`,
      deck: 'lower',
      row: r,
      col: 3,
      type: 'sleeper',
      fare: baseFare,
      isBooked: isBooked3,
      isLadiesOnly: r === 1,
    });
    lowerSeatNum++;
  }

  // Upper Deck
  let upperSeatNum = 1;
  for (let r = 1; r <= rows; r++) {
    const isBooked1 = (r * 5 + busIndex * 2) % 4 === 0;
    seats.push({
      id: `U${upperSeatNum}`,
      number: `U${upperSeatNum}`,
      deck: 'upper',
      row: r,
      col: 0,
      type: 'sleeper',
      fare: baseFare + 50, // Upper deck premium or variation
      isBooked: isBooked1,
      isLadiesOnly: r === 2,
    });
    upperSeatNum++;

    const isBooked2 = (r * 3 + busIndex * 5) % 3 === 0;
    seats.push({
      id: `U${upperSeatNum}`,
      number: `U${upperSeatNum}`,
      deck: 'upper',
      row: r,
      col: 2,
      type: 'sleeper',
      fare: baseFare + 50,
      isBooked: isBooked2,
    });
    upperSeatNum++;

    const isBooked3 = (r * 2 + busIndex) % 4 === 1;
    seats.push({
      id: `U${upperSeatNum}`,
      number: `U${upperSeatNum}`,
      deck: 'upper',
      row: r,
      col: 3,
      type: 'sleeper',
      fare: baseFare + 50,
      isBooked: isBooked3,
    });
    upperSeatNum++;
  }

  return seats;
}

// Helper to generate realistic seats for Seater buses (2+2 layout)
function generateSeaterSeats(baseFare: number, busIndex: number): Seat[] {
  const seats: Seat[] = [];
  const rows = 8;
  let seatNum = 1;

  for (let r = 1; r <= rows; r++) {
    // Left Window (col 0)
    seats.push({
      id: `S${seatNum}`,
      number: `${seatNum}`,
      deck: 'lower',
      row: r,
      col: 0,
      type: 'seater',
      fare: baseFare,
      isBooked: (r * 3 + busIndex) % 4 === 0,
      isLadiesOnly: r === 1,
    });
    seatNum++;

    // Left Aisle (col 1)
    seats.push({
      id: `S${seatNum}`,
      number: `${seatNum}`,
      deck: 'lower',
      row: r,
      col: 1,
      type: 'seater',
      fare: baseFare,
      isBooked: (r * 2 + busIndex * 2) % 3 === 0,
    });
    seatNum++;

    // Right Aisle (col 2)
    seats.push({
      id: `S${seatNum}`,
      number: `${seatNum}`,
      deck: 'lower',
      row: r,
      col: 2,
      type: 'seater',
      fare: baseFare,
      isBooked: (r * 5 + busIndex) % 5 === 0,
    });
    seatNum++;

    // Right Window (col 3)
    seats.push({
      id: `S${seatNum}`,
      number: `${seatNum}`,
      deck: 'lower',
      row: r,
      col: 3,
      type: 'seater',
      fare: baseFare,
      isBooked: (r * 4 + busIndex) % 4 === 1,
      isLadiesOnly: r === 1,
    });
    seatNum++;
  }

  return seats;
}

export const SAMPLE_BUSES: Bus[] = [
  // Hyderabad -> Bengaluru Route
  {
    id: 'bus-hyd-blr-01',
    operatorName: 'IntrCity SmartBus',
    operatorLogoText: 'IC',
    busType: 'Multi-Axle AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 16,
    fromCity: 'Hyderabad',
    toCity: 'Bengaluru',
    departureTime: '21:30',
    arrivalTime: '06:15',
    duration: '8h 45m',
    baseFare: 1199,
    rating: 4.8,
    reviewsCount: 1420,
    features: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Live Tracking', 'Emergency Exit'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(1199, 1),
    boardingPoints: [
      { id: 'bp-1', location: 'Ameerpet (Metro Station Pillar 1042)', time: '21:30', landmark: 'Opposite Big Bazaar' },
      { id: 'bp-2', location: 'Mehdipatnam (Pillar 48)', time: '21:55', landmark: 'Near Rythu Bazar' },
      { id: 'bp-3', location: 'Gachibowli (ORR Junction)', time: '22:20', landmark: 'Near Outer Ring Road' },
      { id: 'bp-4', location: 'Shamshabad (Airport Toll)', time: '22:50', landmark: 'Decathlon Shamshabad' },
    ],
    droppingPoints: [
      { id: 'dp-1', location: 'Hebbal Flyover', time: '05:30', landmark: 'Hebbal Esteem Mall' },
      { id: 'dp-2', location: 'Majestic (Kempegowda Bus Station)', time: '05:55', landmark: 'Platform 3' },
      { id: 'dp-3', location: 'Madiwala (St. John Hospital)', time: '06:15', landmark: 'Total Mall Junction' },
      { id: 'dp-4', location: 'Electronic City Toll Gate', time: '06:40', landmark: 'Phase 1 Elevated Toll' },
    ],
  },
  {
    id: 'bus-hyd-blr-02',
    operatorName: 'Orange Tours and Travels',
    operatorLogoText: 'OT',
    busType: 'AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 19,
    fromCity: 'Hyderabad',
    toCity: 'Bengaluru',
    departureTime: '22:00',
    arrivalTime: '06:45',
    duration: '8h 45m',
    baseFare: 1050,
    rating: 4.6,
    reviewsCount: 980,
    features: ['AC', 'Charging Point', 'Blanket', 'Water Bottle', 'Live Tracking'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(1050, 2),
    boardingPoints: [
      { id: 'bp-5', location: 'Lakdikapul (Near Police Station)', time: '22:00', landmark: 'Hotel Dwaraka Lane' },
      { id: 'bp-6', location: 'Kukatpally (Y Junction)', time: '22:30', landmark: 'Opposite Forum Mall' },
      { id: 'bp-7', location: 'Aramghar Junction', time: '23:15', landmark: 'Near Pillar 312' },
    ],
    droppingPoints: [
      { id: 'dp-5', location: 'Yeshwantpur (Govardhan Theatre)', time: '06:10', landmark: 'Metro Station Pillar 22' },
      { id: 'dp-6', location: 'Silk Board Junction', time: '06:45', landmark: 'Near Central Silk Board' },
    ],
  },
  {
    id: 'bus-hyd-blr-03',
    operatorName: 'Garuda Plus (Express Line)',
    operatorLogoText: 'GP',
    busType: 'AC Seater',
    totalSeats: 32,
    availableSeatsCount: 14,
    fromCity: 'Hyderabad',
    toCity: 'Bengaluru',
    departureTime: '06:30',
    arrivalTime: '15:15',
    duration: '8h 45m',
    baseFare: 749,
    rating: 4.4,
    reviewsCount: 654,
    features: ['AC', 'Charging Point', 'Reading Light', 'CCTV'],
    hasUpperDeck: false,
    seats: generateSeaterSeats(749, 3),
    boardingPoints: [
      { id: 'bp-8', location: 'MGBS (Central Bus Stand Platform 12)', time: '06:30', landmark: 'Main Departure Bay' },
      { id: 'bp-9', location: 'JBS (Jubilee Bus Station)', time: '07:00', landmark: 'Secunderabad Entry' },
    ],
    droppingPoints: [
      { id: 'dp-7', location: 'Yelahanka Satellite Station', time: '14:45', landmark: 'Yelahanka Bypass' },
      { id: 'dp-8', location: 'Shantinagar Bus Station', time: '15:15', landmark: 'BMTC Depot' },
    ],
  },
  {
    id: 'bus-hyd-blr-04',
    operatorName: 'SRS Travels',
    operatorLogoText: 'SRS',
    busType: 'Non-AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 22,
    fromCity: 'Hyderabad',
    toCity: 'Bengaluru',
    departureTime: '20:45',
    arrivalTime: '05:30',
    duration: '8h 45m',
    baseFare: 699,
    rating: 4.2,
    reviewsCount: 512,
    features: ['Charging Point', 'Emergency Exit', 'Luggage Compartment'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(699, 4),
    boardingPoints: [
      { id: 'bp-10', location: 'Dilsukhnagar (Metro Pillar 1520)', time: '20:45', landmark: 'Near Venkatadri Theatre' },
      { id: 'bp-11', location: 'Kacheguda Cross Road', time: '21:15', landmark: 'Station Road' },
    ],
    droppingPoints: [
      { id: 'dp-9', location: 'Majestic KBS', time: '05:15', landmark: 'Kempegowda Terminus' },
      { id: 'dp-10', location: 'Kalakendram BTM Layout', time: '05:45', landmark: 'Udupi Garden' },
    ],
  },

  // Hyderabad -> Vijayawada Route
  {
    id: 'bus-hyd-vja-01',
    operatorName: 'Morning Star Travels',
    operatorLogoText: 'MS',
    busType: 'Multi-Axle AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 20,
    fromCity: 'Hyderabad',
    toCity: 'Vijayawada',
    departureTime: '23:00',
    arrivalTime: '04:45',
    duration: '5h 45m',
    baseFare: 799,
    rating: 4.7,
    reviewsCount: 890,
    features: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Live Tracking'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(799, 5),
    boardingPoints: [
      { id: 'bp-12', location: 'LB Nagar (Kamineni Hospital Junction)', time: '23:00', landmark: 'Ring Road Underpass' },
      { id: 'bp-13', location: 'Vanasthalipuram (Rythu Bazar)', time: '23:20', landmark: 'National Highway 65' },
    ],
    droppingPoints: [
      { id: 'dp-11', location: 'Bhavanipuram Bypass', time: '04:20', landmark: 'Krishna River Bridge Toll' },
      { id: 'dp-12', location: 'Benz Circle', time: '04:45', landmark: 'Near Jyothi Mahal' },
      { id: 'dp-13', location: 'Ramavarappadu Ring', time: '05:00', landmark: 'Inner Ring Junction' },
    ],
  },
  {
    id: 'bus-hyd-vja-02',
    operatorName: 'Kaveri Travels',
    operatorLogoText: 'KT',
    busType: 'AC Seater',
    totalSeats: 32,
    availableSeatsCount: 12,
    fromCity: 'Hyderabad',
    toCity: 'Vijayawada',
    departureTime: '14:30',
    arrivalTime: '20:15',
    duration: '5h 45m',
    baseFare: 549,
    rating: 4.5,
    reviewsCount: 630,
    features: ['AC', 'Charging Point', 'Water Bottle', 'CCTV'],
    hasUpperDeck: false,
    seats: generateSeaterSeats(549, 6),
    boardingPoints: [
      { id: 'bp-14', location: 'MGBS Platform 8', time: '14:30', landmark: 'City Central Station' },
      { id: 'bp-15', location: 'Uppal Ring Road', time: '15:10', landmark: 'Metro Station Entry' },
    ],
    droppingPoints: [
      { id: 'dp-14', location: 'Gollapudi Center', time: '19:50', landmark: 'Bypass Flyover' },
      { id: 'dp-15', location: 'Pandit Nehru Bus Station (PNBS)', time: '20:15', landmark: 'Vijayawada Central Platform 4' },
    ],
  },
  {
    id: 'bus-hyd-vja-03',
    operatorName: 'Super Luxury Intercity',
    operatorLogoText: 'SL',
    busType: 'Non-AC Seater',
    totalSeats: 32,
    availableSeatsCount: 18,
    fromCity: 'Hyderabad',
    toCity: 'Vijayawada',
    departureTime: '08:00',
    arrivalTime: '14:00',
    duration: '6h 00m',
    baseFare: 420,
    rating: 4.1,
    reviewsCount: 380,
    features: ['Luggage Space', 'Emergency Exit'],
    hasUpperDeck: false,
    seats: generateSeaterSeats(420, 7),
    boardingPoints: [
      { id: 'bp-16', location: 'MGBS Departure Gate', time: '08:00', landmark: 'Platform 1' },
    ],
    droppingPoints: [
      { id: 'dp-16', location: 'PNBS Vijayawada', time: '14:00', landmark: 'Main Terminus' },
    ],
  },

  // Hyderabad -> Chennai Route
  {
    id: 'bus-hyd-chn-01',
    operatorName: 'Orange Tours and Travels',
    operatorLogoText: 'OT',
    busType: 'Multi-Axle AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 15,
    fromCity: 'Hyderabad',
    toCity: 'Chennai',
    departureTime: '19:45',
    arrivalTime: '07:30',
    duration: '11h 45m',
    baseFare: 1450,
    rating: 4.7,
    reviewsCount: 1105,
    features: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Live Tracking'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(1450, 8),
    boardingPoints: [
      { id: 'bp-17', location: 'KPHB Colony (Phase 1)', time: '19:45', landmark: 'Metro Station Pillar 730' },
      { id: 'bp-18', location: 'Ameerpet (Swathi Avenue)', time: '20:15', landmark: 'Near Metro Gate 2' },
      { id: 'bp-19', location: 'LB Nagar Ring Road', time: '21:10', landmark: 'Sagar Ring Road' },
    ],
    droppingPoints: [
      { id: 'dp-17', location: 'Madhavaram Inter-City Bus Terminus', time: '06:50', landmark: 'MMBT Gate 1' },
      { id: 'dp-18', location: 'Koyambedu (CMBT)', time: '07:30', landmark: 'Omni Bus Stand Bay 14' },
      { id: 'dp-19', location: 'Guindy (Kathipara Flyover)', time: '08:00', landmark: 'Metro Entrance' },
    ],
  },
  {
    id: 'bus-hyd-chn-02',
    operatorName: 'VRL Travels',
    operatorLogoText: 'VRL',
    busType: 'AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 11,
    fromCity: 'Hyderabad',
    toCity: 'Chennai',
    departureTime: '20:30',
    arrivalTime: '08:15',
    duration: '11h 45m',
    baseFare: 1350,
    rating: 4.5,
    reviewsCount: 750,
    features: ['AC', 'Charging Point', 'Blanket', 'Water Bottle', 'Emergency Exit'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(1350, 9),
    boardingPoints: [
      { id: 'bp-20', location: 'Miyapur Allwyn Cross Road', time: '20:30', landmark: 'Allwyn Junction' },
      { id: 'bp-21', location: 'Lakdikapul', time: '21:15', landmark: 'Near Telephone Bhavan' },
    ],
    droppingPoints: [
      { id: 'dp-20', location: 'Koyambedu Omni Bus Stand', time: '08:15', landmark: 'Platform A-2' },
    ],
  },

  // Bengaluru -> Chennai Route
  {
    id: 'bus-blr-chn-01',
    operatorName: 'IntrCity SmartBus',
    operatorLogoText: 'IC',
    busType: 'AC Seater',
    totalSeats: 32,
    availableSeatsCount: 16,
    fromCity: 'Bengaluru',
    toCity: 'Chennai',
    departureTime: '07:00',
    arrivalTime: '12:30',
    duration: '5h 30m',
    baseFare: 650,
    rating: 4.8,
    reviewsCount: 1350,
    features: ['AC', 'WiFi', 'Charging Point', 'Snacks', 'Water Bottle', 'Live Tracking'],
    hasUpperDeck: false,
    seats: generateSeaterSeats(650, 10),
    boardingPoints: [
      { id: 'bp-22', location: 'Majestic KBS Gate 2', time: '07:00', landmark: 'Railway Station Metro Side' },
      { id: 'bp-23', location: 'Indiranagar 100ft Road', time: '07:30', landmark: 'Domlur Flyover' },
      { id: 'bp-24', location: 'Hosur Road Electronic City', time: '08:10', landmark: 'Toll plaza' },
    ],
    droppingPoints: [
      { id: 'dp-21', location: 'Poonamallee Bypass', time: '11:45', landmark: 'Outer Ring Junction' },
      { id: 'dp-22', location: 'Koyambedu CMBT', time: '12:30', landmark: 'Bay 8' },
    ],
  },
  {
    id: 'bus-blr-chn-02',
    operatorName: 'GreenLine Express',
    operatorLogoText: 'GL',
    busType: 'Multi-Axle AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 20,
    fromCity: 'Bengaluru',
    toCity: 'Chennai',
    departureTime: '23:15',
    arrivalTime: '05:30',
    duration: '6h 15m',
    baseFare: 950,
    rating: 4.6,
    reviewsCount: 820,
    features: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Live Tracking'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(950, 11),
    boardingPoints: [
      { id: 'bp-25', location: 'Madiwala St. Johns Hospital', time: '23:15', landmark: 'Near Police Station' },
      { id: 'bp-26', location: 'Silk Board Flyover', time: '23:35', landmark: 'Udupi Grand' },
    ],
    droppingPoints: [
      { id: 'dp-23', location: 'Guindy Kathipara', time: '05:00', landmark: 'Metro Pillar 12' },
      { id: 'dp-24', location: 'Koyambedu Omni Stand', time: '05:30', landmark: 'Near Metro Gate 1' },
    ],
  },

  // Hyderabad -> Tirupati Route
  {
    id: 'bus-hyd-tpt-01',
    operatorName: 'Garuda Plus Seven Hills',
    operatorLogoText: 'GP',
    busType: 'Multi-Axle AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 14,
    fromCity: 'Hyderabad',
    toCity: 'Tirupati',
    departureTime: '21:00',
    arrivalTime: '06:30',
    duration: '9h 30m',
    baseFare: 1150,
    rating: 4.7,
    reviewsCount: 940,
    features: ['AC', 'Charging Point', 'Blanket', 'Water Bottle', 'Live Tracking'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(1150, 12),
    boardingPoints: [
      { id: 'bp-27', location: 'MGBS Central', time: '21:00', landmark: 'Bay 15' },
      { id: 'bp-28', location: 'LB Nagar Ring Road', time: '21:40', landmark: 'Kamineni Hospital' },
    ],
    droppingPoints: [
      { id: 'dp-25', location: 'Alipiri Gate', time: '06:00', landmark: 'Seven Hills Toll Plaza' },
      { id: 'dp-26', location: 'Tirupati Central Bus Stand', time: '06:30', landmark: 'Platform 1' },
    ],
  },

  // Bengaluru -> Hyderabad Route
  {
    id: 'bus-blr-hyd-01',
    operatorName: 'IntrCity SmartBus Prime',
    operatorLogoText: 'IC',
    busType: 'Multi-Axle AC Sleeper',
    totalSeats: 36,
    availableSeatsCount: 17,
    fromCity: 'Bengaluru',
    toCity: 'Hyderabad',
    departureTime: '22:15',
    arrivalTime: '06:45',
    duration: '8h 30m',
    baseFare: 1250,
    rating: 4.8,
    reviewsCount: 1680,
    features: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Live Tracking'],
    hasUpperDeck: true,
    seats: generateSleeperSeats(1250, 13),
    boardingPoints: [
      { id: 'bp-29', location: 'Madiwala (Near Total Mall)', time: '22:15', landmark: 'Opposite A2B' },
      { id: 'bp-30', location: 'Majestic KBS', time: '22:45', landmark: 'Kempegowda Terminus Bay 5' },
      { id: 'bp-31', location: 'Hebbal Esteem Mall', time: '23:30', landmark: 'Flyover entrance' },
    ],
    droppingPoints: [
      { id: 'dp-27', location: 'Shamshabad Toll Gate', time: '05:45', landmark: 'Airport approach' },
      { id: 'dp-28', location: 'Gachibowli Outer Ring', time: '06:15', landmark: 'Near Wipro Circle' },
      { id: 'dp-29', location: 'Ameerpet Metro', time: '06:45', landmark: 'Pillar 1042' },
    ],
  },
];

export const POPULAR_CITIES = [
  'Hyderabad',
  'Bengaluru',
  'Vijayawada',
  'Chennai',
  'Tirupati',
  'Visakhapatnam',
  'Pune',
  'Mumbai',
];

export const POPULAR_ROUTES = [
  {
    from: 'Hyderabad',
    to: 'Bengaluru',
    startingFare: 699,
    duration: '8h 45m',
    busesDaily: 42,
    distanceKm: 570,
    category: 'High Frequency Expressway',
  },
  {
    from: 'Hyderabad',
    to: 'Vijayawada',
    startingFare: 420,
    duration: '5h 45m',
    busesDaily: 58,
    distanceKm: 275,
    category: 'Express Corridor',
  },
  {
    from: 'Hyderabad',
    to: 'Chennai',
    startingFare: 1350,
    duration: '11h 45m',
    busesDaily: 28,
    distanceKm: 630,
    category: 'Overnight Intercity',
  },
  {
    from: 'Bengaluru',
    to: 'Chennai',
    startingFare: 650,
    duration: '5h 30m',
    busesDaily: 64,
    distanceKm: 340,
    category: 'Daily Business & Student Route',
  },
  {
    from: 'Hyderabad',
    to: 'Tirupati',
    startingFare: 1150,
    duration: '9h 30m',
    busesDaily: 34,
    distanceKm: 560,
    category: 'Pilgrim & Student Direct',
  },
  {
    from: 'Bengaluru',
    to: 'Hyderabad',
    startingFare: 1250,
    duration: '8h 30m',
    busesDaily: 40,
    distanceKm: 570,
    category: 'Return Express',
  },
];

export const FEATURED_OPERATORS = [
  {
    name: 'IntrCity SmartBus',
    code: 'IC',
    rating: 4.8,
    fleetCount: '120+ Fleet',
    highlights: ['AC Lounges at boarding', 'Live Bus Tracker', 'Onboard washrooms on select routes'],
  },
  {
    name: 'Orange Tours and Travels',
    code: 'OT',
    rating: 4.7,
    fleetCount: '250+ Fleet',
    highlights: ['Premium Scania & Volvo', 'Sanitized Bedding', 'Dedicated women reserved berths'],
  },
  {
    name: 'Garuda Plus (APSRTC/TSRTC)',
    code: 'GP',
    rating: 4.5,
    fleetCount: '400+ Fleet',
    highlights: ['Govt verified reliability', 'Punctual departures', 'Affordable student concession'],
  },
  {
    name: 'Morning Star Travels',
    code: 'MS',
    rating: 4.6,
    fleetCount: '90+ Fleet',
    highlights: ['High-speed express routes', 'Individual USB ports', 'Emergency 24x7 helpline'],
  },
];
