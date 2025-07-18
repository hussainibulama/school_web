import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STUDENTS_RESULT_BY_ID } from '../contants';

const generateResult = async (payload: Record<string, any>): Promise<Response> => {
  const response = await axiosInstance.post(`/student-result/generate`, {
    ...payload,
  });
  return response.data;
};

export default function useGenerateResult() {
  const queryClient = useQueryClient();

  return useMutation<Response, Error, Record<string, any>>({
    mutationFn: generateResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [FETCH_STUDENTS_RESULT_BY_ID].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
