import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { CreateNewUserPayload } from '../interface';
import { FETCH_PARENT_LIST, FETCH_STAFF_LIST, FETCH_STUDENT_LIST } from '../contants';

// Accepts single or multiple user payloads
const createUser = async (
  payload: CreateNewUserPayload | CreateNewUserPayload[],
): Promise<Response> => {
  const response = await axiosInstance.post('/user', payload);
  return response.data;
};

export default function useCreateUsers() {
  const queryClient = useQueryClient();

  return useMutation<Response, Error, CreateNewUserPayload | CreateNewUserPayload[]>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [FETCH_STAFF_LIST, FETCH_STUDENT_LIST, FETCH_PARENT_LIST].some((key) =>
            query.queryKey.includes(key),
          ),
      });
    },
  });
}
