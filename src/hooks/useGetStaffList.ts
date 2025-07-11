import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STAFF_LIST } from '../contants';

const fetchStaffList = async () => {
  const { data } = await axiosInstance.get('/user/staff');
  return data;
};
export default function useGetStaffList() {
  return useQuery({
    queryKey: [FETCH_STAFF_LIST],
    queryFn: fetchStaffList,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
