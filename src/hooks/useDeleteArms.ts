import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_CLASS_ARMS } from '../contants';

const deleteArms = async ({ classArmId }: { classArmId: string }): Promise<Response> => {
  const response = await axiosInstance.delete(`/class-arms`, {
    data: { classArmId },
  });
  return response.data;
};

export default function useDeleteArms() {
  const queryClient = useQueryClient();

  return useMutation<Response, Error, { classArmId: string }>({
    mutationFn: deleteArms,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_CLASS_ARMS].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
