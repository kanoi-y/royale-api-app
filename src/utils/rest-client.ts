import axiosBase, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

interface IErrorResponse {
  message: string;
}

class RestClient {
  axios: AxiosInstance;

  constructor() {
    this.axios = axiosBase.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      },
      responseType: "json",
    });
  }

  async apiGet<T>(url: string, query = {}): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.get(`${url}`, { ...query });
    } catch (err: any) {
      if (axiosBase.isAxiosError(err) && err.response) {
        throw new Error(
          (err as AxiosError<IErrorResponse>).response?.data.message
        );
      }
      throw new Error(err.message);
    }
  }

  async apiPost<T>(
    url: string,
    body = {},
    option?: { "Content-Type"?: string }
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.post(`${url}`, body, {
        headers: { ...option },
      });
    } catch (err: any) {
      if (axiosBase.isAxiosError(err) && err.response) {
        throw new Error(
          (err as AxiosError<IErrorResponse>).response?.data.message
        );
      }
      throw new Error(err.message);
    }
  }

  async apiPut<T>(
    url: string,
    body = {},
    option?: { "Content-Type"?: string }
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.put(`${url}`, body, {
        headers: { ...option },
      });
    } catch (err: any) {
      if (axiosBase.isAxiosError(err) && err.response) {
        throw new Error(
          (err as AxiosError<IErrorResponse>).response?.data.message
        );
      }
      throw new Error(err.message);
    }
  }

  async apiDelete<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.delete(`${url}`, { data: body });
    } catch (err: any) {
      if (axiosBase.isAxiosError(err) && err.response) {
        throw new Error(
          (err as AxiosError<IErrorResponse>).response?.data.message
        );
      }
      throw new Error(err.message);
    }
  }
}

export const restClient = new RestClient();
