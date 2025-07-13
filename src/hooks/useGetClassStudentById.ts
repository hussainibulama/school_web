import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_CLASS_STUDENTS_BY_ID, QUERY_STALE_TIME } from '../contants';

const fetchClassStudnetsById = async (schoolClassId: string): Promise<Response> => {
  const response = await axiosInstance.get(`/student-class?schoolClassId=${schoolClassId}`);
  return response.data;
};
export default function useGetClassStudentById(schoolClassId?: string) {
  return useQuery<Response, Error>({
    queryKey: [FETCH_CLASS_STUDENTS_BY_ID, schoolClassId],
    queryFn: () => fetchClassStudnetsById(schoolClassId ? schoolClassId : ''),
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled: !!schoolClassId,
  });
}
