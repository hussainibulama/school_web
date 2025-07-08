import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../api/axios';

const fetchInitUser = async (email: string): Promise<Response> => {
  const response = await axiosInstance.get(`/user/init/${email}`);
  return response.data;
};

export default function useInitUser() {
  return useMutation<Response, Error, string>({
    mutationFn: fetchInitUser,
  });
}
