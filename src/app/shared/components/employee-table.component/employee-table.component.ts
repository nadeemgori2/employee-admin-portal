import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

/**
 * Employee Table Component
 * - Displays a table of employees with selection, edit, delete, and view actions.
 * - Responsive and accessible, leveraging Angular Material and Bootstrap utilities.
 */
@Component({
  selector: 'app-employee-table',
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
  ],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent {
  /** Columns to display */
  @Input() displayedColumns: string[] = [];
  /** Employees to display */
  @Input() employees: Employee[] = [];
  /** User role for action permissions */
  @Input() userRole: string | null = null;
  /** Set of selected employee IDs */
  @Input() selectedIds: Set<number> = new Set<number>();
  /** All rows selected */
  @Input() allSelected = false;
  /** Any row selected */
  @Input() anySelected = false;

  /** Toggle selection for a single employee */
  @Output() toggleSelection = new EventEmitter<Employee>();
  /** Toggle selection for all employees */
  @Output() masterToggle = new EventEmitter<void>();
  /** Edit employee event */
  @Output() onEdit = new EventEmitter<Employee>();
  /** Delete employee event */
  @Output() onDelete = new EventEmitter<Employee>();
  /** View employee event */
  @Output() onView = new EventEmitter<Employee>();
}
