import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_HOST;

const service = axios.create({
  baseURL,
  withCredentials: true,
});

const baseRoute = "/api";

const request = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<T, U>(url: string, params?: T, headers: any = {}): Promise<U> {
    return (async () => {
      if (!url) {
        throw new Error("URL is required");
      }
      const response = await service.get(`${baseRoute}${url}`, {
        params,
        headers,
      });
      return response?.data;
    })();
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T, U>(url: string, data: T, headers: any = {}): Promise<U> {
    return (async () => {
      if (!url) {
        throw new Error("URL is required");
      }
      const response = await service.post(`${baseRoute}${url}`, data, {
        headers,
      });
      return response?.data;
    })();
  },
};

export default request;
