import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Home, Plus, Ticket, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all ${isOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white p-4`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <nav>
        <ul>
          <li className="mb-2">
            <a href="/admin-dashboard-home" className="flex items-center cursor-pointer">
              <Home className="w-6 h-6" />
              {isOpen && <span className="ml-2">Dashboard</span>}
            </a>
          </li>
          <li className="mb-2">
            <a href="/add-ticket" className="flex items-center cursor-pointer">
              <Plus className="w-6 h-6" />
              {isOpen && <span className="ml-2">Add Ticket</span>}
            </a>
          </li>
          <li className="mb-2">
            <a href="/events-list" className="flex items-center cursor-pointer">
              <Ticket className="w-6 h-6" />
              {isOpen && <span className="ml-2">Events</span>}
            </a>
          </li>
          <li className="mb-2">
            <a href="/booked-tickets" className="flex items-center cursor-pointer">
              <Ticket className="w-6 h-6" />
              {isOpen && <span className="ml-2">Booked Tickets</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;