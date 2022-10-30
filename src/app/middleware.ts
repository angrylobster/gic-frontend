import { Middleware } from '@reduxjs/toolkit';
import { setEmployees } from './localStorage';

export const localStorageMiddleware: Middleware = () => (next) => (action) => {
  if (
    action.type === 'employee/fetchEmployees/fulfilled' ||
    action.type === 'employee/deleteEmployee/fulfilled'
  ) {
    setEmployees(action.payload);
  }
  return next(action);
};
