import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { UpdateUserByIdPayload } from '../interface';
import {
  FETCH_PARENT_LIST,
  FETCH_STAFF_LIST,
  FETCH_STUDENT_LIST,
  FETCH_USER_BY_ID,
} from '../contants';

const updateUserById = async ({
  userId,
  email,
  firstName,
  middleName,
  lastName,
  gender,
  role,
  address,
  accountNumber,
  bankName,
  admissionNumber,
  phone,
  dob,
  active,
}: UpdateUserByIdPayload): Promise<Response> => {
  const response = await axiosInstance.put(`/user/${userId}`, {
    email,
    firstName,
    middleName,
    lastName,
    gender,
    role,
    address,
    accountNumber,
    bankName,
    admissionNumber,
    phone,
    dob,
    active,
  });
  return response.data;
};
export default function useUpdateUserById() {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, UpdateUserByIdPayload>({
    mutationFn: updateUserById,
    onSuccess: (_data, variables) => {
      const userId = variables.userId;
      queryClient.invalidateQueries({
        predicate: (query) =>
          [FETCH_STAFF_LIST, FETCH_STUDENT_LIST, FETCH_PARENT_LIST].some((key) =>
            query.queryKey.includes(key),
          ),
      });

      if (userId) {
        queryClient.invalidateQueries({ queryKey: [FETCH_USER_BY_ID, userId] });
      }
    },
  });
}
