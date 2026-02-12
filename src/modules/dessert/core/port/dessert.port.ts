import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";

export interface IDessertPort {
  listDesserts(): Promise<DessertDomainModel.DessertDto[]>;
  getDessertById(id: number): Promise<DessertDomainModel.DessertDto>;
  createDessert(
    data: DessertDomainModel.CreateDessertDto
  ): Promise<DessertDomainModel.DessertDto>;
  updateDessert(
    id: number,
    data: DessertDomainModel.UpdateDessertDto
  ): Promise<DessertDomainModel.DessertDto>;
  deleteDessert(id: number): Promise<{ message: string }>;
  filterDesserts(
    filters: DessertDomainModel.DessertFiltersDto
  ): Promise<DessertDomainModel.DessertDto[]>;
}
