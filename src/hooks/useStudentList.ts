import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STUDENT_LIST, QUERY_STALE_TIME } from '../contants';

const fetchStudentList = async () => {
  const { data } = await axiosInstance.get('/user/student');
  return data;
};
export default function useStudentList() {
  return useQuery({
    queryKey: [FETCH_STUDENT_LIST],
    queryFn: fetchStudentList,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
