import Link from 'next/link';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-white dark:bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            className="group flex items-start gap-4 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-sm transition-all"
          >
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${action.color}`}
            >
              {action.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                {action.title}
              </h3>
              <p className="text-xs text-[var(--muted)]">{action.description}</p>
            </div>

            <div className="flex-shrink-0 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
