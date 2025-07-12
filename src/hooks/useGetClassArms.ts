import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_CLASS_ARMS, QUERY_STALE_TIME } from '../contants';

const fetchClassArms = async () => {
  const { data } = await axiosInstance.get('/class-arms');
  return data;
};
export default function useGetClassArms() {
  return useQuery({
    queryKey: [FETCH_CLASS_ARMS],
    queryFn: fetchClassArms,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
