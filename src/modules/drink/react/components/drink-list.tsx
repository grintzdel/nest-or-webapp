"use client";

import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";
import { DrinkCard } from "@nest-or-front/modules/drink/react/components/drink-card";
import { EmptyState } from "@nest-or-front/modules/shared/react/components/empty-state";

type DrinkListProps = {
  drinks: DrinkDomainModel.DrinkDto[];
  onDelete?: (id: number) => void;
};

export const DrinkList: React.FC<DrinkListProps> = ({ drinks, onDelete }) => {
  if (drinks.length === 0) {
    return <EmptyState icon={"\uD83E\uDDCB"} title="Aucune boisson" description="Commencez par ajouter votre premiere boisson au menu !" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {drinks.map((drink, i) => (
        <DrinkCard key={drink.id} drink={drink} index={i} onDelete={onDelete} />
      ))}
    </div>
  );
};
