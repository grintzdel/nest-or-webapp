"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetPizzaById } from "@nest-or-front/modules/pizza/react/hooks/query/use-get-pizza-by-id";
import { useUpdatePizza } from "@nest-or-front/modules/pizza/react/hooks/mutation/use-update-pizza";
import { useDeletePizza } from "@nest-or-front/modules/pizza/react/hooks/mutation/use-delete-pizza";
import { PizzaForm } from "@nest-or-front/modules/pizza/react/components/pizza-form";
import { DetailSkeleton } from "@nest-or-front/modules/shared/react/components/skeleton";
import { ConfirmDialog } from "@nest-or-front/modules/shared/react/components/confirm-dialog";
import { useToast } from "@nest-or-front/modules/shared/react/components/toast";

type PizzaDetailProps = {
  id: number;
};

export const PizzaDetail: React.FC<PizzaDetailProps> = ({ id }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: pizza, isLoading } = useGetPizzaById(id);
  const updateMutation = useUpdatePizza();
  const deleteMutation = useDeletePizza();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (!pizza) return <p className="text-[var(--muted)]">Pizza introuvable.</p>;

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        showToast("Pizza supprimee.", "success");
        router.push("/pizzas");
      },
    });
  };

  return (
    <div>
      {isEditing ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8">
          <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">Modifier la pizza</h2>
          <PizzaForm
            initialData={pizza}
            isPending={updateMutation.isPending}
            onSubmit={(data) => {
              updateMutation.mutate(
                { id, data },
                {
                  onSuccess: () => {
                    setIsEditing(false);
                    showToast("Pizza modifiee !", "success");
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
          <div className="flex h-32 items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500">
            <span className="text-6xl">{"\uD83C\uDF55"}</span>
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between">
              <h2 className="text-3xl font-extrabold text-[var(--foreground)]">{pizza.name}</h2>
              <span
                className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                  pizza.available ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                }`}
              >
                {pizza.available ? "Disponible" : "Indisponible"}
              </span>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-[var(--accent)]">
              {pizza.price.toFixed(2)} &euro;
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-[var(--muted)]">Ingredients</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {pizza.ingredients.map((ingredient) => (
                  <span key={ingredient} className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                    {ingredient}
                  </span>
                ))}
              </div>
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
        title="Supprimer la pizza"
        message={`Voulez-vous vraiment supprimer "${pizza.name}" ?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
