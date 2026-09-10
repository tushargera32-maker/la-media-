'use client';

import { useEffect, useState } from 'react';

interface VisitorStats {
  stats: {
    total: number;
    today: number;
    thisWeek: number;
  };
  recentVisitors: Array<{
    id: string;
    device: string;
    browser: string;
    os: string;
    landingPage: string;
    visitCount: number;
    lastVisitedAt: string;
    createdAt: string;
  }>;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  deviceStats: Array<{
    device: string;
    count: number;
  }>;
  browserStats: Array<{
    browser: string;
    count: number;
  }>;
}

export default function VisitorAnalyticsPage() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/visitor-stats');
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
        <div className="text-copper">Loading visitor stats...</div>
      </div>
    );
  }

  if (!stats || !stats.stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy">
        <div className="text-red-500">Failed to load stats or no data available yet</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-white mb-8">Site Visitor Analytics</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-navy-2 border border-hairline rounded-lg p-6">
            <p className="text-sm text-slate uppercase tracking-wider">Total Visitors</p>
            <p className="text-4xl font-bold text-copper mt-2">{stats.stats?.total || 0}</p>
          </div>
          <div className="bg-navy-2 border border-hairline rounded-lg p-6">
            <p className="text-sm text-slate uppercase tracking-wider">Today</p>
            <p className="text-4xl font-bold text-copper mt-2">{stats.stats?.today || 0}</p>
          </div>
          <div className="bg-navy-2 border border-hairline rounded-lg p-6">
            <p className="text-sm text-slate uppercase tracking-wider">This Week</p>
            <p className="text-4xl font-bold text-copper mt-2">{stats.stats?.thisWeek || 0}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Device Stats */}
          <div className="bg-navy-2 border border-hairline rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Device Breakdown</h2>
            <div className="space-y-3">
              {stats.deviceStats && stats.deviceStats.length > 0 ? (
                stats.deviceStats.map((device) => (
                  <div key={device.device} className="flex justify-between items-center">
                    <span className="text-mist capitalize">{device.device}</span>
                    <span className="text-copper font-bold">{device.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-mist text-sm">No device data yet</p>
              )}
            </div>
          </div>

          {/* Browser Stats */}
          <div className="bg-navy-2 border border-hairline rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Browser Breakdown</h2>
            <div className="space-y-3">
              {stats.browserStats && stats.browserStats.length > 0 ? (
                stats.browserStats.map((browser) => (
                  <div key={browser.browser} className="flex justify-between items-center">
                    <span className="text-mist">{browser.browser}</span>
                    <span className="text-copper font-bold">{browser.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-mist text-sm">No browser data yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-navy-2 border border-hairline rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Most Viewed Pages</h2>
          <div className="space-y-3">
            {stats.topPages && stats.topPages.length > 0 ? (
              stats.topPages.map((page) => (
                <div key={page.path} className="flex justify-between items-center">
                  <span className="text-mist font-mono text-sm">{page.path}</span>
                  <span className="text-copper font-bold">{page.views} views</span>
                </div>
              ))
            ) : (
              <p className="text-mist text-sm">No page view data yet</p>
            )}
          </div>
        </div>

        {/* Recent Visitors */}
        <div className="bg-navy-2 border border-hairline rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Visitors (Last 50)</h2>
          {stats.recentVisitors && stats.recentVisitors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="text-left py-3 px-2 text-slate font-semibold">Device</th>
                    <th className="text-left py-3 px-2 text-slate font-semibold">Browser</th>
                    <th className="text-left py-3 px-2 text-slate font-semibold">OS</th>
                    <th className="text-left py-3 px-2 text-slate font-semibold">Landing Page</th>
                    <th className="text-left py-3 px-2 text-slate font-semibold">Visits</th>
                    <th className="text-left py-3 px-2 text-slate font-semibold">Last Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentVisitors.map((visitor) => (
                    <tr key={visitor.id} className="border-b border-hairline/50">
                      <td className="py-3 px-2 text-mist capitalize">{visitor.device}</td>
                      <td className="py-3 px-2 text-mist">{visitor.browser}</td>
                      <td className="py-3 px-2 text-mist">{visitor.os}</td>
                      <td className="py-3 px-2 text-mist font-mono text-xs">{visitor.landingPage}</td>
                      <td className="py-3 px-2 text-copper font-bold">{visitor.visitCount}</td>
                      <td className="py-3 px-2 text-mist text-xs">
                        {new Date(visitor.lastVisitedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-mist text-sm">No visitors yet. Visit the site to start tracking!</p>
          )}
        </div>
      </div>
    </div>
  );
}
