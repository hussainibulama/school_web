import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_SCHOOL_CLASS } from '../contants';
import { CreateClassPayload } from '../interface';

const createSchoolClass = async (payload: CreateClassPayload[]): Promise<Response> => {
  const response = await axiosInstance.post(`/school-class`, payload);
  return response.data;
};

export default function useCreateSchoolClass() {
  const queryClient = useQueryClient();

  return useMutation<Response, Error, CreateClassPayload[]>({
    mutationFn: createSchoolClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_SCHOOL_CLASS].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
