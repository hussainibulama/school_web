import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_PARENT_LIST, QUERY_STALE_TIME } from '../contants';

const fetchParentList = async () => {
  const { data } = await axiosInstance.get('/user/parent');
  return data;
};
export default function useParentList() {
  return useQuery({
    queryKey: [FETCH_PARENT_LIST],
    queryFn: fetchParentList,
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
  });
}
