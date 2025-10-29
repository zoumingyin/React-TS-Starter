import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
const apiBaseUrl: string = window.CONFIG?.baseURL;
console.log(window?.CONFIG, " window?.config");
const DEFAULT_BASE_URL = apiBaseUrl;

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: DEFAULT_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器（添加 token、统一处理）
// 使用 any 来避免与 axios v1 的内部类型不兼容警告
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (e) {
      // ignore
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器（统一处理错误、格式化响应）
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果你的后端在 data 层再包了一层 { code, data, msg }
    // 可在这里做统一解析。例如：
    // const { code, data, msg } = response.data
    // if (code !== 0) return Promise.reject(new Error(msg || 'Error'))
    return response;
  },
  (error: any) => {
    // 全局错误处理（可扩展）
    return Promise.reject(error);
  }
);

// 简化调用的封装（带泛型）
export async function request<T = any>(config: AxiosRequestConfig): Promise<T> {
  const res = await instance.request<T>(config);
  return res.data as T;
}

export async function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await instance.get<T>(url, config);
  return res.data as T;
}

export async function post<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await instance.post<T>(url, data, config);
  return res.data as T;
}

export async function put<T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await instance.put<T>(url, data, config);
  return res.data as T;
}

export async function del<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await instance.delete<T>(url, config);
  return res.data as T;
}

export default instance;
