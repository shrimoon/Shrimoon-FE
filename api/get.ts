import { getApiEndpoint } from '@/utils/config';
import toQueryString from '@/utils/to-query-string';
import { ApiResponse } from '../models/api-response';

export default async <T = any>(endpoint: string, queries?: Record<string, any>, token?: any) => {
  const query = queries ? ('?' + toQueryString(queries)) : '';
  const url = getApiEndpoint() + '/api/v1/' + endpoint + query;
  const headers: HeadersInit = {};

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method: 'GET',
    headers,
  });
  const data = await res.json();
  return data as ApiResponse<T>;
};