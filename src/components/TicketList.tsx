import React from 'react';
import { format } from 'date-fns';
import { Ticket } from '../lib/supabase';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'used':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.event_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{ticket.customer_name}</div>
                  <div className="text-sm text-gray-500">{ticket.customer_email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{ticket.price} Frw</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {format(new Date(ticket.purchase_date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(ticket.status)}
                    <span className="ml-2 capitalize">{ticket.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}