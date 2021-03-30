import { getApiEndpoint } from '@/utils/config';
import toQueryString from '@/utils/to-query-string';
import { ApiResponse } from '../models/api-response';

export default async <T = any>(endpoint: string, body?: Record<string, any>, token?: any) => {
  const url = getApiEndpoint() + '/api/v1/' + endpoint;
  const headers: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: toQueryString(body ?? {}),
  });
  const json = await res.json();
  return json as ApiResponse<T>;
};