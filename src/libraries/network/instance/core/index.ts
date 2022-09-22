import axios from 'axios';
import type {AxiosRequestConfig, AxiosError} from 'axios';
import type {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import responseInterceptor from './responseInterceptor';
import {ClientResponse} from '../../httpClient';

const defaultHeaders = {
  agent: true,
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
};

const options = {
  baseURL: 'https://simple-contact-crud.herokuapp.com',
  timeout: 30000,
  validateStatus: null,
};
const core = axios.create(options);

core.defaults.headers.common = defaultHeaders;

core.interceptors.response.use((response: ClientResponse): any =>
  responseInterceptor(response),
);

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({url, method, data, params}) => {
    try {
      const result = await core({url, method, data, params});
      return {data: result.data};
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default core;
