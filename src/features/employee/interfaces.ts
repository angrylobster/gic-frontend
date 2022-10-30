import { ThunkStatus } from '../interfaces';

export type EmployeeGender = 'male' | 'female';

export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  number: number;
  gender: EmployeeGender;
  id: string;
}

export type EmployeeFormErrors = Partial<Record<keyof Employee, string>>;

export interface EmployeeState {
  employees: Employee[];
  status: ThunkStatus;
  error?: string;
  employeeForm: Partial<Employee>;
  employeeFormErrors: Partial<EmployeeFormErrors>;
}
