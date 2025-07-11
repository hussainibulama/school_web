import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_USER_BY_ID, QUERY_STALE_TIME } from '../contants';

const fetchUserById = async (userId: string): Promise<Response> => {
  const response = await axiosInstance.get(`/user/${userId}`);
  return response.data;
};
export default function useFetchUserById(userId?: string) {
  return useQuery<Response, Error>({
    queryKey: [FETCH_USER_BY_ID, userId],
    queryFn: () => fetchUserById(userId ? userId : ''),
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
}
