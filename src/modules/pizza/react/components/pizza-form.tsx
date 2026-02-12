"use client";

import { useState } from "react";
import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";

type PizzaFormProps = {
  initialData?: PizzaDomainModel.PizzaDto;
  onSubmit: (data: PizzaDomainModel.CreatePizzaDto) => void;
  isPending?: boolean;
};

export const PizzaForm: React.FC<PizzaFormProps> = ({ initialData, onSubmit, isPending }) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [price, setPrice] = useState(initialData?.price ?? 0);
  const [ingredientsText, setIngredientsText] = useState(
    initialData?.ingredients.join(", ") ?? ""
  );
  const [available, setAvailable] = useState(initialData?.available ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredients = ingredientsText.split(",").map((i) => i.trim()).filter(Boolean);
    onSubmit({ name, price, ingredients, available });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" style={{ animation: "slideDown 0.3s ease-out" }}>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Nom <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={3}
          className="block w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Prix (&euro;) <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
          min={0.01}
          step={0.01}
          className="block w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
          Ingredients <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          required
          placeholder="tomate, mozzarella, basilic"
          className="block w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        />
        <p className="mt-1 text-xs text-[var(--muted)]">Separes par des virgules</p>
      </div>
      <div className="flex items-center gap-2.5">
        <input
          type="checkbox"
          id="available"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 accent-[var(--accent)]"
        />
        <label htmlFor="available" className="text-sm font-medium text-[var(--foreground)]">
          Disponible
        </label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {isPending && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {isPending ? "Enregistrement..." : initialData ? "Modifier" : "Creer"}
      </button>
    </form>
  );
};
