'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  location?: string;
}

export default function BookingModal({ isOpen, onClose, serviceName, location = 'Dubai' }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: serviceName,
    date: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Using Formspree — replace YOUR_FORM_ID with your Formspree form ID
      // The to email is set on Formspree dashboard to zubaircs1993@gmail.com
      const res = await fetch('https://formspree.io/f/xjkrpwqd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Booking Request — ${formData.service} in ${location}`,
          _replyto: formData.email,
          to: 'zubaircs1993@gmail.com',
        }),
      });

      if (res.ok) {
        setStatus('success');
        // Store in localStorage as well
        const submissions = JSON.parse(localStorage.getItem('booking_submissions') || '[]');
        submissions.push({ ...formData, submittedAt: new Date().toISOString() });
        localStorage.setItem('booking_submissions', JSON.stringify(submissions));
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const UAE_LOCATIONS = [
    'Dubai Marina', 'Downtown Dubai', 'JVC Dubai', 'JLT Dubai', 'Palm Jumeirah',
    'Jumeirah 1-3', 'Mirdif', 'Deira', 'Bur Dubai', 'Abu Dhabi City',
    'Al Reem Island', 'Khalidiyah', 'Saadiyat Island', 'Sharjah City',
    'Al Nahda Sharjah', 'Ajman City', 'Ras Al Khaimah', 'Fujairah',
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Book a service"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-slide-in-up">

        {/* Glassmorphism background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(28,82,151,0.95) 0%, rgba(14,165,233,0.92) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />

        {/* Content */}
        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Quick Booking</p>
              <h2 className="text-2xl font-extrabold text-white leading-tight">
                Book {serviceName}
              </h2>
              <p className="mt-1 text-sm text-blue-100">
                Confirmed within 15 minutes. No payment upfront.
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close booking form"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all ml-4"
            >
              ✕
            </button>
          </div>

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-400/20 text-4xl">
                ✅
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">Booking Received!</h3>
              <p className="text-blue-100 text-sm">
                Our team will confirm your {serviceName} appointment within 15 minutes.
                Check your email for details.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-blue-700 hover:scale-105 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="bm-name" className="block text-xs font-semibold text-blue-100 mb-1.5">
                  Full Name *
                </label>
                <input
                  id="bm-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Ahmed Al Rashidi"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:bg-white/15 transition-all"
                />
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="bm-phone" className="block text-xs font-semibold text-blue-100 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="bm-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="bm-email" className="block text-xs font-semibold text-blue-100 mb-1.5">
                    Email
                  </label>
                  <input
                    id="bm-email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label htmlFor="bm-service" className="block text-xs font-semibold text-blue-100 mb-1.5">
                  Service Required *
                </label>
                <input
                  id="bm-service"
                  name="service"
                  type="text"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                />
              </div>

              {/* Date — optional, full width */}
              <div>
                <label htmlFor="bm-date" className="block text-xs font-semibold text-blue-100 mb-1.5">
                  Preferred Date <span className="text-blue-300 font-normal">(optional)</span>
                </label>
                <input
                  id="bm-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="bm-notes" className="block text-xs font-semibold text-blue-100 mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  id="bm-notes"
                  name="notes"
                  rows={3}
                  placeholder="Tell us more about what you need..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-300 text-xs text-center">
                  Something went wrong. Please try WhatsApp or call us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                id="booking-modal-submit"
                className="w-full rounded-xl bg-white py-3.5 text-sm font-extrabold text-blue-700 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {status === 'submitting' ? 'Sending...' : 'Confirm Booking Request →'}
              </button>

              <p className="text-center text-xs text-blue-200">
                🔒 No credit card required · We confirm within 15 minutes
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
