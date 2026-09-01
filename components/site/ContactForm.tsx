'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Posts to /api/contacts, which middleware leaves open to unauthenticated
 * POST by design (it is a public form). Everything else on /api requires a
 * session.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again, or email us directly.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-t-2 border-ink pt-6">
        <p className="grotesk-tight text-[clamp(1.2rem,2.2vw,1.7rem)]">
          Thank you - message received.
        </p>
        <p className="mt-3 max-w-[40ch] text-ink-soft">
          We read everything that comes in and will reply as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="ref mt-6 border-b border-ink/20 pb-1.5 hover:border-brass"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border-t-2 border-ink pt-6">
      <p className="ref mb-6 text-slate">Enquiry</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="ref text-slate">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-[16px] outline-none focus:border-brass"
          />
        </label>

        <label className="block">
          <span className="ref text-slate">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-[16px] outline-none focus:border-brass"
          />
        </label>

        <label className="block">
          <span className="ref text-slate">Phone (optional)</span>
          <input
            name="phone"
            autoComplete="tel"
            className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-[16px] outline-none focus:border-brass"
          />
        </label>

        <label className="block">
          <span className="ref text-slate">Organisation (optional)</span>
          <input
            name="company"
            autoComplete="organization"
            className="mt-2 w-full border-b border-ink/25 bg-transparent py-2.5 text-[16px] outline-none focus:border-brass"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="ref text-slate">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y border-b border-ink/25 bg-transparent py-2.5 text-[16px] outline-none focus:border-brass"
        />
      </label>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-[15px] text-brass">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="ref mt-7 rounded-full bg-ink px-7 py-3.5 text-plaster transition-colors duration-300 hover:bg-brass disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
