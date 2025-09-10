import { Concert } from '../types';

export const sampleConcerts: Concert[] = [
  {
    id: '1',
    title: 'Safar Tour',
    artist: 'Arijit Singh',
    date: '2025-11-22',
    time: '7:00 PM',
    venue: 'Jawaharlal Nehru Stadium',
    location: 'Delhi, DL',
    price: 4999,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Experience a magical evening with the king of Bollywood melodies, Arijit Singh, as he performs his greatest hits.',
    availableTickets: 250,
    category: 'Bollywood'
  },
  {
    id: '2',
    title: 'An Evening with Prateek Kuhad',
    artist: 'Prateek Kuhad',
    date: '2025-12-05',
    time: '8:00 PM',
    venue: 'The Piano Man Jazz Club',
    location: 'Gurgaon, HR',
    price: 2499,
    image: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'An intimate acoustic performance featuring Prateek Kuhad\'s most beloved songs in a cozy and personal setting.',
    availableTickets: 100,
    category: 'Indie/Acoustic'
  },
  {
    id: '3',
    title: 'Bass Raja Tour',
    artist: 'Nucleya',
    date: '2026-01-18',
    time: '9:00 PM',
    venue: 'Palace Grounds',
    location: 'Bengaluru, KA',
    price: 1999,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Get ready for an electrifying night with Nucleya\'s signature bass-heavy tracks and stunning visual effects.',
    availableTickets: 300,
    category: 'Electronic'
  },
  {
    id: '4',
    title: 'Sufi Soul Night',
    artist: 'The Wadali Brothers',
    date: '2026-02-14',
    time: '7:30 PM',
    venue: 'Siri Fort Auditorium',
    location: 'Delhi, DL',
    price: 3500,
    image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'A sophisticated evening of soul-stirring Sufi music with the legendary Wadali Brothers.',
    availableTickets: 150,
    category: 'Sufi'
  },
  {
    id: '5',
    title: 'Rock On India',
    artist: 'Parikrama',
    date: '2026-03-01',
    time: '8:30 PM',
    venue: 'Hard Rock Cafe',
    location: 'Mumbai, MH',
    price: 1299,
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Join Indian rock legends Parikrama for an explosive show filled with their iconic hits and powerful guitar solos.',
    availableTickets: 200,
    category: 'Indian Rock'
  },
  {
    id: '6',
    title: 'Masters of Percussion',
    artist: 'Ustad Zakir Hussain',
    date: '2026-03-20',
    time: '7:00 PM',
    venue: 'Shanmukhananda Hall',
    location: 'Mumbai, MH',
    price: 4500,
    image: 'https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Experience the magic of tabla with the world-renowned maestro Ustad Zakir Hussain in a timeless classical performance.',
    availableTickets: 120,
    category: 'Indian Classical'
  }
];