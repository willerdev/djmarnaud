import React from 'react';
import { Ticket } from '../lib/supabase';

export function BookedEventsMenu({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Booked Events</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id} className="mb-2">
            {ticket.event_name} - {ticket.customer_name} ({ticket.status})
          </li>
        ))}
      </ul>
    </div>
  );
} 