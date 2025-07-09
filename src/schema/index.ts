import * as Yup from 'yup';

export function LoginSchema(requireSchoolId: boolean) {
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

export function SignupSchema() {
  return Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    schoolName: Yup.string()
      .min(6, 'School Name must be at least 6 characters')
      .required('School Name is required'),
    schoolAddress: Yup.string().required('School Address is required'),
    firstName: Yup.string().required('First Name is required'),
    middleName: Yup.string().optional(),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
  });
}
