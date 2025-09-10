import { User, Ticket, Concert } from '../types';

const STORAGE_KEYS = {
  USER: 'event_ease_user',
  TICKETS: 'event_ease_tickets',
  CONCERTS: 'event_ease_concerts'
};

export const storage = {
  // User management
  saveUser: (user: User) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  removeUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Tickets management
  saveTicket: (ticket: Ticket) => {
    const tickets = getTickets();
    tickets.push(ticket);
    localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
  },

  getTickets: (): Ticket[] => {
    const tickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
    return tickets ? JSON.parse(tickets) : [];
  },

  getUserTickets: (userId: string): Ticket[] => {
    const tickets = getTickets();
    return tickets.filter(ticket => ticket.userId === userId);
  },

  // Concerts management
  initializeConcerts: (concerts: Concert[]) => {
    const existingConcerts = localStorage.getItem(STORAGE_KEYS.CONCERTS);
    if (!existingConcerts) {
      localStorage.setItem(STORAGE_KEYS.CONCERTS, JSON.stringify(concerts));
    }
  },

  getConcerts: (): Concert[] => {
    const concerts = localStorage.getItem(STORAGE_KEYS.CONCERTS);
    return concerts ? JSON.parse(concerts) : [];
  }
};

// Helper function to get tickets (used internally)
const getTickets = (): Ticket[] => {
  const tickets = localStorage.getItem(STORAGE_KEYS.TICKETS);
  return tickets ? JSON.parse(tickets) : [];
};