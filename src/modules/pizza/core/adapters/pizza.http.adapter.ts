import { AxiosInstance } from "axios";
import { PizzaDomainModel } from "@nest-or-front/modules/pizza/core/model/pizza.domain-model";
import { IPizzaPort } from "@nest-or-front/modules/pizza/core/port/pizza.port";

export class PizzaHttpAdapter implements IPizzaPort {
  constructor(private api: AxiosInstance) {}

  async listPizzas(): Promise<PizzaDomainModel.PizzaDto[]> {
    try {
      const res = await this.api.get<PizzaDomainModel.PizzaDto[]>("/pizzas");
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to list pizzas : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async getPizzaById(id: number): Promise<PizzaDomainModel.PizzaDto> {
    try {
      const res = await this.api.get<PizzaDomainModel.PizzaDto>(
        `/pizzas/${id}`
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to find pizza for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async createPizza(
    dto: PizzaDomainModel.CreatePizzaDto
  ): Promise<PizzaDomainModel.PizzaDto> {
    try {
      const res = await this.api.post<PizzaDomainModel.PizzaDto>(
        "/pizzas",
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to create pizza : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async updatePizza(
    id: number,
    dto: PizzaDomainModel.UpdatePizzaDto
  ): Promise<PizzaDomainModel.PizzaDto> {
    try {
      const res = await this.api.put<PizzaDomainModel.PizzaDto>(
        `/pizzas/${id}`,
        dto
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to update pizza for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async deletePizza(id: number): Promise<{ message: string }> {
    try {
      const res = await this.api.delete<{ message: string }>(
        `/pizzas/${id}`
      );
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to delete pizza for the id : ${id} : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async searchByIngredients(
    ingredients: string[]
  ): Promise<PizzaDomainModel.PizzaDto[]> {
    try {
      const res = await this.api.get<PizzaDomainModel.PizzaDto[]>("/pizzas", {
        params: { ingredients: ingredients.join(",") },
      });
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to search pizzas by ingredients : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async filterPizzas(
    filters: PizzaDomainModel.PizzaFiltersDto
  ): Promise<PizzaDomainModel.PizzaDto[]> {
    try {
      const params: Record<string, string> = {};
      if (filters.ingredient !== undefined) params.ingredient = filters.ingredient;
      if (filters.ingredients !== undefined) params.ingredients = filters.ingredients;
      if (filters.name !== undefined) params.name = filters.name;
      if (filters.available !== undefined) params.available = String(filters.available);
      const res = await this.api.get<PizzaDomainModel.PizzaDto[]>("/pizzas", { params });
      return res.data;
    } catch (error) {
      throw new Error(
        `Failed to filter pizzas : ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
