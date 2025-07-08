interface Response {
  code: number;
  status: string;
  message: string;
  data?: any;
}

interface Error {
  response?: {
    data?: {
      code: number;
      status: string;
      message: string;
    };
  };
}
