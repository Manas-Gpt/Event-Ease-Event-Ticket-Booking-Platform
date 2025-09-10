import React, { useState } from 'react';
import { Concert, BookingData } from '../types';
import { ArrowLeft, Calendar, MapPin, Clock, Users, CreditCard } from 'lucide-react';

interface BookingFormProps {
  concert: Concert;
  onBack: () => void;
  onBookingSubmit: (bookingData: BookingData) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ concert, onBack, onBookingSubmit }) => {
  // Updated default ticket type
  const [ticketType, setTicketType] = useState('Silver');
  const [quantity, setQuantity] = useState(1);

  // Updated ticket types for an Indian context
  const ticketTypes = [
    { name: 'Silver', price: concert.price, description: 'Good view with standard seating' },
    { name: 'Gold', price: concert.price * 1.5, description: 'Excellent seating with exclusive merchandise' },
    { name: 'Platinum', price: concert.price * 2, description: 'Front row seats with artist meet & greet' }
  ];

  const selectedTicketTypeData = ticketTypes.find(t => t.name === ticketType);
  const totalPrice = (selectedTicketTypeData?.price || 0) * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onBookingSubmit({
      concertId: concert.id,
      ticketType,
      quantity,
      totalPrice
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Concerts
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Concert Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={concert.image}
              alt={concert.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{concert.title}</h1>
              <p className="text-xl text-purple-600 font-semibold mb-4">{concert.artist}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  {/* Changed date format to en-IN (India) */}
                  <span>{new Date(concert.date).toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{concert.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{concert.venue}, {concert.location}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-700">{concert.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-purple-600" />
            Book Your Tickets
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ticket Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Ticket Type
              </label>
              <div className="space-y-3">
                {ticketTypes.map((type) => (
                  <label
                    key={type.name}
                    className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      ticketType === type.name
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="ticketType"
                      value={type.name}
                      checked={ticketType === type.name}
                      onChange={(e) => setTicketType(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-gray-800">{type.name}</div>
                        <div className="text-sm text-gray-600">{type.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-600">
                          {/* Changed currency symbol */}
                          ₹{type.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Users className="inline w-4 h-4 mr-2" />
                Number of Tickets
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-bold text-gray-800 min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(8, quantity + 1))}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Maximum 8 tickets per order</p>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{ticketType} Ticket × {quantity}</span>
                  {/* Changed currency symbol */}
                  <span>₹{((selectedTicketTypeData?.price || 0) * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Service Fee</span>
                  {/* Changed currency symbol */}
                  <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <hr className="border-purple-200" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  {/* Changed currency symbol */}
                  <span className="text-purple-600">₹{(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Continue to Payment
              <CreditCard className="w-5 h-5" />
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
            <p className="text-sm text-green-700 flex items-center gap-2">
              <span>🔒</span>
              Your information is secured with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};