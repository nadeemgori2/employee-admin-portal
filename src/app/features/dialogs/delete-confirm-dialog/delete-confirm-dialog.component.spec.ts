import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('DeleteConfirmDialogComponent', () => {
  let component: DeleteConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DeleteConfirmDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DeleteConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { employeeName: 'John Doe' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with false when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true when onDelete is called', () => {
    component.onDelete();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should receive employeeName from MAT_DIALOG_DATA', () => {
    expect(component.data.employeeName).toBe('John Doe');
  });
});
