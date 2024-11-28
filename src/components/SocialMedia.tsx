import React from 'react';
import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, url: '#', label: 'Instagram' },
  { icon: Twitter, url: '#', label: 'Twitter' },
  { icon: Youtube, url: '#', label: 'YouTube' },
  { icon: Facebook, url: '#', label: 'Facebook' },
];

export function SocialMedia() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Connect With Me</h2>
        <div className="flex justify-center space-x-8">
          {socialLinks.map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              className="transform hover:scale-110 transition"
              aria-label={label}
            >
              <Icon className="w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}