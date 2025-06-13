import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Data structure for employee dialog.
 */
export interface EmployeeDialogData {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
}

/**
 * Dialog for adding or editing an employee.
 * Uses Bootstrap for responsive layout.
 */
@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class AddEmployeeDialogComponent {
  /** Reactive form for employee data. */
  form: FormGroup;
  /** True if editing an existing employee. */
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDialogData
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      name: [data?.name ?? '', Validators.required],
      email: [data?.email ?? '', [Validators.required, Validators.email]],
      address: [data?.address ?? '', Validators.required],
      phone: [data?.phone ?? '', Validators.required],
    });
  }

  /**
   * Save the form and close dialog, passing form value.
   */
  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  /**
   * Cancel and close the dialog.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
