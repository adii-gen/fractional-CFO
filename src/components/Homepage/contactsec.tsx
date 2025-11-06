'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    segment: 'startup',
    message: ''
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will get back to you soon.');
  };

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Main CTA Banner */}
      <section className="py-8 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Unlock Financial Clarity?
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can help you scale smarter and grow sustainably with fractional CFO expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-emerald-700 font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-green-700 hover:bg-white hover:text-emerald-700 transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-emerald-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-sm">30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-sm">No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              <span className="text-sm">Cancel Anytime</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent)] opacity-50"></div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Have questions? We're here to help. Reach out to us through any of these channels.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600">info@fractionalchiefs.com</p>
                    <p className="text-gray-600">support@fractionalchiefs.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600">+971 XXX XXXXX</p>
                    <p className="text-gray-600">Mon-Fri: 9 AM - 6 PM GST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-gray-600">Dubai, UAE</p>
                    <p className="text-gray-600">Gurugram, Haryana, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Click below to schedule your free consultation with our financial experts.
              </p>
              <Button 
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white mb-4"
                size="lg"
              >
                Schedule Free Consultation
                <Send className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                className="w-full border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                size="lg"
              >
                Download Service Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}