import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_CLASS_ARMS } from '../contants';

const updateArms = async ({
  classArmId,
  classArmName,
}: {
  classArmId: string;
  classArmName?: string;
}): Promise<Response> => {
  const response = await axiosInstance.put(`/class-arms`, {
    classArmId,
    classArmName,
  });
  return response.data;
};

export default function useUpdateArms() {
  const queryClient = useQueryClient();

  return useMutation<Response, Error, { classArmId: string; classArmName?: string }>({
    mutationFn: updateArms,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_CLASS_ARMS].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
