'use client';

import { useState } from 'react';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    firmName: '',
    designation: '',
    attendeeType: '',
    message: '',
    terms: false,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit registration');
      }

      setStatus('success');
      setMessage('Registration successful! Check your email for confirmation.');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        firmName: '',
        designation: '',
        attendeeType: '',
        message: '',
        terms: false,
      });

      // Reset success message after 10 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 10000);
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');

      // Reset error after 8 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 8000);
    }
  };

  return (
    <>
      {status === 'success' && message && (
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-green-500/30 bg-green-500/10 px-5 py-4">
          <svg className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-[15px] font-semibold text-green-400">Success!</p>
            <p className="mt-1 text-[14px] text-green-300">{message}</p>
          </div>
        </div>
      )}

      {status === 'error' && message && (
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-4">
          <svg className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-[15px] font-semibold text-red-400">Error</p>
            <p className="mt-1 text-[14px] text-red-300">{message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              disabled={status === 'sending'}
              className="field-input mt-2"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              disabled={status === 'sending'}
              className="field-input mt-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'sending'}
            className="field-input mt-2"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            disabled={status === 'sending'}
            className="field-input mt-2"
          />
        </div>

        <div>
          <label htmlFor="firmName" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
            Firm/Organization
          </label>
          <input
            type="text"
            id="firmName"
            name="firmName"
            value={formData.firmName}
            onChange={handleChange}
            disabled={status === 'sending'}
            className="field-input mt-2"
          />
        </div>

        <div>
          <label htmlFor="designation" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            disabled={status === 'sending'}
            className="field-input mt-2"
          />
        </div>

        <div>
          <label htmlFor="attendeeType" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
            I am registering as *
          </label>
          <select
            id="attendeeType"
            name="attendeeType"
            required
            value={formData.attendeeType}
            onChange={handleChange}
            disabled={status === 'sending'}
            className="field-input mt-2"
          >
            <option value="">Select type</option>
            <option value="architect">Architect</option>
            <option value="interior-designer">Interior Designer</option>
            <option value="student">Student</option>
            <option value="brand-representative">Brand Representative</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-[13px] font-semibold uppercase tracking-wider text-slate">
            Any questions or special requirements?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            disabled={status === 'sending'}
            className="field-input mt-2"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            checked={formData.terms}
            onChange={handleChange}
            disabled={status === 'sending'}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-[14px] text-mist">
            I agree to receive updates about Design Dialect and future LA Media events
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-fill w-full text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Submitting...' : 'Complete Registration'}
        </button>

        <p className="text-center text-[13px] text-slate">
          Registration confirmation will be sent to your email within 24 hours
        </p>
      </form>
    </>
  );
}
