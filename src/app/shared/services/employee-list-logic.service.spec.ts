import { TestBed } from '@angular/core/testing';
import { EmployeeListLogicService } from './employee-list-logic.service';
import { Employee } from '../models/employee.model';

describe('EmployeeListLogicService', () => {
  let service: EmployeeListLogicService;
  const employees: Employee[] = [
    {
      id: 1,
      name: 'John',
      email: '',
      address: '',
      phone: '',
      department: '',
      position: '',
    },
    {
      id: 2,
      name: 'Jane',
      email: '',
      address: '',
      phone: '',
      department: '',
      position: '',
    },
    {
      id: 3,
      name: 'Bob',
      email: '',
      address: '',
      phone: '',
      department: '',
      position: '',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeListLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return paginated page', () => {
    const page = service.getPaginatedPage(employees, 1, 2);
    expect(page.length).toBe(2);
    expect(page[0].id).toBe(1);
    expect(page[1].id).toBe(2);
  });

  it('should calculate max page', () => {
    expect(service.getMaxPage(10, 3)).toBe(4);
    expect(service.getMaxPage(0, 3)).toBe(1);
  });

  it('should toggle selection', () => {
    const selected = new Set<number>();
    service.toggleSelection(selected, employees[0]);
    expect(selected.has(1)).toBeTrue();
    service.toggleSelection(selected, employees[0]);
    expect(selected.has(1)).toBeFalse();
  });

  it('should check if employee is selected', () => {
    const selected = new Set<number>([2]);
    expect(service.isSelected(selected, employees[1])).toBeTrue();
    expect(service.isSelected(selected, employees[0])).toBeFalse();
  });

  it('should check if all employees on page are selected', () => {
    const selected = new Set<number>([1, 2]);
    expect(
      service.isAllSelected([employees[0], employees[1]], selected)
    ).toBeTrue();
    expect(
      service.isAllSelected([employees[0], employees[2]], selected)
    ).toBeFalse();
    expect(service.isAllSelected([], selected)).toBeFalse();
  });

  it('should check if any employee on page is selected', () => {
    const selected = new Set<number>([2]);
    expect(
      service.isAnySelected([employees[0], employees[1]], selected)
    ).toBeTrue();
    expect(
      service.isAnySelected([employees[0], employees[2]], selected)
    ).toBeFalse();
  });

  it('should master toggle selection (select all)', () => {
    const selected = new Set<number>();
    service.masterToggle([employees[0], employees[1]], selected);
    expect(selected.has(1)).toBeTrue();
    expect(selected.has(2)).toBeTrue();
  });

  it('should master toggle selection (deselect all)', () => {
    const selected = new Set<number>([1, 2]);
    service.masterToggle([employees[0], employees[1]], selected);
    expect(selected.has(1)).toBeFalse();
    expect(selected.has(2)).toBeFalse();
  });
});
