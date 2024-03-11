type serviceMessage = { message: string };
type servicemessageRole = { role: string };

type serviceResponseErrorE = number;

export type serviceResponseError = {
  status: serviceResponseErrorE
  data: serviceMessage | servicemessageRole
};

export type serviceResponseSuccess<T> = {
  status: number
  data: T
};

export type serviceResponse<T> = serviceResponseSuccess<T> | serviceResponseError;
