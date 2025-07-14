import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STUDENTS_LINK_WITH_CLASS, QUERY_STALE_TIME } from '../contants';

const fetchStudentWithClass = async () => {
  const { data } = await axiosInstance.get('/student-class');
  return data;
};
export default function useGetStudentsLinkWithClass() {
  return useQuery({
    queryKey: [FETCH_STUDENTS_LINK_WITH_CLASS],
    queryFn: fetchStudentWithClass,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
