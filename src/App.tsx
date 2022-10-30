import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  fetchEmployees,
  selectEmployees,
  getEmployeesStatus
} from './features/employee/employeeSlice';
import { EmployeeForm } from './features/employee/pages/EmployeeForm';
import { EmployeeList } from './features/employee/pages/EmployeeList';

function App() {
  const employees = useAppSelector(selectEmployees);
  const dispatch = useAppDispatch();

  const status = useAppSelector(getEmployeesStatus);

  useEffect(() => {
    if (!employees.length && status === 'idle') dispatch(fetchEmployees());
  }, [employees]);

  return (
    <Routes>
      <Route path="/employee/list" element={<EmployeeList />} />
      <Route path="/employee/add" element={<EmployeeForm title="Add Employee" />} />
      <Route path="employee/edit/:id" element={<EmployeeForm title="Edit Employee" />} />
      <Route path="*" element={<Navigate to="/employee/list" replace />} />
    </Routes>
  );
}

export default App;
