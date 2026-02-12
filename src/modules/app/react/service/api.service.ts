import axios, { AxiosInstance } from "axios";

export default class ApiService {
  private readonly _api: AxiosInstance;

  constructor(url: string) {
    this._api = axios.create({
      baseURL: url,
      responseType: "json",
      headers: { "Content-Type": "application/json" },
    });
  }

  get api(): AxiosInstance {
    return this._api;
  }
}
