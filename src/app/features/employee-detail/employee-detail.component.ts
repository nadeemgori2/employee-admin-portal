import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeService } from '../../shared/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

import {
  DEFAULT_AVATAR,
  KPI_CARDS,
  TEAM_MEMBERS,
  PERFORMANCE_LABELS,
  LEAVE_LABELS,
  PERFORMANCE_DATA,
  LEAVE_DATA,
  EXPENSES,
} from '../../shared/constants/employee-detail.mock-data';
import { Employee } from '../../shared/models/employee.model';

/**
 * Employee Detail Page
 * Shows employee info, KPIs, team, and charts.
 * Responsive and accessible, using Bootstrap and Angular Material.
 */
@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    NgChartsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  defaultAvatar = DEFAULT_AVATAR;
  kpis = KPI_CARDS;
  teamMembers = TEAM_MEMBERS;
  performanceLabels = PERFORMANCE_LABELS;
  leaveLabels = LEAVE_LABELS;
  performanceData = PERFORMANCE_DATA;
  leaveData = LEAVE_DATA;
  expenses = EXPENSES;

  employee: Employee | null = null;
  today = new Date();
  activeTab = 'performance';
  attendance = 90;

  performanceChartData: any = {};
  leaveChartData: any = {};

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService.getEmployee(id).subscribe((emp) => {
      this.employee = emp;
    });

    // Chart.js configs
    this.performanceChartData = {
      labels: this.performanceLabels,
      datasets: [
        {
          data: [80, 88, 94, 90],
          label: 'Performance (%)',
          backgroundColor: ['#3498fd', '#2ecc71', '#f1c40f', '#e67e22'],
        },
      ],
    };
    this.leaveChartData = {
      labels: this.leaveLabels,
      datasets: [
        {
          data: this.leaveData,
          backgroundColor: ['#007bff', '#e0e0e0'],
        },
      ],
    };
  }

  /** Navigate back to employee list */
  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
