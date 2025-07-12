import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_SCHOOL_CLASS, QUERY_STALE_TIME } from '../contants';

const getSchoolClass = async () => {
  const { data } = await axiosInstance.get('/school-class');
  return data;
};
export default function useGetSchoolClass() {
  return useQuery({
    queryKey: [FETCH_SCHOOL_CLASS],
    queryFn: getSchoolClass,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
