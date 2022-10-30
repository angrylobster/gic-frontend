import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { EMPLOYEE_COLUMNS } from '../constants';
import { selectEmployees, getEmployeesStatus, clearEmployeeForm } from '../employeeSlice';
import { EmployeeTable } from '../components/EmployeeTable';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export function EmployeeList() {
  const employees = useAppSelector(selectEmployees);
  const employeesStatus = useAppSelector(getEmployeesStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearEmployeeForm());
  }, []);

  return (
    <Box sx={{ height: '100%' }}>
      <Box display="flex" justifyContent="flex-end" p={3}>
        <Button
          color="info"
          variant="outlined"
          startIcon={<AccountCircle />}
          onClick={() => navigate('/employee/add')}>
          Add
        </Button>
      </Box>
      <EmployeeTable columns={EMPLOYEE_COLUMNS} rows={employees} status={employeesStatus} />
    </Box>
  );
}
