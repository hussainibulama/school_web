import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STAFF_LIST, QUERY_STALE_TIME } from '../contants';

const fetchStaffList = async () => {
  const { data } = await axiosInstance.get('/user/staff');
  return data;
};
export default function useGetStaffList() {
  return useQuery({
    queryKey: [FETCH_STAFF_LIST],
    queryFn: fetchStaffList,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
