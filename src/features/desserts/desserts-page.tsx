"use client";

import { useState } from "react";
import { useListDesserts } from "@nest-or-front/modules/dessert/react/hooks/query/use-list-desserts";
import { useFilterDesserts } from "@nest-or-front/modules/dessert/react/hooks/query/use-filter-desserts";
import { useDeleteDessert } from "@nest-or-front/modules/dessert/react/hooks/mutation/use-delete-dessert";
import { useCreateDessert } from "@nest-or-front/modules/dessert/react/hooks/mutation/use-create-dessert";
import { DessertList } from "@nest-or-front/modules/dessert/react/components/dessert-list";
import { DessertForm } from "@nest-or-front/modules/dessert/react/components/dessert-form";
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

export function DessertsPage() {
  const { showToast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [filterName, setFilterName] = useState("");
  const [filterAvailable, setFilterAvailable] = useState<TriState>("all");

  const filters = {
    name: filterName || undefined,
    available: triStateToBoolean(filterAvailable),
  };

  const hasFilters = Object.values(filters).some((v) => v !== undefined);

  const listQuery = useListDesserts();
  const filterQuery = useFilterDesserts(filters);
  const deleteMutation = useDeleteDessert();
  const createMutation = useCreateDessert();

  const desserts = hasFilters ? filterQuery.data : listQuery.data;
  const isLoading = hasFilters ? filterQuery.isLoading : listQuery.isLoading;

  const dessertToDelete = desserts?.find((d) => d.id === deleteId);

  function clearFilters() {
    setFilterName("");
    setFilterAvailable("all");
  }

  return (
    <div>
      <PageHeader title="Desserts">
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          {showCreate ? "Fermer" : "\uD83C\uDF70 Nouveau dessert"}
        </button>
      </PageHeader>

      {showCreate && (
        <div className="mb-6 rounded-2xl border border-[var(--border)] bg-white p-6" style={{ animation: "slideDown 0.3s ease-out" }}>
          <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">Creer un dessert</h2>
          <DessertForm
            isPending={createMutation.isPending}
            onSubmit={(data) => {
              createMutation.mutate(data, {
                onSuccess: () => {
                  setShowCreate(false);
                  showToast("Dessert cree !", "success");
                },
              });
            }}
          />
        </div>
      )}

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
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Nom"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
          />
          <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-white p-1">
            {(["all", "yes", "no"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setFilterAvailable(val)}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterAvailable === val
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {val === "all" ? "Tous" : val === "yes" ? "Dispo" : "Indispo"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? <CardGridSkeleton /> : <DessertList desserts={desserts ?? []} onDelete={setDeleteId} />}

      <ConfirmDialog
        open={deleteId !== null}
        title="Supprimer le dessert"
        message={`Voulez-vous vraiment supprimer "${dessertToDelete?.name}" ?`}
        onConfirm={() => {
          if (deleteId !== null) {
            deleteMutation.mutate(deleteId, {
              onSuccess: () => {
                setDeleteId(null);
                showToast("Dessert supprime.", "success");
              },
            });
          }
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
