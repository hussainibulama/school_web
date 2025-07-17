import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STUDENTS_ATTENDANCE, QUERY_STALE_TIME } from '../contants';

const fetchAttendance = async (payload: any) => {
  const { data } = await axiosInstance.get('/attendance', { params: { ...payload } });
  return data;
};

export default function useGetAttendance(payload: any) {
  return useQuery({
    queryKey: [FETCH_STUDENTS_ATTENDANCE, payload],
    queryFn: () => fetchAttendance(payload),
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
