import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { SignupPayload } from '../interface';

const signUserUp = async ({
  email,
  password,
  schoolName,
  schoolAddress,
  firstName,
  middleName,
  lastName,
  gender,
  role,
}: SignupPayload): Promise<Response> => {
  const response = await axiosInstance.post(`user/create-school`, {
    email,
    password,
    schoolName,
    schoolAddress,
    firstName,
    middleName,
    lastName,
    gender,
    role,
  });
  return response.data;
};

export default function useSignup() {
  return useMutation<Response, Error, SignupPayload>({
    mutationFn: signUserUp,
  });
}
