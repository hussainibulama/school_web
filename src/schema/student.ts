import * as Yup from 'yup';

export const CreateStudentSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string().optional(),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
  phone: Yup.string().optional(),
  gender: Yup.string().oneOf(['m', 'f'], 'Invalid gender').required('Gender is required'),
  address: Yup.string().optional(),
  dob: Yup.date().max(new Date(), 'Date of birth cannot be in the future').optional(),
});

export const UpdateStudentSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string().optional(),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).optional(),
  phone: Yup.string().optional(),
  gender: Yup.string().oneOf(['m', 'f'], 'Invalid gender').required('Gender is required'),
  address: Yup.string().optional(),
  dob: Yup.date().max(new Date(), 'Date of birth cannot be in the future').optional(),
});

export const getStudentInitialValues = (user?: any, userId?: string) => ({
  userId: userId || '',
  firstName: user?.data?.firstName || '',
  middleName: user?.data?.middleName || '',
  lastName: user?.data?.lastName || '',
  email: user?.data?.email || `${Date.now()}@gmail.com`,
  password: userId ? '' : `123456`, // Only relevant for create
  phone: user?.data?.phone || '',
  gender: user?.data?.gender || '',
  role: 'student',
  address: user?.data?.address || '',
  dob: user?.data?.dob || '',
});
