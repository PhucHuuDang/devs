export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export interface ErrorResponse {
  message: string;
  code: string;
}
