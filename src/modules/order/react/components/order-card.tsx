"use client";

import Link from "next/link";
import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";

type OrderCardProps = {
  order: OrderDomainModel.OrderDto;
  index?: number;
  onDelete?: (id: number) => void;
};

export const OrderCard: React.FC<OrderCardProps> = ({ order, index = 0, onDelete }) => (
  <div
    className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white hover:shadow-md transition-shadow"
    style={{ animation: "fadeInUp 0.4s ease-out forwards", animationDelay: `${index * 75}ms`, opacity: 0 }}
  >
    <div className="flex h-20 items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500">
      <span className="text-3xl">{"\uD83D\uDCCB"}</span>
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between">
        <Link
          href={`/orders/${order.id}`}
          className="text-base font-semibold text-[var(--foreground)] hover:text-[var(--accent)]"
        >
          Commande #{order.id}
        </Link>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            order.processed
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600"
          }`}
        >
          {order.processed ? "Traitee" : "En attente"}
        </span>
      </div>
      <p className="mt-2 text-lg font-bold text-[var(--accent)]">
        {order.totalPrice.toFixed(2)} &euro;
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {order.pizzas.length > 0 && (
          <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
            {"\uD83C\uDF55"} {order.pizzas.length} pizza{order.pizzas.length > 1 ? "s" : ""}
          </span>
        )}
        {order.drinks.length > 0 && (
          <span className="rounded-md bg-cyan-50 px-2 py-0.5 text-xs font-medium text-cyan-600">
            {"\uD83E\uDDCB"} {order.drinks.length} boisson{order.drinks.length > 1 ? "s" : ""}
          </span>
        )}
        {order.desserts.length > 0 && (
          <span className="rounded-md bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-600">
            {"\uD83C\uDF70"} {order.desserts.length} dessert{order.desserts.length > 1 ? "s" : ""}
          </span>
        )}
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        {new Date(order.createdAt).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      {onDelete && (
        <div className="mt-4 flex justify-end gap-2 border-t border-[var(--border)] pt-3">
          <Link
            href={`/orders/${order.id}`}
            className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:bg-gray-50 hover:text-[var(--foreground)]"
          >
            Details
          </Link>
          <button
            onClick={() => onDelete(order.id)}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
          >
            Supprimer
          </button>
        </div>
      )}
    </div>
  </div>
);
