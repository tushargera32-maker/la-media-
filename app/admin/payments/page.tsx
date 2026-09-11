'use client';

import { useEffect, useState } from 'react';

interface Payment {
  id: string;
  cfOrderId: string;
  cfPaymentId: string | null;
  amount: number;
  currency: string;
  status: string;
  purpose: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'paid' | 'created' | 'failed'>('all');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/admin/payments');
        const data = await response.json();
        setPayments(data.payments || []);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = payments.filter((p) => filter === 'all' || p.status === filter);
  const paidTotal = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  if (loading) {
    return <div className="p-8 text-gray-500">Loading payments…</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Paid consultations via Cashfree · Collected: ₹{paidTotal.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex gap-2">
          {(['all', 'paid', 'created', 'failed'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                filter === f ? 'bg-copper text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-hairline bg-navy-2 p-12 text-center">
          <p className="text-mist">No payments yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-black/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-xs uppercase tracking-wider text-gray-500">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Cashfree payment</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-black/5 last:border-0">
                  <td className="whitespace-nowrap px-4 py-3">
                    {new Date(p.createdAt).toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">
                    {p.email}
                    <br />
                    <span className="text-gray-500">{p.phone}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold">
                    ₹{p.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold uppercase ${
                        p.status === 'paid'
                          ? 'bg-green-500/20 text-green-700'
                          : p.status === 'failed'
                            ? 'bg-red-500/20 text-red-700'
                            : 'bg-yellow-500/20 text-yellow-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    {p.cfPaymentId || p.cfOrderId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
