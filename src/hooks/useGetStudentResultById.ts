import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STUDENTS_RESULT_BY_ID, QUERY_STALE_TIME } from '../contants';

type Payload = {
  studentId: string;
  subjectId: string;
  academicYear: string;
  academicTerm: string;
};
const fetchResultById = async (payload: Payload): Promise<Response> => {
  const response = await axiosInstance.get(`/student-result`, {
    params: { ...payload },
  });
  return response.data;
};
export default function useGetStudentResultById({
  studentId = '',
  subjectId = '',
  academicYear = '',
  academicTerm = '',
}: Payload) {
  return useQuery<Response, Error>({
    queryKey: [FETCH_STUDENTS_RESULT_BY_ID, studentId, subjectId, academicYear, academicTerm],
    queryFn: () => fetchResultById({ studentId, subjectId, academicYear, academicTerm }),
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled: !!studentId,
  });
}
