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

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isPending }) => {
  const { data: pizzas, isLoading: loadingPizzas } = useListPizzas();
  const { data: drinks, isLoading: loadingDrinks } = useListDrinks();
  const { data: desserts, isLoading: loadingDesserts } = useListDesserts();

  const [selectedPizzas, setSelectedPizzas] = useState<number[]>([]);
  const [selectedDrinks, setSelectedDrinks] = useState<number[]>([]);
  const [selectedDesserts, setSelectedDesserts] = useState<number[]>([]);

  const isLoading = loadingPizzas || loadingDrinks || loadingDesserts;

  const toggleItem = (list: number[], setList: (v: number[]) => void, id: number) => {
    setList(list.includes(id) ? list.filter((i) => i !== id) : [...list, id]);
  };

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
          {pizzas?.filter((p) => p.available).map((pizza) => (
            <button
              key={pizza.id}
              type="button"
              onClick={() => toggleItem(selectedPizzas, setSelectedPizzas, pizza.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                selectedPizzas.includes(pizza.id)
                  ? "border-[var(--accent)] bg-[var(--accent-light)] shadow-sm"
                  : "border-[var(--border)] bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <p className="font-semibold text-[var(--foreground)]">{pizza.name}</p>
              <p className="mt-1 text-sm font-bold text-[var(--accent)]">{pizza.price.toFixed(2)} &euro;</p>
              {selectedPizzas.includes(pizza.id) && (
                <span className="mt-2 inline-block rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
                  {"\u2713"} Selectionne
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-8">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
          <span>{"\uD83E\uDDCB"}</span> Boissons
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {drinks?.filter((d) => d.available).map((drink) => (
            <button
              key={drink.id}
              type="button"
              onClick={() => toggleItem(selectedDrinks, setSelectedDrinks, drink.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                selectedDrinks.includes(drink.id)
                  ? "border-[var(--accent)] bg-[var(--accent-light)] shadow-sm"
                  : "border-[var(--border)] bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <p className="font-semibold text-[var(--foreground)]">{drink.name}</p>
              <p className="mt-0.5 text-xs text-[var(--muted)]">{drink.size}</p>
              <p className="mt-1 text-sm font-bold text-[var(--accent)]">{drink.price.toFixed(2)} &euro;</p>
              {selectedDrinks.includes(drink.id) && (
                <span className="mt-2 inline-block rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
                  {"\u2713"} Selectionne
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border)] pt-8">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[var(--foreground)]">
          <span>{"\uD83C\uDF70"}</span> Desserts
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {desserts?.filter((d) => d.available).map((dessert) => (
            <button
              key={dessert.id}
              type="button"
              onClick={() => toggleItem(selectedDesserts, setSelectedDesserts, dessert.id)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                selectedDesserts.includes(dessert.id)
                  ? "border-[var(--accent)] bg-[var(--accent-light)] shadow-sm"
                  : "border-[var(--border)] bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <p className="font-semibold text-[var(--foreground)]">{dessert.name}</p>
              <p className="mt-1 text-sm font-bold text-[var(--accent)]">{dessert.price.toFixed(2)} &euro;</p>
              {selectedDesserts.includes(dessert.id) && (
                <span className="mt-2 inline-block rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
                  {"\u2713"} Selectionne
                </span>
              )}
            </button>
          ))}
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
