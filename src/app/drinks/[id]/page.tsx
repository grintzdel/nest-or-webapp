"use client";

import { use } from "react";
import { DrinkDetailPage } from "@nest-or-front/features/drinks/drink-detail-page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <DrinkDetailPage id={parseInt(id)} />;
}
