'use client';

import React from 'react';
import { DollarSign, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    services: [
      'Financial Strategy',
      'Budgeting & Forecasting',
      'Tax Compliance',
      'Investor Reporting',
      'Book Keeping',
      'Financial Analysis'
    ],
    company: [
      'About Us',
      'Our Team',
      'Careers',
      'Blog',
      'Case Studies',
      'Contact'
    ],
    resources: [
      'Help Center',
      'Documentation',
      'API Reference',
      'Community',
      'Webinars',
      'Newsletter'
    ],
    legal: [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Policy',
      'GDPR',
      'Security',
      'Compliance'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-md bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">
                Fractional Chiefs
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering businesses with strategic financial leadership. Professional CFO services tailored to startups, SMEs, and corporates.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">info@fractionalchiefs.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">+971 XXX XXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">Dubai, UAE | Gurugram, India</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest financial insights and tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 text-sm"
              />
              <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Media Icons */}
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Fractional Chiefs. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Financial Strategy. Growth. Success.
            </p>
          </div>
        </div>
      </div>

    
    </footer>
  );
}