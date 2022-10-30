import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import employeeReducer from '../features/employee/employeeSlice';
import { getEmployees } from './localStorage';
import { rehydrateStore } from './middleware';

export const store = configureStore({
  reducer: {
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
    return getDefaultMiddleware().concat(rehydrateStore);
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
