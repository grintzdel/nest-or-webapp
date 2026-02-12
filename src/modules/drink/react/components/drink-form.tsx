"use client";

import { useState } from "react";
import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";
import { DrinkSizeEnum } from "@nest-or-front/modules/drink/core/enums/drink-size.enum";

type DrinkFormProps = {
  initialData?: DrinkDomainModel.DrinkDto;
  onSubmit: (data: DrinkDomainModel.CreateDrinkDto) => void;
  isPending?: boolean;
};

export const DrinkForm: React.FC<DrinkFormProps> = ({ initialData, onSubmit, isPending }) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [price, setPrice] = useState(initialData?.price ?? 0);
  const [size, setSize] = useState<DrinkSizeEnum>(initialData?.size ?? DrinkSizeEnum.MEDIUM);
  const [withAlcohol, setWithAlcohol] = useState(initialData?.withAlcohol ?? false);
  const [available, setAvailable] = useState(initialData?.available ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, price, size, withAlcohol, available });
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
          minLength={2}
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
          Taille <span className="text-red-400">*</span>
        </label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value as DrinkSizeEnum)}
          required
          className="block w-full rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        >
          {Object.values(DrinkSizeEnum).map((val) => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            id="withAlcohol"
            checked={withAlcohol}
            onChange={(e) => setWithAlcohol(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-[var(--accent)]"
          />
          <label htmlFor="withAlcohol" className="text-sm font-medium text-[var(--foreground)]">
            Avec alcool
          </label>
        </div>
        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            id="drinkAvailable"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 accent-[var(--accent)]"
          />
          <label htmlFor="drinkAvailable" className="text-sm font-medium text-[var(--foreground)]">
            Disponible
          </label>
        </div>
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
