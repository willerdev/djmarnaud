import React from 'react';
import { TicketForm } from '../components/TicketForm';
import Sidebar from '../components/Sidebar';

export function AddTicket() {
  const handleTicketAdded = () => {
    // Handle post ticket addition logic (e.g., redirect or show a message)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Sidebar />
      <h1 className="text-4xl font-bold mb-6">Add New Ticket</h1>
      <TicketForm onTicketAdded={handleTicketAdded} />
    </div>
  );
} 