"use client";

import { useState, useMemo } from "react";
import { useListPizzas } from "@nest-or-front/modules/pizza/react/hooks/query/use-list-pizzas";
import { useListDrinks } from "@nest-or-front/modules/drink/react/hooks/query/use-list-drinks";
import { useListDesserts } from "@nest-or-front/modules/dessert/react/hooks/query/use-list-desserts";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";
import { CardGridSkeleton } from "@nest-or-front/modules/shared/react/components/skeleton";

type OrderFormProps = {
  onSubmit: (data: OrderDomainModel.CreateOrderDto) => void;
  isPending?: boolean;
};

function getCount(list: number[], id: number) {
  return list.filter((i) => i === id).length;
}

function addItem(list: number[], id: number) {
  return [...list, id];
}

function removeItem(list: number[], id: number) {
  const idx = list.indexOf(id);
  if (idx === -1) return list;
  return [...list.slice(0, idx), ...list.slice(idx + 1)];
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isPending }) => {
  const { data: pizzas, isLoading: loadingPizzas } = useListPizzas();
  const { data: drinks, isLoading: loadingDrinks } = useListDrinks();
  const { data: desserts, isLoading: loadingDesserts } = useListDesserts();

  const [selectedPizzas, setSelectedPizzas] = useState<number[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<number[]>([]);
  const [selectedDesserts, setSelectedDesserts] = useState<number[]>([]);

  const isLoading = loadingPizzas || loadingDrinks || loadingDesserts;

  const total = useMemo(() => {
    let sum = 0;
    selectedPizzas.forEach((id) => {
      const p = pizzas?.find((x) => x.id === id);
      if (p) sum += p.price;
    });
    selectedDrinks.forEach((id) => {
      const d = drinks?.find((x) => x.id === id);
      if (d) sum += d.price;
    });
    selectedDesserts.forEach((id) => {
      const d = desserts?.find((x) => x.id === id);
      if (d) sum += d.price;
    });
    return sum;
  }, [selectedPizzas, selectedDrinks, selectedDesserts, pizzas, drinks, desserts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      pizzas: selectedPizzas,
      drinks: selectedDrinks,
      desserts: selectedDesserts,
    });
  };

  if (isLoading) return <CardGridSkeleton />;

  const itemCount = selectedPizzas.length + selectedDrinks.length + selectedDesserts.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-8" style={{ animation: "slideDown 0.3s ease-out" }}>
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
          <span>{"\uD83C\uDF55"}</span> Pizzas
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pizzas?.filter((p) => p.available).map((pizza) => {
            const count = getCount(selectedPizzas, pizza.id);
            return (
              <div
                key={pizza.id}
                className={`rounded-xl border-2 p-4 transition-all ${
                  count > 0
                    ? "border-[var(--accent)] bg-[var(--accent-light)] shadow-sm"
                    : "border-[var(--border)] bg-white"
                }`}
              >
                <p className="font-semibold text-[var(--foreground)]">{pizza.name}</p>
                <p className="mt-1 text-sm font-bold text-[var(--accent)]">{pizza.price.toFixed(2)} &euro;</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {pizza.ingredients.map((ingredient) => (
                    <span key={ingredient} className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                      {ingredient}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPizzas(removeItem(selectedPizzas, pizza.id))}
                    disabled={count === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-sm font-bold text-[var(--foreground)] hover:bg-gray-50 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="min-w-[1.5rem] text-center text-sm font-semibold text-[var(--foreground)]">{count}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPizzas(addItem(selectedPizzas, pizza.id))}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-sm font-bold text-white hover:opacity-90"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-8">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
          <span>{"\uD83E\uDDCB"}</span> Boissons
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {drinks?.filter((d) => d.available).map((drink) => {
            const count = getCount(selectedDrinks, drink.id);
            return (
              <div
                key={drink.id}
                className={`rounded-xl border-2 p-4 transition-all ${
                  count > 0
                    ? "border-[var(--accent)] bg-[var(--accent-light)] shadow-sm"
                    : "border-[var(--border)] bg-white"
                }`}
              >
                <p className="font-semibold text-[var(--foreground)]">{drink.name}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                    {drink.size}
                  </span>
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                    drink.withAlcohol ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {drink.withAlcohol ? "Alcool" : "Sans alcool"}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-bold text-[var(--accent)]">{drink.price.toFixed(2)} &euro;</p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDrinks(removeItem(selectedDrinks, drink.id))}
                    disabled={count === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-sm font-bold text-[var(--foreground)] hover:bg-gray-50 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="min-w-[1.5rem] text-center text-sm font-semibold text-[var(--foreground)]">{count}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedDrinks(addItem(selectedDrinks, drink.id))}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-sm font-bold text-white hover:opacity-90"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-8">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
          <span>{"\uD83C\uDF70"}</span> Desserts
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {desserts?.filter((d) => d.available).map((dessert) => {
            const count = getCount(selectedDesserts, dessert.id);
            return (
              <div
                key={dessert.id}
                className={`rounded-xl border-2 p-4 transition-all ${
                  count > 0
                    ? "border-[var(--accent)] bg-[var(--accent-light)] shadow-sm"
                    : "border-[var(--border)] bg-white"
                }`}
              >
                <p className="font-semibold text-[var(--foreground)]">{dessert.name}</p>
                <p className="mt-1 text-sm font-bold text-[var(--accent)]">{dessert.price.toFixed(2)} &euro;</p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDesserts(removeItem(selectedDesserts, dessert.id))}
                    disabled={count === 0}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border)] text-sm font-bold text-[var(--foreground)] hover:bg-gray-50 disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="min-w-[1.5rem] text-center text-sm font-semibold text-[var(--foreground)]">{count}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedDesserts(addItem(selectedDesserts, dessert.id))}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-sm font-bold text-white hover:opacity-90"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-4 rounded-2xl border border-[var(--border)] bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--muted)]">{itemCount} article{itemCount > 1 ? "s" : ""} selectionne{itemCount > 1 ? "s" : ""}</p>
            <p className="text-2xl font-extrabold text-[var(--accent)]">{total.toFixed(2)} &euro;</p>
          </div>
          <button
            type="submit"
            disabled={isPending || itemCount === 0}
            className="rounded-lg bg-[var(--accent)] px-8 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {isPending && (
              <svg className="mr-2 inline h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {isPending ? "Creation..." : `Commander - ${total.toFixed(2)} \u20AC`}
          </button>
        </div>
      </div>
    </form>
  );
};
