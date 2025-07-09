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
export interface UpdateUserByIdPayload {
  userId: string;
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  role?: string;
  address?: string;
  accountNumber?: string;
  bankName?: string;
  admissionNumber?: string;
  phone?: string;
  dob?: string;
  active?: boolean;
}

export const fetchStaffList = async () => {
  const { data } = await axiosInstance.get('/user/staff');
  return data;
};
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
export const fetchUserById = async (userId: string): Promise<Response> => {
  const response = await axiosInstance.get(`/user/${userId}`);
  return response.data;
};
export const updateUserById = async ({
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

export const useStaffList = () =>
  useQuery({
    queryKey: ['fetchStaffList'],
    queryFn: fetchStaffList,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
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
export const useFetchUserById = (userId?: string) => {
  return useQuery<Response, Error>({
    queryKey: ['fetchUserById', userId],
    queryFn: () => fetchUserById(userId ? userId : ''),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
};
export const useUpdateUserById = () => {
  const queryClient = useQueryClient();
  return useMutation<Response, Error, UpdateUserByIdPayload>({
    mutationFn: updateUserById,
    onSuccess: (_data, variables) => {
      const userId = variables.userId;
      ['fetchStaffList', 'fetchStudentList', 'fetchParentList'].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] }),
      );
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ['fetchUserById', userId] });
      }
    },
  });
};
