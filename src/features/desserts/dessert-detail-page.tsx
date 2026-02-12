"use client";

import { DessertDetail } from "@nest-or-front/modules/dessert/react/components/dessert-detail";
import { BackButton } from "@nest-or-front/modules/shared/react/components/back-button";

type DessertDetailPageProps = {
  id: number;
};

export function DessertDetailPage({ id }: DessertDetailPageProps) {
  return (
    <div>
      <BackButton href="/desserts" label="Retour aux desserts" />
      <DessertDetail id={id} />
    </div>
  );
}
