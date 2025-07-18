import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_SCHOOL_INFO, QUERY_STALE_TIME } from '../contants';

const getSchoolInfo = async () => {
  const { data } = await axiosInstance.get('/school');
  return data;
};
export default function useGetSchoolInfo() {
  return useQuery({
    queryKey: [FETCH_SCHOOL_INFO],
    queryFn: getSchoolInfo,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
