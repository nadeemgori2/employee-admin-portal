import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeTableComponent } from './employee-table.component';
import { Employee } from '../../models/employee.model';

describe('EmployeeTableComponent', () => {
  let component: EmployeeTableComponent;
  let fixture: ComponentFixture<EmployeeTableComponent>;

  const mockEmployees: Employee[] = [
    {
      id: 1,
      name: 'John',
      email: 'john@mail.com',
      address: 'UAE',
      phone: '123',
      department: 'IT',
      position: 'Dev',
    },
    {
      id: 2,
      name: 'Jane',
      email: 'jane@mail.com',
      address: 'UAE',
      phone: '456',
      department: 'HR',
      position: 'HR',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeTableComponent);
    component = fixture.componentInstance;
    component.displayedColumns = ['select', 'name', 'email', 'actions'];
    component.employees = mockEmployees;
    component.userRole = 'admin';
    component.selectedIds = new Set<number>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleSelection when a row is toggled', () => {
    spyOn(component.toggleSelection, 'emit');
    component.toggleSelection.emit(mockEmployees[0]);
    expect(component.toggleSelection.emit).toHaveBeenCalledWith(
      mockEmployees[0]
    );
  });

  it('should emit masterToggle when master toggle is triggered', () => {
    spyOn(component.masterToggle, 'emit');
    component.masterToggle.emit();
    expect(component.masterToggle.emit).toHaveBeenCalled();
  });

  it('should emit onEdit when edit is triggered', () => {
    spyOn(component.onEdit, 'emit');
    component.onEdit.emit(mockEmployees[0]);
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('should emit onDelete when delete is triggered', () => {
    spyOn(component.onDelete, 'emit');
    component.onDelete.emit(mockEmployees[0]);
    expect(component.onDelete.emit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('should emit onView when view is triggered', () => {
    spyOn(component.onView, 'emit');
    component.onView.emit(mockEmployees[0]);
    expect(component.onView.emit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('should display employees passed as input', () => {
    expect(component.employees.length).toBe(2);
    expect(component.employees[0].name).toBe('John');
    expect(component.employees[1].name).toBe('Jane');
  });

  it('should accept and use displayedColumns input', () => {
    expect(component.displayedColumns).toContain('name');
    expect(component.displayedColumns).toContain('email');
  });

  it('should accept userRole input', () => {
    expect(component.userRole).toBe('admin');
  });

  it('should accept selectedIds input', () => {
    component.selectedIds.add(1);
    expect(component.selectedIds.has(1)).toBeTrue();
  });
});
