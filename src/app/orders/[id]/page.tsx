"use client";

import { use } from "react";
import { OrderDetailPage } from "@nest-or-front/features/orders/order-detail-page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <OrderDetailPage id={parseInt(id)} />;
}
