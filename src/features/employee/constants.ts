import { AgGridColumnProps } from 'ag-grid-react';
import { EmployeeFormTextFieldProps } from './components/EmployeeFormTextField';
import { EmployeeTableAction } from './components/EmployeeTableAction';

export const EMPLOYEE_COLUMNS: AgGridColumnProps[] = [
  {
    field: 'firstName',
    resizable: true,
    width: 150
  },
  {
    field: 'lastName',
    resizable: true,
    width: 150
  },
  {
    field: 'email',
    resizable: true,
    width: 300
  },
  {
    field: 'number',
    resizable: true,
    width: 150
  },
  {
    field: 'gender',
    resizable: true,
    width: 100
  },
  {
    field: 'action',
    cellRenderer: EmployeeTableAction,
    cellStyle: {
      display: 'flex',
      padding: '4px 0px',
      columnGap: '8px'
    },
    width: 200
  }
];

export const EMPLOYEE_BACKEND_HOSTNAME = 'https://6164f6e709a29d0017c88ed9.mockapi.io/fetest';
export const EMPLOYEE_NAME_LENGTH_MIN = 6;
export const EMPLOYEE_NAME_LENGTH_MAX = 10;
export const EMPLOYEE_NAME_VALIDATION_ERROR = `Name must be between ${EMPLOYEE_NAME_LENGTH_MIN} and ${EMPLOYEE_NAME_LENGTH_MAX} characters`;
export const EMPLOYEE_EMAIL_VALIDATION_ERROR = 'Email must be a valid email address';
export const EMPLOYEE_PHONE_NUMBER_VALIDATION_ERROR = 'Must be a valid Singapore phone number';
export const EMPLOYEE_GENDER_VALIDATION_ERROR = 'Please select a gender';
export const EMPLOYEE_FORM_TEXT_FIELDS: EmployeeFormTextFieldProps[] = [
  {
    label: 'First Name',
    property: 'firstName'
  },
  {
    label: 'Last Name',
    property: 'lastName'
  },
  {
    label: 'Email',
    property: 'email'
  }
];
