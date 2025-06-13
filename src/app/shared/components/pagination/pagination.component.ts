import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PaginationComponent
 * - Reusable, responsive pagination for tables/lists.
 * - Emits pageChange events for parent to handle.
 */
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  /** Total number of items */
  @Input() totalItems = 0;
  /** Items per page */
  @Input() pageSize = 5;
  /** Current page (1-based) */
  @Input() currentPage = 1;
  /** Emits new page number on change */
  @Output() pageChange = new EventEmitter<number>();

  /** Total number of pages */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  /** Array of page numbers (with -1 for ellipsis) */
  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, -1, total);
    } else if (current >= total - 3) {
      pages.push(1, -1, total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, -1, current - 1, current, current + 1, -1, total);
    }
    return pages;
  }

  /** Select a specific page */
  selectPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.pageChange.emit(page);
  }

  /** Go to previous page */
  prevPage() {
    this.selectPage(this.currentPage - 1);
  }

  /** Go to next page */
  nextPage() {
    this.selectPage(this.currentPage + 1);
  }

  /** First item index on current page */
  get showingFrom(): number {
    return this.totalItems === 0
      ? 0
      : (this.currentPage - 1) * this.pageSize + 1;
  }
  /** Last item index on current page */
  get showingTo(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
}
