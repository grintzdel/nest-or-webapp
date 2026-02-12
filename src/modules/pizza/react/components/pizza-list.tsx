"use client";

import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";
import { PizzaCard } from "@nest-or-front/modules/pizza/react/components/pizza-card";
import { EmptyState } from "@nest-or-front/modules/shared/react/components/empty-state";

type PizzaListProps = {
  pizzas: PizzaDomainModel.PizzaDto[];
  onDelete?: (id: number) => void;
};

export const PizzaList: React.FC<PizzaListProps> = ({ pizzas, onDelete }) => {
  if (pizzas.length === 0) {
    return <EmptyState icon={"\uD83C\uDF55"} title="Aucune pizza" description="Commencez par ajouter votre premiere pizza au menu !" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {pizzas.map((pizza, i) => (
        <PizzaCard key={pizza.id} pizza={pizza} index={i} onDelete={onDelete} />
      ))}
    </div>
  );
};
