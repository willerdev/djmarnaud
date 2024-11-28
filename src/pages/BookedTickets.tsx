import React, { useEffect, useState } from 'react';
import { supabase, type Ticket } from '../lib/supabase';
import { TicketList } from '../components/TicketList';
import Sidebar from '../components/Sidebar'; // Import Sidebar

export function BookedTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookedTickets = async () => {
    const { data, error } = await supabase.from('tickets').select('*').eq('status', 'used');
    if (error) {
      console.error('Error fetching booked tickets:', error);
      return;
    }
    setTickets(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookedTickets();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading booked tickets...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Sidebar /> {/* Add Sidebar here */}
      <h1 className="text-4xl font-bold mb-6">Booked Tickets</h1>
      <TicketList tickets={tickets} onEdit={() => {}} onExpire={() => {}} />
    </div>
  );
} 