import { TextField } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { updateEmployeeForm } from '../employeeSlice';
import { Employee } from '../interfaces';

export function EmployeeFormTextField({
  label,
  error,
  helperText,
  property,
  value = ''
}: EmployeeFormTextFieldProps) {
  const dispatch = useAppDispatch();

  return (
    <TextField
      label={label}
      variant="outlined"
      error={error}
      helperText={helperText}
      value={value}
      onChange={(e) => dispatch(updateEmployeeForm({ [property]: e.target.value }))}
    />
  );
}

export interface EmployeeFormTextFieldProps {
  label: string;
  error?: boolean;
  helperText?: string;
  property: Exclude<keyof Employee, 'number' | 'id' | 'gender'>;
  value?: string;
}
