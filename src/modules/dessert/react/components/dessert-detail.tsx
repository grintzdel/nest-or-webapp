"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetDessertById } from "@nest-or-front/modules/dessert/react/hooks/query/use-get-dessert-by-id";
import { useUpdateDessert } from "@nest-or-front/modules/dessert/react/hooks/mutation/use-update-dessert";
import { useDeleteDessert } from "@nest-or-front/modules/dessert/react/hooks/mutation/use-delete-dessert";
import { DessertForm } from "@nest-or-front/modules/dessert/react/components/dessert-form";
import { DetailSkeleton } from "@nest-or-front/modules/shared/react/components/skeleton";
import { ConfirmDialog } from "@nest-or-front/modules/shared/react/components/confirm-dialog";
import { useToast } from "@nest-or-front/modules/shared/react/components/toast";

type DessertDetailProps = {
  id: number;
};

export const DessertDetail: React.FC<DessertDetailProps> = ({ id }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: dessert, isLoading } = useGetDessertById(id);
  const updateMutation = useUpdateDessert();
  const deleteMutation = useDeleteDessert();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (!dessert) return <p className="text-[var(--muted)]">Dessert introuvable.</p>;

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        showToast("Dessert supprime.", "success");
        router.push("/desserts");
      },
    });
  };

  return (
    <div>
      {isEditing ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">Modifier le dessert</h2>
          <DessertForm
            initialData={dessert}
            isPending={updateMutation.isPending}
            onSubmit={(data) => {
              updateMutation.mutate(
                { id, data },
                {
                  onSuccess: () => {
                    setIsEditing(false);
                    showToast("Dessert modifie !", "success");
                  },
                }
              );
            }}
          />
          <button
            onClick={() => setIsEditing(false)}
            className="mt-3 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Annuler
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
          <div className="flex h-32 items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500">
            <span className="text-6xl">{"\uD83C\uDF70"}</span>
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between">
              <h2 className="text-3xl font-extrabold text-[var(--foreground)]">{dessert.name}</h2>
              <span
                className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                  dessert.available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                }`}
              >
                {dessert.available ? "Disponible" : "Indisponible"}
              </span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-[var(--accent)]">
              {dessert.price.toFixed(2)} &euro;
            </p>
            <div className="mt-8 flex gap-3 border-t border-[var(--border)] pt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-gray-50"
              >
                Modifier
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-lg px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Supprimer le dessert"
        message={`Voulez-vous vraiment supprimer "${dessert.name}" ?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
