import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Employee } from '../models/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/employees';

  const mockEmployee: Employee = {
    id: 1,
    name: 'John',
    email: 'john@mail.com',
    address: 'UAE',
    phone: '123',
    department: 'IT',
    position: 'Dev',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all employees', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0]).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockEmployee]);
  });

  it('should fetch a single employee by id', () => {
    service.getEmployee(1).subscribe((employee) => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should add a new employee', () => {
    service.addEmployee(mockEmployee).subscribe((employee) => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockEmployee);
    req.flush(mockEmployee);
  });

  it('should update an existing employee', () => {
    service.updateEmployee(mockEmployee).subscribe((employee) => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockEmployee);
    req.flush(mockEmployee);
  });

  it('should delete an employee by id', () => {
    service.deleteEmployee(1).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
