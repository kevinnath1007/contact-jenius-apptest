import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosStatic,
  AxiosError,
} from 'axios';

export type ClientInstance = AxiosInstance;

export type ClientStatic = AxiosStatic;

export type ClientResponse<T = any> = AxiosResponse<T>;

export type ClientRequestConfig = AxiosRequestConfig;

export type ClientError<T = any> = AxiosError<T>;

export default axios;
