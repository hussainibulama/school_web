import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_SCHOOL_INFO } from '../contants';

const updateSchool = async (payload: Record<string, any>): Promise<Response> => {
  const response = await axiosInstance.put(`/school`, payload);
  return response.data;
};

export default function useUpdateSchoolInfo() {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, Record<string, any>>({
    mutationFn: updateSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_SCHOOL_INFO].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
