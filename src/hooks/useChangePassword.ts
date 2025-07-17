import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios';

const chnagePassword = async ({
  oldPassword,
  password,
  confirmPassword,
}: {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}): Promise<Response> => {
  const response = await axiosInstance.put(`/user/change-password`, {
    oldPassword,
    password,
    confirmPassword,
  });
  return response.data;
};

export default function useChangePassword() {
  return useMutation<
    Response,
    Error,
    { oldPassword: string; password: string; confirmPassword: string }
  >({
    mutationFn: chnagePassword,
  });
}
