import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { LoginPayload } from '../interface';

const loginUser = async ({ schoolId, email, password }: LoginPayload): Promise<Response> => {
  const response = await axiosInstance.post(`/user/login`, {
    email,
    schoolId,
    password,
  });
  return response.data;
};

export default function useLogin() {
  return useMutation<Response, Error, LoginPayload>({
    mutationFn: loginUser,
  });
}
