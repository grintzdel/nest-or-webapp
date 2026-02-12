"use client";

import { PizzaDetail } from "@nest-or-front/modules/pizza/react/components/pizza-detail";
import { BackButton } from "@nest-or-front/modules/shared/react/components/back-button";

type PizzaDetailPageProps = {
  id: number;
};

export function PizzaDetailPage({ id }: PizzaDetailPageProps) {
  return (
    <div>
      <BackButton href="/pizzas" label="Retour aux pizzas" />
      <PizzaDetail id={id} />
    </div>
  );
}
