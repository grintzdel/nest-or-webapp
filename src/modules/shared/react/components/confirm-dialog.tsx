"use client";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      style={{ animation: "fadeInUp 0.15s ease-out" }}
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        style={{ animation: "scaleIn 0.2s ease-out" }}
      >
        <div className="mb-3 text-3xl">{"\u26A0\uFE0F"}</div>
        <h3 className="text-xl font-bold text-[var(--foreground)]">{title}</h3>
        <p className="mt-2 text-[var(--muted)]">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};
