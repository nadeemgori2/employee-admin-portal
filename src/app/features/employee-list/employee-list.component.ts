import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as EmployeesActions from '../../state/employees/employees.actions';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import {
  selectEmployees,
  selectEmployeesLoading,
} from '../../state/employees/employees.selectors';
import { selectRole } from '../../state/auth/auth.selectors';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { AddEmployeeDialogComponent } from '../dialogs/add-employee-dialog/add-employee-dialog.component';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeListLogicService } from '../../shared/services/employee-list-logic.service';
import { EmployeeTableComponent } from '../../shared/components/employee-table.component/employee-table.component';
import { DeleteConfirmDialogComponent } from '../dialogs/delete-confirm-dialog/delete-confirm-dialog.component';

/**
 * Employee List Component
 * - Displays a paginated, selectable list of employees.
 * - Supports add, edit, delete (single & bulk), and view actions.
 * - Responsive and accessible, leveraging Angular Material and Bootstrap utilities.
 */
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatCardModule,
    MatCheckboxModule,
    EmployeeTableComponent,
    PaginationComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  /** Table columns to display */
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'address',
    'phone',
    'actions',
  ];

  /** All employees from store */
  employees$: Observable<Employee[]>;
  /** Loading state from store */
  loading$: Observable<boolean>;
  /** Employees for current page */
  paginatedEmployees$: Observable<Employee[]>;

  /** User role observable */
  userRole$ = this.store.select(selectRole);

  /** Set of selected employee IDs */
  selectedIds = new Set<number>();
  /** Total number of employees */
  totalEmployees = 0;
  /** Page size for pagination */
  pageSize = 10;
  /** Current page number */
  currentPage = 1;

  /** Employees on the current page */
  currentPageEmployees: Employee[] = [];

  /** Returns true if any employees are selected */
  get hasSelection(): boolean {
    return this.selectedIds.size > 0;
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store,
    private logic: EmployeeListLogicService
  ) {
    this.employees$ = this.store.select(selectEmployees);
    this.loading$ = this.store.select(selectEmployeesLoading);

    // Paginate employees for current page
    this.paginatedEmployees$ = this.employees$.pipe(
      map((list) => {
        if (!list) return [];
        const page = this.logic.getPaginatedPage(
          list,
          this.currentPage,
          this.pageSize
        );
        this.currentPageEmployees = page;
        return page;
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(EmployeesActions.loadEmployees());
    this.employees$.subscribe((list) => {
      this.totalEmployees = list?.length ?? 0;
    });
  }

  /** Toggle selection for a single employee */
  toggleSelection(emp: Employee): void {
    this.logic.toggleSelection(this.selectedIds, emp);
  }

  /** Check if an employee is selected */
  isSelected(emp: Employee): boolean {
    return this.logic.isSelected(this.selectedIds, emp);
  }

  /** Check if all employees on the current page are selected */
  isAllSelected(): boolean {
    return this.logic.isAllSelected(
      this.currentPageEmployees,
      this.selectedIds
    );
  }

  /** Check if any employees on the current page are selected */
  isAnySelected(): boolean {
    return this.logic.isAnySelected(
      this.currentPageEmployees,
      this.selectedIds
    );
  }

  /** Toggle selection for all employees on the current page */
  masterToggle(): void {
    this.logic.masterToggle(this.currentPageEmployees, this.selectedIds);
  }

  /** Open dialog to add a new employee */
  onAdd(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(EmployeesActions.addEmployee({ employee: result }));
      }
    });
  }

  /** Open dialog to edit an employee */
  onEdit(employee: Employee): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
      data: employee,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          EmployeesActions.editEmployee({
            employee: { ...employee, ...result },
          })
        );
      }
    });
  }

  /** Open confirmation dialog to delete an employee */
  onDelete(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '320px',
      data: { name: employee.name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          EmployeesActions.deleteEmployee({ id: employee.id })
        );
      }
    });
  }

  /** Navigate to employee detail view */
  onView(employee: Employee): void {
    this.router.navigate(['/employees', employee.id]);
  }

  /** Bulk delete selected employees with confirmation */
  onBulkDelete(): void {
    if (this.selectedIds.size === 0) return;

    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '320px',
      data: { name: `${this.selectedIds.size} selected employees` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        for (const id of Array.from(this.selectedIds)) {
          this.store.dispatch(EmployeesActions.deleteEmployee({ id }));
        }
        this.selectedIds.clear();

        // After deletion, adjust current page if needed
        setTimeout(() => {
          this.employees$
            .subscribe((list) => {
              this.totalEmployees = list?.length ?? 0;
              const maxPage =
                Math.ceil(this.totalEmployees / this.pageSize) || 1;
              if (this.currentPage > maxPage) {
                this.currentPage = maxPage;
              }
              // Refresh paginatedEmployees$
              this.paginatedEmployees$ = this.employees$.pipe(
                map((list) => {
                  if (!list) return [];
                  const start = (this.currentPage - 1) * this.pageSize;
                  const pageData = list.slice(start, start + this.pageSize);
                  this.currentPageEmployees = pageData;
                  return pageData;
                })
              );
            })
            .unsubscribe();
        }, 200);
      }
    });
  }

  /** Handle page event from Angular Material paginator */
  onPage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    // Implement backend or client-side paging as needed
  }

  /** Handle page change from custom pagination component */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginatedEmployees$ = this.employees$.pipe(
      map((list) => {
        if (!list) return [];
        const start = (this.currentPage - 1) * this.pageSize;
        const pageData = list.slice(start, start + this.pageSize);
        this.currentPageEmployees = pageData;
        return pageData;
      })
    );
  }
}
