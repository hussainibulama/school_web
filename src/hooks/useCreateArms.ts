import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_CLASS_ARMS } from '../contants';

const createArms = async ({ arms }: { arms: string[] }): Promise<Response> => {
  const response = await axiosInstance.post(`/class-arms`, {
    arms,
  });
  return response.data;
};

export default function useCreateArms() {
  const queryClient = useQueryClient();

  return useMutation<Response, Error, { arms: string[] }>({
    mutationFn: createArms,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_CLASS_ARMS].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
