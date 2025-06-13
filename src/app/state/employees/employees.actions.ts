import { createAction, props } from '@ngrx/store';
import { Employee } from '../../shared/models/employee.model';

/** Load all employees */
export const loadEmployees = createAction('[Employees] Load');
export const loadEmployeesSuccess = createAction(
  '[Employees] Load Success',
  props<{ employees: Employee[] }>()
);
export const loadEmployeesFailure = createAction(
  '[Employees] Load Failure',
  props<{ error: string }>()
);

/** Add employee */
export const addEmployee = createAction(
  '[Employees] Add',
  props<{ employee: Employee }>()
);
export const addEmployeeSuccess = createAction(
  '[Employees] Add Success',
  props<{ employee: Employee }>()
);
export const addEmployeeFailure = createAction(
  '[Employees] Add Failure',
  props<{ error: string }>()
);

/** Edit employee */
export const editEmployee = createAction(
  '[Employees] Edit',
  props<{ employee: Employee }>()
);
export const editEmployeeSuccess = createAction(
  '[Employees] Edit Success',
  props<{ employee: Employee }>()
);
export const editEmployeeFailure = createAction(
  '[Employees] Edit Failure',
  props<{ error: string }>()
);

/** Delete employee */
export const deleteEmployee = createAction(
  '[Employees] Delete',
  props<{ id: number }>()
);
export const deleteEmployeeSuccess = createAction(
  '[Employees] Delete Success',
  props<{ id: number }>()
);
export const deleteEmployeeFailure = createAction(
  '[Employees] Delete Failure',
  props<{ error: string }>()
);
