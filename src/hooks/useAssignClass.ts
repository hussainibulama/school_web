import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import {
  FETCH_SCHOOL_CLASS,
  FETCH_PARENT_LIST,
  FETCH_STUDENT_LIST,
  FETCH_CLASS_STUDENTS_BY_ID,
  FETCH_PARENTS_LINK_BY_ID,
} from '../contants';

const assignClass = async ({
  studentIds,
  schoolClassId,
}: {
  studentIds: string[];
  schoolClassId: string;
}): Promise<Response> => {
  const response = await axiosInstance.post(`/student-class`, {
    studentIds,
    schoolClassId,
  });
  return response.data;
};

export default function useAssignClass() {
  const queryClient = useQueryClient();

  return useMutation<
    Response,
    Error,
    {
      studentIds: string[];
      schoolClassId: string;
    }
  >({
    mutationFn: assignClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            FETCH_STUDENT_LIST,
            FETCH_PARENT_LIST,
            FETCH_SCHOOL_CLASS,
            FETCH_CLASS_STUDENTS_BY_ID,
            FETCH_PARENTS_LINK_BY_ID,
          ].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
