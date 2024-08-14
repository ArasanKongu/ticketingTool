export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  status?: number;
  superAdminCode?: string;
}

export interface UserProfile {
  user: User;
  profile: {
    password: string;
    profile_name: string;
    emp_no: string;
    mobile_no: string;
    status: number;
  };
}
