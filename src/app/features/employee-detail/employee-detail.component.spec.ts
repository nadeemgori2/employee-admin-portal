import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { EmployeeDetailComponent } from './employee-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee.service';
import { of } from 'rxjs';
import { Employee } from '../../shared/models/employee.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  const mockEmployee: Employee = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    address: 'UAE',
    phone: '+971 123456789',
    department: 'IT',
    position: 'Manager',
  };

  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', [
      'getEmployee',
    ]);
    mockEmployeeService.getEmployee.and.returnValue(of(mockEmployee));
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        EmployeeDetailComponent,
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        NgChartsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employee on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(mockEmployeeService.getEmployee).toHaveBeenCalledWith(1);
    expect(component.employee).toEqual(mockEmployee);
  }));

  it('should initialize chart data on init', () => {
    component.ngOnInit();
    expect(component.performanceChartData.labels).toBeDefined();
    expect(component.leaveChartData.labels).toBeDefined();
    expect(component.performanceChartData.datasets.length).toBeGreaterThan(0);
    expect(component.leaveChartData.datasets.length).toBeGreaterThan(0);
  });

  it('should navigate back to employee list on goBack()', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employees']);
  });

  it('should have default values for properties', () => {
    expect(component.activeTab).toBe('performance');
    expect(component.attendance).toBe(90);
    expect(component.today instanceof Date).toBeTrue();
    expect(component.employee).toBeTruthy();
  });
});
