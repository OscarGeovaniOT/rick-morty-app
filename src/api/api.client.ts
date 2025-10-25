import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_TIMEOUT = 15000;


export class ApiClient {
    private client: AxiosInstance;

    constructor(baseUrl: string) {
        this.client = axios.create({
            baseURL: baseUrl ?? "",
            timeout: BASE_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        //Interceptor de peticion
        this.client.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        //Intercepto de respuesta (manejo global de errores)
        this.client.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                //se puede normalizar errores aqui
                /*
                const customError = {
          message: error?.response?.data?.message ?? error.message,
          status: error?.response?.status ?? 500,
          original: error,
        };
                */
                return Promise.reject(error);
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this.client.get<T>(url, config);
        return data;
    }

    async post<T, B = unknown>(
        url: string,
        body?: B,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const { data } = await this.client.post<T>(url, body, config);
        return data;
    }

    async put<T, B = unknown>(
        url: string,
        body?: B,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const { data } = await this.client.put<T>(url, body, config);
        return data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this.client.delete<T>(url, config);
        return data;
    }
}
