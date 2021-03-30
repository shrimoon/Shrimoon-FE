export interface ApiResponseOk<T = any> {
  ok: true;
  response: T;
}

export interface ApiResponseFailed {
  ok: false;
  response: string;
  statusCode: number;
}

export type ApiResponse<T = any> = ApiResponseOk<T> | ApiResponseFailed;
