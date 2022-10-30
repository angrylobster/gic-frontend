import { Middleware } from '@reduxjs/toolkit';
import { setEmployees } from './localStorage';

export const rehydrateStore: Middleware = () => (next) => (action) => {
  if (
    action.type === 'employee/upsertEmployee/fulfilled' ||
    action.type === 'employee/fetchEmployees/fulfilled' ||
    action.type === 'employee/deleteEmployee/fulfilled'
  ) {
    setEmployees(action.payload);
  }
  return next(action);
};
