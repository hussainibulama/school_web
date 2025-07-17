import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { FETCH_STUDENTS_ATTENDANCE } from '../contants';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

// Define each student’s attendance input
type AttendanceEntry = {
  studentId: string;
  status: AttendanceStatus;
};

// The input payload to the service
type CreateAttendancePayload = {
  schoolClassId: string;
  date: string; // Format: 'YYYY-MM-DD'
  records: AttendanceEntry[];
};
const createAttendance = async ({
  schoolClassId,
  date,
  records,
}: CreateAttendancePayload): Promise<Response> => {
  const response = await axiosInstance.post(`/attendance`, {
    schoolClassId,
    date,
    records,
  });
  return response.data;
};

export default function useCreateAttendance() {
  const queryClient = useQueryClient();

  return useMutation<Response, Error, CreateAttendancePayload>({
    mutationFn: createAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          [FETCH_STUDENTS_ATTENDANCE].some((key) => query.queryKey.includes(key)),
      });
    },
  });
}
