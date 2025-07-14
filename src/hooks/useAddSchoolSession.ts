import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { CreateSessionPayload } from '../interface';
import { FETCH_SCHOOL_SESSION } from '../contants';

const createSession = async (payload: CreateSessionPayload): Promise<Response> => {
  const response = await axiosInstance.post(`/session`, payload);
  return response.data;
};

export default function useAddSchoolSession() {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, CreateSessionPayload>({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_SCHOOL_SESSION].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
