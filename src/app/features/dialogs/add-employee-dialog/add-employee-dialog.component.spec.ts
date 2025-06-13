import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEmployeeDialogComponent } from './add-employee-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('AddEmployeeDialogComponent', () => {
  let component: AddEmployeeDialogComponent;
  let fixture: ComponentFixture<AddEmployeeDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<AddEmployeeDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, AddEmployeeDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
  });

  it('should mark form as invalid if required fields are empty', () => {
    component.form.reset();
    expect(component.form.invalid).toBeTrue();
  });

  it('should call dialogRef.close on cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should not submit if form is invalid', () => {
    spyOn(component, 'onSave').and.callThrough();
    component.form.reset();
    component.onSave();
    expect(component.onSave).toHaveBeenCalled();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should submit and close dialog with form value if form is valid', () => {
    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      address: 'UAE',
      phone: '+971 123456789',
    });
    component.form.markAsDirty();
    component.form.markAsTouched();
    fixture.detectChanges();

    component.onSave();
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.form.value);
  });
});
