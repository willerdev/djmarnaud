import React from 'react';
import { Play } from 'lucide-react';

const portfolio = [
  {
    id: '1',
    title: 'Healing Frequencies',
    description: 'A journey through therapeutic soundscapes',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Deep Meditation',
    description: 'Ambient sounds for inner peace',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'Energy Flow',
    description: 'Uplifting beats for positive vibes',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80',
  },
];

export function MusicPortfolio() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Music Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolio.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="text-center text-white p-4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="mb-4">{item.description}</p>
                  <button className="inline-flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition">
                    <Play className="w-4 h-4" />
                    <span>Listen Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}