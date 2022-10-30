import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { EmployeeFormTextField } from '../components/EmployeeFormTextField';
import { EMPLOYEE_FORM_TEXT_FIELDS } from '../constants';
import {
  selectEmployeeForm,
  selectEmployeeFormCompletionStatus,
  getEmployeeFormErrors,
  updateEmployeeForm,
  upsertEmployee,
  clearEmployeeFormErrors,
  selectEmployees
} from '../employeeSlice';
import { Employee, EmployeeGender } from '../interfaces';

export function EmployeeForm({ title }: EmployeeFormProps) {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(getEmployeeFormErrors);
  const employeeForm = useAppSelector(selectEmployeeForm);
  const isEmployeeFormComplete = useAppSelector(selectEmployeeFormCompletionStatus);
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const employees = useAppSelector(selectEmployees);

  useEffect(() => {
    if (Number(paramId)) {
      const employee = employees.find(({ id }) => id === paramId);
      if (employee) dispatch(updateEmployeeForm(employee));
    }
  }, [paramId]);

  return (
    <Box p={3} display="flex" flexDirection="column" rowGap={3}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>

      {EMPLOYEE_FORM_TEXT_FIELDS.map(({ label, property }, index) => (
        <EmployeeFormTextField
          key={index}
          label={label}
          property={property}
          error={!!errors[property]}
          value={employeeForm[property]}
          helperText={errors[property]}
        />
      ))}

      <TextField
        error={!!errors.number}
        InputProps={{
          startAdornment: <InputAdornment position="start">+65</InputAdornment>
        }}
        helperText={errors.number}
        label="Phone Number"
        variant="outlined"
        value={employeeForm.number?.toString().slice(2) || ''}
        onChange={(e) => {
          const number = e.target.value || '';
          dispatch(updateEmployeeForm({ number: +`65${number}` }));
        }}
      />

      <FormControl error={!!errors.gender}>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          row
          value={employeeForm.gender || ''}
          onChange={(e) =>
            dispatch(updateEmployeeForm({ gender: e.target.value as EmployeeGender }))
          }>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
        <FormHelperText>{errors.gender}</FormHelperText>
      </FormControl>

      <Box display="flex" flexDirection="row" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          disabled={!isEmployeeFormComplete}
          onClick={() => {
            dispatch(clearEmployeeFormErrors());
            dispatch(upsertEmployee(employeeForm as Employee))
              .unwrap()
              .then(() => navigate('employee/list'))
              .catch(() => null);
          }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

interface EmployeeFormProps {
  title: string;
}
