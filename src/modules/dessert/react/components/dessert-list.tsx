"use client";

import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";
import { DessertCard } from "@nest-or-front/modules/dessert/react/components/dessert-card";
import { EmptyState } from "@nest-or-front/modules/shared/react/components/empty-state";

type DessertListProps = {
  desserts: DessertDomainModel.DessertDto[];
  onDelete?: (id: number) => void;
};

export const DessertList: React.FC<DessertListProps> = ({ desserts, onDelete }) => {
  if (desserts.length === 0) {
    return <EmptyState icon={"\uD83C\uDF70"} title="Aucun dessert" description="Commencez par ajouter votre premier dessert au menu !" />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {desserts.map((dessert, i) => (
        <DessertCard key={dessert.id} dessert={dessert} index={i} onDelete={onDelete} />
      ))}
    </div>
  );
};
