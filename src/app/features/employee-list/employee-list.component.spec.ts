import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';
import { EmployeeListLogicService } from '../../shared/services/employee-list-logic.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeTableComponent } from '../../shared/components/employee-table.component/employee-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;
  let logicSpy: jasmine.SpyObj<EmployeeListLogicService>;

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
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    logicSpy = jasmine.createSpyObj('EmployeeListLogicService', [
      'getPaginatedPage',
      'toggleSelection',
      'isSelected',
      'isAllSelected',
      'isAnySelected',
      'masterToggle',
    ]);

    storeSpy.select.and.callFake((selector: any) => {
      if (selector.name === 'selectEmployees') return of(mockEmployees);
      if (selector.name === 'selectEmployeesLoading') return of(false);
      if (selector.name === 'selectRole') return of('admin');
      return of([]);
    });

    logicSpy.getPaginatedPage.and.returnValue(mockEmployees);

    await TestBed.configureTestingModule({
      imports: [
        EmployeeListComponent,
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
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: EmployeeListLogicService, useValue: logicSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadEmployees on init', () => {
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('should call logic.toggleSelection on toggleSelection', () => {
    const emp = mockEmployees[0];
    component.toggleSelection(emp);
    expect(logicSpy.toggleSelection).toHaveBeenCalledWith(
      component.selectedIds,
      emp
    );
  });

  it('should call logic.isSelected on isSelected', () => {
    const emp = mockEmployees[0];
    component.isSelected(emp);
    expect(logicSpy.isSelected).toHaveBeenCalledWith(
      component.selectedIds,
      emp
    );
  });

  it('should call logic.isAllSelected on isAllSelected', () => {
    component.isAllSelected();
    expect(logicSpy.isAllSelected).toHaveBeenCalledWith(
      component.currentPageEmployees,
      component.selectedIds
    );
  });

  it('should call logic.isAnySelected on isAnySelected', () => {
    component.isAnySelected();
    expect(logicSpy.isAnySelected).toHaveBeenCalledWith(
      component.currentPageEmployees,
      component.selectedIds
    );
  });

  it('should call logic.masterToggle on masterToggle', () => {
    component.masterToggle();
    expect(logicSpy.masterToggle).toHaveBeenCalledWith(
      component.currentPageEmployees,
      component.selectedIds
    );
  });

  it('should open AddEmployeeDialogComponent on onAdd', () => {
    const afterClosedSpy = jasmine.createSpyObj({ subscribe: () => {} });
    dialogSpy.open.and.returnValue({
      afterClosed: () => afterClosedSpy,
    } as any);
    component.onAdd();
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should open AddEmployeeDialogComponent on onEdit', () => {
    const afterClosedSpy = jasmine.createSpyObj({ subscribe: () => {} });
    dialogSpy.open.and.returnValue({
      afterClosed: () => afterClosedSpy,
    } as any);
    component.onEdit(mockEmployees[0]);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should open DeleteConfirmDialogComponent on onDelete', () => {
    const afterClosedSpy = jasmine.createSpyObj({ subscribe: () => {} });
    dialogSpy.open.and.returnValue({
      afterClosed: () => afterClosedSpy,
    } as any);
    component.onDelete(mockEmployees[0]);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should navigate to employee detail on onView', () => {
    component.onView(mockEmployees[0]);
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/employees',
      mockEmployees[0].id,
    ]);
  });

  it('should do nothing on onBulkDelete if no selection', () => {
    component.selectedIds.clear();
    component.onBulkDelete();
    expect(dialogSpy.open).not.toHaveBeenCalled();
  });

  it('should open DeleteConfirmDialogComponent on onBulkDelete if selection exists', () => {
    component.selectedIds.add(1);
    const afterClosedSpy = jasmine.createSpyObj({ subscribe: () => {} });
    dialogSpy.open.and.returnValue({
      afterClosed: () => afterClosedSpy,
    } as any);
    component.onBulkDelete();
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should update pageSize on onPage', () => {
    component.onPage({ pageSize: 5 } as any);
    expect(component.pageSize).toBe(5);
  });

  it('should update currentPage and paginatedEmployees$ on onPageChange', () => {
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
  });

  it('should return true for hasSelection if selectedIds is not empty', () => {
    component.selectedIds.add(1);
    expect(component.hasSelection).toBeTrue();
  });

  it('should return false for hasSelection if selectedIds is empty', () => {
    component.selectedIds.clear();
    expect(component.hasSelection).toBeFalse();
  });
});
