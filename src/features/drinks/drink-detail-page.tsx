"use client";

import { DrinkDetail } from "@nest-or-front/modules/drink/react/components/drink-detail";
import { BackButton } from "@nest-or-front/modules/shared/react/components/back-button";

type DrinkDetailPageProps = {
  id: number;
};

export function DrinkDetailPage({ id }: DrinkDetailPageProps) {
  return (
    <div>
      <BackButton href="/drinks" label="Retour aux boissons" />
      <DrinkDetail id={id} />
    </div>
  );
}
