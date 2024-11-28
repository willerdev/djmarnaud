import { useEffect, useState } from 'react';
import { supabase, type Ticket } from '../lib/supabase';
import { TicketList } from '../components/TicketList';
import Sidebar from '../components/Sidebar';
import ErrorBoundary from '../components/ErrorBoundary';
import { type Event } from '../types/Event';

export function EventsList() {
  const [events, setEvents] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
      return;
    }
    setEvents(data || []);
    setLoading(false);
  };

  const handleEdit = async (ticket: Ticket) => {
    // Logic to edit the event
    const { error } = await supabase.from('events').update(ticket).eq('id', ticket.id);
    if (error) {
      console.error('Error updating event:', error);
      return;
    }
    fetchEvents(); // Refresh events after edit
  };

  const handleExpire = async (id: string) => {
    await supabase.from('events').update({ available_tickets: 0 }).eq('id', id); // Mark as expired
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Sidebar />
      <h1 className="text-4xl font-bold mb-6">Events List</h1>
      {loading ? (
        <div>Loading events...</div>
      ) : events.length === 0 ? (
        <div>No events available.</div>
      ) : (
        <ErrorBoundary>
          <TicketList tickets={events} onEdit={handleEdit} onExpire={handleExpire} />
          {selectedEvent && (
            <div>
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.description}</p>
            </div>
          )}
        </ErrorBoundary>
      )}
    </div>
  );
} 