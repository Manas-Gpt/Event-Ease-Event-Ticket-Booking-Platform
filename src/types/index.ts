export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Concert {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  price: number;
  image: string;
  description: string;
  availableTickets: number;
  category: string;
}

export interface Ticket {
  id: string;
  concertId: string;
  userId: string;
  concert: Concert;
  purchaseDate: string;
  ticketType: string;
  price: number;
  status: 'active' | 'used' | 'cancelled';
  seatNumber?: string;
}

export interface BookingData {
  concertId: string;
  ticketType: string;
  quantity: number;
  totalPrice: number;
}

export interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
}