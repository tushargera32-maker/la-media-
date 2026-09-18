'use client';

import { useEffect, useState } from 'react';

type RegType = 'general' | 'architect' | 'sponsor';

interface Row {
  id: string;
  type: RegType;
  title: string;
  email: string;
  phone: string;
  details: { label: string; value: string }[];
  handled: boolean;
  createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pick = (v: any): string => (v === null || v === undefined ? '' : String(v));

export default function RegistrationsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeTab, setTypeTab] = useState<'all' | RegType>('all');
  const [filter, setFilter] = useState<'all' | 'handled' | 'pending'>('all');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/admin/registrations');
      const data = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const general: Row[] = (data.general || []).map((r: any) => ({
        id: r.id,
        type: 'general' as RegType,
        title: `${pick(r.firstName)} ${pick(r.lastName)}`.trim() || pick(r.email),
        email: pick(r.email),
        phone: pick(r.phone),
        details: [
          r.firmName && { label: 'Firm', value: pick(r.firmName) },
          r.designation && { label: 'Designation', value: pick(r.designation) },
          r.coaNumber && { label: 'COA Number', value: pick(r.coaNumber) },
          r.gstNumber && { label: 'GST Number', value: pick(r.gstNumber) },
          r.heardAbout && { label: 'Heard About', value: pick(r.heardAbout) },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].filter(Boolean) as { label: string; value: string }[],
        handled: !!r.handled,
        createdAt: r.createdAt,
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const architects: Row[] = (data.architects || []).map((r: any) => ({
        id: r.id,
        type: 'architect' as RegType,
        title: `${pick(r.firstName)} ${pick(r.lastName)}`.trim() || pick(r.email),
        email: pick(r.email),
        phone: pick(r.phone),
        details: [
          r.firmName && { label: 'Firm', value: pick(r.firmName) },
          r.designation && { label: 'Designation', value: pick(r.designation) },
          r.coaNumber && { label: 'COA Number', value: pick(r.coaNumber) },
          r.heardAbout && { label: 'Heard About', value: pick(r.heardAbout) },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].filter(Boolean) as { label: string; value: string }[],
        handled: !!r.handled,
        createdAt: r.createdAt,
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sponsors: Row[] = (data.sponsors || []).map((r: any) => ({
        id: r.id,
        type: 'sponsor' as RegType,
        title: pick(r.companyName) || pick(r.contactName) || pick(r.email),
        email: pick(r.email),
        phone: pick(r.phone),
        details: [
          r.contactName && { label: 'Contact Person', value: pick(r.contactName) },
          r.stallSize && { label: 'Stall Size', value: pick(r.stallSize) },
          r.gstNumber && { label: 'GST Number', value: pick(r.gstNumber) },
          r.address && { label: 'Address', value: pick(r.address) },
          r.city && { label: 'City', value: pick(r.city) },
          r.state && { label: 'State', value: pick(r.state) },
          r.pincode && { label: 'Pincode', value: pick(r.pincode) },
          r.requirements && { label: 'Requirements', value: pick(r.requirements) },
          r.heardAbout && { label: 'Heard About', value: pick(r.heardAbout) },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ].filter(Boolean) as { label: string; value: string }[],
        handled: !!r.handled,
        createdAt: r.createdAt,
      }));

      setRows([...general, ...architects, ...sponsors]);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsHandled = async (row: Row, handled: boolean) => {
    try {
      const response = await fetch(`/api/admin/registrations/${row.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handled, type: row.type }),
      });

      if (response.ok) {
        fetchRegistrations();
      }
    } catch (error) {
      console.error('Error updating registration:', error);
    }
  };

  const filteredByType = rows.filter((r) => typeTab === 'all' || r.type === typeTab);
  const filteredRegistrations = filteredByType.filter((r) => {
    if (filter === 'handled') return r.handled;
    if (filter === 'pending') return !r.handled;
    return true;
  });

  const countBy = (t: RegType) => rows.filter((r) => r.type === t).length;

  const typeLabel = (t: RegType) =>
    t === 'architect' ? 'Architect' : t === 'sponsor' ? 'Sponsor' : 'General';

  const exportToCSV = () => {
    const headers = ['Type', 'Name', 'Email', 'Phone', 'Details', 'Date', 'Handled'];
    const csvRows = filteredRegistrations.map((r) => [
      typeLabel(r.type),
      `"${r.title.replace(/"/g, '""')}"`,
      r.email,
      r.phone,
      `"${r.details.map((d) => `${d.label}: ${d.value}`).join(' | ').replace(/"/g, '""')}"`,
      new Date(r.createdAt).toLocaleDateString(),
      r.handled ? 'Yes' : 'No',
    ]);

    const csv = [headers, ...csvRows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${typeTab}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="text-copper">Loading registrations...</div>
      </div>
    );
  }

  const tabBtn = (isActive: boolean) =>
    `rounded-lg px-6 py-2 font-semibold transition-colors ${
      isActive ? 'bg-copper text-white' : 'bg-navy-2 text-mist hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-navy p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Event Registrations</h1>
            <p className="mt-2 text-mist">Total: {rows.length} registrations</p>
          </div>
          <button
            onClick={exportToCSV}
            className="rounded-lg bg-copper px-6 py-3 font-semibold text-white transition-colors hover:bg-copper-soft"
          >
            📥 Export to CSV
          </button>
        </div>

        {/* Type Tabs */}
        <div className="mb-4 flex flex-wrap gap-4">
          <button onClick={() => setTypeTab('all')} className={tabBtn(typeTab === 'all')}>
            All ({rows.length})
          </button>
          <button onClick={() => setTypeTab('architect')} className={tabBtn(typeTab === 'architect')}>
            Architects ({countBy('architect')})
          </button>
          <button onClick={() => setTypeTab('sponsor')} className={tabBtn(typeTab === 'sponsor')}>
            Sponsors ({countBy('sponsor')})
          </button>
          <button onClick={() => setTypeTab('general')} className={tabBtn(typeTab === 'general')}>
            General ({countBy('general')})
          </button>
        </div>

        {/* Status Filter */}
        <div className="mb-6 flex flex-wrap gap-4">
          <button onClick={() => setFilter('all')} className={tabBtn(filter === 'all')}>
            All ({filteredByType.length})
          </button>
          <button onClick={() => setFilter('pending')} className={tabBtn(filter === 'pending')}>
            Pending ({filteredByType.filter((r) => !r.handled).length})
          </button>
          <button onClick={() => setFilter('handled')} className={tabBtn(filter === 'handled')}>
            Handled ({filteredByType.filter((r) => r.handled).length})
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
                key={`${reg.type}-${reg.id}`}
                className="rounded-lg border border-hairline bg-navy-2 p-6 transition-all hover:border-copper"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-4 flex flex-wrap items-center gap-4">
                      <h3 className="text-xl font-bold text-white">{reg.title}</h3>
                      <span className="rounded-full bg-copper/20 px-3 py-1 text-xs font-semibold text-copper">
                        {typeLabel(reg.type)}
                      </span>
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
                      {reg.details.map((d) => (
                        <div key={d.label}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate">
                            {d.label}
                          </p>
                          <p className="mt-1 text-sm text-mist">{d.value}</p>
                        </div>
                      ))}
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
                        onClick={() => markAsHandled(reg, true)}
                        className="whitespace-nowrap rounded-lg bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400 transition-colors hover:bg-green-500/30"
                      >
                        ✓ Mark as Handled
                      </button>
                    ) : (
                      <button
                        onClick={() => markAsHandled(reg, false)}
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
