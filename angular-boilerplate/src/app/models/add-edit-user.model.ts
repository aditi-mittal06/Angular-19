export interface AddEditUserData {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status?: boolean;
}

export interface AddEditUserFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface AddEditUserDialogData {
  user?: User;
  currentUserRole: UserRole;
  mode: 'add' | 'edit';
}

export interface AddEditUserResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export enum UserRole {
  ADMIN = 'Admin',
  MANAGER = 'Manager',
  USER = 'User'
}

export interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  disabled?: boolean;
}

export interface ValidationErrors {
  email?: string[];
  firstName?: string[];
  lastName?: string[];
  role?: string[];
}

export interface FormFieldConfig {
  label: string;
  placeholder: string;
  maxLength?: number;
  required: boolean;
  type: 'text' | 'email' | 'select';
  options?: RoleOption[];
}

// Re-export User interface for convenience
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: boolean;
}