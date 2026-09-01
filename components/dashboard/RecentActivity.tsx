interface ActivityItem {
  id: string;
  type: 'event' | 'blog' | 'contact' | 'team' | 'partner';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  maxItems?: number;
}

const activityIcons = {
  event: '📅',
  blog: '📝',
  contact: '✉️',
  team: '👥',
  partner: '🤝',
};

const activityColors = {
  event: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  blog: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  contact: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  team: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  partner: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
};

export function RecentActivity({ activities, maxItems = 10 }: RecentActivityProps) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <div className="bg-white dark:bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Recent Activity</h2>

      <div className="space-y-4">
        {displayActivities.length === 0 ? (
          <p className="text-sm text-[var(--muted)] py-8 text-center">
            No recent activity to display
          </p>
        ) : (
          displayActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 border-b border-[var(--border)] last:border-0 last:pb-0"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  activityColors[activity.type]
                }`}
              >
                {activityIcons[activity.type]}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                  {activity.title}
                </h3>
                <p className="text-sm text-[var(--muted)] mb-1">
                  {activity.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                  <span>{activity.timestamp}</span>
                  {activity.user && (
                    <>
                      <span>•</span>
                      <span>by {activity.user}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
