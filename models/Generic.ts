type ProviderProps<T> = {
  loading?: boolean;
  error?: string | null;
} & T;

type BasicResponse = {
  success: boolean;
  message?: string;
};

type ResponseModel<T> = BasicResponse & T;

export type { BasicResponse, ResponseModel };

export default ProviderProps;
