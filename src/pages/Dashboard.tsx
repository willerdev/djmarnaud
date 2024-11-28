import React, { useEffect, useState } from 'react';
import { supabase, type Ticket } from '../lib/supabase';
import { TicketList } from '../components/TicketList';

export function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .order('purchase_date', { ascending: false });

    if (error) {
      console.error('Error fetching tickets:', error);
      return;
    }

    setTickets(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading tickets...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Ticket Management</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <TicketList tickets={tickets} />
      </div>
    </div>
  );
}