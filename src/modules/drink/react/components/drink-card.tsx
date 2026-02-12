"use client";

import Link from "next/link";
import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";

type DrinkCardProps = {
  drink: DrinkDomainModel.DrinkDto;
  index?: number;
  onDelete?: (id: number) => void;
};

export const DrinkCard: React.FC<DrinkCardProps> = ({ drink, index = 0, onDelete }) => (
  <div
    className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white hover:shadow-md transition-shadow"
    style={{ animation: "fadeInUp 0.4s ease-out forwards", animationDelay: `${index * 75}ms`, opacity: 0 }}
  >
    <div className="flex h-20 items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-500">
      <span className="text-3xl">{"\uD83E\uDDCB"}</span>
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <Link
            href={`/drinks/${drink.id}`}
            className="text-base font-semibold text-[var(--foreground)] hover:text-[var(--accent)]"
          >
            {drink.name}
          </Link>
          <p className="mt-1 text-lg font-bold text-[var(--accent)]">
            {drink.price.toFixed(2)} &euro;
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            drink.available
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {drink.available ? "Dispo" : "Indispo"}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {drink.size}
        </span>
        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${drink.withAlcohol ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>
          {drink.withAlcohol ? "Avec alcool" : "Sans alcool"}
        </span>
      </div>
      {onDelete && (
        <div className="mt-4 flex justify-end gap-2 border-t border-[var(--border)] pt-3">
          <Link
            href={`/drinks/${drink.id}`}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-gray-50 hover:text-[var(--foreground)]"
          >
            Modifier
          </Link>
          <button
            onClick={() => onDelete(drink.id)}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  </div>
);
