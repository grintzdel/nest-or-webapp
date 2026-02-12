"use client";

import { use } from "react";
import { DessertDetailPage } from "@nest-or-front/features/desserts/dessert-detail-page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <DessertDetailPage id={parseInt(id)} />;
}
