interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon?: React.ReactNode;
  description?: string;
}

export function StatsCard({ title, value, change, icon, description }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--muted)] mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-[var(--foreground)] mb-2">{value}</h3>
          {description && (
            <p className="text-xs text-[var(--muted)]">{description}</p>
          )}
        </div>
        {icon && (
          <div className="ml-4 text-[var(--accent)] opacity-80">
            {icon}
          </div>
        )}
      </div>

      {change && (
        <div className="mt-4 flex items-center">
          <span
            className={`inline-flex items-center text-sm font-medium ${
              change.trend === 'up'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {change.trend === 'up' ? '↑' : '↓'}
            <span className="ml-1">{Math.abs(change.value)}%</span>
          </span>
          <span className="ml-2 text-sm text-[var(--muted)]">vs last period</span>
        </div>
      )}
    </div>
  );
}
