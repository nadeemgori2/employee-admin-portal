import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

/**
 * EmployeeListLogicService
 * - Provides reusable logic for employee list/table features:
 *   pagination, selection, and bulk actions.
 */
@Injectable({ providedIn: 'root' })
export class EmployeeListLogicService {
  /**
   * Returns a paginated slice of employees.
   */
  getPaginatedPage(
    employees: Employee[],
    currentPage: number,
    pageSize: number
  ): Employee[] {
    const start = (currentPage - 1) * pageSize;
    return employees.slice(start, start + pageSize);
  }

  /**
   * Calculates the maximum page number.
   */
  getMaxPage(total: number, pageSize: number): number {
    return Math.max(Math.ceil(total / pageSize), 1);
  }

  /**
   * Toggles selection for a single employee.
   */
  toggleSelection(selectedIds: Set<number>, emp: Employee): void {
    selectedIds.has(emp.id)
      ? selectedIds.delete(emp.id)
      : selectedIds.add(emp.id);
  }

  /**
   * Checks if an employee is selected.
   */
  isSelected(selectedIds: Set<number>, emp: Employee): boolean {
    return selectedIds.has(emp.id);
  }

  /**
   * Checks if all employees on the current page are selected.
   */
  isAllSelected(
    currentPageEmployees: Employee[],
    selectedIds: Set<number>
  ): boolean {
    return (
      currentPageEmployees.length > 0 &&
      currentPageEmployees.every((emp) => selectedIds.has(emp.id))
    );
  }

  /**
   * Checks if any employee on the current page is selected.
   */
  isAnySelected(
    currentPageEmployees: Employee[],
    selectedIds: Set<number>
  ): boolean {
    return currentPageEmployees.some((emp) => selectedIds.has(emp.id));
  }

  /**
   * Toggles selection for all employees on the current page.
   */
  masterToggle(
    currentPageEmployees: Employee[],
    selectedIds: Set<number>
  ): void {
    const allSelected =
      currentPageEmployees.length > 0 &&
      currentPageEmployees.every((emp) => selectedIds.has(emp.id));
    currentPageEmployees.forEach((emp) =>
      allSelected ? selectedIds.delete(emp.id) : selectedIds.add(emp.id)
    );
  }
}
