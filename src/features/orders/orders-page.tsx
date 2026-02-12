"use client";

import { useState } from "react";
import Link from "next/link";
import { useListOrders } from "@nest-or-front/modules/order/react/hooks/query/use-list-orders";
import { useFilterOrders } from "@nest-or-front/modules/order/react/hooks/query/use-filter-orders";
import { useDeleteOrder } from "@nest-or-front/modules/order/react/hooks/mutation/use-delete-order";
import { OrderList } from "@nest-or-front/modules/order/react/components/order-list";
import { PageHeader } from "@nest-or-front/modules/shared/react/components/page-header";
import { CardGridSkeleton } from "@nest-or-front/modules/shared/react/components/skeleton";
import { ConfirmDialog } from "@nest-or-front/modules/shared/react/components/confirm-dialog";
import { useToast } from "@nest-or-front/modules/shared/react/components/toast";

type TriState = "all" | "yes" | "no";

function triStateToBoolean(value: TriState): boolean | undefined {
  if (value === "yes") return true;
  if (value === "no") return false;
  return undefined;
}

export function OrdersPage() {
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [filterProcessed, setFilterProcessed] = useState<TriState>("all");

  const filters = {
    processed: triStateToBoolean(filterProcessed),
  };

  const hasFilters = Object.values(filters).some((v) => v !== undefined);

  const listQuery = useListOrders();
  const filterQuery = useFilterOrders(filters);
  const deleteMutation = useDeleteOrder();

  const orders = hasFilters ? filterQuery.data : listQuery.data;
  const isLoading = hasFilters ? filterQuery.isLoading : listQuery.isLoading;

  function clearFilters() {
    setFilterProcessed("all");
  }

  return (
    <div>
      <PageHeader title="Commandes">
        <Link
          href="/orders/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          {"\uD83D\uDCCB"} Nouvelle commande
        </Link>
      </PageHeader>

      <div className="mb-6 rounded-2xl border border-[var(--border)] bg-white p-4" style={{ animation: "slideDown 0.3s ease-out" }}>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" /><line x1="18" x2="22" y1="16" y2="16" /></svg>
            Filtres
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs text-[var(--accent)] hover:underline">
              Effacer les filtres
            </button>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-white p-1">
            {(["all", "yes", "no"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setFilterProcessed(val)}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterProcessed === val
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {val === "all" ? "Toutes" : val === "yes" ? "Traitees" : "Non traitees"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? <CardGridSkeleton /> : <OrderList orders={orders ?? []} onDelete={setDeleteId} />}

      <ConfirmDialog
        open={deleteId !== null}
        title="Supprimer la commande"
        message={`Voulez-vous vraiment supprimer la commande #${deleteId} ?`}
        onConfirm={() => {
          if (deleteId !== null) {
            deleteMutation.mutate(deleteId, {
              onSuccess: () => {
                setDeleteId(null);
                showToast("Commande supprimee.", "success");
              },
            });
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
