export interface LoginPayload {
  schoolId: string;
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  schoolName: string;
  schoolAddress: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  role: string;
}

export interface UpdateUserByIdPayload {
  userId: string;
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  role?: string;
  address?: string;
  accountNumber?: string;
  bankName?: string;
  admissionNumber?: string;
  phone?: string;
  dob?: string;
  active?: boolean;
}

export interface CreateNewUserPayload {
  email: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  role: string;
  address?: string;
  accountNumber?: string;
  bankName?: string;
  admissionNumber?: string;
  phone?: string;
  dob?: string;
}
export interface CreateClassPayload {
  classId: string;
  label: string;
}
export interface CreateSessionPayload {
  academicYear: string;
  firstTermStart?: Date;
  firstTermEnd?: Date;
  secondTermStart?: Date;
  secondTermEnd?: Date;
  thirdTermStart?: Date;
  thirdTermEnd?: Date;
  currentTerm?: number;
  isCurrent?: boolean;
}
