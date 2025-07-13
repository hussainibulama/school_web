import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_PARENTS_LINK_BY_ID, QUERY_STALE_TIME } from '../contants';

const fetchParentsLinkById = async (parentId: string): Promise<Response> => {
  const response = await axiosInstance.get(`/parent-student?parentId=${parentId}`);
  return response.data;
};
export default function useGetParentLinksById(parentId?: string) {
  return useQuery<Response, Error>({
    queryKey: [FETCH_PARENTS_LINK_BY_ID, parentId],
    queryFn: () => fetchParentsLinkById(parentId ? parentId : ''),
    staleTime: QUERY_STALE_TIME,
    refetchOnWindowFocus: false,
    enabled: !!parentId,
  });
}
