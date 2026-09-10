'use client';

import { useEffect, useState } from 'react';

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  firmName: string | null;
  designation: string | null;
  coaNumber: string | null;
  gstNumber: string | null;
  heardAbout: string | null;
  handled: boolean;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'handled' | 'pending'>('all');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/admin/registrations');
      const data = await response.json();
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsHandled = async (id: string, handled: boolean) => {
    try {
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handled }),
      });

      if (response.ok) {
        fetchRegistrations();
      }
    } catch (error) {
      console.error('Error updating registration:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Firm', 'Designation', 'COA', 'GST', 'Heard About', 'Date', 'Handled'];
    const rows = filteredRegistrations.map(r => [
      `${r.firstName} ${r.lastName}`,
      r.email,
      r.phone,
      r.firmName || '',
      r.designation || '',
      r.coaNumber || '',
      r.gstNumber || '',
      r.heardAbout || '',
      new Date(r.createdAt).toLocaleDateString(),
      r.handled ? 'Yes' : 'No',
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredRegistrations = registrations.filter(r => {
    if (filter === 'handled') return r.handled;
    if (filter === 'pending') return !r.handled;
    return true;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="text-copper">Loading registrations...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Event Registrations</h1>
            <p className="mt-2 text-mist">Total: {registrations.length} registrations</p>
          </div>
          <button
            onClick={exportToCSV}
            className="rounded-lg bg-copper px-6 py-3 font-semibold text-white transition-colors hover:bg-copper-soft"
          >
            📥 Export to CSV
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-6 py-2 font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-copper text-white'
                : 'bg-navy-2 text-mist hover:text-white'
            }`}
          >
            All ({registrations.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`rounded-lg px-6 py-2 font-semibold transition-colors ${
              filter === 'pending'
                ? 'bg-copper text-white'
                : 'bg-navy-2 text-mist hover:text-white'
            }`}
          >
            Pending ({registrations.filter(r => !r.handled).length})
          </button>
          <button
            onClick={() => setFilter('handled')}
            className={`rounded-lg px-6 py-2 font-semibold transition-colors ${
              filter === 'handled'
                ? 'bg-copper text-white'
                : 'bg-navy-2 text-mist hover:text-white'
            }`}
          >
            Handled ({registrations.filter(r => r.handled).length})
          </button>
        </div>

        {/* Registrations List */}
        <div className="space-y-4">
          {filteredRegistrations.length === 0 ? (
            <div className="rounded-lg border border-hairline bg-navy-2 p-12 text-center">
              <p className="text-mist">No registrations found</p>
            </div>
          ) : (
            filteredRegistrations.map((reg) => (
              <div
                key={reg.id}
                className="rounded-lg border border-hairline bg-navy-2 p-6 transition-all hover:border-copper"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-4 flex items-center gap-4">
                      <h3 className="text-xl font-bold text-white">
                        {reg.firstName} {reg.lastName}
                      </h3>
                      {reg.handled ? (
                        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                          ✓ Handled
                        </span>
                      ) : (
                        <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">
                          ⏳ Pending
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                          Email
                        </p>
                        <p className="mt-1 text-sm text-copper">{reg.email}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                          Phone
                        </p>
                        <p className="mt-1 text-sm text-mist">{reg.phone}</p>
                      </div>
                      {reg.firmName && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                            Firm
                          </p>
                          <p className="mt-1 text-sm text-mist">{reg.firmName}</p>
                        </div>
                      )}
                      {reg.designation && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                            Designation
                          </p>
                          <p className="mt-1 text-sm text-mist">{reg.designation}</p>
                        </div>
                      )}
                      {reg.coaNumber && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                            COA Number
                          </p>
                          <p className="mt-1 text-sm text-mist">{reg.coaNumber}</p>
                        </div>
                      )}
                      {reg.gstNumber && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                            GST Number
                          </p>
                          <p className="mt-1 text-sm text-mist">{reg.gstNumber}</p>
                        </div>
                      )}
                      {reg.heardAbout && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                            Heard About
                          </p>
                          <p className="mt-1 text-sm text-mist">{reg.heardAbout}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                          Registered
                        </p>
                        <p className="mt-1 text-sm text-mist">
                          {new Date(reg.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col gap-2">
                    {!reg.handled ? (
                      <button
                        onClick={() => markAsHandled(reg.id, true)}
                        className="whitespace-nowrap rounded-lg bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400 transition-colors hover:bg-green-500/30"
                      >
                        ✓ Mark as Handled
                      </button>
                    ) : (
                      <button
                        onClick={() => markAsHandled(reg.id, false)}
                        className="whitespace-nowrap rounded-lg bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400 transition-colors hover:bg-yellow-500/30"
                      >
                        ⏳ Mark as Pending
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
