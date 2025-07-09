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
