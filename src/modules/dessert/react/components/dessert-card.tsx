"use client";

import Link from "next/link";
import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";

type DessertCardProps = {
  dessert: DessertDomainModel.DessertDto;
  index?: number;
  onDelete?: (id: number) => void;
};

export const DessertCard: React.FC<DessertCardProps> = ({ dessert, index = 0, onDelete }) => (
  <div
    className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white hover:shadow-md transition-shadow"
    style={{ animation: "fadeInUp 0.4s ease-out forwards", animationDelay: `${index * 75}ms`, opacity: 0 }}
  >
    <div className="flex h-20 items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500">
      <span className="text-3xl">{"\uD83C\uDF70"}</span>
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <Link
            href={`/desserts/${dessert.id}`}
            className="text-base font-semibold text-[var(--foreground)] hover:text-[var(--accent)]"
          >
            {dessert.name}
          </Link>
          <p className="mt-1 text-lg font-bold text-[var(--accent)]">
            {dessert.price.toFixed(2)} &euro;
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            dessert.available
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-500"
          }`}
        >
          {dessert.available ? "Dispo" : "Indispo"}
        </span>
      </div>
      {onDelete && (
        <div className="mt-4 flex justify-end gap-2 border-t border-[var(--border)] pt-3">
          <Link
            href={`/desserts/${dessert.id}`}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-gray-50 hover:text-[var(--foreground)]"
          >
            Modifier
          </Link>
          <button
            onClick={() => onDelete(dessert.id)}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  </div>
);
