import React from 'react';
import { TourSection } from '../components/TourSection';
import { MusicPortfolio } from '../components/MusicPortfolio';
import { SocialMedia } from '../components/SocialMedia';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://i.imgur.com/75bVkU1.png"
            alt="DJ Setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Marnaud Music Therapy</h1>
            <p className="text-xl md:text-2xl mb-8">Experience the healing power of music through professional DJ sessions and therapeutic soundscapes.</p>
            <a
              href="#tours"
              className="inline-block bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition"
            >
              Book a Session
            </a>
          </div>
        </div>
      </section>

      {/* Tour Section */}
      <div id="tours">
        <TourSection />
      </div>

      {/* Music Portfolio */}
      <MusicPortfolio />

      {/* Social Media */}
      <SocialMedia />
    </div>
  );
}