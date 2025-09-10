import React, { useState, useEffect } from 'react';
import { Concert } from '../types';
import { Calendar, MapPin, Clock, Search, Filter, Star, ArrowLeft } from 'lucide-react';

interface ConcertListProps {
  concerts: Concert[];
  onSelectConcert: (concert: Concert) => void;
  onBack: () => void;
}

export const ConcertList: React.FC<ConcertListProps> = ({ concerts, onSelectConcert, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [filteredConcerts, setFilteredConcerts] = useState<Concert[]>(concerts);

  const categories = ['All', ...Array.from(new Set(concerts.map(c => c.category)))];

  useEffect(() => {
    let filtered = concerts.filter(concert => {
      const matchesSearch = concert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           concert.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           concert.venue.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || concert.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort concerts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'price':
          return a.price - b.price;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredConcerts(filtered);
  }, [concerts, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🎵 Discover Amazing Concerts
          </h1>
          <p className="text-gray-600 text-lg">Find and book tickets for the hottest concerts in your area</p>
        </div>
        <div className="w-24"></div> {/* Spacer */}
      </div>

      {/* Search and Filters */}
      <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search concerts, artists, or venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
          >
            <option value="date">Sort by Date</option>
            <option value="price">Sort by Price</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-purple-600">{filteredConcerts.length}</span> concerts
        </p>
      </div>

      {/* Concert Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredConcerts.map((concert) => (
          <div
            key={concert.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-gray-100 cursor-pointer group"
            onClick={() => onSelectConcert(concert)}
          >
            {/* Concert Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={concert.image}
                alt={concert.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                  {concert.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-xs font-semibold">4.8</span>
                </div>
              </div>
            </div>

            {/* Concert Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                {concert.title}
              </h3>
              <p className="text-purple-600 font-semibold mb-4">{concert.artist}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date(concert.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{concert.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{concert.venue}, {concert.location}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{concert.description}</p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-purple-600">₹{concert.price}</span>
                  <span className="text-gray-500 text-sm ml-1">per ticket</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {concert.availableTickets} tickets left
                  </p>
                  <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: `${Math.min(concert.availableTickets / 300 * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredConcerts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No concerts found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
