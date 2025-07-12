import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_GENERAL_CLASS_LIST, QUERY_STALE_TIME } from '../contants';

const getSchoolClass = async () => {
  const { data } = await axiosInstance.get('/class');
  return data;
};
export default function useGetGeneralClass() {
  return useQuery({
    queryKey: [FETCH_GENERAL_CLASS_LIST],
    queryFn: getSchoolClass,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
