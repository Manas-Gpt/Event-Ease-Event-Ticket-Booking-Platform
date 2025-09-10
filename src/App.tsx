import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User, Concert, BookingData, PaymentData, Ticket } from './types';
import { storage } from './utils/storage';
import { sampleConcerts } from './data/concerts';

import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ConcertList } from './components/ConcertList';
import { BookingForm } from './components/BookingForm';
import { PaymentForm } from './components/PaymentForm';

type AppView = 'login' | 'dashboard' | 'concerts' | 'booking' | 'payment';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [user, setUser] = useState<User | null>(null);
  const [concerts] = useState<Concert[]>(sampleConcerts);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  // Initialize concerts and check for existing user on app start
  useEffect(() => {
    storage.initializeConcerts(sampleConcerts);
    
    const savedUser = storage.getUser();
    if (savedUser) {
      setUser(savedUser);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    storage.removeUser();
    setUser(null);
    setCurrentView('login');
  };

  const handleViewConcerts = () => {
    setCurrentView('concerts');
  };

  const handleSelectConcert = (concert: Concert) => {
    setSelectedConcert(concert);
    setCurrentView('booking');
  };

  const handleBookingSubmit = (data: BookingData) => {
    setBookingData(data);
    setCurrentView('payment');
  };

  const handlePaymentComplete = (paymentData: PaymentData) => {
    if (!user || !selectedConcert || !bookingData) return;

    // Create tickets for the booking
    for (let i = 0; i < bookingData.quantity; i++) {
      const ticket: Ticket = {
        id: `ticket_${Date.now()}_${i}`,
        concertId: selectedConcert.id,
        userId: user.id,
        concert: selectedConcert,
        purchaseDate: new Date().toISOString(),
        ticketType: bookingData.ticketType,
        price: bookingData.totalPrice / bookingData.quantity,
        status: 'active',
        seatNumber: `${bookingData.ticketType}-${Math.floor(Math.random() * 100) + 1}`
      };
      
      storage.saveTicket(ticket);
    }

    // Reset booking state and go to dashboard
    setSelectedConcert(null);
    setBookingData(null);
    setCurrentView('dashboard');

    // Show success message
    setTimeout(() => {
      alert(`🎉 Payment successful! Your ${bookingData.quantity} ticket(s) for ${selectedConcert.title} have been confirmed. You can download them from your dashboard.`);
    }, 500);
  };

  const handleBackToConcerts = () => {
    setCurrentView('concerts');
    setSelectedConcert(null);
  };

  const handleBackToBooking = () => {
    setCurrentView('booking');
    setBookingData(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      
      case 'dashboard':
        return user ? (
          <Dashboard 
            user={user} 
            onLogout={handleLogout}
            onViewConcerts={handleViewConcerts}
          />
        ) : (
          <Navigate to="/login" replace />
        );
      
      case 'concerts':
        return (
          <ConcertList 
            concerts={concerts}
            onSelectConcert={handleSelectConcert}
            onBack={handleBackToDashboard}
          />
        );
      
      case 'booking':
        return selectedConcert ? (
          <BookingForm
            concert={selectedConcert}
            onBack={handleBackToConcerts}
            onBookingSubmit={handleBookingSubmit}
          />
        ) : (
          <Navigate to="/concerts" replace />
        );
      
      case 'payment':
        return selectedConcert && bookingData && user ? (
          <PaymentForm
            bookingData={bookingData}
            concert={selectedConcert}
            user={user}
            onBack={handleBackToBooking}
            onPaymentComplete={handlePaymentComplete}
          />
        ) : (
          <Navigate to="/concerts" replace />
        );
      
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;