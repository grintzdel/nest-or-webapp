"use client";

import { use } from "react";
import { PizzaDetailPage } from "@nest-or-front/features/pizzas/pizza-detail-page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <PizzaDetailPage id={parseInt(id)} />;
}
