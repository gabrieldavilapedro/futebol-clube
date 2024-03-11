type serviceMessage = { message: string };

type serviceResponseErrorE = number;

export type serviceResponseError = {
  status: serviceResponseErrorE
  data: serviceMessage
};

export type serviceResponseSuccess<T> = {
  status: number
  data: T
};

export type serviceResponse<T> = serviceResponseSuccess<T> | serviceResponseError;
