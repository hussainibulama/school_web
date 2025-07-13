import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_SCHOOL_CLASS, FETCH_PARENT_LIST, FETCH_STUDENT_LIST } from '../contants';

const assignParent = async ({
  parentId,
  studentId,
}: {
  parentId: string;
  studentId: string;
}): Promise<Response> => {
  const response = await axiosInstance.post(`/parent-student`, {
    parentId,
    studentId,
  });
  return response.data;
};

export default function useAssignParent() {
  const queryClient = useQueryClient();

  return useMutation<
    Response,
    Error,
    {
      parentId: string;
      studentId: string;
    }
  >({
    mutationFn: assignParent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [FETCH_STUDENT_LIST, FETCH_PARENT_LIST, FETCH_SCHOOL_CLASS].some((key) =>
            query.queryKey.includes(key),
          ),
      });
    },
  });
}
