import * as Yup from 'yup';

export const CreateStaffSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string().optional(),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).required('Password is required'),
  phone: Yup.string().required('Phone number is required'),
  gender: Yup.string().oneOf(['m', 'f'], 'Invalid gender').required('Gender is required'),
  role: Yup.string()
    .oneOf(['proprietor', 'teacher', 'student', 'parent', 'admin'], 'Invalid role')
    .required('Role is required'),
  address: Yup.string().optional(),
  accountNumber: Yup.string().optional(),
  bankName: Yup.string().optional(),
  dob: Yup.date().max(new Date(), 'Date of birth cannot be in the future').optional(),
});

export const UpdateStaffSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string().optional(),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6).optional(),
  phone: Yup.string().required('Phone number is required'),
  gender: Yup.string().oneOf(['m', 'f'], 'Invalid gender').required('Gender is required'),
  role: Yup.string()
    .oneOf(['proprietor', 'teacher', 'student', 'parent', 'admin'], 'Invalid role')
    .required('Role is required'),
  address: Yup.string().optional(),
  accountNumber: Yup.string().optional(),
  bankName: Yup.string().optional(),
  dob: Yup.date().max(new Date(), 'Date of birth cannot be in the future').optional(),
});

export const getStaffInitialValues = (user?: any, userId?: string) => ({
  userId: userId || '',
  firstName: user?.data?.firstName || '',
  middleName: user?.data?.middleName || '',
  lastName: user?.data?.lastName || '',
  email: user?.data?.email || '',
  password: '', // Only relevant for create
  phone: user?.data?.phone || '',
  gender: user?.data?.gender || '',
  role: user?.data?.role || '',
  address: user?.data?.address || '',
  accountNumber: user?.data?.accountNumber || '',
  bankName: user?.data?.bankName || '',
  dob: user?.data?.dob || '',
});
