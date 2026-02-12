"use client";

import { OrderDomainModel } from "@nest-or-front/modules/order/core/model/order.domain-model";
import { OrderCard } from "@nest-or-front/modules/order/react/components/order-card";
import { EmptyState } from "@nest-or-front/modules/shared/react/components/empty-state";

type OrderListProps = {
  orders: OrderDomainModel.OrderDto[];
  onDelete?: (id: number) => void;
};

export const OrderList: React.FC<OrderListProps> = ({ orders, onDelete }) => {
  if (orders.length === 0) {
    return <EmptyState icon={"\uD83D\uDCCB"} title="Aucune commande" description="Aucune commande pour le moment. Creez votre premiere commande !" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {orders.map((order, i) => (
        <OrderCard key={order.id} order={order} index={i} onDelete={onDelete} />
      ))}
    </div>
  );
};
