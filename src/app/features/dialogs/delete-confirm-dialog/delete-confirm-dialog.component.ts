import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

/**
 * Confirmation dialog for deleting an employee.
 * Returns true if confirmed, false if cancelled.
 */
@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class DeleteConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employeeName?: string }
  ) {}

  /** Close dialog, returning false (cancel). */
  onCancel(): void {
    this.dialogRef.close(false);
  }

  /** Close dialog, returning true (delete confirmed). */
  onDelete(): void {
    this.dialogRef.close(true);
  }
}
