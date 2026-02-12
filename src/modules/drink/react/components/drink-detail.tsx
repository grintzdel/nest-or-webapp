"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetDrinkById } from "@nest-or-front/modules/drink/react/hooks/query/use-get-drink-by-id";
import { useUpdateDrink } from "@nest-or-front/modules/drink/react/hooks/mutation/use-update-drink";
import { useDeleteDrink } from "@nest-or-front/modules/drink/react/hooks/mutation/use-delete-drink";
import { DrinkForm } from "@nest-or-front/modules/drink/react/components/drink-form";
import { DetailSkeleton } from "@nest-or-front/modules/shared/react/components/skeleton";
import { ConfirmDialog } from "@nest-or-front/modules/shared/react/components/confirm-dialog";
import { useToast } from "@nest-or-front/modules/shared/react/components/toast";

type DrinkDetailProps = {
  id: number;
};

export const DrinkDetail: React.FC<DrinkDetailProps> = ({ id }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: drink, isLoading } = useGetDrinkById(id);
  const updateMutation = useUpdateDrink();
  const deleteMutation = useDeleteDrink();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (!drink) return <p className="text-[var(--muted)]">Boisson introuvable.</p>;

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        showToast("Boisson supprimee.", "success");
        router.push("/drinks");
      },
    });
  };

  return (
    <div>
      {isEditing ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">Modifier la boisson</h2>
          <DrinkForm
            initialData={drink}
            isPending={updateMutation.isPending}
            onSubmit={(data) => {
              updateMutation.mutate(
                { id, data },
                {
                  onSuccess: () => {
                    setIsEditing(false);
                    showToast("Boisson modifiee !", "success");
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
          <div className="flex h-32 items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500">
            <span className="text-6xl">{"\uD83E\uDDCB"}</span>
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between">
              <h2 className="text-3xl font-extrabold text-[var(--foreground)]">{drink.name}</h2>
              <span
                className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                  drink.available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                }`}
              >
                {drink.available ? "Disponible" : "Indisponible"}
              </span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-[var(--accent)]">
              {drink.price.toFixed(2)} &euro;
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600">
                {drink.size}
              </span>
              <span className={`rounded-md px-3 py-1.5 text-sm font-medium ${drink.withAlcohol ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
                {drink.withAlcohol ? "Avec alcool" : "Sans alcool"}
              </span>
            </div>
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
        title="Supprimer la boisson"
        message={`Voulez-vous vraiment supprimer "${drink.name}" ?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
