import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_SCHOOL_CLASS } from '../contants';

const createClassSubjects = async ({
  schoolClassId,
  subjectIds,
}: {
  schoolClassId: string;
  subjectIds: string[];
}): Promise<Response> => {
  const response = await axiosInstance.post(`/class-subjects`, {
    schoolClassId,
    subjectIds,
  });
  return response.data;
};

export default function useAddClassSubjects() {
  const queryClient = useQueryClient();

  return useMutation<
    Response,
    Error,
    {
      schoolClassId: string;
      subjectIds: string[];
    }
  >({
    mutationFn: createClassSubjects,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_SCHOOL_CLASS].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
