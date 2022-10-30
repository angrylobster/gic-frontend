import { Employee } from '../features/employee/interfaces';

export const getEmployees = (): Employee[] => {
  try {
    const employeesJSONString = localStorage.getItem('employees');
    return employeesJSONString ? JSON.parse(employeesJSONString) : [];
  } catch (err) {
    return [];
  }
};

export const setEmployees = (employees: Employee[]) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};
