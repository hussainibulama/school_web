import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { CreateSessionPayload } from '../interface';
import { FETCH_SCHOOL_SESSION } from '../contants';

const updateSession = async (payload: CreateSessionPayload): Promise<Response> => {
  const response = await axiosInstance.put(`/session`, payload);
  return response.data;
};

export default function useUpdateSchoolSession() {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, CreateSessionPayload>({
    mutationFn: updateSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_SCHOOL_SESSION].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
