import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import axiosInstance from '../api/axios';

export interface CreateNewUserPayload {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  role: string;
  address?: string;
  accountNumber?: string;
  bankName?: string;
  admissionNumber?: string;
  phone?: string;
  dob?: string;
}

export const fetchStudentList = async () => {
  const { data } = await axiosInstance.get('/user/student');
  return data;
};
export const fetchParentList = async () => {
  const { data } = await axiosInstance.get('/user/parent');
  return data;
};
export const createUser = async ({
  email,
  password,
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
}: CreateNewUserPayload): Promise<Response> => {
  const response = await axiosInstance.post(`/user`, {
    email,
    password,
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
  });
  return response.data;
};

export const useStudentList = () =>
  useQuery({
    queryKey: ['fetchStudentList'],
    queryFn: fetchStudentList,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
export const useParentList = () =>
  useQuery({
    queryKey: ['fetchParentList'],
    queryFn: fetchParentList,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
export const useCreateUsers = () => {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, CreateNewUserPayload>({
    mutationFn: createUser,
    onSuccess: () => {
      ['fetchStaffList', 'fetchStudentList', 'fetchParentList'].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      );
    },
  });
};
