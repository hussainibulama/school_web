import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_ACADEMIC_YEARS, QUERY_STALE_TIME } from '../contants';

const getAcademicYears = async () => {
  const { data } = await axiosInstance.get('/academic-years');
  return data;
};
export default function useGetAcademicYears() {
  return useQuery({
    queryKey: [FETCH_ACADEMIC_YEARS],
    queryFn: getAcademicYears,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
