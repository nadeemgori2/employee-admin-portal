import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalPages correctly', () => {
    component.totalItems = 23;
    component.pageSize = 5;
    expect(component.totalPages).toBe(5);
  });

  it('should emit pageChange when selectPage is called with valid page', () => {
    spyOn(component.pageChange, 'emit');
    component.totalItems = 20;
    component.pageSize = 5;
    component.currentPage = 1;
    component.selectPage(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit pageChange when selectPage is called with invalid page', () => {
    spyOn(component.pageChange, 'emit');
    component.totalItems = 20;
    component.pageSize = 5;
    component.currentPage = 1;
    component.selectPage(0); // invalid
    component.selectPage(5); // invalid (out of range)
    component.selectPage(1); // same as current
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should emit previous page on prevPage', () => {
    spyOn(component, 'selectPage');
    component.currentPage = 3;
    component.prevPage();
    expect(component.selectPage).toHaveBeenCalledWith(2);
  });

  it('should emit next page on nextPage', () => {
    spyOn(component, 'selectPage');
    component.currentPage = 2;
    component.nextPage();
    expect(component.selectPage).toHaveBeenCalledWith(3);
  });

  it('should calculate showingFrom and showingTo correctly', () => {
    component.totalItems = 23;
    component.pageSize = 5;
    component.currentPage = 2;
    expect(component.showingFrom).toBe(6);
    expect(component.showingTo).toBe(10);

    component.currentPage = 5;
    expect(component.showingFrom).toBe(21);
    expect(component.showingTo).toBe(23);

    component.totalItems = 0;
    expect(component.showingFrom).toBe(0);
    expect(component.showingTo).toBe(0);
  });

  it('should return correct pages array for small totalPages', () => {
    component.totalItems = 20;
    component.pageSize = 5;
    component.currentPage = 1;
    expect(component.pages).toEqual([1, 2, 3, 4]);
  });

  it('should return correct pages array for large totalPages and currentPage in the middle', () => {
    component.totalItems = 100;
    component.pageSize = 5;
    component.currentPage = 10;
    expect(component.pages).toContain(-1);
    expect(component.pages).toContain(10);
  });
});
