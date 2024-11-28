import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

type FormData = {
  title: string;
  description: string;
  date: string;
  venue: string;
  price: string;
  capacity: string;
  available_tickets: string;
  image_url: string;
};

export function EventForm({ onEventAdded }: { onEventAdded: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: '',
    venue: '',
    price: '',
    capacity: '',
    available_tickets: '',
    image_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('events').insert([{
        ...formData,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        available_tickets: Number(formData.available_tickets),
      }]);
      if (error) throw error;
      onEventAdded();
      setFormData({ title: '', description: '', date: '', venue: '', price: '', capacity: '', available_tickets: '', image_url: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Create Event</h2>
      <div className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === 'date' ? 'datetime-local' : 'text'}
              value={formData[key]}
              onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
        >
          Add Event
        </button>
      </div>
    </form>
  );
} 