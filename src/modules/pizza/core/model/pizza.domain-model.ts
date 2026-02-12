export namespace PizzaDomainModel {
  export type PizzaDto = {
    id: number;
    name: string;
    price: number;
    ingredients: string[];
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Nullable<Date>;
  };

  export type CreatePizzaDto = Omit<PizzaDto, "id" | "createdAt" | "updatedAt" | "deletedAt">;

  export type UpdatePizzaDto = Partial<CreatePizzaDto>;

  export type PizzaFiltersDto = {
    ingredient?: Nullable<string>;
    ingredients?: Nullable<string>;
    name?: Nullable<string>;
    available?: Nullable<boolean>;
  };
}
