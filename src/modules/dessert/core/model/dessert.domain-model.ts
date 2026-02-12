export namespace DessertDomainModel {
  export type DessertDto = {
    id: number;
    name: string;
    price: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Nullable<Date>;
  };

  export type CreateDessertDto = Omit<DessertDto, "id" | "createdAt" | "updatedAt" | "deletedAt">;

  export type UpdateDessertDto = Partial<CreateDessertDto>;

  export type DessertFiltersDto = {
    name?: Nullable<string>;
    available?: Nullable<boolean>;
  };
}
