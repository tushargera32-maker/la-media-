'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface FormStats {
  eventRegistrations: number;
  architectRegistrations: number;
  sponsorRegistrations: number;
  contactSubmissions: number;
  newsletterSubscribers: number;
  todayRegistrations: number;
  weekRegistrations: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<FormStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="text-copper">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <div className="text-sm text-slate">
            Auto-refreshing every 30 seconds
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Registrations"
            value={stats?.eventRegistrations || 0}
            icon="📋"
            color="copper"
            link="/admin/registrations"
          />
          <StatCard
            title="Architects"
            value={stats?.architectRegistrations || 0}
            icon="🏛️"
            color="blue"
            link="/admin/registrations/architects"
          />
          <StatCard
            title="Sponsors"
            value={stats?.sponsorRegistrations || 0}
            icon="🤝"
            color="green"
            link="/admin/registrations/sponsors"
          />
          <StatCard
            title="Newsletter"
            value={stats?.newsletterSubscribers || 0}
            icon="📧"
            color="purple"
            link="/admin/newsletter"
          />
        </div>

        {/* Recent Activity */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-hairline bg-navy-2 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Today</h2>
            <div className="text-4xl font-bold text-copper">
              {stats?.todayRegistrations || 0}
            </div>
            <p className="mt-2 text-sm text-mist">New registrations today</p>
          </div>

          <div className="rounded-lg border border-hairline bg-navy-2 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">This Week</h2>
            <div className="text-4xl font-bold text-copper">
              {stats?.weekRegistrations || 0}
            </div>
            <p className="mt-2 text-sm text-mist">Registrations this week</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-lg border border-hairline bg-navy-2 p-6">
          <h2 className="mb-6 text-xl font-bold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ActionButton
              href="/admin/registrations"
              title="View All Registrations"
              description="Manage event registrations"
              icon="📋"
            />
            <ActionButton
              href="/admin/contacts"
              title="Contact Messages"
              description={`${stats?.contactSubmissions || 0} messages`}
              icon="💬"
            />
            <ActionButton
              href="/admin/visitors"
              title="Site Analytics"
              description="Visitor tracking & stats"
              icon="📊"
            />
            <ActionButton
              href="/admin/newsletter"
              title="Newsletter Subscribers"
              description={`${stats?.newsletterSubscribers || 0} subscribers`}
              icon="📧"
            />
            <ActionButton
              href="/admin/export"
              title="Export Data"
              description="Download as CSV/Excel"
              icon="📥"
            />
            <ActionButton
              href="/admin/settings"
              title="Email Settings"
              description="Configure notifications"
              icon="⚙️"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
  link,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
  link: string;
}) {
  const colorClasses: Record<string, string> = {
    copper: 'text-copper border-copper/20',
    blue: 'text-blue-400 border-blue-400/20',
    green: 'text-green-400 border-green-400/20',
    purple: 'text-purple-400 border-purple-400/20',
  };

  return (
    <Link href={link}>
      <div className="group cursor-pointer rounded-lg border border-hairline bg-navy-2 p-6 transition-all hover:border-copper">
        <div className="mb-4 text-3xl">{icon}</div>
        <div className="mb-2 text-sm text-slate">{title}</div>
        <div className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</div>
      </div>
    </Link>
  );
}

function ActionButton({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Link href={href}>
      <div className="group cursor-pointer rounded-lg border border-hairline bg-navy p-4 transition-all hover:border-copper">
        <div className="mb-3 text-2xl">{icon}</div>
        <h3 className="mb-1 font-semibold text-white group-hover:text-copper">
          {title}
        </h3>
        <p className="text-sm text-mist">{description}</p>
      </div>
    </Link>
  );
}
