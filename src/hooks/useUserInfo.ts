import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_USER_INFO } from '../contants';

const fetchUserInfo = async () => {
  const { data } = await axiosInstance.get('/user');
  return data;
};
export default function useUserInfo() {
  return useQuery({
    queryKey: [FETCH_USER_INFO],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
