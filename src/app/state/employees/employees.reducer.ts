import { createReducer, on } from '@ngrx/store';
import * as EmployeesActions from './employees.actions';
import { Employee } from '../../shared/models/employee.model';

export interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeesReducer = createReducer(
  initialState,
  on(EmployeesActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmployeesActions.loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loading: false,
    error: null,
  })),
  on(EmployeesActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeesActions.addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    loading: false,
    error: null,
  })),
  on(EmployeesActions.addEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeesActions.editEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: state.employees.map((emp) =>
      emp.id === employee.id ? employee : emp
    ),
    loading: false,
    error: null,
  })),
  on(EmployeesActions.editEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmployeesActions.deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((emp) => emp.id !== id),
    loading: false,
    error: null,
  })),
  on(EmployeesActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
