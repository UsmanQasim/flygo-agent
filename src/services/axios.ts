import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
// import nookies from "nookies";

export class AxiosProvider {
  private static instance: AxiosInstance | null = null;
  private static abortController: AbortController | null = null;

  static getInstance(): AxiosInstance {
    // Create a new instance if it doesn't exist already
    if (!AxiosProvider.instance) {
      AxiosProvider.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
        headers: {
          common: {
            "Content-Type": "application/json",
          },
        },
      });

      AxiosProvider.instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const rawToken = localStorage.getItem("accessToken");

          if (rawToken) {
            const token = JSON.parse(rawToken);

            config.headers.Authorization = `Bearer ${token}`;
          }

          return config;
        }
      );
    }

    return AxiosProvider.instance;
  }

  static abortRequest() {
    if (AxiosProvider.abortController) {
      AxiosProvider.abortController.abort();
    }
  }
}

export const Axios = AxiosProvider.getInstance();

export const abortRequest = AxiosProvider.abortRequest;
