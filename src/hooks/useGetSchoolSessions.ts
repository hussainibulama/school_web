import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_SCHOOL_SESSION, QUERY_STALE_TIME } from '../contants';

const getSchoolSession = async () => {
  const { data } = await axiosInstance.get('/session');
  return data;
};
export default function useGetSchoolSessions() {
  return useQuery({
    queryKey: [FETCH_SCHOOL_SESSION],
    queryFn: getSchoolSession,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
