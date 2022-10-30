import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { httpClient } from './httpClient';
import { Employee, EmployeeFormErrors, EmployeeState } from './interfaces';
import { validateEmployee } from './validators';

const initialState: EmployeeState = {
  employees: [],
  status: 'idle',
  employeeForm: {},
  employeeFormErrors: {}
};

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async () => {
  const { data: employees } = await httpClient.get('employees');
  return employees;
});

export const upsertEmployee = createAsyncThunk<
  Employee[],
  Employee,
  { state: { employee: EmployeeState } }
>('employee/upsertEmployee', async (payload: Employee, { rejectWithValue, getState }) => {
  const errors = validateEmployee(payload);
  if (Object.values(errors).length) return rejectWithValue(errors);
  const employees = getState().employee.employees;
  if (payload.id) {
    return employees.map((employee) => (payload.id === employee.id ? payload : employee));
  } else {
    const lastId = Math.max(...employees.map(({ id }) => Number(id)));
    return [...employees, { ...payload, id: `${lastId + 1}` }];
  }
});

export const deleteEmployee = createAsyncThunk<
  Employee[],
  string,
  { state: { employee: EmployeeState } }
>('employee/deleteEmployee', async (deletionId: string, { getState }) => {
  const employees = getState().employee.employees;
  return employees.filter(({ id }) => id !== deletionId);
});

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    updateEmployeeForm: (state, action: PayloadAction<Partial<Employee>>) => {
      state.employeeForm = {
        ...state.employeeForm,
        ...action.payload
      };
    },
    clearEmployeeFormErrors: (state) => {
      state.employeeFormErrors = {};
    },
    clearEmployeeForm: (state) => {
      state.employeeForm = {};
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'idle';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch employees';
      })
      .addCase(upsertEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(upsertEmployee.fulfilled, (state, action) => {
        state.status = 'idle';
        state.employees = action.payload;
      })
      .addCase(upsertEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.employeeFormErrors = action.payload as EmployeeFormErrors;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = 'idle';
        state.employees = action.payload;
      })
      .addCase(deleteEmployee.rejected, (state) => {
        state.status = 'failed';
      })
});

export const { updateEmployeeForm, clearEmployeeFormErrors, clearEmployeeForm } =
  employeeSlice.actions;

export const selectEmployees = (state: RootState) => state.employee.employees;
export const getEmployeesStatus = (state: RootState) => state.employee.status;
export const selectEmployeeForm = (state: RootState) => state.employee.employeeForm;
export const getEmployeeFormErrors = (state: RootState) => state.employee.employeeFormErrors;
export const selectEmployeeFormCompletionStatus = (state: RootState) => {
  const { firstName, lastName, email, number, gender } = state.employee.employeeForm;
  return firstName && lastName && email && number !== undefined && gender;
};

export default employeeSlice.reducer;
