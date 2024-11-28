import React, { useEffect, useState } from 'react';
import { supabase, type Ticket } from '../lib/supabase';
import { TicketList } from '../components/TicketList';
import { TicketForm } from '../components/TicketForm';
import { BookedEventsMenu } from '../components/BookedEventsMenu';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const fetchTickets = async () => {
    const { data, error } = await supabase.from('tickets').select('*').order('purchase_date', { ascending: false });
    if (error) {
      console.error('Error fetching tickets:', error);
      return;
    }
    setTickets(data || []);
    setLoading(false);
  };

  const handleEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleExpire = async (id: string) => {
    await supabase.from('tickets').update({ status: 'cancelled' }).eq('id', id);
    fetchTickets();
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading tickets...</div>;
  }

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-lg font-bold mb-4">Dashboard Menu</h2>
        <ul>
          <li>
            <Link to="/add-ticket" className="block py-2 hover:bg-gray-700">Add Ticket</Link>
          </li>
          <li>
            <Link to="/booked-events" className="block py-2 hover:bg-gray-700">Booked Events</Link>
          </li>
          <li>
            <Link to="/admin-dashboard-home" className="block py-2 hover:bg-gray-700">Home</Link>
          </li>
          <li>
            <button onClick={() => supabase.auth.signOut()} className="block py-2 w-full text-left hover:bg-gray-700">Logout</button>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-4 ml-64">
        <h1 className="text-4xl font-bold mb-8">Ticket Management</h1>
        <TicketForm onTicketAdded={fetchTickets} ticket={selectedTicket} />
        <TicketList tickets={tickets} onEdit={handleEdit} onExpire={handleExpire} />
        <BookedEventsMenu tickets={tickets} />
      </main>
    </div>
  );
}