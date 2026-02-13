import { AxiosInstance } from "axios";
import { DessertDomainModel } from "@nest-or-front/modules/dessert/core/model/dessert.domain-model";
import { IDessertPort } from "@nest-or-front/modules/dessert/core/port/dessert.port";

export class DessertHttpAdapter implements IDessertPort {
  constructor(private api: AxiosInstance) {}

  async listDesserts(): Promise<DessertDomainModel.DessertDto[]> {
    try {
      const res =
        await this.api.get<DessertDomainModel.DessertDto[]>("/desserts");
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to list desserts : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async getDessertById(id: number): Promise<DessertDomainModel.DessertDto> {
    try {
      const res = await this.api.get<DessertDomainModel.DessertDto>(
        `/desserts/${id}`
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to find dessert for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async createDessert(
    dto: DessertDomainModel.CreateDessertDto
  ): Promise<DessertDomainModel.DessertDto> {
    try {
      const res = await this.api.post<DessertDomainModel.DessertDto>(
        "/desserts",
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to create dessert : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async updateDessert(
    id: number,
    dto: DessertDomainModel.UpdateDessertDto
  ): Promise<DessertDomainModel.DessertDto> {
    try {
      const res = await this.api.put<DessertDomainModel.DessertDto>(
        `/desserts/${id}`,
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to update dessert for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async deleteDessert(id: number): Promise<{ message: string }> {
    try {
      const res = await this.api.delete<{ message: string }>(
        `/desserts/${id}`
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to delete dessert for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async filterDesserts(
    filters: DessertDomainModel.DessertFiltersDto
  ): Promise<DessertDomainModel.DessertDto[]> {
    try {
      const params: Record<string, string> = {};
      if (filters.name != null) params.name = filters.name;
      if (filters.available != null) params.available = String(filters.available);
      const res = await this.api.get<DessertDomainModel.DessertDto[]>("/desserts", { params });
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to filter desserts : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
