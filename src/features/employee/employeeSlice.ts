import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { httpClient } from './httpClient';
import { Employee, EmployeeFormErrors, EmployeeState } from './interfaces';
import { validateEmployee } from './validators';
import { addNewEmployee, getEmployees } from '../../app/localStorage';

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

export const upsertEmployee = createAsyncThunk(
  'employee/upsertEmployee',
  async (payload: Omit<Employee, 'id'> & { id?: string }, { rejectWithValue }) => {
    const errors = validateEmployee(payload);
    if (Object.values(errors).length) return rejectWithValue(errors);
    const employees = getEmployees();
    const existingEmployee = payload.id && employees.find(({ id }) => payload.id === id);
    if (existingEmployee) {
      existingEmployee.firstName = payload.firstName;
      existingEmployee.lastName = payload.lastName;
      existingEmployee.email = payload.email;
      existingEmployee.number = payload.number;
      existingEmployee.gender = payload.gender;
      return employees;
    } else {
      const maxId = Math.max(...employees.map(({ id }) => Number(id)));
      return addNewEmployee({ ...payload, id: `${maxId + 1}` });
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (deletionId: string) => {
    const employees = getEmployees();
    return employees.filter(({ id }) => id !== deletionId);
  }
);

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
