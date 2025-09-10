import React, { useState, useEffect } from 'react';
import { User, Ticket } from '../types';
import { storage } from '../utils/storage';
import { generateTicketPDF, generateAllTicketsPDF } from '../utils/pdfGenerator';
import { 
  User as UserIcon, 
  Ticket as TicketIcon, 
  Download, 
  Calendar, 
  MapPin, 
  Clock,
  LogOut,
  CreditCard,
  Star,
  DownloadCloud
} from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onViewConcerts: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onViewConcerts }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<'tickets' | 'profile'>('tickets');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<string | null>(null);

  useEffect(() => {
    const userTickets = storage.getUserTickets(user.id);
    setTickets(userTickets);
  }, [user.id]);

  const handleDownloadTicket = async (ticket: Ticket) => {
    setIsGeneratingPDF(ticket.id);
    try {
      await generateTicketPDF(ticket);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(null);
    }
  };

  const handleDownloadAllTickets = async () => {
    if (tickets.length === 0) return;
    
    setIsGeneratingPDF('all');
    try {
      await generateAllTicketsPDF(tickets);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(null);
    }
  };

  const upcomingTickets = tickets.filter(ticket => 
    new Date(ticket.concert.date) >= new Date() && ticket.status === 'active'
  );
  
  const pastTickets = tickets.filter(ticket => 
    new Date(ticket.concert.date) < new Date() || ticket.status === 'used'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Event Ease
              </h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Dashboard</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={onViewConcerts}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Browse Concerts
              </button>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name}! 👋</h2>
          <p className="text-gray-600">Manage your tickets and profile from your personal dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-800">{tickets.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TicketIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-800">{upcomingTickets.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Spent</p>
                <p className="text-2xl font-bold text-gray-800">
                  {/* Changed currency symbol */}
                  ₹{tickets.reduce((sum, ticket) => sum + ticket.price, 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-1 bg-white p-1 rounded-xl shadow-lg border border-gray-100 w-fit">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'tickets'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Tickets ({tickets.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Profile
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'tickets' && (
          <div className="space-y-8">
            {/* Download All Button */}
            {tickets.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={handleDownloadAllTickets}
                  disabled={isGeneratingPDF === 'all'}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF === 'all' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <DownloadCloud className="w-5 h-5" />
                      Download All Tickets
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Upcoming Tickets */}
            {upcomingTickets.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all transform hover:scale-[1.02]">
                      <img
                        src={ticket.concert.image}
                        alt={ticket.concert.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-6">
                        <h4 className="font-bold text-gray-800 mb-1">{ticket.concert.title}</h4>
                        <p className="text-purple-600 font-semibold mb-3">{ticket.concert.artist}</p>
                        
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {/* Changed date format */}
                            <span>{new Date(ticket.concert.date).toLocaleDateString('en-IN')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{ticket.concert.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{ticket.concert.venue}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          {/* Changed currency symbol */}
                          <span className="text-lg font-bold text-purple-600">₹{ticket.price.toFixed(2)}</span>
                          <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                            {ticket.status === 'active' ? 'Valid' : ticket.status}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDownloadTicket(ticket)}
                          disabled={isGeneratingPDF === ticket.id}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingPDF === ticket.id ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download Ticket
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Tickets */}
            {pastTickets.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Past Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastTickets.map((ticket) => (
                    <div key={ticket.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 opacity-80 hover:opacity-100 transition-all">
                      <img
                        src={ticket.concert.image}
                        alt={ticket.concert.title}
                        className="w-full h-40 object-cover grayscale hover:grayscale-0 transition-all"
                      />
                      <div className="p-6">
                        <h4 className="font-bold text-gray-800 mb-1">{ticket.concert.title}</h4>
                        <p className="text-purple-600 font-semibold mb-3">{ticket.concert.artist}</p>
                        
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                             {/* Changed date format */}
                            <span>{new Date(ticket.concert.date).toLocaleDateString('en-IN')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>Event Completed</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadTicket(ticket)}
                          disabled={isGeneratingPDF === ticket.id}
                          className="w-full flex items-center justify-center gap-2 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isGeneratingPDF === ticket.id ? (
                            <>
                              <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-700 rounded-full animate-spin"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              Download Receipt
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Tickets */}
            {tickets.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎫</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No tickets yet</h3>
                <p className="text-gray-500 mb-6">Start exploring concerts and book your first ticket!</p>
                <button
                  onClick={onViewConcerts}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  Browse Concerts
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-purple-600" />
              Profile Information
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                <input
                  type="text"
                  // Changed date format
                  value={new Date(user.createdAt).toLocaleDateString('en-IN')}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                />
              </div>

              <div className="pt-6 border-t">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};