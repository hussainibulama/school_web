import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STUDENTS_RESULT_BY_ID, QUERY_STALE_TIME } from '../contants';

const fetchResultById = async (payload: Record<string, any>): Promise<any> => {
  const response = await axiosInstance.get('/student-result', {
    params: payload,
  });
  return response.data;
};

export default function useGetStudentResultById(payload: Record<string, any>) {
  return useQuery<any, Error>({
    queryKey: [FETCH_STUDENTS_RESULT_BY_ID, payload],
    queryFn: () => fetchResultById(payload),
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled: !!payload, // Optional: enable only if key param exists
  });
}
