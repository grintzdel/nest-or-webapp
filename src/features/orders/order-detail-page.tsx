"use client";

import { OrderDetail } from "@nest-or-front/modules/order/react/components/order-detail";
import { BackButton } from "@nest-or-front/modules/shared/react/components/back-button";

type OrderDetailPageProps = {
  id: number;
};

export function OrderDetailPage({ id }: OrderDetailPageProps) {
  return (
    <div>
      <BackButton href="/orders" label="Retour aux commandes" />
      <OrderDetail id={id} />
    </div>
  );
}
