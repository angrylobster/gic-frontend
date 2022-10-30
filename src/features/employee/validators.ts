import {
  EMPLOYEE_EMAIL_VALIDATION_ERROR,
  EMPLOYEE_GENDER_VALIDATION_ERROR,
  EMPLOYEE_NAME_LENGTH_MAX,
  EMPLOYEE_NAME_LENGTH_MIN,
  EMPLOYEE_NAME_VALIDATION_ERROR,
  EMPLOYEE_PHONE_NUMBER_VALIDATION_ERROR
} from './constants';
import { Employee, EmployeeFormErrors, EmployeeGender } from './interfaces';

const validNameLength = (name?: string) => {
  if (!name) return false;
  const nameLength = name.trim().length;
  return nameLength >= EMPLOYEE_NAME_LENGTH_MIN && nameLength <= EMPLOYEE_NAME_LENGTH_MAX;
};

const validEmail = (email?: string) =>
  email &&
  email.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );

const validPhoneNumber = (phoneNumber?: number) =>
  phoneNumber &&
  !isNaN(phoneNumber) &&
  phoneNumber.toString().match(/^[6][5]([6]|[8]|[9])\d{7}(?!\d)/g);

const validGender = (gender?: EmployeeGender) => gender === 'male' || gender === 'female';

export const validateEmployee = (employee: Partial<Employee>): EmployeeFormErrors => {
  const errors: EmployeeFormErrors = {};

  if (!validNameLength(employee.firstName)) errors.firstName = EMPLOYEE_NAME_VALIDATION_ERROR;
  if (!validNameLength(employee.lastName)) errors.lastName = EMPLOYEE_NAME_VALIDATION_ERROR;
  if (!validEmail(employee.email)) errors.email = EMPLOYEE_EMAIL_VALIDATION_ERROR;
  if (!validPhoneNumber(employee.number)) errors.number = EMPLOYEE_PHONE_NUMBER_VALIDATION_ERROR;
  if (!validGender(employee.gender)) errors.gender = EMPLOYEE_GENDER_VALIDATION_ERROR;

  return errors;
};
