import React from 'react';
import { Link } from 'react-router-dom';
import { Music2, Ticket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-black text-white py-4">
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://i1.sndcdn.com/visuals-000174269101-fwsydq-t1240x260.jpg"
            alt="Marnaud Music"
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          {user && (
            <Link to="/dashboard" className="flex items-center space-x-2 hover:text-gray-300 transition">
              <Ticket className="w-5 h-5" />
              <span>Manage Tickets</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}