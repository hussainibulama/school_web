import * as Yup from 'yup';

export default function loginSchema(requireSchoolId: boolean) {
  return Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    schoolId: Yup.string().when([], {
      is: () => requireSchoolId,
      then: (schema) => schema.required('School is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  });
}
