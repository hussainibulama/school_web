import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_SCHOOL_CLASS } from '../contants';

const assignTeacher = async ({
  teacherId,
  schoolClassId,
}: {
  teacherId: string;
  schoolClassId: string;
}): Promise<Response> => {
  const response = await axiosInstance.post(`/teacher-class`, {
    teacherId,
    schoolClassId,
  });
  return response.data;
};

export default function useAssignTeacher() {
  const queryClient = useQueryClient();

  return useMutation<
    Response,
    Error,
    {
      teacherId: string;
      schoolClassId: string;
    }
  >({
    mutationFn: assignTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => [FETCH_SCHOOL_CLASS].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
