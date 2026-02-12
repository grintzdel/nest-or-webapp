import { AxiosInstance } from "axios";
import { DrinkDomainModel } from "@nest-or-front/modules/drink/core/model/drink.domain-model";
import { IDrinkPort } from "@nest-or-front/modules/drink/core/port/drink.port";

export class DrinkHttpAdapter implements IDrinkPort {
  constructor(private api: AxiosInstance) {}

  async listDrinks(): Promise<DrinkDomainModel.DrinkDto[]> {
    try {
      const res = await this.api.get<DrinkDomainModel.DrinkDto[]>("/drinks");
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to list drinks : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async getDrinkById(id: number): Promise<DrinkDomainModel.DrinkDto> {
    try {
      const res = await this.api.get<DrinkDomainModel.DrinkDto>(
        `/drinks/${id}`
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to find drink for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async createDrink(
    dto: DrinkDomainModel.CreateDrinkDto
  ): Promise<DrinkDomainModel.DrinkDto> {
    try {
      const res = await this.api.post<DrinkDomainModel.DrinkDto>(
        "/drinks",
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to create drink : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async updateDrink(
    id: number,
    dto: DrinkDomainModel.UpdateDrinkDto
  ): Promise<DrinkDomainModel.DrinkDto> {
    try {
      const res = await this.api.put<DrinkDomainModel.DrinkDto>(
        `/drinks/${id}`,
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to update drink for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async deleteDrink(id: number): Promise<{ message: string }> {
    try {
      const res = await this.api.delete<{ message: string }>(
        `/drinks/${id}`
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to delete drink for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async filterDrinks(
    filters: DrinkDomainModel.DrinkFiltersDto
  ): Promise<DrinkDomainModel.DrinkDto[]> {
    try {
      const params: Record<string, string> = {};
      if (filters.name !== undefined) params.name = filters.name;
      if (filters.available !== undefined) params.available = String(filters.available);
      if (filters.withAlcohol !== undefined) params.withAlcohol = String(filters.withAlcohol);
      if (filters.size !== undefined) params.size = filters.size;
      const res = await this.api.get<DrinkDomainModel.DrinkDto[]>("/drinks", { params });
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to filter drinks : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
