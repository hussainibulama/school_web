import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STUDENTS_RESULT_BY_ID } from '../contants';
import { CreateStudentResultPayload } from '../interface';

const createStudentResult = async (payload: CreateStudentResultPayload): Promise<Response> => {
  const response = await axiosInstance.post(`/student-result`, payload);
  return response.data;
};

export default function useCreateStudentResult() {
  const queryClient = useQueryClient();

  return useMutation<Response, Error, CreateStudentResultPayload>({
    mutationFn: createStudentResult,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [FETCH_STUDENTS_RESULT_BY_ID].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
