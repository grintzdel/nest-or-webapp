export const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--accent)]" />
    <p className="mt-3 text-sm text-[var(--muted)]">Chargement...</p>
  </div>
);
