import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import employeeReducer from '../features/employee/employeeSlice';
import { getEmployees } from './localStorage';
import { localStorageMiddleware } from './middleware';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    employee: employeeReducer
  },
  preloadedState: {
    employee: {
      employees: getEmployees(),
      employeeForm: {},
      employeeFormErrors: {},
      status: 'idle'
    }
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorageMiddleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
