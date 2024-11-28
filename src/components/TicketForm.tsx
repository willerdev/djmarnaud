import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

export function TicketForm({ onTicketAdded, ticket }: { onTicketAdded: () => void; ticket?: Ticket }) {
  const [formData, setFormData] = useState({
    event_name: ticket?.event_name || '',
    customer_name: ticket?.customer_name || '',
    customer_email: ticket?.customer_email || '',
    price: ticket?.price.toString() || '',
    ticket_type: ticket?.ticket_type || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (ticket) {
        // Update existing ticket
        const { error } = await supabase
          .from('tickets')
          .update({ ...formData })
          .eq('id', ticket.id);
        if (error) throw error;
      } else {
        // Insert new ticket
        const { error } = await supabase.from('tickets').insert([{
          ...formData,
          price: Number(formData.price),
          status: 'valid',
          purchase_date: new Date().toISOString(),
        }]);
        if (error) throw error;
      }
      setFormData({ event_name: '', customer_name: '', customer_email: '', price: '', ticket_type: '' });
      onTicketAdded();
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{ticket ? 'Edit Ticket' : 'Add New Ticket'}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            value={formData.event_name}
            onChange={(e) => setFormData(prev => ({ ...prev, event_name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            value={formData.customer_name}
            onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Email</label>
          <input
            type="email"
            value={formData.customer_email}
            onChange={(e) => setFormData(prev => ({ ...prev, customer_email: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
          <input
            type="text"
            value={formData.ticket_type}
            onChange={(e) => setFormData(prev => ({ ...prev, ticket_type: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
        >
          {ticket ? 'Update Ticket' : 'Add Ticket'}
        </button>
      </div>
    </form>
  );
}