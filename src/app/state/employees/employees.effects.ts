import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as EmployeesActions from './employees.actions';
import { EmployeeService } from '../../shared/services/employee.service';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class EmployeesEffects {
  constructor(private actions$: Actions, private empService: EmployeeService) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.loadEmployees),
      mergeMap(() =>
        this.empService.getEmployees().pipe(
          map((employees) =>
            EmployeesActions.loadEmployeesSuccess({ employees })
          ),
          catchError((err) =>
            of(EmployeesActions.loadEmployeesFailure({ error: err.message }))
          )
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.addEmployee),
      mergeMap(({ employee }) =>
        this.empService.addEmployee(employee).pipe(
          map((emp) => EmployeesActions.addEmployeeSuccess({ employee: emp })),
          catchError((err) =>
            of(EmployeesActions.addEmployeeFailure({ error: err.message }))
          )
        )
      )
    )
  );

  editEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.editEmployee),
      mergeMap(({ employee }) =>
        this.empService.updateEmployee(employee).pipe(
          map((emp) => EmployeesActions.editEmployeeSuccess({ employee: emp })),
          catchError((err) =>
            of(EmployeesActions.editEmployeeFailure({ error: err.message }))
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActions.deleteEmployee),
      mergeMap(({ id }) =>
        this.empService.deleteEmployee(id).pipe(
          map(() => EmployeesActions.deleteEmployeeSuccess({ id })),
          catchError((err) =>
            of(EmployeesActions.deleteEmployeeFailure({ error: err.message }))
          )
        )
      )
    )
  );
}
