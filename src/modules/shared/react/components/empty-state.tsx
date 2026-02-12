type EmptyStateProps = {
  icon: string;
  title: string;
  description: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <span className="text-6xl">{icon}</span>
    <h3 className="mt-4 text-lg font-semibold text-[var(--foreground)]">{title}</h3>
    <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
  </div>
);
