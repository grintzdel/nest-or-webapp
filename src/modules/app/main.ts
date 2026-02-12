import { Dependencies } from "@nest-or-front/modules/app/dependencies";
import ApiService from "@nest-or-front/modules/app/react/service/api.service";
import { PizzaHttpAdapter } from "@nest-or-front/modules/pizza/core/adapters/pizza.http.adapter";
import { DrinkHttpAdapter } from "@nest-or-front/modules/drink/core/adapters/drink.http.adapter";
import { DessertHttpAdapter } from "@nest-or-front/modules/dessert/core/adapters/dessert.http.adapter";
import { OrderHttpAdapter } from "@nest-or-front/modules/order/core/adapters/order.http.adapter";

export class App {
  public dependencies: Dependencies;
  public apiService: ApiService;

  constructor() {
    this.apiService = new ApiService("http://localhost:8000");
    this.dependencies = this.setupDependencies();
  }

  private setupDependencies(): Dependencies {
    return {
      pizzaGateway: new PizzaHttpAdapter(this.apiService.api),
      drinkGateway: new DrinkHttpAdapter(this.apiService.api),
      dessertGateway: new DessertHttpAdapter(this.apiService.api),
      orderGateway: new OrderHttpAdapter(this.apiService.api),
    };
  }
}

export const app = new App();
