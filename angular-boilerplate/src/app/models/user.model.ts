export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: boolean;
}

export interface UserResponse {
  users: User[];
  total: number;
}