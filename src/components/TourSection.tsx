import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PublicBookingForm } from './PublicBookingForm';
import { format } from 'date-fns';

type Event = {
  id: string;
  title: string;
  venue: string;
  date: string;
  price: number;
  description: string;
};

export function TourSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          Loading events...
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Dj Marnaud Upcoming Tours</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row items-center justify-between p-6 border border-gray-800 rounded-lg hover:border-gray-600 transition"
            >
              <div className="flex items-center space-x-6">
                <Calendar className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-gray-400">{event.venue}</p>
                  <p className="text-gray-400">{format(new Date(event.date), 'MMMM d, yyyy')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-lg">{event.price} Frw</span>
                <button 
                  onClick={() => setSelectedEvent(event)}
                  className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <PublicBookingForm 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </section>
  );
}