import React, { useState } from 'react';
import { BookingData, Concert, PaymentData, User } from '../types';
import { ArrowLeft, CreditCard, Lock, Calendar, User as UserIcon } from 'lucide-react';

interface PaymentFormProps {
  bookingData: BookingData;
  concert: Concert;
  user: User;
  onBack: () => void;
  onPaymentComplete: (paymentData: PaymentData) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ 
  bookingData, 
  concert, 
  user, 
  onBack, 
  onPaymentComplete 
}) => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: user.name,
    billingAddress: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = bookingData.totalPrice * 1.1; // Including service fee

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete(paymentData);
    }, 2000);
  };

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'Amex';
    // Assuming RuPay cards can start with various numbers, often 6
    if (cleanNumber.startsWith('6')) return 'RuPay';
    return 'Card';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Booking
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <img
                src={concert.image}
                alt={concert.title}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{concert.title}</h3>
                <p className="text-purple-600 font-medium">{concert.artist}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(concert.date).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span>{bookingData.ticketType} Ticket × {bookingData.quantity}</span>
                {/* Changed currency symbol */}
                <span>₹{bookingData.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Service Fee (10%)</span>
                {/* Changed currency symbol */}
                <span>₹{(bookingData.totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-purple-600">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-blue-700 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Your payment is protected by 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-purple-600" />
            Payment Details
          </h2>

          {isProcessing && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing your payment...
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                  disabled={isProcessing}
                  className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors disabled:bg-gray-100"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {getCardType(paymentData.cardNumber)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                  disabled={isProcessing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors disabled:bg-gray-100"
                />
              </div>

              {/* CVV */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                  placeholder="123"
                  maxLength={4}
                  required
                  disabled={isProcessing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cardholder Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={paymentData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  required
                  disabled={isProcessing}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Billing Address
              </label>
              <textarea
                value={paymentData.billingAddress}
                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                placeholder="123 Main St, City, State, ZIP"
                rows={3}
                required
                disabled={isProcessing}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors disabled:bg-gray-100 resize-none"
              />
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transform hover:scale-[1.02] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  {/* Changed currency symbol */}
                  Pay ₹{totalAmount.toFixed(2)}
                </>
              )}
            </button>
          </form>

          {/* Security Features */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🔐</span>
              <span>SSL Secured Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🛡️</span>
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>💳</span>
              <span>All major cards accepted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};