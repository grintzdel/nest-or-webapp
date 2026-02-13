"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetOrderById } from "@nest-or-front/modules/order/react/hooks/query/use-get-order-by-id";
import { useUpdateOrderProcessed } from "@nest-or-front/modules/order/react/hooks/mutation/use-update-order-processed";
import { useDeleteOrder } from "@nest-or-front/modules/order/react/hooks/mutation/use-delete-order";
import { DetailSkeleton } from "@nest-or-front/modules/shared/react/components/skeleton";
import { ConfirmDialog } from "@nest-or-front/modules/shared/react/components/confirm-dialog";
import { useToast } from "@nest-or-front/modules/shared/react/components/toast";

type OrderDetailProps = {
  id: number;
};

export const OrderDetail: React.FC<OrderDetailProps> = ({ id }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: order, isLoading } = useGetOrderById(id);
  const processedMutation = useUpdateOrderProcessed();
  const deleteMutation = useDeleteOrder();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (!order) return <p className="text-[var(--muted)]">Commande introuvable.</p>;

  const handleToggleProcessed = () => {
    processedMutation.mutate(
      { id, data: { processed: !order.processed } },
      {
        onSuccess: () => {
          showToast(
            order.processed ? "Commande remise en attente." : "Commande marquee comme traitee !",
            "success"
          );
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        showToast("Commande supprimee.", "success");
        router.push("/orders");
      },
    });
  };

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500">
          <span className="text-6xl">{"\uD83D\uDCCB"}</span>
        </div>
        <div className="p-8">
          <div className="flex items-start justify-between">
            <h2 className="text-3xl font-extrabold text-[var(--foreground)]">Commande #{order.id}</h2>
            <span
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                order.processed
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {order.processed ? "Traitee" : "En attente"}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-3">
            <p className="text-3xl font-extrabold text-[var(--accent)]">
              {order.totalPrice.toFixed(2)} &euro;
            </p>
            {order.discountAmount > 0 && (
              <>
                <p className="text-lg text-[var(--muted)] line-through">
                  {(order.totalPrice + order.discountAmount).toFixed(2)} &euro;
                </p>
                <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  -{Math.round(order.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-3 text-sm text-[var(--muted)]">
            Creee le{" "}
            {new Date(order.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
                <span>{"\uD83C\uDF55"}</span> Pizzas ({order.pizzas.length})
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {order.pizzas.map((pizzaId, i) => (
                  <span key={i} className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
                    Pizza #{pizzaId}
                  </span>
                ))}
                {order.pizzas.length === 0 && <span className="text-sm text-[var(--muted)]">Aucune</span>}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
                <span>{"\uD83E\uDDCB"}</span> Boissons ({order.drinks.length})
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {order.drinks.map((drinkId, i) => (
                  <span key={i} className="rounded-md bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-600">
                    Boisson #{drinkId}
                  </span>
                ))}
                {order.drinks.length === 0 && <span className="text-sm text-[var(--muted)]">Aucune</span>}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-[var(--muted)]">
                <span>{"\uD83C\uDF70"}</span> Desserts ({order.desserts.length})
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {order.desserts.map((dessertId, i) => (
                  <span key={i} className="rounded-md bg-pink-50 px-3 py-1 text-sm font-medium text-pink-600">
                    Dessert #{dessertId}
                  </span>
                ))}
                {order.desserts.length === 0 && <span className="text-sm text-[var(--muted)]">Aucun</span>}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3 border-t border-[var(--border)] pt-6">
            <button
              onClick={handleToggleProcessed}
              disabled={processedMutation.isPending}
              className={`rounded-lg border px-5 py-2.5 text-sm font-medium disabled:opacity-50 ${
                order.processed
                  ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                  : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              {order.processed ? "Remettre en attente" : "Marquer comme traitee"}
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

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Supprimer la commande"
        message={`Voulez-vous vraiment supprimer la commande #${order.id} ?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
