import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_GENERAL_SUBJECTS_LIST, QUERY_STALE_TIME } from '../contants';

const getSubjects = async () => {
  const { data } = await axiosInstance.get('/subjects');
  return data;
};

export default function useGetGeneralSubjects() {
  return useQuery({
    queryKey: [FETCH_GENERAL_SUBJECTS_LIST],
    queryFn: getSubjects,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
