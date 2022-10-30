import { Employee } from '../features/employee/interfaces';

export const getEmployees = (): Employee[] => {
  try {
    const employeesJSONString = localStorage.getItem('employees');
    return employeesJSONString ? JSON.parse(employeesJSONString) : [];
  } catch (err) {
    return [];
  }
};

export const addNewEmployee = (employee: Employee): Employee[] => {
  const employees = getEmployees();
  employees.push(employee);
  setEmployees(employees);
  return employees;
};

export const setEmployees = (employees: Employee[]) => {
  localStorage.setItem('employees', JSON.stringify(employees));
  return employees;
};
