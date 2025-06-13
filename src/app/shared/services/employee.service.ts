import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

/**
 * EmployeeService
 * - Handles CRUD operations for Employee data.
 * - Uses Angular HttpClient for RESTful API communication.
 */
@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  /** Fetch all employees */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  /** Fetch a single employee by ID */
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  /** Add a new employee */
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  /** Update an existing employee */
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  /** Delete an employee by ID */
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
